import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Users } from "./users.schema";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CartsService } from "src/carts/carts.service";

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cartsService: CartsService
  ) { }

  @Post()
  @ApiResponse({
    type: Users
  })
  async createUsers(@Body() users: Users) {
    return await this.usersService.create(users);
  }

  @Get()
  @ApiResponse({
    type: [Users]
  })
  async fetchAll() {
    return await this.usersService.readAll();
  }

  @Get('/:id')
  @ApiResponse({
    type: Users
  })
  async findById(@Param('id') id: string) {
    return await this.usersService.readById(id);
  }

  @Put('/:id')
  @ApiResponse({
    type: Users
  })
  async update(@Param('id') id: string, @Body() users: Users) {
    return await this.usersService.update(id, users);
  }

  @Delete('/:id')
  @ApiResponse({
    type: Users
  })
  async delete(@Param('id') id: string) {
    let toDeleteUser = await this.usersService.readById(id)

    let relatedCarts = await this.cartsService.readAll({
      email: toDeleteUser.email
    })

    if (relatedCarts.length != 0 && relatedCarts[0].items.length != 0) {
      throw new HttpException("This user has some products in his cart", HttpStatus.FORBIDDEN)
    }

    return await this.usersService.delete(id);
  }
} 