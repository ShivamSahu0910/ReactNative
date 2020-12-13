import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return{
        dishes: state.dishes,
        favorites: state.favorites
    }
}

class Favorites extends Component {

    render() {

        const { navigate } = this.props.navigation;
        
        const renderMenuItem = ({item, index}) => {
    
            return (
                <ListItem
                key={index}
                hideChevron={true}
                onPress={()=> navigate('DishDetail', {dishId: item.id})}
                >
                <Avatar
                    size="small"
                    source={{ uri: baseUrl + item.image }}
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

        if (this.props.dishes.isLoading) {
            return(
                <Loading />
            );
        }
        else if (this.props.dishes.errMess) {
            return(
                <View>            
                    <Text>{this.props.dishes.errMess}</Text>
                </View>            
            );
        }
        else {
            return (
                <FlatList 
                    data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                    />
            );
        }
    }
}


export default connect(mapStateToProps)(Favorites);