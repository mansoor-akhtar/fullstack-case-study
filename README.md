## Fullstack Case study

## Prerequisites

Before you begin, ensure you have the following installed on your system:

*   Docker: [Install Docker](https://docs.docker.com/get-docker/)

## Getting Started

1.  **Clone the Repository:**
    
    ```plaintext
    git clone https://github.com/mansoor-akhtar/fullstack-case-study.git
    cd fullstack-case-study
    ```
    
2.  **Docker build:**
    
    ```plaintext
    docker-compose build
    docker compose up -d
    ```
    
3.  **Database Connection:**  
    In backend directory create a copy of .env.example and name it .env, update entries for database configuration in .env file in backend laravel project
    
    ```plaintext
    DB_CONNECTION=mysql
    DB_HOST=mysql_db
    DB_PORT=3306
    DB_DATABASE=world_news
    DB_USERNAME=root
    DB_PASSWORD=root
    ```

4.  **Install backend dependencies:**  
    Go to backend container and run following command from terminal to install backend dependencies
    
    ```plaintext
    docker exec -ti backend /bin/bash
    composer install
    ```
    
5.  **Migration and Passport setup:**  
    Go to backend container and run following command from terminal to run migration and do entry for passport client
    
    ```plaintext
    docker exec -ti backend /bin/bash
    php artisan migrate
    php artisan passport:keys --force
    chmod -R 0777 ./storage
    php artisan passport:client --personal
    ```
    
6.  **Run application:**  
    After successfull running of each and every step you should be able to run the application with below url
    
    ```plaintext
    http://localhost:5173/
    ```
    
7.  **Import News from third parties (NewsApi, NewYork Times and The Guardian): using console command**

*     Import from NewsAPI

```plaintext
    docker exec -ti backend /bin/bash
    php artisan fetch:news-api
```

*       Import From NewYork Times

```plaintext
    docker exec -ti backend /bin/bash
    php artisan fetch:new-york-times-api
```

*       Import From The Guadian

```plaintext
    docker exec -ti backend /bin/bash
    php artisan fetch:the-guardian-api
```

8.  **Import News from third parties (NewsApi, NewYork Times and The Guardian) using CronJob:**

```plaintext
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```

**Note :**
Sometimes the frontend container is not starting and exit everytime when you start it, to fix this issue from terminal go to frontend directory and run the following command
```plaintext
    npm install
```