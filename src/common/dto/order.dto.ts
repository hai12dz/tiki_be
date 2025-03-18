import { IsString, IsNumber, IsArray, IsEnum } from "class-validator";

export class OrderDetailDto {
    @IsString()
    _id: string;

    @IsNumber()
    quantity: number;

    @IsString()
    bookName: string;
}

export class CreateOrderDto {
    @IsString()
    name: string;

    @IsString()
    phone: string;

    @IsString()
    address: string;

    @IsEnum(["COD", "ONLINE"])
    type: "COD" | "ONLINE";

    @IsNumber()
    totalPrice: number;

    @IsArray()
    detail: OrderDetailDto[];
}
