import React, { Component } from 'react';
import { FlatList, View, Text, TouchableOpacity, Animated, Alert } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { deleteFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return{
        dishes: state.dishes,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
});

class Favorites extends Component {

    render() {

        const { navigate } = this.props.navigation;
        
        const renderMenuItem = ({item, index}) => {
            const rightButton = () => {
                return(
                    <>
                        <TouchableOpacity onPress={() => {Alert.alert(
                            'Delete Favorite?',
                            'Are you sure you wish to delete the favorite dish ' + item.name + '?',
                            [
                                { 
                                    text: 'Cancel', 
                                    onPress: () => console.log(item.name + ' Not Deleted'),
                                    style: 'cancel'
                                },
                                {
                                    text: 'OK',
                                    onPress: () => this.props.deleteFavorite(item.id)
                                }
                            ],{ cancelable: true }
                            );
                        }}>
                            <View style={{flex:1, backgroundColor: 'red', justifyContent: 'center'}}>
                                <Animated.Text style={{color: 'white', paddingHorizontal: 30,
                                        fontWeight:'900', fontSize:18}}>
                                            Delete
                                </Animated.Text>
                            </View>
                        </TouchableOpacity>
                    </>
                );
            }
            return (
                <Swipeable renderRightActions={rightButton}>
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
                </Swipeable>
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


export default connect(mapStateToProps,  mapDispatchToProps)(Favorites);