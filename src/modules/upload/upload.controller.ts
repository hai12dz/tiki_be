import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException, Headers } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('/api/v1')
export class UploadController {
    @Post('/file/upload')
    @UseInterceptors(FileInterceptor('fileImg', {
        storage: diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'public/images/avatar'); // Thư mục lưu ảnh
            },
            filename: (req, file, cb) => {
                const fileExt = extname(file.originalname); // Lấy phần mở rộng
                const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${fileExt}`; // Tạo tên mới
                cb(null, fileName);
            }
        }),
        limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn 5MB
    }))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Headers('upload-type') folder: string
    ) {
        if (!file) throw new BadRequestException('File upload failed');

        return {
            statusCode: 201,
            message: 'Upload file thành công',
            data: {
                fileUploaded: file.filename, // Đảm bảo trả về key "fileUploaded"
            }
        };
    }
}
