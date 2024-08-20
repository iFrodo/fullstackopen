 const Note = ({ note, toggleImportance,onDeleteClickBtn }: { note: any, toggleImportance: any, onDeleteClickBtn:any }) => {
    const label = note.important ? 'make not important' : 'make important'
    return (
        <>
            <li className="note-title">{note.content}
                <button onClick={toggleImportance}>{label}</button>
                <button onClick={onDeleteClickBtn}>delete</button></li>

        </>
    )
}
export default Note