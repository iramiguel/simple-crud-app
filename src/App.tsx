import { useState, useEffect } from "react";
import { api } from "./api";
import type { User } from "./types";
import UserForm from "./components/UserForm";
import Header from "./components/Header";
import "./App.css";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      setError("Failed to fetch users");
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
    setUsers((prev) => [...prev, { ...newUser, id: 1 }]);
    // setUsers((prev) => [...prev, { ...newUser, id: Date.now() }]);
    // setUsers((prev) => {
    //   const maxId =
    //     prev.length > 0 ? Math.max(...prev.map((u) => u.id ?? 0)) : 0;
    //   const nextId = maxId + 1;
    //   return [...prev, { ...newUser, id: nextId }];
    // });
  };

  const updateUser = async (id: number, name: string, email: string) => {
    await api.put(`/users/${id}`, { name, email });
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, name, email } : user))
    );
  };

  const deleteUser = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    await api.delete(`/users/${id}`);
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleFormSubmit = async (name: string, email: string) => {
    console.log("Submitted:", name, email, editingUser);
    if (editingUser) {
      await updateUser(editingUser.id, name, email);
      setEditingUser(null);
    } else {
      await addUser(name, email);
    }
  };

  return (
    <div>
      <Header />
      {loading && <p>Loading..</p>}
      {error && <p>{error}</p>}
      <UserForm
        onSubmit={handleFormSubmit}
        initialName={editingUser?.name}
        initialEmail={editingUser?.email}
      />

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <div className="list-wrapper">
              <div className="list-names">
                <strong>ID {user.id}:</strong> {user.name} ({user.email})
              </div>

              <div className="list-buttons">
                <button onClick={() => setEditingUser(user)}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
