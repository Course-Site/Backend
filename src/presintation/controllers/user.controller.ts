import { Controller, Get, Delete, Inject, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { IUserService } from 'src/use-cases/user/interface/service/user.service.interface';
import { 
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/infrastructure/JWT/guards/jwt.guard';
import { Response } from 'express';
import { UserId } from 'src/infrastructure/decorators/user-id.decorator';

@Controller('user')
@ApiTags('User')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(
    @Inject('userService')
    private readonly userService: IUserService,
  ) {}

  @Get('get')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  @ApiResponse({ status: 404, description: 'Users not found.' })
  async findAllUsers() {
    return await this.userService.findAllUsers();
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a user by his ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async deleteUser(@Param('id') id: string) {
    await this.userService.deleteUser(id);
  }

  @Get('findById')
  async findById(@UserId() id: string) {
    const user = await this.userService.findById(id);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  @Get('findByEmail/:email')
  async findByEmail(@Param('email') email: string) {
    const user = await this.userService.findByEmail(email);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

}
