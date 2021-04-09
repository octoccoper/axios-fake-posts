import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../../components/Post/Post';
import { Link } from 'react-router-dom';

import './Posts.css';

class Posts extends Component {

    state = {
        posts: [],
        error: false
    }

    postClickedHandler = (id) => {
        console.log("[Blog.js] postClickedHandler, id is:", id);
        this.setState({selectedPostId: id})
    }

    componentDidMount () {
        const posts = axios.get('/posts')
            .then(response => {
                const posts =  response.data.slice(0, 4);

                const updatedPosts = posts.map(post => {

                    return {
                        ...post,
                        author: 'Grogo'
                    }
                });

                this.setState({posts: updatedPosts});
                console.log(updatedPosts);
            })
            .catch(error => {
                console.log("[Blog.js] catch section, error is:", error);
                this.setState({error: true});
            });
    }

    render() {

        let posts = (<div>
            <p style={{textAlign: 'center'}}>Something went wrong with posts data. <br />
            Please try again later.</p>
        </div>)

        if(!this.state.error) {

            posts = this.state.posts.map(post => {
                return (<Link to={'/posts/' + post.id}  key={post.id}   >
                            <Post 
                                title={post.title}
                                author={post.author}
                                clicked={() => this.postClickedHandler(post.id)}/>
                        </Link>)
            });  
        
        }


        return (
            <section className="Posts">
                {posts}
            </section>
        )
    }
}

export default Posts;