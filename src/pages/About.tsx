import {useState,useMemo} from "react"
import Select, { SelectOptions } from "../components/Select"
import { Row,Col,Stack, Button,Form, Card,Badge } from "react-bootstrap"
import { Link } from "react-router-dom"
import ReactSelect from "react-select"
import { Tag,Note } from "../App"
import styles from "./about.module.css";


const options = [
  {label: "First",value: 1},
  {label: "Second", value:2 },
  {label: "Third", value:3 },
  {label: "Fourth", value:4 },
  {label: "Fifth", value:5 },
  {label: "the sixth", value:6 },
  {label: "the seventh", value:7 },
  {label: "the eighth", value:8 },
  {label: "ninth", value:9 },
  {label: "tenth", value:10 },
]

type SimplifiedNote = {
  tags: Tag[]
  title: string
  id: string
}

type NoteListProps = {
  availableTags: Tag[]
  notes: SimplifiedNote[]
}

const About = ({availableTags,notes}: NoteListProps) => {
  const [selectedTags,setSelectedTags] = useState<Tag[]>([])
  const [title,setTitle] = useState("")
  // const [value1,setValue1] = useState<SelectOptions[]>([options[0]])
  // const [value2,setValue2] = useState<SelectOptions | undefined>(options[0])


const filteredNotes = useMemo(() => {
  return notes.filter(note => {
    return (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) && (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
  })

},[title,selectedTags,notes])
  return (
    <>
      {/* <Select multiple options={options} value={value1} onChange={o => setValue1(o)} /> */}
      {/* <Select  options={options} value={value2} onChange={o => setValue2(o)} /> */}
      <Row className="align-items-center mb-4">
    <Col><h1>Marked</h1></Col>
    <Col xs="auto">
    <Stack direction="horizontal" gap={2}>
<Link to="/new">
  <Button variant="primary">Create</Button>
</Link>
<Button variant="outline-secondary">Edit tags</Button>
    </Stack>
    </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={title}
            onChange={e => setTitle(e.target.value)} />
          </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId="tags">
                <Form.Label>Tags</Form.Label>
                <ReactSelect
                value={selectedTags.map(tag => {
                    return {label: tag.label,value: tag.id}
                })}
                options={availableTags.map(tag => {
                    return {label: tag.label,value: tag.id}
                })}
                onChange={tags => {
                    setSelectedTags(tags.map(tag => {
                        return {label: tag.label,id:tag.value}
                    }))
                }}
                isMulti/>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map(note => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
    </>
  )
}

function NoteCard({id,title,tags}: SimplifiedNote){
  return <Card  className={`h-100 text-reset text-decoration-none ${styles.card}`}>
    <Card.Body>
    <Stack gap={2} className="align-items-center justify-content-center h-100">
      <span className="fs-5">{title}</span>
      {tags.length > 0 && (
        <Stack gap={1} direction="horizontal" className="justify-content-center flex-wrap"> 
        {tags.map(tag => (
          <Badge className="text-truncate" key={tag.id}>
            {tag.label}
          </Badge>
        ))}
        </Stack>
      )}
    </Stack>
    </Card.Body>
  </Card>
}

export default About;