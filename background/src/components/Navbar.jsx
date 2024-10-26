import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav style={{ backgroundColor: "#333", padding: "1rem" }}>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <li>
          <Link
            to="/"
            style={{
              color: "#fff",
              textDecoration: "none",
              padding: "0.5rem 1rem",
            }}
          >
            Home
          </Link>
        </li>
        <li style={{ position: "relative" }}>
          <button
            onClick={toggleDropdown}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              padding: "0.5rem 1rem",
              fontSize: "1rem",
            }}
          >
            Fidgets ▼
          </button>
          {dropdownOpen && (
            <ul
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                backgroundColor: "#444",
                borderRadius: "4px",
                border: "1px solid #ddd",
                listStyle: "none",
                padding: "0.5rem 0",
                margin: "0.5rem 0",
                zIndex: 1,
                minWidth: "150px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <li style={{ padding: "0.5rem 1rem" }}>
                <Link
                  to="/buttons"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  Buttons
                </Link>
              </li>
              <li style={{ padding: "0.5rem 1rem" }}>
                <Link
                  to="/slime"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  Slime
                </Link>
              </li>
              <li style={{ padding: "0.5rem 1rem" }}>
                <Link
                  to="/birds"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  Birds
                </Link>
              </li>
              <li style={{ padding: "0.5rem 1rem" }}>
                <Link
                  to="/pops"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  Pops
                </Link>
              </li>
              <li style={{ padding: "0.5rem 1rem" }}>
                <Link
                  to="/lines"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  Lines
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li style={{ position: "relative" }}>
          <button
            onClick={toggleDropdown}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              padding: "0.5rem 1rem",
              fontSize: "1rem",
            }}
          >
            Visuals ▼
          </button>
          {dropdownOpen && (
            <ul
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                backgroundColor: "#444",
                borderRadius: "4px",
                border: "1px solid #ddd",
                listStyle: "none",
                padding: "0.5rem 0",
                margin: "0.5rem 0",
                zIndex: 1,
                minWidth: "150px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <li style={{ padding: "0.5rem 1rem" }}>
                <Link
                  to="/ocean"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  Buttons
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
