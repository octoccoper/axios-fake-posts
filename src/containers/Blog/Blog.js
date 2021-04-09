import React, { Component } from 'react';

import { Route, NavLink } from 'react-router-dom';
import Posts from './Posts/Posts';
import './Blog.css';
import NewPost from '../Blog/NewPost/NewPost';
import FullPost from '../Blog/FullPost/FullPost';

class Blog extends Component {

    render () {

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink exact to='/' activeClassName="active-link">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/new-post' activeClassName="active-link">
                                    New Post
                                </NavLink>
                            </li>
                        </ul>
                    </nav>    
                </header>
                <Route path='/' exact component={Posts}/>
                <Route path='/new-post' component={NewPost}/>
                <Route path='/posts/:id' exact component={FullPost}/>
            </div>
        );
    }
}

export default Blog;