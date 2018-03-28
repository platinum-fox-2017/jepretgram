# JepretGram
Instagram Like. You can share your photo to others, and you can like others photo. Share the best photo of you!


### REST api

List of routes:

| Route           | HTTP    | Descriptions                    |
| :-------------  | :------ | :------------------------------ |
| `/api/signin`    | POST     | Sign in and get the token              |
| `/api/signup`    | POST     | Sign up (create new user)            |
| `/api/post`    | GET     | Get all the post              |
| `/api/post/:id`| GET     | Get a single post               |
|  `/api/post`   | POST    | Create a post                   |
| `/api/post/:id`| DELETE  | DELETE a post                   |
| `/api/post/:id`| PUT     | Update a post      |

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
npm run dev

```
Access the website via `http://localhost:3000`
