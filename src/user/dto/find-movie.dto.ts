import { IsNotEmpty, IsNumberString } from "class-validator";

export class FindUserDto {
    @IsNotEmpty({message: "Id tidak boleh kosong"})
    @IsNumberString(null, {message: "Format id salah"})
    id: number;
}
