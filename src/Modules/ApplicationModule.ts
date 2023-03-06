import { Module } from "@nestjs/common";
import { importAllFromRequireContext } from "src/Helpers/Utils/RequireContext";

@Module({
    imports: [],
    providers: [
        ...importAllFromRequireContext(require.context('../Services/', true)),
        ...importAllFromRequireContext(require.context('../WebServices/', true)),
    ],
    controllers: importAllFromRequireContext(require.context('../Controllers/', true)),
    exports: [],
})
export class ApplicationModule { }