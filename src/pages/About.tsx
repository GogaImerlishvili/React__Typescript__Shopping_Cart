import {useState} from "react"
import Select, { SelectOptions } from "../components/Select"

const options = [
  {label: "First",value: 1},
  {label: "Second", value:2 },
  {label: "Third", value:3 },
  {label: "Fourth", value:4 },
  {label: "Fifth", value:5 },

]

const About = () => {
  const [value1,setValue1] = useState<SelectOptions[]>([options[0]])
  const [value2,setValue2] = useState<SelectOptions | undefined>(options[0])

  return (
    <>
      <Select multiple options={options} value={value1} onChange={o => setValue1(o)} />
      <br />
      <Select  options={options} value={value2} onChange={o => setValue2(o)} />
    </>
  )
}

export default About;