import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="app-navbar">
      <span className="app-navbar_item">
        <NavLink to="/choose-salad" className="app-navbar_item_link">
          Выбрать из списка
        </NavLink>
      </span>
      <span className="app-navbar_item">
        <NavLink to="/create-salad" className="app-navbar_item_link">
          Составить собственный
        </NavLink>
      </span>
      <span className="app-navbar_item">
        <NavLink to="/basket" className="app-navbar_item_link">
          Мои салаты
        </NavLink>
      </span>
    </div>
  );
};

export default NavBar;
