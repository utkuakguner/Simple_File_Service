import { useTranslation } from '@intlify/hono';

const genericMiddleware = () => {
    return async (c: any, next: Function) => {
        c.t = useTranslation(c);

        await next();
    };
};

export default genericMiddleware;
