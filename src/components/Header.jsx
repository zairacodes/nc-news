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
      <p className="err-msg" aria-label="Error message">
        Oops! Something went wrong, please try again later.
      </p>
    );

  return (
    <header aria-label="Header section">
      <nav aria-label="Navigation">
        <Link to="/" aria-label="Link to homepage">
          <h1>NC News</h1>
        </Link>
      </nav>
      <div className="login-dropdown">
        <label>Log in: </label>
        <select
          onChange={handleSelect}
          value={user.username || ""}
          className="usernames-dropdown"
          aria-label="Select a user"
        >
          <option value="" disabled>
            Select a user
          </option>
          {users.map((user) => (
            <option key={user.username} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>
      </div>
      {!user.username ? (
        <p aria-label="Login status">Not logged in</p>
      ) : (
        <>
          <p aria-label="Login status">
            Hello {user.username}{" "}
            <img
              src={user.avatar_url}
              alt="User Avatar"
              className="user-avatar"
              aria-label="User Avatar"
            />
          </p>
          <button onClick={() => setUser("")} aria-label="Log out">
            Log out
          </button>
        </>
      )}
    </header>
  );
};

export default Header;
