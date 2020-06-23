import { Injectable, ForbiddenException } from '@nestjs/common';
import { Client } from 'src/database/entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientCreateRequest , ClientRegister, ClientLogin} from './client.dto';
import { constants } from 'buffer';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
const saltRounds = 10;

@Injectable()
export class ClientService {
  getAll(): any {
    throw new Error("Method not implemented.");
  }
  constructor(
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
    const hash = bcrypt.hashSync(client.password, saltRounds);
    const entity = {
      email: client.email,
      lastName: client.lastName,
      username: client.username,
      firstName: client.firstName,
      address: client.address,
      city: client.city,
      phonenumber: client.phonenumber,
      passwordHash: hash
      
    }

    return await this.repository.save(entity);
  }

  async validateUser(username: string, pass: string): Promise<Client> {
    const queryBuilder = this.repository.createQueryBuilder('client').where({username});
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
    const { username, password } = loginRequest;
    const userValid = await this.validateUser(username, password);

    if (!userValid) {
      throw new ForbiddenException();
    }

    const { id } = userValid;
    const payload = { username: username, sub: id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
