const Filter = ({ searchName, handleSearchName }) => {
    return (
        <div className="filter">
            filter shown with: 
            <input 
                type="text" 
                value={searchName} 
                onChange={handleSearchName} 
                placeholder="Search by name" 
            />
        </div>
    );
};

export default Filter;