## Installation and running this solution

Once you have cloned this project, you can get started on running the application. 

### 1. Navigate into the nfl-app directory

`cd nfl-app`

### 2. Create an .env file and populate with following info: 
```
# Rails Application
DB_NAME=mysql
DB_USER=${db_user_your_choice}
DB_PASSWORD=${db_password_your_choice}
DB_HOST=db

# MySQL
MYSQL_ROOT_PASSWORD=${root_password_your_choice}
MYSQL_DATABASE=mysql
MYSQL_USER=${mysql_user_your_choice}
MYSQL_PASSWORD=${mysql_password_your_choice}
```
### 3. Build the docker app for the first time
```
$ make build
```

This command runs docker-compose up --build, both the app and database containers will be set up after.

### 4. Migrate and seed data 

In a separate terminal window, in the same directory, run: 

```
$ make seed
```

This will setup the database correctly. You can now proceed to localhost:3001 and see the app up and running.