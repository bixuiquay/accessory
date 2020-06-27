import { Injectable, ForbiddenException, BadRequestException } from '@nestjs/common';
import { Client } from 'src/database/entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientCreateRequest , ClientRegister, ClientLogin} from './client.dto';
import { constants } from 'buffer';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CartService } from 'src/cart/cart.service';
const saltRounds = 10;

@Injectable()
export class ClientService {
  getAll(): any {
    throw new Error("Method not implemented.");
  }
  constructor(
    private readonly cartService: CartService,
    private readonly jwtService: JwtService,
    @InjectRepository(Client)
    private readonly repository: Repository<Client>
  ) {}


  // async update(id, entity: Partial<Client>): Promise<any> {
  //   const e = await this.repository.findOne({id});
  //   e.firstName = entity.firstName;
  //   e.lastName = entity.lastName;
  //   return this.repository.save(e);
  // }

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
        phone: client.phonenumber,
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

    const check = await bcrypt.compare(pass, entity.passwordHash);

    if (entity && check) {
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
      cart
    };
  }

}
