import { Module, ModuleMetadata } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CartsModule } from './carts/carts.module';

export const composeAppModuleMetaData = (): ModuleMetadata => {
  return {
    imports: [
      MongooseModule.forRoot(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@database:27017/${process.env.MONGO_INITDB_DATABASE}?authSource=admin`),
      ProductsModule,
      UsersModule,
      CartsModule
    ],
    controllers: [],
    providers: [],
  }
}

@Module(composeAppModuleMetaData())
export class AppModule { }
