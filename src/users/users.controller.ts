import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserResponseDto })
  async getMe(@CurrentUser() user: User): Promise<UserResponseDto> {
    const freshUser = await this.usersService.findById(user.id);
    if (!freshUser) {
      throw new NotFoundException('Authenticated user not found');
    }
    return {
      id: freshUser.id,
      email: freshUser.email,
      displayName: freshUser.displayName,
      createdAt: freshUser.createdAt,
      updatedAt: freshUser.updatedAt
    };
  }
}
