import { useState, useEffect } from "react";
import { api } from "./api";
import type { User } from "./types";
import UserForm from "./components/UserForm";
import "./App.css";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (name: string, email: string) => {
    const newUser = { name, email };
    await api.post("/users", newUser);
    setUsers((prev) => [...prev, { ...newUser, id: Date.now() }]);
  };

  const updateUser = async (id: number, name: string, email: string) => {
    await api.put(`/users/${id}`, { name, email });
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, name, email } : user))
    );
  };

  const deleteUser = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <div>
      <h1>Users</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <UserForm onSubmit={addUser} />
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button
              onClick={() => updateUser(user.id, "New Name", "New@email.com")}
            >
              Edit
            </button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
