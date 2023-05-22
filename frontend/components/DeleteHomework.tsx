import React from "react"
import { useCanister } from "@connect2ic/react"
import { _SERVICE } from "@ic/day2/day2.did"

export interface DeleteHomeworkProps {
  homeworkId: number;
}

const DeleteHomework = (props: DeleteHomeworkProps) => {
  const [homeworkDairy] = useCanister<_SERVICE>("homework_dairy", { mode: "anonymous" })

  const onDeleteHomework = async () => {
    await homeworkDairy.deleteHomework(props.homeworkId)
  }

  return (
    <button className="connect-button" onClick={onDeleteHomework}>Delete Homework</button>
  )
}

export { DeleteHomework }
