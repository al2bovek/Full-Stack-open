import { useState } from 'react'

const Header = ({ text }) => <h2>{text}</h2>
function Button({ name, onClick }) {
  return <button onClick={onClick}>{name}</button>
}
const ButtonsBlock = ({ onGood, onNeutral, onBad }) =>
  <div>
    <Button name={'good'} onClick={onGood} />
    <Button name={'neutral'} onClick={onNeutral} />
    <Button name={'bad'} onClick={onBad} />
  </div>
const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
function Statistics({ good, neutral, bad }) {
  const all = good + neutral + bad
  const average = ((good - bad) / all).toFixed(1)
  const positive = ((good * 100) / (all)).toFixed(1)
  return (
    <table>
      <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={all} />
          <StatisticLine text='average' value={average} />
          <StatisticLine text='positive' value={positive} />

      </tbody>
    </table>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Header text="give feedback" />
      <ButtonsBlock
        onGood={() => setGood(good + 1)}
        onNeutral={() => setNeutral(neutral + 1)}
        onBad={() => setBad(bad + 1)}
      />
      <Header text="statistics" />
      {good || neutral || bad ? <Statistics good={good} neutral={neutral} bad={bad} /> : <p>No feedback given.</p>}
    </>
  )
}

export default App
