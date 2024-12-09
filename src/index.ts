import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import controller from 'controller';

const app = new Hono();

const prisma = new PrismaClient();

controller(app, prisma);

export default {
    port: process.env.PORT,
    fetch: app.fetch,
};
