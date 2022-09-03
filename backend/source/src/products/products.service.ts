import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Products, ProductsDocument } from "./products.schema";

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Products.name) private productsModel: Model<ProductsDocument>,
    @InjectConnection() public connection: Connection
  ) { }

  async create(products: Products): Promise<Products> {
    return await (new this.productsModel(products)).save();
  }

  async readAll(): Promise<Products[]> {
    return await this.productsModel.find().exec();
  }

  async readById(id: string): Promise<Products> {
    return await this.productsModel.findById(id).exec();
  }

  async update(id: string, products: Products): Promise<Products> {
    return await this.productsModel.findByIdAndUpdate(id, products, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return await this.productsModel.findByIdAndRemove(id).exec();
  }

  async deleteAll(): Promise<any> {
    return await this.productsModel.deleteMany({}).exec();
  }
}