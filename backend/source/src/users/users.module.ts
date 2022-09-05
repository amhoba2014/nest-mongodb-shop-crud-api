import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './users.schema';
import { CartsModule } from '../carts/carts.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UsersSchema
      }
    ]),
    CartsModule
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
