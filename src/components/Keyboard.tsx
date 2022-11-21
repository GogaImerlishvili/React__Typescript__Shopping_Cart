

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



const Keyboard = () => {
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
            return <button className="button" key={key}>{key}</button>
        })}
    </div>
  )
}

export default Keyboard
