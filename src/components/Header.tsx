
import { CalendarDays, Bell } from "lucide-react";
import { FilterBar } from "../features/filters/components/FilterBar";
export const Header = ({ searchQuery, setSearchQuery }: { searchQuery: string, setSearchQuery: (s: string) => void }) => {
  return (
    <header className="topbar">
      <div className="brand">
        <CalendarDays aria-hidden="true" />
        <h1>
          Quản Lý Deadline
        </h1>
      </div>
      
      <FilterBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="topbar-actions">
        <button className="icon-button" type="button" aria-label="Thông báo">
          <Bell className="w-5 h-5" />
          <span className="notification-dot"></span>
        </button>
        <img 
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
          alt="Avatar" 
          className="avatar"
        />
      </div>
    </header>
  );
};
