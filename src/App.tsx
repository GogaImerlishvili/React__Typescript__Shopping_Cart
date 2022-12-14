import React,{useMemo,useEffect} from 'react';
import { Routes,Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';
import Store from './pages/Store';
import About from './pages/About';
import Navbar from './components/Navbar';
import Notes from './pages/Notes';
import Register from './pages/Register';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import { ShoppingCartProvider } from './context/ShppingCartContext';
import "./App.css"
import { useLocalStorage } from './hooks/useLocalStorage';
import {v4 as uuidV4} from "uuid"
import {ToastContainer} from "react-toastify"
import { useAppDispatch } from './hooks/store';
import { setUser } from './features/authSlice';
import PrivateRoute from './components/PrivateRoute';

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
  const dispatch = useAppDispatch()
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  useEffect(() =>{
dispatch(setUser(user))
  },[])

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
      <ToastContainer />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/store' element={<Store />} />
      <Route path='/mark' element={<About availableTags={tags} notes={noteWithTags } />} />
      <Route path="/notes" element={<Notes onSubmit={onCreateNote}
      onAddTag={addTag} availableTags={tags} />} />
      <Route path="/register" element={<Login />} />
      <Route path="/dashboard" element={<PrivateRoute>
        <Dashboard />
      </PrivateRoute>} />
    </Routes>
    </Container>
    </ShoppingCartProvider>
  )
}


export default App;
