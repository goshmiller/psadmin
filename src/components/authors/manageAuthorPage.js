"use strict";

var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm');
var AuthorApi = require('../../api/authorApi');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({
    mixins: [
        Router.Navigation
    ],

    statics: {
        willTransitionFrom: function(transition, component) {
            if (component.state.dirty && !confirm('Leave without saving?')){
                transition.abort();
            }
        }
    },

    getInitialState: function () {
        return {
            author: {id: '', firstName: '', lastName: ''},
            errors: {},
            dirty: false
        };
    },

    componentWillMount: function() {
        //We use WillMount instead of DidMount in this case, because calling set state in this function will not
        //cause a re-render.  We want to set the state before the rendering occurs.

        //Here, we get a reference to the AuthorID that is sitting in the URL.
        //React gives access to parameters via properties (props).
        var authorId = this.props.params.id; //from the path '/author:id

        //Here we can do our test to see if it exists (if we were adding a new author, it wouldn't be here at all.
        if (authorId) {
            //In this way, if there is a parameter in the URL, we make a call via AJAX to get the id.
            //Here we set state to update the author object.  In this way if there is a parameter in the URL,
            //we update the state accordingly.
            this.setState({author: AuthorApi.getAuthorByID(authorId)});
        }
        //NOTE: if we were making an asyncronous call, (which is usually the case), you would need to handle this
        //via callback or promise.  <our mock api gives us a way to synchronously get data>
        //For simple apps, we can make an ajax call from the controller view.
    },

    setAuthorState: function (event) {
        this.setState({dirty: true});
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        return this.setState({author: this.state.author});
    },

    authorFormIsValid: function () {
        var formIsValid = true;
        this.state.errors = {}; //clear any previous errors.

        if (this.state.author.firstName.length < 3) {
            this.state.errors.firstName = 'First name must be at least 3 characters.';
            formIsValid = false;
        }

        if (this.state.author.lastName.length < 3) {
            this.state.errors.lastName = 'Last name must be at least 3 characters.';
            formIsValid = false;
        }

        //Remember, any time you are going to change state, you need to call Set State to do so.
        this.setState({errors: this.state.errors});
        return formIsValid;
        
    },

    saveAuthor: function (event) {
        event.preventDefault();

        if (!this.authorFormIsValid()) {
            return;
        }
        AuthorApi.saveAuthor(this.state.author);
        this.setState({dirty: false});
        toastr.success('Author saved. ' + this.state.author.firstName + ' ' + this.state.author.lastName);
        this.transitionTo('authors');
    },

    render: function () {
        return (
            <AuthorForm
                author={this.state.author}
                onChange={this.setAuthorState}
                onSave={this.saveAuthor}
                errors={this.state.errors}
            />
        );
    }

});

module.exports = ManageAuthorPage;