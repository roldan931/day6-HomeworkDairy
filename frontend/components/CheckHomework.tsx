import React from "react"
import { useCanister } from "@connect2ic/react"
import { _SERVICE } from "@ic/day2/day2.did"

export interface CheckHomeworkProps {
    homeworkId: number;
    completed: boolean;
}

const CheckHomework = (props: CheckHomeworkProps) => {
    const [homeworkDairy] = useCanister<_SERVICE>("homework_dairy", { mode: "anonymous" })

    const onCheck = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            await homeworkDairy.markAsCompleted(props.homeworkId)
        }
    }

    return (
        <>
            <label htmlFor={'com' + props.homeworkId}>Completado</label>
            <input id={'com' + props.homeworkId} type="checkbox" checked={props.completed} onChange={onCheck} />
        </>
    )
}

export { CheckHomework }
