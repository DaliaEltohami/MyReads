import React,{Component} from "react";
import {Link} from 'react-router-dom';
import ListBooks from "./ListBooks";
import PropTypes from 'prop-types'

//Define ListShelves component to list the three shelves of the books

class ListShelves extends Component{
    static propTypes ={
        shelves : PropTypes.array.isRequired,
        handleChange : PropTypes.func
    }


    render(){
        const shelves = this.props.shelves
        return(
            <div className = 'list-books'>
                <div className = 'list-books-title'>
                    <h1> MyReads </h1>
                </div>
                <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                    <ul>
                    {/* mapping through the shelves and call ListBooks component for each shelf to list the books in that shelf */}

                    {shelves.map((shelf, index)=>(
                        <li key = {index}>
                            <h2 className="bookshelf-title">{shelf.name}</h2>
                            <ListBooks books = {shelf.books} handleChange = {this.props.handleChange}/>
                            {/* {console.log(shelf.books)}
                            {shelf.books.map(b=>(
                            <p>book</p>
                            ))} */}
                        </li>
                    ))}
                    </ul>
                    <div className="open-search">
                        
                    {/*  Adding Link component to make alink to the search page */}

                    <Link to = '/search'>Search</Link>
                    {/* <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button> */}
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default ListShelves