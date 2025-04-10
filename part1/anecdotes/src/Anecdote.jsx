import Header from './Header'
import Vote from './Vote'

function Anecdote({text, content, vote = 0}) {
    
    return (
    <>
    <Header  text={content}/>
    <p>{text}</p>
    < Vote vote={vote} />
    </>
)
}
export default Anecdote