import React,{useMemo} from 'react';
import { Routes,Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';
import Store from './pages/Store';
import About from './pages/About';
import Navbar from './components/Navbar';
import Notes from './pages/Notes';
import { ShoppingCartProvider } from './context/ShppingCartContext';
import "./App.css"
import { useLocalStorage } from './hooks/useLocalStorage';
import {v4 as uuidV4} from "uuid"

export type Note = {
  id:string
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

export type Tag ={
  id: string
  label: string
}

function App() {
  const [notes,setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags,setTags] = useLocalStorage<Tag[]>("TAGS",[])

  const noteWithTags = useMemo(() => {
    return notes.map(note => {
      return {...note,tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  }, [notes,tags])

  function onCreateNote({tags,...data}: NoteData){
    setNotes(prevNotes => {
      return [...prevNotes, {...data, id: uuidV4(),tagIds: tags.map(tag => tag.id)},]
    })
  }

  function addTag(tag: Tag){
    setTags(prev => [...prev,tag])
  }
  return (
    <ShoppingCartProvider>
    <Navbar />
    <Container className="mb-4">
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/store' element={<Store />} />
      <Route path='/about' element={<About availableTags={tags} notes={noteWithTags } />} />
      <Route path="/notes" element={<Notes onSubmit={onCreateNote}
      onAddTag={addTag} availableTags={tags} />} />
    </Routes>
    </Container>
    </ShoppingCartProvider>
  )
}


export default App;
