# REACT AUTHENTICATION WITH STRAPI

This is how implementation strapi authentication with react js.
[LIVE DEMO](https://react-auth-strapi.vercel.app/).

## Clone This Repository and install the dependecies
```sh
git@github.com:ridhokelrey/react-auth-strapi.git
cd react-auth-strapi
yarn install  
#or  
npm install
```

## Install Strapi
```sh
yarn create strapi-app my-project --quickstart
# or
npx create-strapi-app my-project --quickstart
```

## Login Flow and Setup with Github Provider
- The user goes on your frontend app ( https://website.com ) and click on your button _connect with Github_.
- The frontend redirect the tab to the backend URL: https://strapi.website.com/api/connect/github.
- The backend redirects the tab to the GitHub login page where the user logs in.
- Once done, Github redirects the tab to the backend URL: https://strapi.website.com/api/connect/github/callback?code=abcdef.
- The backend uses the given _code_ to get from Github an _access_token_ that can be used for a period of time to make authorized requests to Github to get the user info (the email of the user of example).
- Then, the backend redirects the tab to the url of your choice with the param _access_token_ (example: http://website.com/connect/github/redirect?access_token=eyfvg)
- The frontend (http://website.com/connect/github/redirect) calls the backend with https://strapi.website.com/api/auth/github/callback?access_token=eyfvg that returns the strapi user profile with its _jwt_.
(Under the hood, the backend asks Github for the user's profile and a match is done on Github user's email address and Strapi user's email address)
- The frontend now possesses the user's _jwt_, which means the user is connected and the frontend can make authenticated requests to the backend!

[More Documentations](https://docs.strapi.io/developer-docs/latest/plugins/users-permissions.html#providers)

## Github configuration
- Visit the OAuth Apps list page https://github.com/settings/developers
- Click on New OAuth App button
- Fill the information:
    - Application name: Strapi GitHub auth
    - Homepage URL: http://localhost:3000
    - Application description (_optional_): Strapi provider auth description
    - Authorization callback URL: http://localhost:1337/api/connect/github/callback

## Strapi configuration
- Visit the User Permissions provider settings page
http://localhost:1337/admin/settings/users-permissions/providers
- Click on the GitHub provider
- Fill the information (replace with your own client ID and secret):
    - Enable: ON
    - Client ID: 53de5258f8472c140917
    - Client Secret: fb9d0fe1d345d9ac7f83d7a1e646b37c554dae8b
    - The redirect URL to your front-end app: http://localhost:3000/connect/github
