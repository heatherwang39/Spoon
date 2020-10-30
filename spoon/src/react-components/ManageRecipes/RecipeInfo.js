import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import faker from 'faker';

import './styles.css';

class RecipeInfo extends React.Component {
  render() {
    return (
      <Card className="recipeContainer">
        <CardHeader
          title="Homemade Pizza"
          subheader="Created by Heather Wang"
        />
        <CardMedia className="recipeImage" image="./pizza.jpg" title="Recipe" />
      </Card>
    );
  }
}

export default RecipeInfo;
