import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function Login({ setCookie }) {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  const setValue = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setForm({ ...form, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    const req = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/local`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );
    const res = await req.json();

    if (res.jwt) {
      setCookie("token", res.jwt, { path: "/" });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      {loading && <Navigate to="/dashboard" replace={true} />}
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="text-center font-semibold text-xl mb-5">Login</h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <form onSubmit={handleLogin} className="px-5 py-7">
            {loading && (
              <div className="absolute inset-0 z-10 bg-white/50"></div>
            )}
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              E-mail
            </label>
            <input
              type="email"
              name="identifier"
              onChange={setValue}
              required
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={setValue}
              required
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <button
              type="submit"
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            >
              <span className="inline-block mr-2">Login</span>
            </button>
          </form>
          <div className="p-5">
            <a
              href={process.env.REACT_APP_BACKEND_URL + "/api/connect/github"}
              className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
            >
              Login with{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>{" "}
              Github
            </a>
          </div>
          <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-center sm:text-left whitespace-nowrap">
                <Link
                  to="/register"
                  className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
                >
                  <span className="inline-block ml-1">Register</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
