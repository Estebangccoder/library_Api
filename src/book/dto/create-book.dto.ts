import{IsString, IsUUID, IsBoolean} from "class-validator"

export class CreateBookDto {
    @IsString()
    title: string;

    @IsString()
    author: string;

    @IsString()
    published: string;
    
    @IsUUID()
    genre_id: string;
}
