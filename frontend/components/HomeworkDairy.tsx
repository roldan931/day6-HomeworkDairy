import React, { useCallback, useEffect, useState } from "react"
import { useCanister, useConnect } from "@connect2ic/react"
import { HomeWork } from "@model/model"
import { _SERVICE } from "@ic/homework_diary/homework_diary.did"
import { DeleteHomework } from "@component/DeleteHomework"
import { CheckHomework } from "@component/CheckHomework"
import { MagnifyingGlassIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import moment from 'moment';

export interface HomeworkProps {
  sendHomeworkId: (id: number) => void;
}

const HomeworkDairy = (props: HomeworkProps) => {

  const { isConnected, principal } = useConnect()
  const [homeworkDairy] = useCanister<_SERVICE>("homework_dairy", { mode: "anonymous" })
  const [homeworks, setHomeworks] = useState<Array<HomeWork>>()

  const getAllHomework = async () => {
    let allHomework = await homeworkDairy.getAllHomework() as Array<HomeWork>
    // allHomework = allHomework.filter(x => x.creator == principal);
    setHomeworks(allHomework)
  }

  const callback = useCallback(() => {
    getAllHomework()
  }, []);

  useEffect(() => {
    if (!homeworkDairy) {
      return
    }
    getAllHomework()
  }, [homeworkDairy, props.sendHomeworkId])


  return (
    <div>
      {
        isConnected ?
          (
            <div className="flex justify-center min-h-screen p-10">
              <div className="md:w-3/5 w-3/4 px-10 flex flex-col gap-2 p-5 bg-gray-800 text-white">
                <h1 className="py-5 text-lg"></h1>
                <div className="flex bg-gray-600 bg-opacity-20 border border-gray-200 rounded-md items-center">
                  <MagnifyingGlassIcon className="w-6 h-6" />
                  <input type="text" placeholder="Search homework" className="p-2 bg-transparent focus:outline-none" />
                </div>
                {homeworks && homeworks.map(hm => (
                  <div className="flex flex-col gap-3 mt-14" key={hm.id}>
                    <div className="flex flex-col gap-4 bg-gray-700 p-4">
                      <div className="flex justify justify-between">
                        <div className="flex gap-2 items-center">
                          <CheckHomework homeworkId={hm.id} completed={hm.completed} title={hm.title} onCallback={callback} />
                        </div>
                        <div className="flex p-1 gap-1 text-red-300">
                          <DeleteHomework homeworkId={hm.id} onCallback={callback} />
                        </div>
                      </div>
                      <div>
                        {hm.description}
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-200">{moment.unix(Number(hm.dueDate)).format("MM/DD/YYYY")}</span>
                        <button className="p-1 px-2 bg-gray-900 hover:bg-gray-950 border border-gray-950 bg-opacity-60" onClick={() => props.sendHomeworkId(hm.id)}>
                          <PencilSquareIcon className="w-6 h-6" /> Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center min-h-screen p-10">
              <div className="md:w-3/5 w-3/4 px-10 flex flex-col gap-2 p-5 bg-gray-800 text-white">
                <h1 className="py-5 text-lg">Connect with a IC to access your homework</h1>
              </div>
            </div>
          )
      }
    </div >
  )
}

export { HomeworkDairy }
