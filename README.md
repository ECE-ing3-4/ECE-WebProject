# Lab 2 TypeScript

## Introduction

The basic Node.js application on TypeScript.

## Installing

```bash
git clone ***
cd ***
npm install
```

## Explanation of the test part

#get : Try to get when the database is empty
#save : Try to save, and update, data to the database and then get it back and test the value
#delete : try to delete data, and test if the data if well-deleted. Also try to delete a data that doesn't exists

Tests can be done using
```bash
npm test
```

##Middleware part

AuthCheck is a middleware function that check if the user is logged in before doing the tasks like delete a metric, show a metric, etc


## Routes

/ (POST) : render the index page
/login (GET) : render the login page
/login (POST) : try to connect the user with his credentials
/signup (GET) : render the signup page
/addmetric (GET) : render the page to add a metric (login required)
/addmetric (POST) : add a metric to the database (login required)
/deletemetric (GET) : render the page to delete a metric (login required)
/logout (GET) : log out the user, then redirect to the login page (login required)
/delete (GET) : delete the current user, then redirect to the login page (login required)
/user (POST) : try to create a new user if it doesn't already exist
/user/:usr (GET) : get the information about the user : usr (login required)
/metrics (GET) : get all the metrics from the current user (login required)
/metrics/:id (GET) : get all the metrics with the id : id (login required)
/metrics/:id/:timestamp/:username (DELETE) : delete the metric with the corresponding id, timestamp and username (login required)
/metric (POST) : delete a metric (login required)


##Parameters

req
res

## Development

```bash
npm run dev
```

## Contributors
