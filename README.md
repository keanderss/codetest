# Crosskey codetest
## Requirements
This project requires [Docker](https://www.docker.com) and [Docker Compose](https://docs.docker.com/compose/)
## Setup
### 1. Clone repo
### 2. Run project
Navigate to the repository on your local machine and run the command:

    docker-compose up

### 3. View project page
The spring boot application has two endpoints and runs on `localhost:8080`

Sending a GET request to

    localhost:8080/customer/all

Retrieves all customer data and sending a POST request to

    localhost:8080/customer/add

with customer data adds a new customer into the database

The frontend page made with Angular can be accessed from `localhost:80`