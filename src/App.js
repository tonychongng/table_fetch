import { useEffect, useState, useRef } from "react";
import { UserList } from "./components/UserList";

function App() {

  const [users, setUsers] = useState([]);
  const [showColors, setShowColors] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);
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

  const sortedUsers = sortByCountry 
  ? users.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
  : users


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
