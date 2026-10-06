import { Search } from "lucide-react";

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (s: string) => void;
}

export const FilterBar = ({ searchQuery, setSearchQuery }: FilterBarProps) => {
  return (
    <div className="search-wrap">
        <Search aria-hidden="true" />
        <input 
          type="text" 
          placeholder="Tìm kiếm bài tập, môn học..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
    </div>
  );
};
