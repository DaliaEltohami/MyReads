import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom'
import Search from './Search'
import ListShelves from './ListShelves'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    
    
    // shelves : ['currentlyReading','wantToRead','read'],

    // Define state properties to manage the state of the three bookshelves

    currentlyReading : [],
    wantToRead : [],
    read : [],
    books : [],
    
    value : '',

  }

  componentDidMount(){

    // we use componenDidMount lifecycle event to update the values of the three shelves when the component id mounted to the DOM 

    BooksAPI.getAll().then((books)=>{
      this.setState((currentState)=>({
        currentlyReading : books.filter(b=>(b.shelf === 'currentlyReading')),
        wantToRead : books.filter(b=>(b.shelf === 'wantToRead')),
        read : books.filter(b=>(b.shelf === 'read')),
        books : books
      }))
    })

     // console.log('hello Mounted')
    // const currentlyReading1 = [];
    // const wantToRead1 = [];
    // const read1 = []
   
    // BooksAPI.getAll().then((books)=>{
    //   books.map(book=>{
    //     if(book.shelf === 'currentlyReading'){
    //       currentlyReading1.push(book)
    //     }else if(book.shelf === 'wantToRead'){
    //       wantToRead1.push(book)
    //     }else if(book.shelf === 'read'){
    //       read1 = [...read1,book]
    //     }
    //   })
    // })

    // BooksAPI.getAll().then((books)=>{
    //   books.map(book=>{
    //     if(book.shelf === 'currentlyReading'){
          // this.setState((currentState)=>({
          //   currentlyReading : [...currentState.currentlyReading, book]
    //       }))
    //     }else if(book.shelf === 'wantToRead'){
    //       this.setState((currentState)=>({
    //         wantToRead : [...currentState.wantToRead, book]
    //       }))
    //     }else if(book.shelf === 'read'){
    //       this.setState((currentState)=>({
    //         read : [...currentState.read, book]
    //       }))
    //     }
    //   })
    // })
    
    // console.log(currentlyReading1,wantToRead1,read1)
    // this.setState((currentState)=>({
    //   currentlyReading : [...currentlyReading1] ,
    //   wantToRead : [...wantToRead1],
    //   read : [...read1]
    // }))
  }


  // Here in this handler method w define arrow function which takes the book and it's shelf then make fetch call to the server to update the value of the book shelf

  handleChange = (book,shelf) =>{

    BooksAPI.update(book,shelf).then(()=>{
      BooksAPI.getAll().then((books)=>{
        this.setState((currentState)=>({
          currentlyReading : books.filter(b=>(b.shelf === "currentlyReading")),
          wantToRead : books.filter(b=>(b.shelf === 'wantToRead')),
          read : books.filter(b=>(b.shelf === 'read')),
          books : books
        }))
      })
    })
    

  }


  render() {
    // Destructing the state properties to ease of use

    const {currentlyReading,wantToRead,read,books} = this.state

    // define shelves array which consist of three objects each one represent a shelf and have to properties name an books array 

    const shelves = [
      {
        name : 'currentlyReading',
        books : [...currentlyReading]
      },
      {
        name : 'wantToRead',
        books : [...wantToRead]
      },{
        name : 'read',
        books : [...read]
      }
    ]
    return (
      <div className = 'app'>
         {/* Define the Route of the main page and render it's component with passing props */}

        <Route exact path = '/' render = {()=>(
          // calling ListShelves component which takes the shelves array and handleChange method and it will render the list of the shelves

          <ListShelves shelves = {shelves} handleChange = {this.handleChange} />
        )}/>

        {/* Definig the Route of the search page and rendering it's component*/}
        
        <Route exact path = '/search' render = {()=>(
          // Calling Search component which will render the search page and handle the search mechanism 

          <Search books = {books} handleChange = {this.handleChange}/>
        )} />
        
      </div>
      

export default BooksApp
