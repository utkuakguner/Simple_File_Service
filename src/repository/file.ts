import { Context } from 'utils/constants/types';
import { PrismaClient } from '@prisma/client';
import { throwInternalServerError } from 'utils/helper/exception';

interface FileDto {
    fileName?: string;
    localFileName?: string;
}

export const createFile = async (
    c: Context,
    p: PrismaClient,
    { fileName, localFileName }: FileDto
) => {
    if (!fileName) throwInternalServerError(c.t('failedToCreateFile'));

    try {
        const result = await p.file.create({
            data: {
                fileName,
                localFileName,
            },
        });

        return result;
    } catch (e: any) {
        return null;
    }
};

export const updateFileById = async (
    c: Context,
    p: PrismaClient,
    id: number,
    { fileName, localFileName }: FileDto
) => {
    if (!fileName) throwInternalServerError(c.t('failedToUpdateFile'));

    try {
        const result = await p.file.update({
            where: {
                id,
            },
            data: {
                fileName,
                localFileName,
            },
        });

        return result;
    } catch (e: any) {
        return null;
    }
};

export const deleteFileById = async (
    c: Context,
    p: PrismaClient,
    id: number
) => {
    if (!id) throwInternalServerError(c.t('failedToDeleteFile'));

    try {
        const data = await p.file.delete({
            where: {
                id,
            },
        });

        return data;
    } catch (e: any) {
        return null;
    }
};
