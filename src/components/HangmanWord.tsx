

type HangmanWordProps = {
    guesssedLetters: string[],
    wordToGuess: string
    reveal?: boolean
}

const HangmanWord = ({guesssedLetters,wordToGuess,reveal=false}:HangmanWordProps) => {
  return (
    <div style={{
        display: "flex",
        gap: ".25em",
        fontSize: "5rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",
        marginLeft: "-70px",
        marginTop: "-15px"
    }}>
      {wordToGuess.split("").map((letter,index) => (
        <span style={{borderBottom: ".1em solid black"}} key={index}>
            <span style={{
                visibility: guesssedLetters.includes(letter) || reveal ? "visible" : "hidden",
                color: !guesssedLetters.includes(letter) && reveal ? "red" : "black",
            }}>{letter}</span>
        </span>
      ))}
    </div>
  )
}

export default HangmanWord
