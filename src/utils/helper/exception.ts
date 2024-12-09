import { HTTPException } from 'hono/http-exception';

export const throwBadRequest = (message = 'Bad request') => {
    throw new HTTPException(400, { message });
};

export const throwUnauthorized = (message = 'Unauthorized') => {
    throw new HTTPException(401, { message });
};

export const throwForbidden = (message = 'Forbidden') => {
    throw new HTTPException(403, { message });
};

export const throwNotFound = (message = 'Not found') => {
    throw new HTTPException(404, { message });
};

export const throwRequestTimeout = (message = 'Request timeout') => {
    throw new HTTPException(408, { message });
};

export const throwConflict = (message = 'Conflict') => {
    throw new HTTPException(409, { message });
};

export const throwInternalServerError = (message = 'Internal server error') => {
    throw new HTTPException(500, { message });
};
