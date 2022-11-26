import "bootstrap/dist/css/bootstrap.min.css"
import { NoteData,Tag } from "../App"
import NoteForm from "../components/NoteForm"

type NewNoteProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

const Notes = ({onSubmit,availableTags,onAddTag}: NewNoteProps) => {
  return (
  <>
  <h1 className="mb-4">New Note</h1>
  <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
  </>
  )
}

export default Notes
