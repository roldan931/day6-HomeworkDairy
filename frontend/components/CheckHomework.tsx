import React from "react"
import { useCanister } from "@connect2ic/react"
import { _SERVICE } from "@ic/homework_diary/homework_diary.did"

export interface CheckHomeworkProps {
    homeworkId: number;
    completed: boolean;
    title: string;
    onCallback: () => void;
}

const CheckHomework = (props: CheckHomeworkProps) => {
    const [homeworkDairy] = useCanister<_SERVICE>("homework_dairy", { mode: "anonymous" })

    const onCheck = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            await homeworkDairy.markAsCompleted(props.homeworkId)
            props.onCallback();
        }
    }

    return (
        <>
            <input id={'com' + props.homeworkId} type="checkbox" checked={props.completed} onChange={onCheck} />
            <label htmlFor={'com' + props.homeworkId} className="text-xl">{props.title}</label>
        </>
    )
}

export { CheckHomework }
