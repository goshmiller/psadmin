"use strict";

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var AuthorApi = require('../../api/authorApi');
var AuthorList = require('./authorList');



var AuthorPage = React.createClass({
    getInitialState: function (){
        return {
            authors: []
        };
    },

    componentDidMount: function() {
        //Since this is our mock API, this call is synchronous.  In the real world
        //you would need to do this asynchronously, using callbacks, or promises.
       if (this.isMounted()) {
           this.setState({authors: AuthorApi.getAllAuthors()});
       }

    },

    render: function() {

        return (
            <div>
                <h1>Authors</h1>
                <Link to="addAuthor" className="btn btn-default">Add Author</Link>
                <AuthorList authors={this.state.authors}/>

            </div>

        );
    }
});

module.exports = AuthorPage;

