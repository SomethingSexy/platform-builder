# platform-builder

## Tech Stack
* react
* react-router
* redux
* webpack

## Run

``` 
npm install
npm run compile
npm start
```

## Organization

* apps - Support for multiple single page applications within this app.  All app code will be placed within apps/\<app-name>
  * containers - Smart react components that get access to stores and the dispatcher
  * components - Dumb react components that just render the props they are given

## Configuration

.env file requires the following
```
# Application port
PORT=
# Url for api server
API_SRV_URL=
```