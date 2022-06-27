import React, { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { config } from "../utils/Constants";

export default function LoginRedirect({ setCookie }) {
  const { providerName } = useParams();
  const [searchParams] = useSearchParams();

  let navigate = useNavigate();
  const url = config.url.STRAPI_URL;

  useEffect(() => {
    const altLogin = async () => {
      const req = await fetch(
        `${url}/api/auth/${providerName}/callback?access_token=${searchParams.get(
          "access_token"
        )}`
      );
      const res = await req.json();

      console.log(res);

      if (res.jwt) {
        setCookie("token", res.jwt, { path: "/" });
        return navigate("/dashboard");
      }
    };
    altLogin();
  });

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col text-4xl">
      Login With {providerName}
    </div>
  );
}
