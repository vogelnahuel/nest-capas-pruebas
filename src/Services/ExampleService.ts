/* eslint-disable no-empty-function */
import { Injectable } from '@nestjs/common';
import { LoginRequest, ExampleRequest } from 'src/Models/Request/ExampleRequest';
import ExampleResponse from 'src/Models/Response/ExampleResponse';
import JwtSecurityService from './Security/JwtSecurityService';

@Injectable()
export class ExampleService {
    constructor(private readonly _jwtService: JwtSecurityService) {}

    async getPong(text: LoginRequest): Promise<ExampleResponse> {
        const permission = ['PER_OBTENER_DASHBOARD', 'PER_CREAR_FORECAST'];
        const jwt = await this._jwtService.generateAccessToken('23123123', 1, text.username, permission);
        return new ExampleResponse(jwt);
    }

    async getPong2(text: ExampleRequest): Promise<ExampleResponse> {
        return new ExampleResponse(text.text);
    }

    async test(): Promise<ExampleResponse> {
        return new ExampleResponse('Hola mundo');
    }
}
