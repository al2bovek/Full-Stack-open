import Header from "./Header"
import Content from "./Content"
import Part from "./Part"
import Paragraph from "./Paragraph"
import { courses } from "./ConstCourse"


export default function Course() {
  const value = i => courses[i].parts.map(el => el.exercises).reduce((a, el) => a + el)
  const content = i => courses[i].parts.map((el, index) =>
        <Paragraph key={index} content={el.name} value={el.exercises} />
    )
    return (
        <>
            <Header header={courses[0].name} />
            <Content content={courses[1].name} />
            <Part content={content(1)} value={value(1)}/>
            <Content content={courses[2].name} />
            <Part content={content(2)} value={value(2)}/>
        </>
    )
}
