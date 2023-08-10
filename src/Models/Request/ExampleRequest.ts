import { IsNotEmpty, IsString } from 'class-validator';

export default class ExampleRequest {
  @IsNotEmpty()
  @IsString()
  text: string;
}
