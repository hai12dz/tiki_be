import { Expose } from 'class-transformer';

export class SupplierDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    logo: string

}
