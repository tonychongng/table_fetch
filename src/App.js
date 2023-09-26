import { useEffect, useState } from "react";
import { UserList } from "./components/UserList";

function App() {

  const [users, setUsers] = useState([]);

  const [showColors, setShowColors] = useState(false);

  const [sortByCountry, setSortByCountry] = useState(false);

  const toggleColors = () => {
    setShowColors(!showColors);
  }
 
  const toggleSortByCountry = () => {
    setSortByCountry(prev => !prev);
  }

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(res => res.json())
      .then(res => {
        setUsers(res.results);
      })
  }, [])

  const sortedUsers = sortByCountry 
  ? users.toSorted((a, b) => {
    return a.location.country.localeCompare(b.location.country);
  }) 
  : users

  return (
    <div className="App">
      <h1>Table Coding Test</h1>

      <header>
        <button onClick={toggleColors}>Color Rows</button>
        <button onClick={toggleSortByCountry}>
          {sortByCountry ? "Don't order" : "Order By Country"}
        </button>
      </header>

      <UserList
        users={sortedUsers}
        showColors={showColors}
      />

    </div>
  );
}

export default App;
