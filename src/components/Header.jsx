import React from 'react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow p-4 flex justify-between">
      <h1 className="text-2xl font-bold">Urban Hub</h1>
      <nav>
        <ul className="flex gap-4">
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  );
}
