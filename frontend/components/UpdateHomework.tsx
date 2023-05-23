import React, { useEffect, useState } from "react"
import { useConnect, useCanister } from "@connect2ic/react"
import { CreateUpdateHomeWork, HomeWork } from "@model/model"
import { _SERVICE } from "@ic/homework_diary/homework_diary.did";

export interface UpdateHomeworkProps {
  homeworkId: number;
  onCallback: (id: number) => void;
}

const UpdateHomework = (props: UpdateHomeworkProps) => {

  const { isConnected } = useConnect()
  const [homeworkDairy] = useCanister<_SERVICE>("homework_dairy", { mode: "anonymous" })
  const [title, setTitle] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [completed, setCompleted] = useState<boolean>()

  useEffect(() => {
    if (!props.homeworkId) {
      return
    }
    getHomework()
  }, [props.homeworkId])

  const getHomework = async () => {
    const result = await homeworkDairy.getHomework(props.homeworkId) as any
    const hm = result.ok as HomeWork;
    setTitle(hm.title)
    setDescription(hm.description)
    setCompleted(hm.completed)
  }

  const onUpdateHomework = async () => {
    let content: CreateUpdateHomeWork = {
      title: title,
      description: description,
      completed: completed,
    }
    await homeworkDairy.updateHomework(props.homeworkId, content)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onUpdateHomework();
    props.onCallback(undefined);
  }

  return (
    <div className="flex px-24 pt-9">
      {isConnected ? (
        <>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="inpTitle">Title</label>
              <input id="inpTitle" type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="You title homework" />
            </div>
            <div>
              <label htmlFor="inpDescription">Description</label>
              <input id="inpDescription" type="text" value={description} onChange={(event) => setDescription(event.target.value)} />
            </div>
            <div>
              <label htmlFor="inpCompleted">Is completed</label>
              <input id="inpCompleted" type="checkbox" defaultChecked={completed} onChange={(event) => setCompleted(event.target.checked)} />
            </div>
            <input className="connect-button" type="submit" value="Update Homework" />
          </form>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export { UpdateHomework }
