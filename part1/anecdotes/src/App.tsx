import { useState } from 'react'

const Anecdotes = ({ anecdotes }: { anecdotes: Array<string> }) => {
  //создаем состояние selected = 0 
  let [selected, setSelected] = useState(0)
  //создаем состояние votes = [массив длинной в anecdotes заполенный нулями]
  let [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  //обработчик кликов NextBtn, если selected < длины anecdotes  при клике увеличиваем selected на 1, если selected > anecdotes сбрасываем selected в ноль 
  const onNextBtnClick = () => {
    if (selected < anecdotes.length - 1) {
      setSelected(selected + 1)
    } else setSelected(selected = 0)
  }
  //обработчик кликов Votes при клике делаем копию  текущего состояния votes , и добавляем в массиве голосов +1 к текущему выбраному элементу и сеттим новое состояние
  const onVoteBtnClick = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)

  }
  const maxVotesElements = Math.max(...votes)
  const indexOfMaxVotes = votes.indexOf(maxVotesElements);
  const anecdoteWithMaxVotes = anecdotes[indexOfMaxVotes];
  return (
    <>
      {/*показываем записи по индексу,при клике на кнопку увеличиваем индекс */}
      {anecdotes[selected]}
      <div>
        {/*показываем голоса соответсвующие индексу записи */}
        <button onClick={onVoteBtnClick}>has {votes[selected]} votes</button>
        <button onClick={onNextBtnClick}>next anecdote</button>
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        {anecdoteWithMaxVotes} has {maxVotesElements} votes
      </div>


    </>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  return (
    <div>
      <Anecdotes anecdotes={anecdotes} />
    </div>
  )
}

export default App