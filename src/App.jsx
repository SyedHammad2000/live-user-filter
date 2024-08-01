import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setuser] = useState([]);
  const [filteruser, setfilteredUser] = useState([]);

  useEffect(() => {
    const fetchuser = () => {
      axios
        .get("https://randomuser.me/api/?results=10")
        .then((res) => {
          setuser(res.data.results);
          setfilteredUser(res.data.results);
          console.log(res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchuser();
  }, []);

  useEffect(() => {
    setfilteredUser(
      user.filter((item) =>
        `${item.name.first} ${item.name.last}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [user, searchTerm]);
  console.log(filteruser);

  return (
    <div>
      <h1>Search App</h1>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteruser.map((user) => (
          <li key={user.login.uuid}>
            {user.name.first} {user.name.last}
            <img width={60} height={50} src={user.picture.large} alt={user.name.first} />
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{user.dob.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
