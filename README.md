### Install Docker:Docker is required to set up the MySQL database container. Follow the instructions for your operating system on the [official Docker website](https://docs.docker.com/get-docker/) to install Docker.
## Installation
    - Clone the repository:
        git clone <git@github.com:0002aakansha/CronJob-Nodejs-Task.git>
    - Install dependencies:
        - yarn install
## Set up MySQL database using Docker
    - docker compose up -d mysql
## Run Prisma migrations
    - Use the following command to apply Prisma migrations and update the database schema:
        - npx prisma migrate dev --name init
## Usage
    - To start the server and run scheduled tasks, use the following command:
        - npm start
## Technologies Used
    - Node.js
    - Express.js
    - Prisma
    - Axios
    - MySQL
    - Node-cron
    - Zod
