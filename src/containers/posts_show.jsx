import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPost } from '../actions/index'
import { bindActionCreators } from 'redux';

class PostsShow extends Component {

  componentWillMount() {
    if (!this.props.post) {
      this.props.fetchPost(this.props.match.params.id);
    }
  }

  render() {
    if (!this.props.post) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <div className="post-item">
          <h3>{this.props.post.title}</h3>
          <p>{this.props.post.content}</p>
        </div>
        <Link to="/">
          Back
        </Link>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPost }, dispatch);
}

function mapStateToProps(state, ownProps) {
  const idFromUrl = parseInt(ownProps.match.params.id, 10);
  const post = state.posts.find(p => p.id === idFromUrl);
  return {post};
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsShow);
