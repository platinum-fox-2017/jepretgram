# JepretGram
Instagram Like. You can share your photo to others, and you can like others photo. Share the best photo of you!


### REST api

List of routes can access wihtout auth:

| Route           | HTTP    | Descriptions                    |
| :-------------  | :------ | :------------------------------ |
| `/users/signin`    | POST     | Sign in and get the token              |
| `/users/register`    | POST     | Sign up (create new user)            |
| `/posts`    | GET     | Get all the post              |


List of routes can access with auth: 

| Route           | HTTP    | Descriptions                    |
| :-------------  | :------ | :------------------------------ |
| `/posts/me`| GET     | Get a single post               |
|  `/posts`   | POST    | Create a post                   |
| `/posts/:id`| DELETE  | DELETE a post                   |
| `/posts/:id`| PUT     | Update a post      |
|  `/comments`   | POST    | Create a new comment on post                   |

---
### Usage For Client (Vue)
- Go to /client folder
- Open terminal
- and Run npm command
```
npm install
npm run dev

```
Access the website via `http://localhost:8080`

### Usage For Server (Expressjs)
- Go to /server folder
- Open terminal
- and Run npm command
```
npm install
// to run with nodemon
npm run dev 
// to run with node
npm start
//to execute test
npm run test

```
Access the website via `http://localhost:3000`

**Note:** The image will upload to gcs, so you need a bucket and the API Credential from google cloud platform
