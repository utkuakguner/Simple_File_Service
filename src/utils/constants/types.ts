import { BlankEnv, BlankSchema } from 'hono/types';

import { Hono } from 'hono';

export type Router = Hono<BlankEnv, BlankSchema, '/'>;

export interface AnyMap {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export type Context = AnyMap;

export interface StringMap {
    [key: string]: string;
}
