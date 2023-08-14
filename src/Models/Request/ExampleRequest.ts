/* eslint-disable max-classes-per-file */
import { IsNotEmpty, IsString } from 'class-validator';

export class ExampleRequest {
    @IsNotEmpty()
    @IsString()
    text: string;
}

export class LoginRequest {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
