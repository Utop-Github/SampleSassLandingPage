import React from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import style from "./style.module.css";
import { BsFillCartFill } from "react-icons/bs";

export default function Header() {
  const location = useLocation();
  const routeName = location.pathname.split("/")[1];
  const navLinkClass = ({ isActive }) => {
    return isActive ? `nav-link ${style.activeNavItem}` : "nav-link";
  };
  return (
    <nav
      className={`${style.navbar} navbar-expand-sm navbar-dark bg-light mx-auto px-4 py-2`}
    >
      <button
        className=" d-lg-none"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      />
      <div
        className="collapse navbar-collapse text-center row "
        id="collapsibleNavId"
      >
        <ul className="navbar-nav mt-2 mt-lg-0 col-4">
          <li className="nav-item mr-3">
            <NavLink
              style={{ color: "#4398ed" }}
              className={navLinkClass}
              to={`${routeName}`}
              end
            >
              Trang chủ
            </NavLink>
          </li>
          <li className="nav-item mr-3">
            <NavLink
              style={{ color: "#4398ed" }}
              className={navLinkClass}
              to={`${routeName}/product`}
            >
              hướng dẫn tham gia
            </NavLink>
          </li>
          <li className="nav-item mr-3">
            <NavLink
              style={{ color: "#4398ed" }}
              className={navLinkClass}
              to={`${routeName}/review`}
            >
              thể lệ
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
