import { Book } from "src/book/entities/book.entity";
import { Column, PrimaryGeneratedColumn, Entity, OneToMany} from "typeorm";

@Entity('genres')
export class Genre {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 150, nullable: false})
    title: string;
    
    @OneToMany(() => Book, (book) => book.genre, { onDelete: "CASCADE", cascade: true })
    books: Book[];
    
}