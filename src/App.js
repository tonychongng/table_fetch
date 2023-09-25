import { useEffect, useState } from "react";
import { UserList } from "./components/UserList";

function App() {


  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(res => res.json())
      .then(res => {
        setUsers(res.results);
      })
  }, [])

  return (
    <div className="App">
      <UserList
        users={users}
      />

    </div>
  );
}

export default App;
