import React from 'react';
import { FlatList, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

function Menu(props) {

    const renderMenuItem = ({item, index}) => {

        return (
            <ListItem
            key={index}
            onPress={() => props.onPress(item.id)}
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
    };

    return (
            <FlatList 
                data={props.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                />
    );
}


export default Menu;