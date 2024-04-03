import axios from 'axios'; // Добавьте этот импорт
import { useEffect, useState } from 'react';

const Note = ({ note }: { note: string }) => {
  console.log(note);

  return (
    <>
      <p>{note}</p>
    </>
  );
};

function App() {
  const [notes, setNotes] = useState<string[]>([]); // Укажите тип как массив строк
  const [onChange, setOnChange] = useState<string>('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/notes')
      .then(response => {
        // Предполагается, что ответ содержит массив заметок
        setNotes(response.data);
      })
      .catch(error => {
        console.error('Ошибка при получении заметок:', error);
      });
  }, []);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOnChange(e.target.value);
  };

  return (
    <>
      <form>
        <input type="text" value={onChange} onChange={onChangeHandler} />
      </form>
      {notes.map((note, index) => (
        <Note key={index} note={note} />
      ))}
    </>
  );
}

export default App;
