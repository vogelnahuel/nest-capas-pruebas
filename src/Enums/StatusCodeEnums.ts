type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

enum StatusCodeEnums {
    EMAIL_DUPLICATED = 10001,

    USER_NOT_FOUND = 10010,
}

const StatusCodeExceptionText: EnumDictionary<StatusCodeEnums, string> = {
    [StatusCodeEnums.EMAIL_DUPLICATED]: 'EMAIL_DUPLICATED',
    [StatusCodeEnums.USER_NOT_FOUND]: 'USER_NOT_FOUND',
};

export { StatusCodeEnums, StatusCodeExceptionText };
