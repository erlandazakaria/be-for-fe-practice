import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreateGameDto {
    @IsNotEmpty({message: "Nama tidak boleh kosong"})
    @IsString({message: "Format nama salah"})
    name: string;

    @IsNotEmpty({message: "Deskripsi tidak boleh kosong"})
    @IsString({message: "Format deskripsi salah"})
    description: string;

    @IsNotEmpty({message: "Cover tidak boleh kosong"})
    @IsString({message: "Format cover salah"})
    cover: string;

    @IsNotEmpty({message: "Rating tidak boleh kosong"})
    @IsNumberString(null, {message: "Format rating salah"})
    rating: number;
}
