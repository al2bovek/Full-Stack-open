import { useState } from 'react'
import getRandomNumber from './random'
import Button from './Button'
import Anecdote from './Anecdote'

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

  const [selected, setSelected] = useState(getRandomNumber(0, anecdotes.length - 1))
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  function onSelected() {
    return setSelected(getRandomNumber(0, anecdotes.length - 1))
  }

  function onVoted() {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1
    setVotes(updatedVotes)
  }
  const maxVotes = votes.indexOf(Math.max(...votes))

  return (
    <>
      <Anecdote content={'Anecdote of the day'} text={anecdotes[selected]} vote={votes[selected]} />
      <Button text={'vote'} onClick={onVoted} />
      <Button text={'next anecdote'} onClick={onSelected} />
      <Anecdote content={'Anecdote with most votes'} text={anecdotes[maxVotes]} vote={votes[maxVotes]} />
    </>
  )
}

export default App