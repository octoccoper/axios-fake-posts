import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {

    state = {
        loadedPost: null
    };

    componentDidMount() {

        if(this.props.match.params.id) {

            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.match.params.id)) {

                axios.get('posts/' + this.props.match.params.id)
                .then(response => {
                    this.setState({loadedPost: response.data});
                    console.log("[FullPost.js] componentDidUpdate",response);
                });
            }
        }
    }

    removePostHandler = () => {
        axios.delete('posts/' + this.props.id)
        .then(response => {
            this.setState({loadedPost: response.data});
            console.log("[FullPost.js] removePostHandler",response);
        });
    }

    render () {
        let  post = <p className="Text">Please select a Post!</p>;

        if(this.props.id) {
            post = <p className="Text">Content is loading, please wait...</p>;
        }

        if(this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button 
                            onClick={this.removePostHandler} 
                            className="Delete">
                            Delete
                        </button>
                    </div>
                </div>
            );
        }

        return post;
    }
}

export default FullPost;