# OM Funding Frontend

The codebase is now feature complete; please submit bug fixes via pull requests & feedback via issues.

## Getting started

You can view a live demo over at https://fundingomromania.com/

To get the frontend running locally:

- Clone this repo
- `npm install` to install all req'd dependencies
- `npm start` to start the local server (this project uses create-react-app)

Local web server will use port 4100 instead of standard React's port 3000 to prevent conflicts with some backends like Node or Rails. You can configure port in scripts section of `package.json`: we use [cross-env](https://github.com/kentcdodds/cross-env) to set environment variable PORT for React scripts, this is Windows-compatible way of setting environment variables.
 
Alternatively, you can add `.env` file in the root folder of project to set environment variables (use PORT to change webserver's port). This file will be ignored by git, so it is suitable for API keys and other sensitive stuff. Refer to [dotenv](https://github.com/motdotla/dotenv) and [React](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-development-environment-variables-in-env) documentation for more details. Also, please remove setting variable via script section of `package.json` - `dotenv` never override variables if they are already set.  

### Making requests to the backend API


The source code for the backend server (available for Node, Rails and Django) can be found in the [OM backend repo](https://github.com/davidbanu/OM-backend).

If you want to change the API URL to a local server, simply edit `src/agent.js` and change `API_ROOT` to the local server's URL (i.e. `http://localhost:3000/api`)


## Functionality overview

The example application is a funding donation platform (i.e. a Medium.com clone) called "OM". It uses a custom API for all requests, including authentication.

**General functionality:**

- Authenticate users via JWT (login/signup pages + logout button on settings page)
- CRU* users (sign up & settings page - no deleting required)
- CRUD Funding Campaigns
- CR*D Comments on campaigns (no updating required)
- GET and display paginated lists of campaigns
- Favorite campaigns
- Follow other users

**The general page breakdown looks like this:**

- Home page (URL: /#/ )
    - List of tags
    - List of campaigns pulled from either Feed, Global, or by Tag
    - Pagination for list of campaigns
- Sign in/Sign up pages (URL: /#/login, /#/register )
    - Use JWT (store the token in localStorage)
- Settings page (URL: /#/settings )
- Editor page to create/edit campaigns (URL: /#/editor, /#/editor/campaign-slug-here )
- Campaign page (URL: /#/campaign/campaign-slug-here )
    - Delete campaign button (only shown to campaign's author)
    - Render markdown from server client side
    - Comments section at bottom of page
    - Delete comment button (only shown to comment's author)
- Profile page (URL: /#/@username, /#/@username/favorites )
    - Show basic user info
    - List of campaigns populated from author's created campaigns or author's favorited campaigns

<br />


