# platform-builder

# Tech Stack
* React
* SystemJS
* JSPM
* react-router
* redux

# Run

``` 
npm install
gulp build
npm start
```

# Organization

* view - Smart react components that get access to stores and the dispatcher
* components - Dumb react components that just render the props they are given
* layouts - Dumb react components used to render HTML to define the structure for that "page" or app.