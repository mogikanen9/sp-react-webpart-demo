## sp-react-webpart-demo

[![Build Status](https://travis-ci.org/mogikanen9/sp-react-webpart-demo.svg?branch=master)](https://travis-ci.org/mogikanen9/sp-react-webpart-demo)

### Description
Demo application which has basic record management functionality: view and manage book records. The idea is to use existing stack for SharePoint Web Parts development provided/recomemended by Microsoft folks to build a sample app.

### Built With
 - Frameworks and libraries:   
   - [React.js](https://reactjs.org/)
   - [Office UI Fabric](https://developer.microsoft.com/en-us/fabric)
   - [TypeScript](https://www.typescriptlang.org/)
   - [SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview)
 - Testing
   - [Mocha](https://mochajs.org/)
   - [Chai](http://chaijs.com/)
   - [Enzyme](http://airbnb.io/enzyme/)
 - Build tools  
   - [NPM](https://www.npmjs.com/)
   - [Gulp](https://gulpjs.com/)
 - Other
   - [Moment.js](http://momentjs.com)   

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

 * gulp clean - TODO
 * gulp test - TODO
 * gulp serve - TODO
 * gulp bundle - TODO
 * gulp package-solution - TODO


### Deployment and Installation Steps

### Running the code

1. Run local version
```bash
gulp serve
```

2. Goto [https://localhost:4321/temp/workbench.html](https://localhost:4321/temp/workbench.html)

3. Add HelloBook web part

4. Configure the webpart using the config panel 
