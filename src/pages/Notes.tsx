import "bootstrap/dist/css/bootstrap.min.css"
import { NoteData } from "../App"
import NoteForm from "../components/NoteForm"

type NewNoteProps = {
    onSubmit: (data: NoteData) => void
}

const Notes = ({onSubmit}: NewNoteProps) => {
  return (
  <>
  <h1 className="mb-4">New Note</h1>
  <NoteForm onSubmit={onSubmit}/>
  </>
  )
}

export default Notes
