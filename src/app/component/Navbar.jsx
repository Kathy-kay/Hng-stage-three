import React from "react";
import { signOut } from "next-auth/react";

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <h1>D&D</h1>
      </div>
      <button onClick={() => signOut()}>SignOut</button>
    </nav>
  );
};

export default Navbar;
