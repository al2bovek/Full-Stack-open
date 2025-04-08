const course = { name: 'Half Stack application development' }
const parts = [
  {
    name: 'Fundamentals of React',
    exercises: 10,
  },
  {
    name: 'Using props to pass data',
    exercises: 17,
  },
  {
    name: 'State of a component',
    exercises: 14,
  }
]
const Header = ({name}) => <h1>{name}</h1>
const Paragraph = ({name, exercises}) => <p>{name} {exercises}</p>
function Content() {
  return (
    <>
       {parts.map(part => (
        <Paragraph key={part.name} name={part.name} exercises={part.exercises} />
      ))}
    </>
  )
}
const total = parts.reduce((a, part) => a + part.exercises, 0)
const Total = () => <p>Number of exercises {total}</p>

function App() {
  return (
    <>
      <Header name={course.name} />
      <Content parts={parts}/>
      <Total />
    </>
  )
}

export default App
