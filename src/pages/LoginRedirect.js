import React, { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function LoginRedirect({ setCookie }) {
  const { providerName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  let navigate = useNavigate()

  useEffect(() => {
    const altLogin = async () => {
      const req = await fetch(
        `${
          process.env.REACT_APP_BACKEND_URL
        }/api/auth/${providerName}/callback?access_token=${searchParams.get(
          "access_token"
        )}`
      );
      const res = await req.json();

      console.log(res);

      if (res.jwt) {
        setCookie("token", res.jwt, { path: "/" });
        return navigate('/dashboard')
      }
    };
    altLogin();
  });

  return <div className="h-screen w-screen flex justify-center items-center flex-col text-4xl">Login With {providerName}</div>;
}
