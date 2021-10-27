import React, {Component} from "react";
import Book from "./Book";
import PropTypes from 'prop-types'


// ListBooks component responsible for listing the incoming books array as a grid view

class ListBooks extends Component {
    static propTypes = {
        books : PropTypes.array.isRequired,
        handleChange : PropTypes.func
    }
    
    render(){
        const books = this.props.books
        return(
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book)=>(
                        
                        //  calling Book component to view the book 
                        <Book key = {book.id} book = {book}  handleChange = {this.props.handleChange}/>

                    ))}
                </ol>
            </div>
      
        )
    }
}

export default ListBooks