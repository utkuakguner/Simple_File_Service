import 'colors';

import { PrismaClient } from '@prisma/client';
import { createFile } from 'repository/file';
import fs from 'fs/promises';
import path from 'path';

const main = async () => {
    const p = new PrismaClient();

    const sourceDir = `${process.env.PWD}/src/local`;

    const destDir = `${process.env.PWD}/src/uploads`;

    const entities: Array<{ fileName: string; localFileName: string }> = [];

    try {
        await fs.mkdir(destDir, { recursive: true });
    } catch (err:any) {
        console.error(`Failed to create destination directory: ${err.message}`);
        return;
    }

    try {
        const files = await fs.readdir(sourceDir);

        await Promise.all(
            files.map(async (file, index) => {
                const sourceFile = path.join(sourceDir, file);

                const newFileName = `${Date.now()}${index}${path.extname(
                    file
                )}`;

                const destFile = path.join(destDir, newFileName);

                entities.push({
                    fileName: file,
                    localFileName: newFileName,
                });

                await fs.copyFile(sourceFile, destFile);

                console.log(`Copied ${file} to ${newFileName}`);
            })
        );
    } catch (err: any) {
        console.error(`Failed to process files: ${err.message}`);
        return;
    }

    try {
        await Promise.all(
            entities.map(({ fileName, localFileName }) =>
                createFile(p, { fileName, localFileName })
            )
        );

        console.log('\nLocal files uploaded'.green);
    } catch (err: any) {
        console.error(`Failed to save metadata: ${err.message}`);
    } finally {
        await p.$disconnect();
    }
};

main();
