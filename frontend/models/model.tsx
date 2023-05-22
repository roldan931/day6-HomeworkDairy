import { Time } from "@ic/homework_diary/homework_diary.did";

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