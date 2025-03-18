import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "../../entities/order.entity";
import { OrderService } from "./orders.service";
import { OrderController } from "./orders.controller";
import { User } from "src/entities/user.entity";
import { UserModule } from "../users/users.module";

@Module({
    imports: [TypeOrmModule.forFeature([Order, User])],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule { }
