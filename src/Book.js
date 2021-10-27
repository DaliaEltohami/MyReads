import React , {Component} from 'react'
import PropTypes from 'prop-types'

// Define Book component which is responsible for displaying the book with it's details
class Book extends Component{

    static propTyps ={
        book : PropTypes.object.isRequired,
        handleChange : PropTypes.func.isRequired
    }

    // Handle method for updating the book shelf when changed and it takes the book and it's new shelf value
    submitChange = (e)=>{
        this.props.handleChange(this.props.book,e.target.value)
    }

    // Handler Method to render default cover image for the book if it didn't have one
    bookImage = ()=>{
        let url = '' 
        if(this.props.book.imageLinks){
            url = this.props.book.imageLinks.thumbnail
        }else{
            url = 'https://www.freepik.com/free-icon/library_15444470.htm'
        }
        return url;
    }


    render(){
        return(
            // we will return jsx to display the book 
            <li >
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193,
                         backgroundImage: `url(${this.bookImage()})` }}></div>
                    <div className="book-shelf-changer">
                        <select value = {this.props.book.shelf ? this.props.book.shelf : 'none'}
                        onChange = {this.submitChange}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                        </select>
                        </div>
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    <div className="book-authors">{this.props.book.authors}</div>
                </div>
            </li>
        )
    }
}

export default Book