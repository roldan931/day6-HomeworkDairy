import React, { useCallback, useState } from "react"
import logo from "./assets/dfinity.svg"
/*
 * Connect2ic provides essential utilities for IC app development
 */
import { createClient } from "@connect2ic/core"
import { defaultProviders } from "@connect2ic/core/providers"
import { ConnectButton, ConnectDialog, Connect2ICProvider } from "@connect2ic/react"
import "@connect2ic/core/style.css"
/*
 * Import canister definitions like this:
 */
import * as homework_diary from "@ic/homework_diary"
/*
 * Some examples to get you started
 */
import { CreationHomework } from "@component/CreationHomework"
import { UpdateHomework } from "@component/UpdateHomework"
import { HomeworkDairy } from "@component/HomeworkDairy"

function App() {
  const [homeworkId, setHomeworkId] = useState<number>()

  const sendHomeworkId = useCallback((id: number) => {
    setHomeworkId(id)
  }, [homeworkId]); // specify all useCallback dependencies

  return (
    <div className="">
      <div className="fixed top-0 right-0 p-1">
        <ConnectButton />
      </div>
      <ConnectDialog />

      <header className="flex flex-col justify-center text-center">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="text-3xl font-bold underline">
          Homework Dairy
        </p>
        <p> by <a href="https://github.com/roldan931/day6-HomeworkDairy">rroldan9612#6498</a></p>
      </header>

      <div className="examples">
        {
          homeworkId ? (
            <UpdateHomework homeworkId={homeworkId} onCallback={sendHomeworkId} />
          ) : (
            <CreationHomework />
          )
        }
        <HomeworkDairy sendHomeworkId={sendHomeworkId} />
      </div>
    </div>
  )
}

const client = createClient({
  canisters: {
    homework_dairy: homework_diary
  },
  providers: defaultProviders,
  globalProviderConfig: {
    whitelist: [homework_diary.canisterId],
    dev: import.meta.env.DEV,
  },
})

export default () => (
  <Connect2ICProvider client={client}>
    <App />
  </Connect2ICProvider>
)
