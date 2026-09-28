# Student CRUD API

A simple Node.js and Express.js CRUD API for a student lab activity. Student data is stored in an in-memory array, so it resets whenever the server restarts.

## Install and start

```bash
npm install
node server.js
```

The server runs at `http://localhost:3000`.

## Test with Postman

For every request below, use the URL shown and select the matching HTTP method.

### GET all students

- Method: `GET`
- URL: `http://localhost:3000/students`

The response includes the sample student with roll number `23071A0547`.

### GET one student

- Method: `GET`
- URL: `http://localhost:3000/students/1`

### POST a student

- Method: `POST`
- URL: `http://localhost:3000/students`
- Header: `Content-Type: application/json`
- Body: select `raw` and `JSON`, then use:

```json
{
  "name": "Ravi Kumar",
  "rollNo": "23071A0550",
  "course": "Electronics"
}
```

### PATCH a student

- Method: `PATCH`
- URL: `http://localhost:3000/students/1`
- Header: `Content-Type: application/json`
- Body: select `raw` and `JSON`, then use:

```json
{
  "course": "Computer Engineering"
}
```

### DELETE a student

- Method: `DELETE`
- URL: `http://localhost:3000/students/2`

All responses are JSON and include a `success` value and a message. Use the GET request again after POST, PATCH, or DELETE to see the updated in-memory data.



Continuous Integration Activity
Roll Number: 23071A0547