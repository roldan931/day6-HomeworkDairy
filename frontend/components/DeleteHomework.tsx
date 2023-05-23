import React from "react"
import { useCanister } from "@connect2ic/react"
import { _SERVICE } from "@ic/homework_diary/homework_diary.did"
import { TrashIcon } from "@heroicons/react/24/solid";

export interface DeleteHomeworkProps {
  homeworkId: number;
  onCallback: () => void;
}

const DeleteHomework = (props: DeleteHomeworkProps) => {
  const [homeworkDairy] = useCanister<_SERVICE>("homework_dairy", { mode: "anonymous" })

  const onDeleteHomework = async () => {
    await homeworkDairy.deleteHomework(props.homeworkId)
    props.onCallback()
  }

  return (
    <TrashIcon className="w-6 h-6" onClick={onDeleteHomework} />
  )
}

export { DeleteHomework }
