import { Context } from 'utils/constants/types';
import { defineI18nMiddleware } from '@intlify/hono';
import enTranslation from 'static/locales/en/translation.json';

const localizationMiddleware = defineI18nMiddleware({
    locale: (c: Context) => c.req.query('lang') || 'en',
    messages: {
        en: enTranslation,
    },
});

export default localizationMiddleware;
