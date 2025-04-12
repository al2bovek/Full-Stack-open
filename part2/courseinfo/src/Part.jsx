import Paragraph from "./Paragraph"

export default function Part({ content, value}) {
    return (
        <>
            {content}
            <b><Paragraph content={`total of ${value} exersises`}/></b>
        </>
    )
}