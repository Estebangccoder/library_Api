import { Book } from "src/book/entities/book.entity";
import { Column, PrimaryGeneratedColumn, Entity, OneToMany, DeleteDateColumn} from "typeorm";

@Entity('genres')
export class Genre {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 150, nullable: false})
    name: string;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    delete_at: Date;
    
    @OneToMany(() => Book, (book) => book.genre, { onDelete: "CASCADE", cascade: true })
    books: Book[];
    
}