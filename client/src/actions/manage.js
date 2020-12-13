import { addToUser } from './users';

// Methods in this file modifies the ManageUser and ManageRecipe component state

// A functon to get all users
export const getAllUsers = (manageComp) => {
  const url = '/api/users';

  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((json) => {
      if (json) {
        manageComp.setState({
          users: json,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// A functon to update the search user form while input changes
export const updateSearchUserForm = (searchComp, field) => {
  const value = field.value.toLowerCase();

  searchComp.setState({
    searchedName: value,
  });
};

export const deleteUser = async (manageComp, userId) => {
  // this request is to delete the specific user by Id
  const deleteRequest = new Request(`/api/users/${userId}`, {
    method: 'delete',
  });
  // this request is to get all updated users after delete one user
  const getUsersRequest = '/api/users';

  try {
    // delete the user
    const resDelete = await fetch(deleteRequest);
    //If the user is deleted successfully
    if (resDelete.status === 200) {
      console.log('delete the user successfully.');
      //get the deleted user
      const jsonUser = await resDelete.json();
      console.log(jsonUser);
      //delete all recipes that were created by this user
      jsonUser.recipes.forEach((recipeId) => {
        deleteRecipe(recipeId);
        deleteRecipeFromLikedList(recipeId);
      });

      jsonUser.followers.forEach((followerId) => {
        //delete this user from its follower's following list
        updateFollowersFollowingList(userId, followerId);
        console.log(`delete ${userId} from ${followerId}'s following list`);
        //delete this user's recipes from its follower's feed page
        updateFollowersFeedPage(jsonUser, followerId);
      });
    }
    // Get the updated all users
    const resGet = await fetch(getUsersRequest);
    if (resGet.status === 200) {
      const jsonUsers = await resGet.json();
      manageComp.setState({
        users: jsonUsers,
      });
      console.log('get updated users successfully.');
    }
    //delete the user's recipes
  } catch (error) {
    console.log(error);
  }
};

//delete a recipe by recipe id
export const deleteRecipe = async (recipeId) => {
  console.log(recipeId);
  // this request is to delete the recipes that were created by this user
  const deleteRecipesRequest = new Request(`/api/recipes/${recipeId}`, {
    method: 'delete',
  });
  try {
    const resDeleteRecipe = await fetch(deleteRecipesRequest);
    if (resDeleteRecipe.status === 200) {
      console.log(`delete the recipe ${recipeId} successfully`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteRecipeFromLikedList = async (recipeId) => {
  const getUsersRequest = '/api/users';
  try {
    const resGet = await fetch(getUsersRequest);
    if (resGet.status === 200) {
      const jsonUsers = await resGet.json();
      jsonUsers.forEach((user) => {
        const updatedLikedPage = user.liked.filter(
<<<<<<< HEAD
          (recipeIdInLikedPage) => recipeIdInLikedPage != recipeId
=======
          (recipeIdInLikedPage) => recipeIdInLikedPage !== recipeId
>>>>>>> 5fcc02e60740010a399c8c38c51e466440c1240c
        );
        addToUser(user._id, [
          // Update the updatedLiked(delete the user's recipe from it)
          { path: '/liked', value: updatedLikedPage },
        ]);
      });
    }
  } catch (error) {
    console.log(error);
  }
};
<<<<<<< HEAD
=======

export const deleteRecipeFromFeedPage = async (recipeId) => {
  const getUsersRequest = '/api/users';
  try {
    const resGet = await fetch(getUsersRequest);
    if (resGet.status === 200) {
      const jsonUsers = await resGet.json();
      jsonUsers.forEach((user) => {
        const updatedFeedPage = user.feed.filter(
          (recipeIdInFeedPage) => recipeIdInFeedPage !== recipeId
        );
        addToUser(user._id, [
          // Update the updatedLiked(delete the user's recipe from it)
          { path: '/feed', value: updatedFeedPage },
        ]);
      });
    }
  } catch (error) {
    console.log(error);
  }
};
>>>>>>> 5fcc02e60740010a399c8c38c51e466440c1240c

//delete a user from it's follower's following list
export const updateFollowersFollowingList = async (userId, followerId) => {
  const url = `/api/users/${followerId}`;
  try {
    const resGet = await fetch(url);
    if (resGet.status === 200) {
      const jsonFollower = await resGet.json();
      const updatedFollowingList = jsonFollower.user.following.filter(
<<<<<<< HEAD
        (id) => id != userId
=======
        (id) => id !== userId
>>>>>>> 5fcc02e60740010a399c8c38c51e466440c1240c
      );
      addToUser(followerId, [
        // Add the updatedFollowingList to follower's following list
        { path: '/following', value: updatedFollowingList },
      ]);
    }
  } catch (error) {
    console.log(error);
  }
};

//delete a user's recipes from it's follower's Feed page
export const updateFollowersFeedPage = async (jsonUser, followerId) => {
  const followerUrl = `/api/users/${followerId}`;
  try {
    const resGetFollower = await fetch(followerUrl);
    if (resGetFollower.status === 200) {
      const jsonFollower = await resGetFollower.json();
      jsonUser.recipes.forEach((recipeId) => {
        const updatedFeedPage = jsonFollower.user.feed.filter(
<<<<<<< HEAD
          (recipeIdInFeed) => recipeIdInFeed != recipeId
=======
          (recipeIdInFeed) => recipeIdInFeed !== recipeId
>>>>>>> 5fcc02e60740010a399c8c38c51e466440c1240c
        );
        addToUser(followerId, [
          // Update the updatedFeedPage of the user's follower(delete the user's recipe from it)
          { path: '/feed', value: updatedFeedPage },
        ]);
      });
    }
  } catch (error) {
    console.log(error);
  }
};
