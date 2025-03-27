import { Controller, Post, Body, Get, UseGuards, Request, HttpStatus, Req } from "@nestjs/common";
import { OrderService } from "./orders.service";
import { CreateOrderDto } from "../../common/dto/order.dto";
import { JwtAuthGuard } from "src/common/guards/jwt.auth.guard";
import { BaseResponseDto } from 'src/common/dto/base.response.dto';

@Controller("/orders")
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createOrder(@Req() req: Request, @Body() dto: CreateOrderDto) {
        const userId = (req as any).user.userId;
        return new BaseResponseDto(
            HttpStatus.CREATED,
            'Tạo đơn hàng thành công',
            await this.orderService.createOrder(dto, userId)
        );
    }

    @Get('/history')
    @UseGuards(JwtAuthGuard)
    async getOrderHistory(@Req() req: Request) {
        const userId = (req as any).user.userId;
        return new BaseResponseDto(
            HttpStatus.OK,
            'Lịch sử đơn hàng',
            await this.orderService.getOrdersByUser(userId)
        );
    }


}
