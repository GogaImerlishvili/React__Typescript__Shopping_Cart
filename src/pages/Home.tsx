import {useCallback, useEffect, useState} from 'react'
import HangmanDrawing from '../components/HangmanDrawing'
import HangmanWord from '../components/HangmanWord'
import Keyboard from '../components/Keyboard'
import words from "../data/wordList.json"


const getWord = () => {
  return words[Math.floor(Math.random() * words.length)]
}

const Home = () => {
  const [wordToGuess,setWordToGuess] = useState(getWord)

  const [guesssedLetters,setGuessedLetters] = useState<string[]>([])

  const incorrectLetters = guesssedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )

  const isLoser = incorrectLetters.length > 6
  const isWinner = wordToGuess.split("").every(letter => guesssedLetters.includes(letter))

  const addGuessedLetter =useCallback((letter:string) => {
    if(guesssedLetters.includes(letter) || isLoser || isWinner) return

    setGuessedLetters(currentLetters => [...currentLetters,letter])
  },[guesssedLetters,isLoser,isWinner])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if(!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener("keypress",handler)

    return () => {
      document.removeEventListener("keypress",handler)
    }

  },[guesssedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if(key !== "Enter") return

      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }
      document.addEventListener("keypress",handler)

      return () => {
        document.removeEventListener("keypress",handler)
      }
   
  },[])
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
      <div className="title1" style={{fontSize: "2rem",textAlign: "center",marginLeft: "15%",marginTop: "15px",color:"blue"}}>
        {isWinner && "Winner! - Press Enter to try again"}
        {isLoser && "Nice Try - Press Enter to try again"}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord reveal={isLoser} guesssedLetters={guesssedLetters} wordToGuess={wordToGuess} /> 
      <div className='keyboard' style={{alignSelf:"stretch"}}>
      <Keyboard disabled={isLoser || isWinner} activeLetters={guesssedLetters.filter(letter => 
        wordToGuess.includes(letter)
        )}
        inactiveLetters={incorrectLetters}
        addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  )
}

export default Home