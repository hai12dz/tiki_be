import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "../../entities/order.entity";
import { CreateOrderDto } from "../../common/dto/order.dto";
import { User } from "src/entities/user.entity";
import { UserService } from "../users/users.service";

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepo: Repository<Order>,

        @InjectRepository(User)
        private readonly userRepo: Repository<User> // <-- Thêm vào đây
    ) { }


    async createOrder(dto: CreateOrderDto, userId: number) {
        const customer = await this.userRepo.findOne({ where: { id: userId } });
        if (!customer) throw new NotFoundException('User không tồn tại');

        const newOrder = this.orderRepo.create({
            customer: customer, // Gán user vào đơn hàng
            name: dto.name,
            phone: dto.phone,
            address: dto.address,
            type: dto.type,
            totalPrice: dto.totalPrice,
            detail: dto.detail, // Lưu dưới dạng JSON
            status: 'pending',
        });

        return await this.orderRepo.save(newOrder);
    }

    async getOrdersByUser(userId: number) {
        return await this.orderRepo.find({
            where: { customer: { id: userId } },
            relations: ['customer'], // Lấy thêm thông tin user
            order: { createdAt: 'DESC' },
        });
    }

}
