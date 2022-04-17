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

    @IsOptional()
    @IsNotEmpty({message: "Tahun tidak boleh kosong"})
    @IsNumberString(null, {message: "Format tahun salah"})
    year?: number;

    @IsOptional()
    @IsNotEmpty({message: "Genre tidak boleh kosong"})
    @IsString({message: "Format genre salah"})
    genre?: string;
}
