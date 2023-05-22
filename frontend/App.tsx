import React, { useState } from "react"
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
import * as homework_diary from "../.dfx/local/canisters/homework_diary"
/*
 * Some examples to get you started
 */
import { CreationHomework } from "@component/CreationHomework"
import { UpdateHomework } from "@component/UpdateHomework"
import { HomeworkDairy } from "@component/HomeworkDairy"

function App() {
  const [homeworkId, setHomeworkId] = useState<number>()

  const sendHomeworkId = (id: number) => {
    setHomeworkId(id)
  }

  return (
    <div className="App">
      <div className="auth-section">
        <ConnectButton />
      </div>
      <ConnectDialog />

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="slogan">
          React+TypeScript Template
        </p>
        <p className="twitter">by <a href="https://twitter.com/miamaruq">@miamaruq</a></p>
      </header>

      <p className="examples-title">
        Examples
      </p>
      <div className="examples">
        {
          homeworkId ? (
            <UpdateHomework homeworkId={homeworkId} />
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
