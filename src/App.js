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

    console.log(book.title)
    console.log(shelf)
    BooksAPI.update(book,shelf).then(()=>{
      BooksAPI.getAll().then((books)=>{
        this.setState((currentState)=>({
          currentlyReading : books.filter(b=>(b.shelf === "currentlyReading")),
          wantToRead : books.filter(b=>(b.shelf === 'wantToRead')),
          read : books.filter(b=>(b.shelf === 'read'))
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
      

      // <div className="app">
      //   {this.state.showSearchPage ? (
          // <div className="search-books">
          //   <div className="search-books-bar">
          //     <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
          //     <div className="search-books-input-wrapper">
          //       {/*
          //         NOTES: The search from BooksAPI is limited to a particular set of search terms.
          //         You can find these search terms here:
          //         https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

          //         However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
          //         you don't find a specific author or title. Every search is limited by search terms.
          //       */}
          //       <input type="text" placeholder="Search by title or author"/>

          //     </div>
          //   </div>
          //   <div className="search-books-results">
          //     <ol className="books-grid"></ol>
          //   </div>
          // </div>
      //   ) : (
      //     <div className="list-books">
      //       <div className="list-books-title">
      //         <h1>MyReads</h1>
      //       </div>
      //       <div className="list-books-content">
      //         <div>
      //           <div className="bookshelf">
      //             <h2 className="bookshelf-title">Currently Reading</h2>
      //             <div className="bookshelf-books">
      //               <ol className="books-grid">
      //                 <li>
      //                   <div className="book">
      //                     <div className="book-top">
      //                       <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
      //                       <div className="book-shelf-changer">
      //                         <select>
      //                           <option value="move" disabled>Move to...</option>
      //                           <option value="currentlyReading">Currently Reading</option>
      //                           <option value="wantToRead">Want to Read</option>
      //                           <option value="read">Read</option>
      //                           <option value="none">None</option>
      //                         </select>
      //                       </div>
      //                     </div>
      //                     <div className="book-title">To Kill a Mockingbird</div>
      //                     <div className="book-authors">Harper Lee</div>
      //                   </div>
      //                 </li>
      //                 <li>
      //                   <div className="book">
      //                     <div className="book-top">
      //                       <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")' }}></div>
      //                       <div className="book-shelf-changer">
      //                         <select>
      //                           <option value="move" disabled>Move to...</option>
      //                           <option value="currentlyReading">Currently Reading</option>
      //                           <option value="wantToRead">Want to Read</option>
      //                           <option value="read">Read</option>
      //                           <option value="none">None</option>
      //                         </select>
      //                       </div>
      //                     </div>
      //                     <div className="book-title">Ender's Game</div>
      //                     <div className="book-authors">Orson Scott Card</div>
      //                   </div>
      //                 </li>
      //               </ol>
      //             </div>
      //           </div>
      //           <div className="bookshelf">
      //             <h2 className="bookshelf-title">Want to Read</h2>
      //             <div className="bookshelf-books">
      //               <ol className="books-grid">
      //                 <li>
      //                   <div className="book">
      //                     <div className="book-top">
      //                       <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api")' }}></div>
      //                       <div className="book-shelf-changer">
      //                         <select>
      //                           <option value="move" disabled>Move to...</option>
      //                           <option value="currentlyReading">Currently Reading</option>
      //                           <option value="wantToRead">Want to Read</option>
      //                           <option value="read">Read</option>
      //                           <option value="none">None</option>
      //                         </select>
      //                       </div>
      //                     </div>
      //                     <div className="book-title">1776</div>
      //                     <div className="book-authors">David McCullough</div>
      //                   </div>
      //                 </li>
      //                 <li>
      //                   <div className="book">
      //                     <div className="book-top">
      //                       <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url("http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api")' }}></div>
      //                       <div className="book-shelf-changer">
      //                         <select>
      //                           <option value="move" disabled>Move to...</option>
      //                           <option value="currentlyReading">Currently Reading</option>
      //                           <option value="wantToRead">Want to Read</option>
      //                           <option value="read">Read</option>
      //                           <option value="none">None</option>
      //                         </select>
      //                       </div>
      //                     </div>
      //                     <div className="book-title">Harry Potter and the Sorcerer's Stone</div>
      //                     <div className="book-authors">J.K. Rowling</div>
      //                   </div>
      //                 </li>
      //               </ol>
      //             </div>
      //           </div>
      //           <div className="bookshelf">
      //             <h2 className="bookshelf-title">Read</h2>
      //             <div className="bookshelf-books">
      //               <ol className="books-grid">
      //                 <li>
      //                   <div className="book">
      //                     <div className="book-top">
      //                       <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url("http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api")' }}></div>
      //                       <div className="book-shelf-changer">
      //                         <select>
      //                           <option value="move" disabled>Move to...</option>
      //                           <option value="currentlyReading">Currently Reading</option>
      //                           <option value="wantToRead">Want to Read</option>
      //                           <option value="read">Read</option>
      //                           <option value="none">None</option>
      //                         </select>
      //                       </div>
      //                     </div>
      //                     <div className="book-title">The Hobbit</div>
      //                     <div className="book-authors">J.R.R. Tolkien</div>
      //                   </div>
      //                 </li>
      //                 <li>
      //                   <div className="book">
      //                     <div className="book-top">
      //                       <div className="book-cover" style={{ width: 128, height: 174, backgroundImage: 'url("http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api")' }}></div>
      //                       <div className="book-shelf-changer">
      //                         <select>
      //                           <option value="move" disabled>Move to...</option>
      //                           <option value="currentlyReading">Currently Reading</option>
      //                           <option value="wantToRead">Want to Read</option>
      //                           <option value="read">Read</option>
      //                           <option value="none">None</option>
      //                         </select>
      //                       </div>
      //                     </div>
      //                     <div className="book-title">Oh, the Places You'll Go!</div>
      //                     <div className="book-authors">Seuss</div>
      //                   </div>
      //                 </li>
      //                 <li>
      //                   <div className="book">
      //                     <div className="book-top">
      //                       <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url("http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api")' }}></div>
      //                       <div className="book-shelf-changer">
      //                         <select>
      //                           <option value="move" disabled>Move to...</option>
      //                           <option value="currentlyReading">Currently Reading</option>
      //                           <option value="wantToRead">Want to Read</option>
      //                           <option value="read">Read</option>
      //                           <option value="none">None</option>
      //                         </select>
      //                       </div>
      //                     </div>
      //                     <div className="book-title">The Adventures of Tom Sawyer</div>
      //                     <div className="book-authors">Mark Twain</div>
      //                   </div>
      //                 </li>
      //               </ol>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //       <div className="open-search">
      //         <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
      //       </div>
      //     </div>
      //   )}
      // </div>
    )
  }
}

export default BooksApp
