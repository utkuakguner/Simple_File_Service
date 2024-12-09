import { Context, Router } from 'utils/constants/types';
import { createWriteStream, existsSync, mkdirSync } from 'fs';

import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import { createFile } from 'repository/file';

const fileController = (r: Router, p: PrismaClient) => {
    const router = new Hono();

    router.post('/', async (c: Context) => {
        const body = await c.req.parseBody();

        const file = body['file'];

        const directory = `${process.env.PWD}/src/uploads`;

        const extension = file.name.split('.').pop();

        const fileName = `${String(Date.now())}.${extension}`;

        const arrayBuffer = await file.arrayBuffer();

        const buffer = Buffer.from(arrayBuffer);

        if (!existsSync(directory)) mkdirSync(directory);

        try {
            createWriteStream(`${directory}/${fileName}`).write(buffer);
        } catch (err) {
            console.error(err);
        }

        await createFile(c, p, {
            fileName: file.name,
            localFileName: fileName,
        });

        return c.json({
            data: fileName,
        });
    });

    r.route('/file', router);
};

export default fileController;
