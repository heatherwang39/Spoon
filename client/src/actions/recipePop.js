// Methods in this file modifies the state of components that interact with the poped out recipe profile

export const openPopup = (popState, likesNum) => {
  popState.setState({ open: true, likes: likesNum });
};

export const closePopup = (popState) => {
  popState.setState({ open: false });
};

export const handleLike = (popState) => {
  if (!popState.state.liked) {
    const likes = popState.state.likes + 1;
    popState.setState({
      liked: true,
      likes: likes,
    });
  } else {
    const likes = popState.state.likes - 1;
    popState.setState({
      liked: false,
      likes: likes,
    });
  }
};
