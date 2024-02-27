import React from "react"
import EnterQuiz from "./EnterQuiz"



export default function App(){
  const [enterQuiz, setEnterQuiz] = React.useState(false)
  

function playAgain(){
  setEnterQuiz(false)
}

  if(enterQuiz){
    return <EnterQuiz playAgain={playAgain}/>
  }

  return(
    <div className="welcomePage">
      <h1>Quizzical</h1>
      <p>Test your knowledge about animals by completing this Quizzical</p>
      <button onClick={()=>setEnterQuiz(true)}>Start quiz</button>
    </div>
  )
}