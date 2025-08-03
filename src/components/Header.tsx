// import react from "react";
import { FolderKanban } from 'lucide-react';
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-container">
        <div className="header-logo">
          <h1><FolderKanban/> Simple CRUD App</h1>
        </div>
        
      </div>
    </div>
  );
}

export default Header