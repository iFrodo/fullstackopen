import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Note } from "./components/Note";
import notesService, { IPerson } from './services/Notes';
import loginService from './services/Login';

interface INote {
  id: number;
  content: string;
  important: boolean;
}

const App = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null)
  const [error, setErrorMessage] = useState('')

  useEffect(() => {
    console.log('effect');
    notesService.getAll()
      .then((initialNotes: any) => {
        setNotes(initialNotes);
      });
  }, []);

  console.log('render', notes.length, 'notes');

  const notesToShow = showAll ? notes : notes.filter(note => note.important);
  const handlerOnSubmitClick = (e: FormEvent) => {
    e.preventDefault();
    const newObj: IPerson = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    notesService
      .create(newObj)
      .then((returnedNote: any) => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      });
    console.log(notes);
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        login, password,
      })
      setUser(user)
      setLogin('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setNewNote(e.target.value);
  };

  const toggleImportanceOf = (id: number) => {
    const note = notes.find(n => n.id === id);
    if (note) {
      const changedNote = { ...note, important: !note.important };

      notesService.update(id, changedNote)
        .then((returnedNote: any) => {
          setNotes(notes.map(note => note.id !== id ? note : returnedNote));
        })
        .catch((error: Error) => {
          alert(`the note '${note.content}' was already deleted from server`);
          setNotes(notes.filter(n => n.id !== id));
          console.log(error);
        });
    }
  };
  const onDeleteClickBtn = (noteId: any) => {
    notesService.remove(noteId)
    setNotes(notes.filter(el => el.id !== noteId))
  }
  return (
    <>
      <ul>
        {notesToShow.map((note) =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} onDeleteClickBtn={() => onDeleteClickBtn(note.id)} />
        )}
      </ul>



      <form onSubmit={handleLogin}>
        <h2>Authorization</h2>
        <div>login'''''''''<input type="text" value={login} onChange={({ target }) => setLogin(target.value)} /></div>
        <div>password<input type="password" value={password} onChange={({ target }) => setPassword(target.value)} /></div>
        <button type="submit">login</button>
      </form>




      <form onSubmit={handlerOnSubmitClick}>
        <input value={newNote} onChange={onChangeInputValue} />
        <button type="submit">save</button>
      </form>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
    </>
  );
};

export default App;
