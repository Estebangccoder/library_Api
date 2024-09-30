import { Genre } from "src/genre/entities/genre.entity";
import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 150, nullable: false})
    title: string;

    @Column({type: 'varchar', length: 150, nullable: false})
    author: string;

    @Column({type: 'varchar', length: 150, nullable: false})
    published: string;

    @Column({type: 'boolean', default: true})
    isavailable: boolean;

    @Column({type: 'varchar', nullable: false})
    genre_id: string;

    @ManyToOne(() => Genre, genre => genre.books)
    @JoinColumn({ name: 'genre_id' })
    genre: Genre;
}
