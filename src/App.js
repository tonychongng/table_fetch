import { useEffect, useState } from "react";
import { UserList } from "./components/UserList";

function App() {

  const [users, setUsers] = useState([]);

  const [showColors, setShowColors] = useState(false);

  const toggleColors = () => {
    setShowColors(!showColors);
  }

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(res => res.json())
      .then(res => {
        setUsers(res.results);
      })
  }, [])

  return (
    <div className="App">
      <h1>Table Coding Test</h1>

      <header>
        <button onClick={toggleColors}>Color Rows</button>
      </header>

      <UserList
        users={users}
        showColors={showColors}
      />

    </div>
  );
}

export default App;
