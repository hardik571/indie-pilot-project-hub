
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="border-b border-border sticky top-0 z-40 w-full backdrop-blur-sm bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold text-primary">
            ProjectPilot
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/calendar" className="text-sm font-medium hover:text-primary transition-colors">
              Calendar
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <LayoutDashboard className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Calendar className="h-5 w-5" />
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
