import { TestingModule } from "@nestjs/testing";
import { UsersService } from "../src/users/users.service";
import { CartsService } from "../src/carts/carts.service";
import { ProductsService } from "../src/products/products.service";

export const resetState = async (module: TestingModule) => {
    const cartsService = module.get<CartsService>(CartsService);
    const productsService = module.get<ProductsService>(ProductsService);
    const usersService = module.get<UsersService>(UsersService);

    await cartsService.deleteAll()
    await productsService.deleteAll()
    await usersService.deleteAll()

    // no matter which one. they are all the same.
    await usersService.connection.close()
}