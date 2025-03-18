import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { UserModule } from '../users/users.module';

@Module({
    imports: [UserModule],
    controllers: [UploadController],
    providers: [UploadService],
})
export class UploadModule { }
