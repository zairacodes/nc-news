import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { getUsers } from "../utils/api";

const Header = () => {
  const [users, setUsers] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [err, setErr] = useState("");

  useEffect(() => {
    getUsers()
      .then((usersFromApi) => {
        setUsers(usersFromApi);
      })
      .catch((err) => {
        setErr(err);
      });
  }, []);

  const handleSelect = (e) => {
    if (e.target.value === "logout") {
      setUser("");
    } else {
      const selectedUser = users.find((u) => u.username === e.target.value);
      setUser(selectedUser);
    }
  };

  if (err)
    return (
      <p className="err-msg">
        Oops! Something went wrong, please try again later.
      </p>
    );

  return (
    <header>
      <Link to="/">
        <h1>NC News</h1>
      </Link>
      <div className="login-dropdown">
        <label>Log in: </label>
        <select
          onChange={handleSelect}
          value={user.username || ""}
          className="usernames-dropdown"
        >
          <option value="" disabled>
            Select a user
          </option>
          {users.map((user) => (
            <option key={user.username} value={user.username}>
              {user.username}
            </option>
          ))}
          <option value="logout">Log out</option>
        </select>
      </div>
      {!user.username ? (
        <p>Not logged in</p>
      ) : (
        <p>Logged in as: {user.username}</p>
      )}
    </header>
  );
};

export default Header;
