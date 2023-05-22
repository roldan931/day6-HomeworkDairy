import React, { useEffect, useState } from "react"
import { useCanister, useConnect } from "@connect2ic/react"
import { HomeWork } from "@model/model"
import { _SERVICE } from "@ic/homework_diary/homework_diary.did"
import { DeleteHomework } from "@component/DeleteHomework"
import { CheckHomework } from "@component/CheckHomework"

export interface HomeworkProps {
  sendHomeworkId: (id: number) => void;
}

const HomeworkDairy = (props: HomeworkProps) => {

  const { isConnected, principal } = useConnect()
  const [homeworkDairy] = useCanister<_SERVICE>("homework_dairy", { mode: "anonymous" })
  const [homeworks, setHomeworks] = useState<Array<HomeWork>>()

  const getAllHomework = async () => {
    const allHomework = await homeworkDairy.getAllHomework() as Array<HomeWork>
    setHomeworks(allHomework)
  }

  useEffect(() => {
    if (!homeworkDairy) {
      return
    }
    getAllHomework()
  }, [homeworkDairy])

  return (
    <div>
      <p>Wallet address: <span style={{ fontSize: "0.7em" }}>{isConnected ? principal : "-"}</span></p>
      <table>
        <tbody>
          {homeworks && homeworks.map(hm => (
            <tr key={hm.id}>
              <td>
                {hm.title}
              </td>
              <td>
                {hm.description}
              </td>
              <td>
                {hm.dueDate.toString()}
              </td>
              {
                hm.creator == principal ? (
                  <td>
                    <CheckHomework homeworkId={hm.id} completed={hm.completed} />
                  </td>
                ) : (
                  <></>
                )
              }
              {
                hm.creator == principal ? (
                  <td>
                    <DeleteHomework homeworkId={hm.id} />
                    <button className="connect-button" onClick={() => props.sendHomeworkId(hm.id)}>Update</button>
                  </td>
                ) : (
                  <></>
                )
              }
            </tr>
          ))}
        </tbody>
      </table >
    </div >
  )
}

export { HomeworkDairy }
