import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthLoginDto{

    @IsEmail()
    @ApiProperty({example: 'sm@gmail.com'})
    @IsNotEmpty()
    email: string

    @IsString()
    @ApiProperty({example: '12345'})
    @IsNotEmpty()
    password: string
}
