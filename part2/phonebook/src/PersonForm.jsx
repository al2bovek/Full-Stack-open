const PersonForm = ({ addNewEntry, newName, handleNewNameAdd, newPhone, handleNewPhoneAdd}) => {
    return (
      <form onSubmit={addNewEntry}>
        <div>
          <input placeholder="add name" value={newName} onChange={handleNewNameAdd} /> : Name.
        </div>
        <div>
          <input placeholder="add phone" value={newPhone} onChange={handleNewPhoneAdd} /> : Number.
        </div>
        <div>
          <button type="submit" className="add">Add</button>
        </div>
      </form>
    );
  };
  
  export default PersonForm;
  