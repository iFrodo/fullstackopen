export const Part = ({ part }: { part: String }) => {
    console.log(typeof (part))
    return (
        <div key={part.id}>{part.name} {part.exercises}</div>
    )
}
