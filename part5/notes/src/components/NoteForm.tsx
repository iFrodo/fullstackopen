const NoteForm = ({handlerOnSubmitClick,newNote,onChangeInputValue}) => (
    <form onSubmit={handlerOnSubmitClick}>
      <input
        value={newNote}
        onChange={onChangeInputValue}
      />
      <button type="submit">save</button>
    </form>
  )

  export default NoteForm;