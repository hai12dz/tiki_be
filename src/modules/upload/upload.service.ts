import { Injectable, BadRequestException } from '@nestjs/common';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import { UserService } from '../users/users.service'

@Injectable()
export class UploadService {
    constructor(private readonly userService: UserService) { }

    async saveFile(file: Express.Multer.File, folder: string, userId: number): Promise<string> {
        if (!file) throw new BadRequestException('No file uploaded');

        const uploadDir = `public/images/${folder}`;
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Tạo tên file mới
        const fileExt = extname(file.originalname);
        const fileName = `${randomUUID()}${fileExt}`;
        const filePath = `${uploadDir}/${fileName}`;

        fs.writeFileSync(filePath, file.buffer);

        // 🔥 Cập nhật avatar trong DB

        return fileName; // Trả về tên file để hiển thị trên FE
    }
}
