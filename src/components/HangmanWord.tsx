

const HangmanWord = () => {
    const word ="test"
    const guessedLetters = ["t","e", "g"]
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
      {word.split("").map((letter,index) => (
        <span style={{borderBottom: ".1em solid black"}} key={index}>
            <span style={{
                visibility: guessedLetters.includes(letter) ? "visible" : "hidden"
            }}>{letter}</span>
        </span>
      ))}
    </div>
  )
}

export default HangmanWord
