import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreateGameDto {
    @IsNotEmpty({message: "Nama tidak boleh kosong"})
    @IsString({message: "Format nama salah"})
    name: string;

    @IsNotEmpty({message: "Deskripsi tidak boleh kosong"})
    @IsString({message: "Format deskripsi salah"})
    description: string;

    cover: string;

    @IsNotEmpty({message: "Rating tidak boleh kosong"})
    @IsNumberString(null, {message: "Format rating salah"})
    rating: number;

    @IsNotEmpty({message: "Tahun tidak boleh kosong"})
    @IsNumberString(null, {message: "Format tahun salah"})
    year: number;

    @IsNotEmpty({message: "Genre tidak boleh kosong"})
    @IsString({message: "Format genre salah"})
    genre: string;

    @IsNotEmpty({message: "Platform tidak boleh kosong"})
    @IsString({message: "Format platform salah"})
    platform: string;
}
