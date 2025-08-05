import { useState, useEffect } from "react";

interface Props {
  onSubmit: (name: string, email: string) => void;
  initialName?: string;
  initialEmail?: string;
}

export default function UserForm({
  onSubmit,
  initialName = "",
  initialEmail = "",
}: Props) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);

  useEffect(() => {
    setName(initialName);
    setEmail(initialEmail);
  }, [initialName, initialEmail]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, email);
    if (!initialName && !initialEmail) {
      setName("");
      setEmail("");
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
        />
      </div>
      <button type="submit" className="submit-btn">Submit</button>
    </form>
  );
}
