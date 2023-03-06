import EnumEnv from './EnumEnv';

export const envFilePathConfiguration = (): string => {
    console.log(`Entorno - ${process.env.MS_ADMIN}`);
    let envFilePath;
    switch (process.env.MS_ADMIN) {
        case EnumEnv.LOCAL:
            envFilePath = '.env.local';
            break;
        case EnumEnv.DEV:
            envFilePath = '.env.dev';
            break;
        case EnumEnv.PRODUCTION:
            envFilePath = '.env';
            break;
        default:
            envFilePath = '.env';
    }
    console.log(`envFilePath: ` + envFilePath);
    return envFilePath;
};