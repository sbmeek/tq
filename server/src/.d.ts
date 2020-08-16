/// <reference types="node" />

declare namespace Express {
    export interface Request {
        proc: { proc: string | undefined }
    }
    export interface Response {
        proc: { proc: string | undefined }
    }
}