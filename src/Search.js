import React,{Component} from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'


// Search Component resposible for displaying the searched books result and choose books to be added to MyReads 
class Search extends Component{

    static propTypes = {
        handleChange : PropTypes.func.isRequired
    }
    
    // Define state properties to save the result of the search 
    state = {
        // array to save the searched books result that returned from the fetch call to the server
        searchedBooks : [],
        // this value property will manage the inpute value to b the same value of the state value so it will be a controlled component
        value :'',
        // to handle the error of notFound result from search
        notFound : false,
    }

    // handle method to manage the value property on input value change
    changeValue(value){
        console.log(value)
        this.setState({value : value})
        // invokig handleInputChange method passing it the value
        this.handleInputChange(value)

        
    }

    // this method will handle the search mechanism 
    handleInputChange = (input)=>{
        const mainBooks = this.props.books
        
        // checking if there is an input 
        if(input)
        {
            // make api call to search the books passing the value of the input
            BooksAPI.search(input).then((books)=>{
                
                // checking if the returned promise from the api call contains array of books or not
                if (books.length)
                {
                    // if true then make the value of searchedBooks state equals to the returned array of books
                    
                    this.setState({
                        searchedBooks : books.map(b1=>{
                            mainBooks.map(b2=>{
                                if(b1.id === b2.id){
                                    b1.shelf = b2.shelf
                                }
                                return b1;
                            })
                            return b1;
                        }),
                        notFound : false

                    })
                
                }else{

                    // if no returned array then the promise returned error an we will make the searchedBooks equal to empty array and notFound to true
                    this.setState((currentState)=>({
                        searchedBooks : [],
                        notFound : true
                    }))
                    
                }
            })
        }else{
            // if there is no input we will set the input value to empty string and the searchBooks also to empty array 
            this.setState({
                searchedBooks : [],
                input : '',
                notFound : false
            })
        }
    }

    render(){
        
        return(
                // rendering search page
                <div className="search-books">
                    <div className="search-books-bar">
                    {/* make a Link to the main page MyReads */}
                    <Link to = '/' className = 'close-search'>Close</Link>
                    {/* <button className="close-search" >Close</button> */}
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        {/* setting the properties of the input field the value will equal to state value to be controlled and add onChange event to handle the input changes */}
                        <input 
                        type="text" 
                        placeholder="Search by title or author" 
                        value = {this.state.value}
                        onChange = {(e)=>this.changeValue(e.target.value)}
                        />

                    </div>
                    </div>
                    <div className="search-books-results">
                    <ol className="books-grid">
                        {/* {!this.state.notFound ? 
                        (<ListBooks books = {this.state.searchedBooks} handleChange = {this.props.handleChange} />
                        ):( 
                        <p>Not Found</p>
                        )}
                         */}
                        {/* check if there is input value and notFound is false then there is a book list to render by calling ListBooks component */}
                        {(this.state.value && !this.state.notFound)&&(
                            <ListBooks books = {this.state.searchedBooks} handleChange = {this.props.handleChange} shelf = ''/>
                        )}
                        {/* if notFound is ture then render Not Found */}
                        {this.state.notFound && 
                        <p>Not Found</p>
                        }
                        
                    </ol>
                    </div>
                </div>
        )
    }
}

export default Search
