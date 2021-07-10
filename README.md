# MockingJay

This is a mock REST application that can be used to try your test tools. Use the service configuration file to configure the response times and other configuration parameters.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine. It runs on some default ports that will soon become configurable. Please read all the below pre-requisites and tips.

### Prerequisites

You will need the following installed before you can continue:


    Node
    MongoDB 
    Postman (to test the REST calls)


### Quick Start

Once you have Node and MongoDB installed, you can proceed to install all the dependencies:


    $ npm install


After all the dependencies have been installed, ensure your MongoDB is started

    $ <MongoDB Install Path>/bin/mongod

> TIP: Try to setup MongoDB as a service so you can start and stop it gracefully. See [MongoDB on Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/), [MongoDB on MAC](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) or [MongoDB on Linux](https://docs.mongodb.com/manual/administration/install-on-linux/) for more information.


Next start the application:

    $ npm start

The application will attempt to start on default port 8081. If this is in use, this can be changed in the `config/config.js` application configuration file. Make the necessary change in the corresponding environment section (`dev` or `production`).

```js
    const config_dev = {
	   "MONGO_URI" : "mongodb://localhost:27017/mockingjay-dev",
	   "APP_PORT" : "8081"
    }

    const config_prod = {
	   "MONGO_URI" : "mongodb://localhost:27017/mockingjay-prod",
	   "APP_PORT" : "80"
    }
```

If you see the `Server running on http://<host>:<port>` message, then you have successfully started the application.

### REST calls

#### POST Create User
Create a new user with the email and password combination. The email will be required to be unique.

```js
    URL: http://hostname:port/api/users
    TYPE: POST
    HEADER: Content-Type:application/json
    BODY : {
             "user": {
               "email": "someuser",
               "password": "somepassword"
             }
           }
```


#### POST Login
A Login using email and password that was used during user creation. The request will return a valid token that will be stored in the `MongoDB: users` collection.


```js
    URL: http://hostname:port/api/users/login
    TYPE: POST
    HEADER: Content-Type:application/json
    BODY : {
             "user": {
               "email": "someuser",
               "password": "somepassword"
             }
           }
```

#### GET PageOne
This is a public REST resource. You can access it without having a valid token.

```js
    URL: http://hostname:port/api/users/pageone
    TYPE: GET
    HEADER: Content-Type: application/json 
```

#### GET PageTwo
This is a private REST resource. To access it, you need to LOGIN successfully and obtain a valid token.

```js
    URL: http://hostname:port/api/users/pagetwo
    TYPE: GET
    HEADER: Content-Type: application/json
            Authorization: Bearer <token>
```

#### POST AddTasks
Add Tasks to the Users. To POST you will need a valid token.

```js
    URL: http://hostname:port/api/users/addtask
    TYPE: POST
    HEADER: Content-Type: application/x-www-form-urlencoded
            Authorization: Bearer <token>
    BODY: task: <Some Task Name>
          duedate: <Date-Time stamp>
```
> TIP: The Date-Time stamp is required in the following format `YYYY-MM-DDTHH:MM:SS.MSZ`. Eg: `2019-02-12T22:45:23Z`

> TIP: Try to use the [`Postman` collection](https://github.com/husainkhambaty/mockingjay/blob/master/Postman_Collection.json) provided for a quick test.
