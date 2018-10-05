import {State} from '@/store';

export type FirstArgument<T> = T extends (arg1: infer U, ...args: any[]) => any ? U : any;
export type SecondArgument<T> = T extends (arg1: State) => void ? undefined : (T extends (arg1: State, arg2: infer U) => void ? U : undefined)
