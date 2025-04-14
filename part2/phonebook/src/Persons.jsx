const Persons = ({ persons }) => {
    return (
      <ul>
        {persons.map((person, i) => (
          <li key={i}>
            {person.name} {person.phone}
          </li>
        ))}
      </ul>
    );
  };
  
  export default Persons;
  