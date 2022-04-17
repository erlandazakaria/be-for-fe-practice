import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class UpdateMovieDto {
    @IsOptional()
    @IsNotEmpty({message: "Nama tidak boleh kosong"})
    @IsString({message: "Format nama salah"})
    name?: string;

    @IsOptional()
    @IsNotEmpty({message: "Deskripsi tidak boleh kosong"})
    @IsString({message: "Format deskripsi salah"})
    description?: string;

    cover?: string;

    @IsOptional()
    @IsNotEmpty({message: "Rating tidak boleh kosong"})
    @IsNumberString(null, {message: "Format rating salah"})
    rating?: number;
}
