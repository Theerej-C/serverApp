import { Status } from "../enum/status.enum";

export interface Server {

    id: number;
    ipAddress: string;
    memory: string;
    name: string;
    type: string
    status: Status;
}