
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-border mt-auto py-6">
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} ProjectPilot. All rights reserved.
        </p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Dashboard
          </Link>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
