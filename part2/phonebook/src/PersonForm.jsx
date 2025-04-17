const PersonForm = ({ addNewEntry, newName, handleNewNameAdd, newPhone, handleNewPhoneAdd}) => {
    return (
      <form onSubmit={addNewEntry}>
        <div>
          Name: <input value={newName} onChange={handleNewNameAdd} />
        </div>
        <div>
          Number: <input value={newPhone} onChange={handleNewPhoneAdd} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    );
  };
  
  export default PersonForm;
  