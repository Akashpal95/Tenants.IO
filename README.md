# Tenants.IO
An end-to-end application for tenants to sign up and list their properties for potential renters.

## Description

This is an admin panel application for tenants who wants to list their properties for renters.
This is a learning project and it has many implementations like a whole authentication system with features like forgot password, sign up/in with google
all backed by a dynamic mix of both firebase, firebase Admin SDK and my own node.js server. 
I have also tried to make it user interactive and added a bunch of notifications.
And finally i've been able to host it using firebase hosting and firebase cloud functions.
You can visit this website here:

# https://tenantsio.web.app/

The functionalities include:
1. Sign up/Sign in with email/password(Implemented using firebase authentication)
2. Sign up/Sign in with Google(Implemented using firebase authentication)
3. Sign out.
4. Forgot password(Nodemailer is used to send the reset link)
5. Google reCaptcha v2 verification.
6. Flash notifications.(Implemented using flash and Noty)
7. Parallel jobs for sending mail.(Implemented using Kue and Redis)
8. You can add properties.
9. Delete Properties.

## Setting up the project
1. Clone at your local system.
2. Open the folder in visual studio code.
3. Open terminal and make the project folder as your current directory
4. Install all the dependencies as mentioned in the package.json :
```
npm install
```
5. Configure firebase authetication API ids:
   - To configure your own client id and secret, please refer: [Firebase developer docs](https://firebase.google.com/docs/auth).
6. Configure captcha:
   - To configure your own keys, please refer: [google reCAPTCHA](https://www.google.com/recaptcha/admin/create)
7. Configure your own firebase admin SDK:
   - https://firebase.google.com/docs/auth/admin
7.  input the command `npm start` on terminal

8. Pat yourself in the back for making it so far!!

