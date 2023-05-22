import React, { useEffect, useState } from "react"
import { useConnect, useCanister } from "@connect2ic/react"
import { CreateUpdateHomeWork, HomeWork } from "@model/model"
import { _SERVICE } from "@ic/day2/day2.did";

export interface UpdateHomeworkProps {
  homeworkId: number;
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
    const message = await homeworkDairy.getHomework(props.homeworkId) as HomeWork
    setTitle(message.title)
    setDescription(message.description)
    setCompleted(message.completed)
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
  }

  return (
    <div className="example">
      {isConnected ? (
        <>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="inpTitle">Title</label>
              <input id="inpTitle" type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="You title homework" />
            </div>
            <div>
              <label htmlFor="inpDescription">Description</label>
              <input id="inpDescription" type="text" onChange={(event) => setDescription(event.target.value)} />
            </div>
            <div>
              <label htmlFor="inpCompleted">Is completed</label>
              <input id="inpCompleted" type="checkbox" onChange={(event) => setCompleted(event.target.checked)} />
            </div>
            <input className="connect-button" type="submit" value="Creation Homework" />
          </form>
        </>
      ) : (
        <p className="example-disabled">Connect with a wallet to access this update homework</p>
      )}
    </div>
  )
}

export { UpdateHomework }
