const Persons = ({ persons, onDelete }) => {
  return (
    <ul>
      {persons.map((person, i) => (
        <li key={i}>
          {person.name} {person.phone}
          <button onClick={() => {
            if (window.confirm(`Delete ${person.name}?`)) {
              onDelete(person.id);
            }
          }}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
