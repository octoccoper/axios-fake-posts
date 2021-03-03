import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null,
        error: false
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

    postClickedHandler = (id) => {
        console.log("[Blog.js] postClickedHandler, id is:", id);
        this.setState({selectedPostId: id})
    }

    render () {

        let posts = (<div>
            <p style={{textAlign: 'center'}}>Something went wrong with posts data. <br />
            Please try again later.</p>
        </div>)

        if(!this.state.error) {

            posts = this.state.posts.map(post => {
                return <Post 
                        key={post.id}   
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postClickedHandler(post.id)}/>
            });  
        
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;