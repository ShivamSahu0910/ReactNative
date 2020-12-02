import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state={
            dishes:DISHES
        }
    }

    render() {

        const { navigate } = this.props.navigation;

        const renderMenuItem = ({item, index}) => {

            return (
                <ListItem
                    key={index}
                    onPress={() => navigate('DishDetail', {dishId: item.id})}
                    hideChevron={true}
                >
                <Avatar
                    size="small"
                    source={require('./images/uthappizza.png')}
                    rounded
                />
                <ListItem.Content>
                    <ListItem.Title>
                    <Text>{item.name}</Text>
                    </ListItem.Title>
                    <ListItem.Subtitle>
                    <Text>{item.description}</Text>
                    </ListItem.Subtitle>
                </ListItem.Content>
                </ListItem>
            );
        }        

        return (
            <FlatList 
                data={this.state.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                />
        );
    }
}


export default Menu;