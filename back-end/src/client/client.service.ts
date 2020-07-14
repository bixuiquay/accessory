import { Injectable, ForbiddenException, BadRequestException } from '@nestjs/common';
import { Client } from 'src/database/entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientCreateRequest , ClientRegister, ClientLogin, ClientProfileRequest} from './client.dto';
import { constants } from 'buffer';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CartService } from 'src/cart/cart.service';
import { ContextService } from 'src/core/services';
const saltRounds = 10;

@Injectable()
export class ClientService {
  constructor(
    private readonly cartService: CartService,
    private readonly jwtService: JwtService,
    @InjectRepository(Client)
    private readonly repository: Repository<Client>,
    private readonly context: ContextService
  ) {}

  async getProfile() {
    const { userId } = this.context.user;
    const entity =  await this.repository.findOne({id: userId});
    delete entity.passwordHash;
    return entity;
  }

  async updateProfile(clientProfile: ClientProfileRequest) {
    const { userId } = this.context.user;
    const entity =  await this.repository.findOne({id: userId});
    delete entity.passwordHash;
    const updateEntity = {...entity, ...clientProfile}
    // const updateEntity: Client = {
    //   username: clientProfile.username,
    //   passwordHash: entity.passwordHash,
    //   email: entity.email,
      
    // }
    

    return await this.repository.save(updateEntity);
  }


  async register(client: ClientRegister) {
    try {
      const hash = bcrypt.hashSync(client.password, saltRounds);
      const entity = {
        email: client.email,
        lastName: client.lastName,
        username: client.username,
        firstName: client.firstName,
        address: client.address,
        city: client.city,
        phone: client.phoneNumber,
        passwordHash: hash
      }

      const savedClient = await this.repository.save(entity);
      //add cart for client
      const cart = await this.cartService.add({clientId: savedClient.id});
      return {
        client,
        cart
      }
    }
    catch(error)
    {
      console.log('error: ', error)
      throw new BadRequestException()
    }
  }

  async validateUser(email: string, pass: string): Promise<Client> {
    const queryBuilder = this.repository.createQueryBuilder('client').where({email});
    const entities = await queryBuilder.getMany();
    const entity = entities[0];
    if (!entity) {
      return null;
    }

    const check = await bcrypt.compare(pass, entity.passwordHash);
    if (check) {
      const { ...result } = entity;
      return result;
    }
    return null;
  }

  async findUser(id: string) {
    return await this.repository.findOne({ id});
  }

  async login(loginRequest: ClientLogin) {
    const { email, password } = loginRequest;
    const userValid = await this.validateUser(email, password);

    if (!userValid) {
      throw new ForbiddenException();
    }

    const { id } = userValid;
    const payload = { username: email, sub: id };

    //add cart for client
    const cart = await this.cartService.add({clientId: id});
    return {
      access_token: this.jwtService.sign(payload),
      cart,
      user: {
        email: userValid.email,
        username: userValid.username,
        phone: userValid.phone,
        firstName: userValid.firstName,
        lastName: userValid.lastName,
        address: userValid.address,
      }
    };
  }
}
