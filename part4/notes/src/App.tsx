import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Note } from "./components/Note";
import notesService, { IPerson } from './services/Notes';

interface INote {
  id: number;
  content: string;
  important: boolean;
}

const App = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);

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
    notesService.remove(noteId).then(notes => setNotes(notes))
  }
  return (
    <>
      <ul>
        {notesToShow.map((note) =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} onDeleteClickBtn={() => onDeleteClickBtn(note.id)} />
        )}
      </ul>
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
