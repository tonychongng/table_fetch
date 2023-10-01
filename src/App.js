import { useEffect, useState, useRef, useMemo } from "react";
import { UserList } from "./components/UserList";

function App() {

  const [users, setUsers] = useState([]);
  const [showColors, setShowColors] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);
  const [filterCountry, setFilterCountry] = useState('');
  const originalUsers = useRef(users);

  const toggleColors = () => {
    setShowColors(!showColors);
  }

  const toggleSortByCountry = () => {
    setSortByCountry(prev => !prev);
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(res => res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
  }, [])
  

  const filteredUsers = useMemo(() => {
    return typeof filterCountry === 'string' && filterCountry.length > 0
    ? users.filter((user) => {
      return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
    })
    : users

  }, [users, filterCountry])
  
  

  const sortedUsers = useMemo(() => {
    return sortByCountry 
    ? filteredUsers.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
    : filteredUsers
  }, [filteredUsers, sortByCountry])

  const handleDelete = (uuid) => {
    const filteredUsers = users.filter((user) => user.login.uuid !== uuid)
    setUsers(filteredUsers);
  }


  return (
    <div className="App">
      <h1>Table Coding Test</h1>

      <header>
        <button onClick={toggleColors}>Color Rows</button>

        <button onClick={toggleSortByCountry}>
          {sortByCountry ? "Don't order" : "Order By Country"}
        </button>

        <button onClick={handleReset}>
          Reset State
        </button>
        
        <input type="text" 
              placeholder="Filter By Country"
              onChange={(e) => {
                setFilterCountry(e.target.value);
              }}

        />
      </header>

      <UserList
        users={sortedUsers}
        showColors={showColors}
        handleDelete={handleDelete}
      />

    </div>
  );
}

export default App;
