import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Carts, CartsDocument } from "./carts.schema";

@Injectable()
export class CartsService {

  constructor(
    @InjectModel(Carts.name) private cartsModel: Model<CartsDocument>,
    @InjectConnection() public connection: Connection
  ) { }

  async create(carts: Carts): Promise<Carts> {
    return await (new this.cartsModel(carts)).save();
  }

  async readAll(): Promise<Carts[]> {
    return await this.cartsModel.find().exec();
  }

  async readById(id: string): Promise<Carts> {
    return await this.cartsModel.findById(id).exec();
  }

  async update(id: string, carts: Carts): Promise<Carts> {
    return await this.cartsModel.findByIdAndUpdate(id, carts, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return await this.cartsModel.findByIdAndRemove(id).exec();
  }

  async deleteAll(): Promise<any> {
    return await this.cartsModel.deleteMany({}).exec();
  }
}