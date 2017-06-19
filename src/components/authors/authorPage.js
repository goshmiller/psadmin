"use strict";

var React = require('react');
var AuthorApi = require('../../api/authorApi');
var AuthorList = require('./authorList');

var AuthorPage = React.createClass({
    getInitialState: function (){
        return {
            authors: []
        };
    },

    componentDidMount: function() {
        //Since this is our mock API, this call is synchrononous.  In the real world
        //you would need to do this asynchronously, using callbacks, or promises.
       if (this.isMounted()) {
           this.setState({authors: AuthorApi.getAllAuthors()});
       }

    },

    render: function() {

        return (
            <div>
                <h1>Authors</h1>
                <AuthorList authors={this.state.authors}/>

            </div>

        );
    }
});

module.exports = AuthorPage;

