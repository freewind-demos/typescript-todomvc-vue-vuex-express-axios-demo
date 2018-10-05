export type FirstArgument<T> = T extends (arg1: infer U, ...args: any[]) => any
    ? U
    : any

export type SecondArgument<T> = T extends (arg1: any) => any
    ? undefined
    : (T extends (arg1: any, arg2: infer U) => any ? U : undefined)
