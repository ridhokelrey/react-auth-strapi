import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";

export default function Dashboard({ cookies, removeCookie }) {
  let navigate = useNavigate();

  useEffect(() => {
    const checkCookie = () => {
      if (!cookies.token) {
        return navigate("/login");
      }
    };
    checkCookie();
  });

  const handleLogout = () => {
    removeCookie("token");
    return navigate("/login");
  };

  return (
    <main
      className="min-h-screen w-full bg-gray-100 text-gray-700"
      x-data="layout"
    >
      <header className="flex w-full items-center justify-between border-b-2 border-gray-200 bg-white p-2">
        <div className="flex items-center space-x-2">
          <img src={logo} width={60} alt="logo" />
        </div>

        <div>
          <button
            className="bg-red-500 rounded py-1 px-3 text-white"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </header>
      <div className="flex">
        <aside
          className="flex w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2"
          style={{ height: "90.5vh" }}
          x-show="asideOpen"
        >
          <button
            className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600"
          >
            <span className="text-2xl">
              <i className="bx bx-home" />
            </span>
            <span>Dashboard</span>
          </button>
          <button
            className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600"
          >
            <span className="text-2xl">
              <i className="bx bx-cart" />
            </span>
            <span>Cart</span>
          </button>
          <button
            className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600"
          >
            <span className="text-2xl">
              <i className="bx bx-shopping-bag" />
            </span>
            <span>Shopping</span>
          </button>
          <button
            className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600"
          >
            <span className="text-2xl">
              <i className="bx bx-heart" />
            </span>
            <span>My Favourite</span>
          </button>
          <button
            className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600"
          >
            <span className="text-2xl">
              <i className="bx bx-user" />
            </span>
            <span>Profile</span>
          </button>
        </aside>

        <div className="w-full p-4">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita
          quam odit officiis magni doloribus ipsa dolore, dolores nihil
          accusantium labore, incidunt autem iure quae vitae voluptate, esse
          asperiores aliquam repellat. Harum aliquid non officiis porro at
          cumque eaque inventore iure. Modi sunt optio mollitia repellat sed ab
          quibusdam quos harum!
        </div>
      </div>
    </main>
  );
}
