import { Injectable } from "@nestjs/common";
import ExampleRequest from "src/Models/Request/ExampleRequest";
import ExampleResponse from "src/Models/Response/ExampleResponse";

@Injectable()
export class ExampleService {

    async getPong(text: ExampleRequest): Promise<ExampleResponse> {
        return new ExampleResponse(text.text);
    }
}