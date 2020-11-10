# team18

Note: We tried to fix as many console warnings/errors as possible but there’s a findDOMNode error we can’t get rid of, we’re very very sorry. :(

## How to Use
In the terminal, once you’ve opened the repository:
```
cd spoon
npm install
npm start
```
The site will be on http://localhost:3000/.


## Login Credentials
Currently, you can navigate to the login page by going to the Account drop down menu on the header and either clicking sign in (as a guest) or clicking log out (as a user/admin). Then you can use the following credentials to ‘log in’:  username: ‘user’, password: ‘user’, or username: ‘admin’, password: ‘admin’. Currently, logging in correctly will simply change the header to the corresponding header for user/admin, as it is not connected to the other pages yet. We’ll implement the real login function in phase 2.

In order to switch between user accounts to view the different pages, you need to change the state variables in App.js. There are 2 state variables, userMode and username. Changing userMode between ‘guest’, ‘user’, and ‘admin’ will allow you to view the 3 different versions of the site. In order to see the site as a specific user, you will need to change username. We currently have 4 different users, ‘user1’, ‘user2’, ‘user3’, and ‘user3’. However, there is not much difference between them, so viewing just ‘user1’ should suffice.

## Guest Instructions
Before logging in or signing up for an account, users are guests who can freely browse posted recipes and users, as well as search for recipes and accounts (more detail below). 

## User Instructions
Upon logging in, users arrive on the “Feed” page, where they can see their feed, which includes thumbnails of recipes that chefs they follow have posted, or navigate to the “Discover” tab using the bar on the left. There, they can see all the most recently posted recipes (including from users who they do not follow). To go back to the “Feed” at any time, users can click on the Spoon logo in the top left. To see more information about the recipes, the users can click anywhere on the thumbnail and a popup will open with all the recipe details. 

They can like a recipe by clicking on the heart icon of the thumbnail of that recipe or by opening the recipe in a popout. Once they liked a recipe, the liked number of that recipe will increase by 1. They can cancel their like by clicking that heart again and the liked number will decrease by 1 accordingly.

Users can click on the username under recipe names on the thumbnail which will redirect them to the user's profile. Upon visiting another user’s profile, users can choose to follow the user, as well as view their recipes and liked recipes. 

On the top navigation bar, there is a “Search” and “Account” tab. In search, users can search for recipes by typing in its name, selecting specific tags, or drag the slider to filter recipe cook times. Users can also choose to search for users instead by typing in their usernames. 

In “Account”, users can choose to look at their profile, create a recipe, or log out. On their own profiles, users can see their own recipes and favourites. Here, they can also edit and delete their recipes (to be implemented fully in phase 2). When creating a recipe, it will redirect them to the create recipe page (will also be implemented fully in phase 2). Once users log out, they will be redirected to the sign in page once more.

## Admin Instructions
Admins have all the user functionalities listed above. However, in their top navigation bar, there is an extra ‘Manage’ tab. In the manage dropdown, admins can manage all the users or recipes. Each manage page has a list of all the users / recipes with the option to delete them. The admins can also search specific users or recipes by entering the keywords.

On the Manage User page, if the admins want to see the details of a specific user,  they can click on the user’s name and it takes them to the corresponding user’s profile page. 
On the Manage Recipe page, they can click on the recipes’s photo or the recipes’s name, the corresponding recipe page will pop out to show more details.

## Third-Party Libraries
- Material-UI/core
- Material-UI/icons
- React-uid
- ESLint
- Faker.js
