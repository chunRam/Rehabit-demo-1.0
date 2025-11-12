import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn()
          }
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token')
          }
        }
      ]
    }).compile();

    service = module.get(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('registers a new user', async () => {
    const dto: CreateUserDto = { email: 'test@example.com', password: 'password123' };
    usersService.findByEmail.mockResolvedValue(null);
    usersService.create.mockImplementation(async (createDto, passwordHash) => ({
      id: '1',
      email: createDto.email,
      passwordHash,
      displayName: createDto.displayName,
      createdAt: new Date(),
      updatedAt: new Date()
    }) as any);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed');

    const result = await service.register(dto);

    expect(usersService.findByEmail).toHaveBeenCalledWith(dto.email);
    expect(usersService.create).toHaveBeenCalledWith(dto, 'hashed');
    expect(jwtService.sign).toHaveBeenCalled();
    expect(result.accessToken).toEqual('token');
  });

  it('logs in a user with valid credentials', async () => {
    const dto: LoginDto = { email: 'test@example.com', password: 'password123' };
    const user = {
      id: '1',
      email: dto.email,
      passwordHash: 'hashed',
      displayName: null,
      createdAt: new Date(),
      updatedAt: new Date()
    } as any;
    usersService.findByEmail.mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const result = await service.login(dto);

    expect(usersService.findByEmail).toHaveBeenCalledWith(dto.email);
    expect(bcrypt.compare).toHaveBeenCalledWith(dto.password, user.passwordHash);
    expect(result.accessToken).toEqual('token');
  });

  it('throws for invalid login credentials', async () => {
    const dto: LoginDto = { email: 'test@example.com', password: 'wrong' };
    usersService.findByEmail.mockResolvedValue(null);

    await expect(service.login(dto)).rejects.toThrow();
  });
});
