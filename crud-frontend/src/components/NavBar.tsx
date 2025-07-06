import { Fragment } from "react";

interface NavBarProps {
  onOpen: () => void;
  onSearch: (searchTerm: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onOpen, onSearch }) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <Fragment >
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">CRUD FRONTEND</a>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search"
            className="input w-24 md:w-auto focus:border-black-500 outline-none input-bordered"
            onChange={handleSearchChange}
          />
          
        <button className="btn btn-primary bg-blue-400 border-blue-900" onClick={onOpen}>Insert</button>
        </div>
      </div>
    </Fragment>
  );
};

export default NavBar;