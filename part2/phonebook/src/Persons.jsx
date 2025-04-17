const Persons = ({ persons, onDelete }) => {
  return (
    <ul>
      {persons.map((person, i) => (
        <li key={i}>
           <button style={{margin:'0.2em', color:'red'}} onClick={() => {
            if (window.confirm(`Delete ${person.name}?`)) {
              onDelete(person.id);
            }
          }}>
            Delete it
          </button>
          <span style={{color:'transparent'}}>...</span>
          {person.name} {person.phone}
          <span style={{color:'transparent'}}>...</span>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
