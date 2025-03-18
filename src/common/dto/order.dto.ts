import { IsString, IsNumber, IsArray, IsEnum, IsOptional } from "class-validator";

export class OrderDetailDto {
    @IsString()
    _id: string;

    @IsNumber()
    quantity: number;

    @IsString()
    bookName: string;
}

export enum PaymentType {
    COD = "COD",
    ONLINE = "BANKING",
}

export class CreateOrderDto {
    @IsString()
    name: string;

    @IsString()
    phone: string;

    @IsString()
    address: string;

    @IsEnum(PaymentType)
    type: PaymentType;

    @IsNumber()
    totalPrice: number;

    @IsArray()
    detail: OrderDetailDto[];

    @IsOptional()  // Chỉ cần khi thanh toán ONLINE
    @IsString()
    paymentRef?: string;
}