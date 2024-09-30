import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository, QueryFailedError} from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { ADDRCONFIG } from 'dns';


export class BookService {
  
  constructor(@InjectRepository(Book)
  private readonly bookRepository: Repository<Book>,
 
){}
  
  async create(createBookDto: CreateBookDto) {
    try{
      const Book = this.bookRepository.create(createBookDto);

      Book.isavailable = true;

      const newBook = await this.bookRepository.save(Book);
      return newBook;
    }catch(error){
      if (error instanceof QueryFailedError) {
        throw new QueryFailedError("Bad request", undefined, error);
      }
      throw new InternalServerErrorException(error.message || "Internal server error");
    }  
  }

  findAll() {
    return `This action returns all book`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
