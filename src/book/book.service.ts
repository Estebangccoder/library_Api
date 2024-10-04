import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository, QueryFailedError, Like } from 'typeorm';
import { BadRequestException, HttpException, HttpStatus, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { error } from 'console';



export class BookService {

  constructor(@InjectRepository(Book)
  private readonly bookRepository: Repository<Book>,

  ) { }

  async create(createBookDto: CreateBookDto) {
    try {
      const Book = this.bookRepository.create(createBookDto);

      Book.isavailable = true;

      const newBook = await this.bookRepository.save(Book);
      return newBook;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new QueryFailedError("Bad request", undefined, error);
      }
      throw new InternalServerErrorException(error.message || "Internal server error");
    }
  }

  async findById(id: string) {
    const book = await this.bookRepository.find({where: {id}, relations:['genre']})
    return book

  }

  async findByAuthor(author: string) {
    // try{}catch(error){}
    const booksAuthor = await this.bookRepository.find({where: {author: Like(`%${author.toLowerCase().trim()}%`)}})

    return booksAuthor;
  }
 
  async findByAvailability(availability: boolean) {
    try {
      const booksAvailability = await this.bookRepository.find({where: {isavailable: true}})
      
      if(booksAvailability.length>0) {
        return booksAvailability
      }else{
        console.log("No books available")
        throw new error ({message: 'No books available'})
      }
      
    } catch (error) {
      
      if(error) //instanceof QueryFailedError) {
        throw new BadRequestException()
      }
      throw new InternalServerErrorException("Internal server error");

    }
  

  async update(id: string, updateBookDto: UpdateBookDto) {
    const bookFound = await this.bookRepository.find({where:{id}})

    if(!bookFound) {
      throw new NotFoundException("Book not found")
    }

    const result = await this.bookRepository.update(id, updateBookDto);
    return Response.json({"message":"Updated book"})
    
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
