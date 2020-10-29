import React from 'react';

// import './styles.css';

// import Thumbnail from '../Thumbnail';
import Header from '../Header';

class UserProfile extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <p>xXfire_dragonXx</p>
          <p>420 folowers</p>
        </div>
        <div className="tab">
          <button
            className="tablinks"
            type="button"
            onClick="openTab(event, 'posts')"
          >
            Posts
          </button>
          <button
            className="tablinks"
            type="button"
            onClick="openTab(event, 'likes')"
          >
            Likes
          </button>
          <div id="posts" className="tabcontent">
            posts some posts and some more posts
          </div>
          <div id="likes" className="tabcontent">
            liked posts and more liked posts and stuff
          </div>
          {/* <Thumbnail /> */}
        </div>
      </div>
    );
  }
}

export default UserProfile;
