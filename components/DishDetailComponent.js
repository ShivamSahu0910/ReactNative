import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList , StyleSheet, Modal, Button } from 'react-native';
import { Card, Icon, Input, Rating } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return{
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <View>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                        <Card>
                            <Card.Title>{dish.name}</Card.Title>
                            <Card.Image source={{ uri: baseUrl + dish.image }} />
                            <Text style={{margin: 10}}>
                                {dish.description}
                            </Text>
                            <View style = {styles.centerItems}>
                                <Icon raised reverse name={props.favorite?'heart':'heart-o'} type='font-awesome' color='#f50' onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()} />
                                <Icon raised reverse name="pencil" type="font-awesome" color="#512DA8" onPress={() => props.toggleModal()} />
                            </View>
                        </Card>
                    </Animatable.View>
                </View>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {

    const comments = props.comments;

    const renderCommentItem = ({item, index}) => {

        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Rating style={styles.rating} imageSize={12} readonly startingValue={item.rating} />
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };

    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card>
                <Card.Title>Comments</Card.Title>
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                    />
            </Card>
        </Animatable.View>
    );
}

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            author:"",
            comment: "",
            rating: '',
            showModal: false
        }
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }
    
    handleComment(dishId) {
        console.log(JSON.stringify(this.state));
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
        this.toggleModal();
      }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    render(){
        const dishId = this.props.route.params.dishId;

        return(
            <ScrollView style={{flex: 1}}>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} favorite={this.props.favorites.some(el => el === dishId)} onPress={()=> this.markFavorite(dishId)} toggleModal={() => this.toggleModal()} />
                <Modal 
                    animationType = {"slide"} 
                    transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => {this.toggleModal(); }}
                    onRequestClose = {() => {this.toggleModal(); }}>
                    <View style = {styles.modal}>
                    <Rating
                        onFinishRating={value => this.setState({ rating: value })}
                        ratingCount={5}
                        showRating
                        startingValue={5} 
                        type="star"
                        />
                    <Input
                        placeholder="Author"
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        style={styles.formRow}
                        onChangeText={value => this.setState({ author: value })}
                        />
                    <Input
                        placeholder="Comment"
                        leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                        style={styles.formRow}
                        onChangeText={value => this.setState({ comment: value })}
                        />    
                        <Button 
                            onPress = {() => this.handleComment(dishId) }
                            style={styles.formItem}
                            color="#512DA8"
                            title="Submit" 
                            />
                        <View style={styles.formItem} />    
                        <Button 
                            onPress = {() => this.toggleModal() }
                            style={styles.formItem}
                            color="#808080"
                            title="Cancel" 
                            />
                    </View>
                </Modal>
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    centerItems: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: "row"
     },
     modal: {
        justifyContent: 'center',
        margin: 20
     },
     formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
      },
      formItem: {
          flex: 1,
          margin: 10
      },
      rating: {
          justifyContent: 'flex-start',
          alignContent: 'flex-start',
          flexDirection: 'row'
      }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);