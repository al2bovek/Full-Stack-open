const SearchBar = ({ handleSearch }) => {
    return (
      <input
        type="text"
        placeholder="Search for a country..."
        onChange={(e) => handleSearch(e.target.value)}
      />
    );
  };
  export {SearchBar}