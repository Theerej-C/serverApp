import { Server } from "./server";

export interface CustomResponse {

    timeStamp: Date;
    statusCode: number;
    status: string;
    message: string;
    reason: string;
    data: { servers?: Server[], server?: Server };

}