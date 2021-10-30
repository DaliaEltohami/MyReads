# MyReads Project

## Table of Contents

* [Description](#Description)
* [Used Languages](#used-languages)
* [Features](#features)
* [Dependencies](#dependencies)
* [Installation and Usage](#installation-and-usage)
* [Author](#author)

## Description

In MyReads project, I created a bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read. The project emphasizes using React to build the application and provides an API server and client library that you will use to persist information as you interact with the application.


## Used Languages 
- HTML
- CSS
- JS
- JSX
- React

## Features
- The main page shows 3 shelves for books. Each book is shown on the correct shelf(Currently Reading, Want to Read, Read), along with its title and all of its authors.
- The main page shows a control that allows users to move books between shelves.
- The main page has a link to `/search`, a search page that allows you to find books and add it to your library.
- When a book is on a bookshelf, it has the same state on both the main application page and the search page.
- The search page also has a link to / (the root URL), which leads back to the main page.
- When you navigate back to the main page from the search page, you see all of the selections you made on the search page in your library.


## Dependencies
- [Starter code from Udacity](https://github.com/udacity/reactnd-project-myreads-starter): The starter repo contains all the CSS and HTML markup that may be used but omits the React code that is required to complete the project.
-  prop-types : "^15.6.2",
-  react : "^16.6.3",
-  react-dom : "^16.6.3",
-  react-router-dom : "^5.3.0",
-  react-scripts : "2.1.1"

## Installation and Usage
- Prerequistes : [Node.js](https://nodejs.org/en/download/)
- To install required packages : 
```
$ cd ../MyReads
$ npm install
```
- TO run the Project :
```
$ npm start
```

## Author
- **Dalia Eltohami**
