import React from "react"
import Confetti from "react-confetti"




export default function EnterQuiz(props){

    const [data,setData]=React.useState([]);
    const [userSelection,setUserSelection] = React.useState({});
    const [checkAnswer,setcheckAnswer] = React.useState(false)


    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); 
            [array[i], array[j]] = [array[j], array[i]]; 
        }
        return array;
    }

        React.useEffect(
           ()=>{ 
            async function fetchData(){
            const res = await fetch('https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=multiple')
            const data = await res.json()
            const dataAnswersShuffled = data.results.map((dataElement)=>{
                return {...dataElement,shuffledAnswers: shuffleArray([...dataElement.incorrect_answers,dataElement.correct_answer])}
            })
            setData(dataAnswersShuffled)
               }
               fetchData();
            }
            ,[]
        )
       
        let count = 0;

    function selectedAnswer(index,answer){
        setUserSelection(prevUserSelection => {
            return{...prevUserSelection,[index]:answer}})

        console.log(userSelection)
    }

    
    
    


    function display(){
        if(data){
        const qandA = data.map((dataElement,index)=>{
            const correctAnswer={[index]:dataElement.correct_answer}
           
            return(
                
                <div className="questionAndAnswers">
                    <div className="question">{dataElement.question}</div>
                    <div className="answers">
                        {dataElement.shuffledAnswers.map((answer)=>{
                            let isSelected = userSelection[index]===answer;
                            let isCorrect = correctAnswer[index]===answer;
                            let name,correctColor
                            if(checkAnswer){
                                 name = isSelected? (isCorrect? "correct" :"incorrect") : ""
                            }
                            else{
                                 name = isSelected? "selected" : ""
                            }
                            if(name==="correct"){
                                count=count +1
                            }
                            if(checkAnswer && answer===correctAnswer[index]){
                                correctColor="#94D7A2"
                            }

                       return <div className={`answer ${name}`} style={{backgroundColor:correctColor}} onClick={()=>!checkAnswer && selectedAnswer(index,answer)}>

                                {answer}
                                </div>
                                
                            }
                                
                                )}
                    </div>
                    <hr></hr>
                </div>
                
                
               
                )})
        return qandA
    }}
        

    return(
    <div className="container">
        <div className="quiz-container">{display()}</div>
        {checkAnswer && <div><h2 className="score">You scored {count}/{data.length} correct answers</h2></div>}
        <div class="play-again" onClick={()=>{
            if(checkAnswer){
               return props.playAgain()
            }
            else{

            return setcheckAnswer(true)}}}>{checkAnswer? "Play again" : "Check answers"}</div> 
            {checkAnswer && count>=3 && <Confetti />}
    </div>)
}