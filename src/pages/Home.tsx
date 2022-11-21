import {useState} from 'react'
import HangmanDrawing from '../components/HangmanDrawing'
import HangmanWord from '../components/HangmanWord'
import Keyboard from '../components/Keyboard'
import words from "../data/wordList.json"


const Home = () => {
  const [wordToGuess,setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  })

  return (
    <div
    className="main"
    style={{
      maxWidth: "800px",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      margin: "-15px -250px",
      alignItems: "center",
    }}
    >
      <div style={{fontSize: "2rem",textAlign: "center"}}>Lose Win</div>
      <HangmanDrawing />
      <HangmanWord /> 
      <div className='keyboard' style={{alignSelf:"stretch"}}>
      <Keyboard />
      </div>
    </div>
  )
}

export default Home