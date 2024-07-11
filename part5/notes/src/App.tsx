import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Note } from "./components/Note";
import notesService, { IPerson } from './services/Notes';
import loginService from './services/Login';

interface INote {
  id: number;
  content: string;
  important: boolean;
}

const LoginForm = ({ handleLogin, login, handleLoginChange, password, handlePasswordChange }) => (

  <form onSubmit={handleLogin}>
    <div>
      login
      <input
        type="text"
        value={login}
        name="login"
        onChange={handleLoginChange}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
      />
    </div>
    <button type="submit">login</button>
  </form>
)
const App = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null)
  const [error, setErrorMessage] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)


  useEffect(() => {
    console.log('effect');
    notesService.getAll()
      .then((initialNotes: any) => {
        setNotes(initialNotes);
      });
  }, []);


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      notesService.setToken(user.token)
    }
  }, [])

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
        console.log(user)
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      });
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        login, password,
      })

      setUser(user)
      notesService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
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


  const noteForm = () => (
    <form onSubmit={handlerOnSubmitClick}>
      <input
        value={newNote}
        onChange={onChangeInputValue}
      />
      <button type="submit">save</button>
    </form>
  )



  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm handleLogin={handleLogin} login={login} handleLoginChange={({ target }) => setLogin(target.value)} password={password} handlePasswordChange={({ target }) => setPassword(target.value)} />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <>
      {user === null ?
        loginForm() :
        <div>
          <h2 >Notes</h2>
          <p>{user.login} logged-in <button onClick={() => { localStorage.clear(), setUser(null) }}>logout</button></p>
          {noteForm()}
          <ul>
            {notesToShow.map((note) =>
              <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} onDeleteClickBtn={() => onDeleteClickBtn(note.id)} />
            )}
          </ul>
        </div>
      }

      {/* {user === null && loginForm()}
      {user !== null && noteForm()} */}
    </>
  );
};

export default App;
