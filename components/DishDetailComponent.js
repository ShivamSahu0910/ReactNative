import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Card>
                    <Card.Title>{dish.name}</Card.Title>
                    <Card.Image source={require('./images/uthappizza.png')} />
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

/*
<Card>
  <Card.FeaturedTitle >{dish.name}</Card.FeaturedTitle>
  <Card.Image source={require('./images/uthappizza.png')} />
  <Text style={{margin: 10}}>
      {dish.description}
  </Text>
</Card>
*/ 

function Dishdetail(props) {
    return(<RenderDish dish={props.dish} />);
}

export default Dishdetail;