import {Prisma} from "~/generated/prisma";
import Boolean = Prisma.Boolean;

export interface Task {
    id: number;
    title: string;
    created: Date;
    deleted: Boolean;
    percentage: number;
}
