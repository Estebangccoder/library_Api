import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get("searchbyauthor") //endppint /searchbyauthor?author=
  findByAuthor(@Query('author') author: string) {

    if(!author){
      throw new HttpException('Author is required', HttpStatus.BAD_REQUEST)
    } 

    try {
      return this.bookService.findByAuthor(author);  
    } catch (error) {
      throw new HttpException('Author not found', HttpStatus.NOT_FOUND)
      
    }
    
  }

  @Get('/available')
  findByAvailability(){
    return this.bookService.findByAvailability(true);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {

    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
