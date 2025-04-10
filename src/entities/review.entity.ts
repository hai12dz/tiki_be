import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';
import { User } from './user.entity';

/**
 * Bảng lưu đánh giá của người dùng cho từng sản phẩm
 */
@Entity('product_reviews')
export class ProductReview extends BaseEntity {
    @ManyToOne(() => Product, product => product.reviews)
    product: Product;

    @ManyToOne(() => User, user => user.reviews)
    user: User;

    @Column('decimal', { precision: 2, scale: 1 })
    rating: number;  // Số sao đánh giá (1-5)

    @Column({ type: 'text', nullable: true })
    comment: string;  // Bình luận của người dùng

    @Column({ type: 'text', nullable: true })
    img: string;

    @Column({ default: false })
    isBuy: boolean; // Đánh giá đã mua hàng hay chưa

    @Column({ default: "Cảm ơn bạn đã tin tưởng dịch vụ và lựa chọn sản phẩm của Tiki nè. Hy vọng những sản phẩm, dịch vụ của Tiki sẽ giúp bạn có những trải nghiệm tuyệt vời nhất. Rất mong bạn sẽ tiếp tục ủng hộ Tiki trong thời gian tới ạ. " })
    commentReply: string; // Bình luận phản hồi của admin


}
