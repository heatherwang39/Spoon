export class User {
  constructor(
    username,
    password,
    isAdmin,
    avatar,
    followers,
    following,
    recipes,
    liked,
    feed
  ) {
    this.username = username;
    this.password = password;
    this.isAdmin = isAdmin;
    this.avatar = avatar || '';
    this.followers = followers || [];
    this.following = following || [];
    this.recipes = recipes || [];
    this.liked = liked || [];
    this.feed = feed || [];
  }
}
export default User;
