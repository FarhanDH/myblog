import { useState } from 'react';
import { config } from '../config';

export default function RegiterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch(`${config.apiUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }).then((res) => res.json());

    if (response.statusCode !== 201) {
      return alert('Registration failed!. Please try with another username');
    }

    window.location.href = '/login';
    return alert('Registration success!');
  }

  return (
    <form action="" className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button>Register</button>
    </form>
  );
}
