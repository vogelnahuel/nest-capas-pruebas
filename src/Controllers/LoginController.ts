import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import Response from 'src/Helpers/Formatter/Response';
import { LoginRequest } from 'src/Models/Request/ExampleRequest';
import ExampleResponse from 'src/Models/Response/ExampleResponse';
import { ExampleService } from 'src/Services/ExampleService';

@Controller('login')
export class ExampleController {
    // eslint-disable-next-line no-empty-function
    constructor(private readonly _exampleService: ExampleService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    async getPong(@Body() body: LoginRequest): Promise<Response<ExampleResponse>> {
        const response = await this._exampleService.getPong(body);
        return new Response<ExampleResponse>(response);
    }
}
