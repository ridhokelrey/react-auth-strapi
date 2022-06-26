import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register({ cookies }) {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  let navigate = useNavigate()

  const setValue = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    const checkCookie = () => {
      if (cookies.token) {
        return navigate('/dashboard')
      }
    }
    checkCookie()
  })


  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);

    const req = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/local/register`,
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
      setForm({});
      e.target.reset();
      setSuccess(true);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="text-center font-semibold text-xl mb-5">Register</h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          {success && (
            <div className="text-center bg-green-500 text-white rounded-t py-2">
              Your account has been registered!
            </div>
          )}
          <form onSubmit={handleRegister} className="px-5 py-7 relative">
            {loading && (
              <div className="absolute inset-0 z-10 bg-white/50"></div>
            )}

            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Username
            </label>
            <input
              type="text"
              name="username"
              onChange={setValue}
              required
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              E-mail
            </label>
            <input
              type="email"
              name="email"
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
              disabled={loading}
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            >
              <span className="inline-block mr-2">Sign Up</span>
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
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
