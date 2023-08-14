/* eslint-disable no-empty-function */
import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import Response from 'src/Helpers/Formatter/Response';
import { JwtAuthGuard } from 'src/Middlewares/JwtAuthGuard';
import { PermissionGuard } from 'src/Middlewares/PermissionGuard';
import { ExampleRequest } from 'src/Models/Request/ExampleRequest';
import ExampleResponse from 'src/Models/Response/ExampleResponse';
import { ExampleService } from 'src/Services/ExampleService';
import { Permissions } from '../Helpers/Decorators/PermissionDecorator';

@Controller('example')
export class ExampleController {
    constructor(private readonly _exampleService: ExampleService) {}

    @Post()
    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Permissions('PERMISO1', 'PERMISO2')
    @HttpCode(HttpStatus.OK)
    async getPong(@Body() body: ExampleRequest): Promise<Response<ExampleResponse>> {
        const response = await this._exampleService.getPong2(body);
        return new Response<ExampleResponse>(response);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getTest(): Promise<Response<ExampleResponse>> {
        const response = await this._exampleService.test();
        return new Response<ExampleResponse>(response);
    }
}
