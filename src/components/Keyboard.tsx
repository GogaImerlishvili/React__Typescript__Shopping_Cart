

const KEYS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ]

type KeyboardProps = {
    disabled?: boolean,
    activeLetters: string[],
    inactiveLetters: string[],
    addGuessedLetter: (letter:string) => void


}

const Keyboard = ({activeLetters,inactiveLetters,addGuessedLetter,disabled=false}: KeyboardProps) => {
  return (
    <div className="keyboard" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(75px,1fr))",
        gap: ".5rem",
        marginLeft: "90%",
        marginTop: "-60%",
        minWidth: "80%",
        overflowX: "hidden"
    }}>
        {KEYS.map(key => {
            const isActive = activeLetters.includes(key)
            const isInactive = inactiveLetters.includes(key)
            return <button 
            disabled={isInactive || isActive || disabled} 
            onClick={() => addGuessedLetter(key)} className={`${'button'}${isActive ? "active button " : "" } ${isInactive ? "inactive" : ""}`} key={key}>{key}</button>
        })}
    </div>
  ) 
}

export default Keyboard
