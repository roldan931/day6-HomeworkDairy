import React, { useState } from "react"
import { useConnect, useCanister } from "@connect2ic/react"
import { CreateUpdateHomeWork, HomeWork } from "@model/model"
import { _SERVICE } from "@ic/homework_diary/homework_diary.did"

const CreationHomework = () => {

  const { isConnected } = useConnect()
  const [homeworkDairy] = useCanister<_SERVICE>("homework_dairy", { mode: "anonymous" })
  const [title, setTitle] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [completed, setCompleted] = useState<boolean>()

  const onCreationHomework = async () => {
    let content: CreateUpdateHomeWork = {
      title: title,
      description: description,
      completed: completed,
    }
    await homeworkDairy.addHomework(content)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onCreationHomework();
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
        <p className="example-disabled">Connect with a wallet to access this creation homework</p>
      )}
    </div>
  )
}

export { CreationHomework }
