const prod = {
  url: {
    REACT_URL: "https://react-auth-strapi.vercel.app",
    STRAPI_URL: "https://obscure-shelf-41704.herokuapp.com/",
  },
};
const dev = {
  url: {
    REACT_URL: "http://localhost:3000",
    STRAPI_URL: "http://localhost:1337",
  },
};
export const config = process.env.NODE_ENV === "development" ? dev : prod;
