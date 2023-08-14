import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { importAllFromRequireContext } from 'src/Helpers/Utils/RequireContext';

@Module({
    imports: [
        PassportModule.register({}),
        JwtModule.registerAsync({
            useFactory: (config: ConfigService) => {
                return {
                    secret: config.get<string>('JWT_SECRET_KEY'),
                };
            },
            inject: [ConfigService],
        }),
    ],
    providers: [
        ...importAllFromRequireContext(require.context('../Services/', true)),
        ...importAllFromRequireContext(require.context('../WebServices/', true)),
    ],
    controllers: importAllFromRequireContext(require.context('../Controllers/', true)),
    exports: [],
})
export class ApplicationModule {}
