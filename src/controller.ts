import { Context, Router } from 'utils/constants/types';

import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import { cors } from 'hono/cors';
import fileController from 'controller/file';
import { serveStatic } from 'hono/bun';

const controller = (app: Router, prisma: PrismaClient) => {
    const mainRouter = new Hono();

    mainRouter.use('*', cors());

    mainRouter.get('/ping', async (c: Context) => c.text('Service online'));

    fileController(mainRouter, prisma);

    app.use('/uploads/*', serveStatic({ root: `./src` }));

    app.route('/api', mainRouter);
};

export default controller;
