export const Note = ({ note, toggleImportance,onDeleteClickBtn }: { note: any, toggleImportance: any, onDeleteClickBtn:any }) => {
    const label = note.important ? 'make not important' : 'make important'
    return (
        <>
            <li >{note.content}
                <button onClick={toggleImportance}>{label}</button>
                <button onClick={onDeleteClickBtn}>delete</button></li>

        </>
    )
}