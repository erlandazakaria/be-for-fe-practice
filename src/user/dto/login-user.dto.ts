import { IsNotEmpty, IsEmail, IsString, Length } from "class-validator";

export class LoginDto {
    @IsNotEmpty({message: "Email tidak boleh kosong"})
    @IsEmail({message: "Format email salah"})
    email: string;

    @IsNotEmpty({message: "Password tidak boleh kosong"})
    @IsString({message: "Format password salah"})
    @Length(8, 20, {message: "Password minimal 8 karakter"})
    password: string;
}
