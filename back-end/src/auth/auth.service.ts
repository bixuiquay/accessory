import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterRequest, UserRoleRequest, LoginRequest } from './auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/database/entities/user-role.entity';
import { Client } from 'src/database/entities/client.entity';
const saltRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    @InjectRepository(UserRole)
    private readonly roleRepository: Repository<UserRole>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const queryBuilder = this.repository.createQueryBuilder('user').where({username})
      .leftJoinAndSelect('user.role', 'user_role');
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
    const e = await this.repository.findOne({id});
    if (!e) {
      return this.clientRepository.findOne({id});
    }

    return e;
  }

  async login(loginRequest: LoginRequest) {
    const { username, password } = loginRequest;
    const userValid = await this.validateUser(username, password);

    if (!userValid) {
      throw new ForbiddenException();
    }

    const { id, role } = userValid;
    const { resources } = role;

    const payload = { username: username, sub: id, resources: resources };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: RegisterRequest) {
    const hash = bcrypt.hashSync(user.password, saltRounds);
    const entity = {
      email: user.email,
      lastName: user.lastName,
      username: user.username,
      firstName: user.firstName,
      role: new UserRole({id: user.roleId}),
      passwordHash: hash
    }

    return await this.repository.save(entity);
  }

  async createUserRole(userRoleRequest:UserRoleRequest ): Promise<any> {
    return await this.roleRepository.save(userRoleRequest);
  }
}
