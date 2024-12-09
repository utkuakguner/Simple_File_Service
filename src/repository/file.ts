import { Context } from 'utils/constants/types';
import { PrismaClient } from '@prisma/client';
import { throwInternalServerError } from 'utils/helper/exception';

interface FileDto {
    fileName?: string;
    localFileName?: string;
}

export const createFile = async (
    p: PrismaClient,
    { fileName, localFileName }: FileDto
) => {
    if (!fileName || !localFileName) throwInternalServerError();

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
    p: PrismaClient,
    id: number,
    { fileName, localFileName }: FileDto
) => {
    if (!fileName || !localFileName) throwInternalServerError();

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
    p: PrismaClient,
    id: number
) => {
    if (!id) throwInternalServerError();

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
