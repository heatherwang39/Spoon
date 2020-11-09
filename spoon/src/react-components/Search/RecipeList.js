import React from 'react';

import './styles.css';
import * as data from '../../api/data';

import Thumbnail from '../Thumbnail';

class RecipeList extends React.Component {
  state = {
    color: 'secondary',
    recipes: data.allRecipes,
    users: data.allUsers,
  };

  closePopup = () => {
    this.setState({ editOpen: false });
  };


  render() {
    const { tags, duration, searched} = this.props;
    // this.setState({username: useLocation()})
    // const { username } = this.props.location.state;
    return (
      <div>
          { 
            this.state.recipes
            .filter((r) => {
                //tags
                if ((r.tags.filter((tag) => {
                  return tags[tag] === true
                })).length != 0) 
                  return true
            })
            .filter((r) => {
                //duration
                return r.cookTimeHrs * 60 + r.cookTimeMins <= duration[1] 
                && r.cookTimeHrs * 60 + r.cookTimeMins >= duration[0]
            })
            .filter((r) => {
                //search
                return r.recipeName.toLowerCase().includes(searched);
            })
            .map((recipe) => {              
                return (<Thumbnail
                  recipeName={recipe.recipeName}
                  owner={recipe.owner}
                  ingredients={recipe.ingredients}
                  instructions={recipe.instructions}
                  servingSize={recipe.servingSize}
                  cookTimeHrs={recipe.cookTimeHrs}
                  cookTimeMins={recipe.cookTimeMins}
                  tags={recipe.tags}
                  recipePhoto={recipe.recipePhoto}
                  likes={recipe.likes}
                />)
            })
          }
        </div>
    );
  }
}

function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && children}</div>;
}

export default RecipeList;
