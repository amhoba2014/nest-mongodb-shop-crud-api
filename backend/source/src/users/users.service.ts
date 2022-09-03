import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Users, UsersDocument } from "./users.schema";

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
    @InjectConnection() public connection: Connection
  ) { }

  async create(users: Users): Promise<Users> {
    return await (new this.usersModel(users)).save();
  }

  async readAll(): Promise<Users[]> {
    return await this.usersModel.find().exec();
  }

  async readById(id: string): Promise<Users> {
    return await this.usersModel.findById(id).exec();
  }

  async update(id: string, users: Users): Promise<Users> {
    return await this.usersModel.findByIdAndUpdate(id, users, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return await this.usersModel.findByIdAndRemove(id).exec();
  }

  async deleteAll(): Promise<any> {
    return await this.usersModel.deleteMany({}).exec();
  }
}