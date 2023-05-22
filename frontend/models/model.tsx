import { Time } from "@ic/day2/day2.did";

export interface HomeWork {
    id: number,
    title: string,
    creator: string,
    completed: boolean,
    dueDate: Time,
    description: string,
}

export interface CreateUpdateHomeWork {
    title: string,
    completed: boolean,
    description: string,
}