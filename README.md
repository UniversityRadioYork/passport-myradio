# passport-myradio
Node.js Passport strategy for MyRadio, to enable "Sign In with MyRadio" for Express/Passport sites

## Installation

`yarn add @ury1350/passport-myradio` or `npm install --save @ury1350/passport-myradio`

## Important Note

This module only works if your app is running on ury.org.uk or *.ury.org.uk.

## Usage

Add passport-myradio:

```js
const express = require("express");
const passport = require("passport");
const MyRadioStrategy = require("@ury1350/passport-myradio");

const app = express();

passport.use("myradio", new MyRadioStrategy({
  myradioBaseUrl: "https://ury.org.uk/myradio",
  myradioApiBaseUrl: "https://ury.org.uk/api",
  websiteBaseUrl: "https://ury.org.uk",
  myradioApiKey: "<INSERT_API_KEY_HERE>",
  loginCallbackUrl: "https://yourwebsite.ury.org.uk/login/myradio/callback",
  mixins: ["personal_data", "all_officerships", "shows", "payment], // change this
  userAgent: "Your-App/1.0"
}, (user, cb) => {
  // Do things with user, then
  cb(null, user);
});

app.get("/login/myradio", passport.authenticate("myradio"));

app.get(
  "/login/myradio/callback", 
  passport.authenticate("myradio"),
  (req, res) => {/* do things with req.user */}
);
```

## Configuration Options

| Name                | Type     | Required | Description                                                                                                                                                                                  | Example                                                   |
|---------------------|----------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| `myradioBaseUrl`    | String   | Yes      | The base of the MyRadio installation, with no trailing slash                                                                                                                                 | `"https://ury.org.uk/myradio"`                            |
| `myradioApiBaseUrl` | String   | Yes      | The base of the MyRadio API, with no trailing slash and no version                                                                                                                           | `"https://ury.org.uk/api"`                                |
| `websiteBaseUrl`    | String   | Yes      | The installation website's base URL, with no trailing slash                                                                                                                                  | `"https://ury.org.uk"`                                    |
| `myradioApiKey`     | String   | Yes      | An API key.  Note that using it with no mixins requires no permissions, but using one of the mixins requires the appropriate permissions (for details, see `myury.api_mixin_auth` in the DB) | `"YOUR_API_KEY_HERE"`                                     |
| `loginCallbackUrl`  | String   | Yes      | Where to redirect the user when they are signed in                                                                                                                                           | `"https://yourwebsite.ury.org.uk/login/myradio/callback"` |
| `mixins`            | String[] | No       | Mixins to add to the user object from the API                                                                                                                                                | `["personal_data", "all_officerships"]`                   |
| `userAgent`         | String   | No       | User-Agent header to set. If none supplied uses a default.                                                                                                                                   | `"Your-App/1.0"`                                          |
| `enforceRedirect`   | Boolean  | No       | Whether to initially redirect the user to the callback URL even if they are already logged in                                                                                                | `false`                                                   |
