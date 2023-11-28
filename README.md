# Career_Compass

Career Compass is a website that assists high school students and graduates determine their career choices by guiding them through a quiz based on the theory of multiple intelligences.

## Table of Contents

1. [Teconologies](#teconologies)
2. [APIs and Methods](#api-methods)
3. [How to Run the Application](#run)
4. [Team](#team)

## Teconologies

### Front-end

- ReactJS: JavaScript library for building user interfaces.
- Tailwind CSS: Open-source CSS framework.
- Library:
  - react-router-dom: Declarative routing for React.js.
  - zustand: State management.

### Back-end

- Flask: Micro web framework in Python.
- MySQL: Open-source relational database management system.
- Library:
  - flask-cors: Cross-origin resource sharing (CORS) for Flask.
  - flask_mail: Send email from Flask applications.
  - mysql: MySQL driver for Python.
  - uuid: Generate UUIDs.
  - faker: Generate fake data.

### Web Server

- Nginx: Open-source reverse proxy server for HTTP, HTTPS, SMTP, POP3, and IMAP protocols.
- Gunicorn: Python WSGI HTTP Server for UNIX.

## APIs and Methods

### 1. `/api/v1/questions`

- **Method**: GET
- **Description**: Returns a randomized array of objects, each containing a question and its answers. A total of 40 objects are returned.
- **Response**:

```json
{
  "questions": [
    {
      "question": "random question 1",
      "Intelligence_type": "Linguistic"
    },
    {
      "question": "random question 2",
      "Intelligence_type": "Musical"
    },
    ...
  ]
}
```

### 2. `/api/v1/result`

- **Method**: POST
- **Description**: Takes an object containing the score for each intelligence type and returns the top 2 intelligences in descending order. Also, sends the result link to the user's email for future access.
- **Requset Header**:

```json
{
    "name": "John Doe",
    "email": "dinamow@meow.com",
    "quiz_type": "graduate"
    "Musical": 20,
    "Bodily-Kinesthetic": 10,
    ...
}
```

- **Response**:

```json
{
  "uuid": "123e4567-e89b-12d3-a456-426655440000"
}
```

### 3. `/api/v1/result/<uuid>`

- **Method**: GET
- **Description**: Returns the result of a user based on a unique ID.
- **Response**:

```json
{
  "name": "John Doe",
  "types": [
    "intelligence_type": {
      "activites": [
        "Perform a mental arithmetic calculation",
        ...
      ],
      "description": "description",
      "faculties": [
        "Faculty of Science",
        ...
      ],
      "roles": [
        "Scientist",
        ...
      ]
    },
    {
      ...
    }
  ]
}
```

### 4. /api/v1/statistics

- **Method**: GET
- **Description**: Returns detailed statistics about users' preferences and the number of people who completed the quiz.
- **Response**:

```json
{
    "Completed the quize": 120
    "Graduates": 80,
    "High school students": 40,
    "bodily_kinesthetic": 20,
    "interpersonal": 10,
    "intrapersonal": 10,
    "linguistic": 20,
    "logical_mathematical": 20,
    "musical": 20,
    "naturalistic": 10,
    "spatial_visual": 10
}
```

## How to Run the Application

### 1. server:

- Navigate to **setup** directory.
- Run `./setup.sh` to install all dependencies.
- Write the follwing command to setup the database:

  ```bash
  cat db.sql | mysql -u root -p
  ```

- Run `./insert.py` to seed the database with data.
- Configure Nginx to proxy pass to Gunicorn on port 5002.

### 2. Front-end:

- Navigate to the **front_end** directory then to **careerfront**.
- Run the following in the terminal:

  ```bash
  npm run build
  ```

- Copy the **dist** folder to the **back_end** directory.
- Change **dist** folder to **build**

### 3. Back-end:

- Navigate to **back_end** directory.
- Write the following command to run the application:

  ```bash
  tmux new-session -d 'gunicorn --bind 0.0.0.0:5002 app:app'
  ```

## Team

### 1. Ahmed Mohamed Ahmed Abdou:

- Responsible for designing the user interface and writing front-end code.

### 2. Abdelrhman (DINAMOW) Abdelhameed:

- Responsible for designing the database, configuring the server, and developing the back end.
