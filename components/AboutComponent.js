import React, { Component } from 'react';
import { Text, ScrollView, FlatList } from 'react-native';
import { Card, ListItem, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return{
        leaders: state.leaders
    }
}

 class About extends Component {

    render() {

        const History = ()  => {

            return (
              <Card title="Our History">
                <Text>
                  Started in 2010, Ristorante con Fusion quickly established itself as a
                  culinary icon par excellence in Hong Kong. With its unique brand of
                  world fusion cuisine that can be found nowhere else, it enjoys patronage
                  from the A-list clientele in Hong Kong. Featuring four of the best
                  three-star Michelin chefs in the world, you never know what will arrive
                  on your plate the next time you visit us.
                </Text>
                <Text> </Text>
                <Text>
                  The restaurant traces its humble beginnings to The Frying Pan, a
                  successful chain started by our CEO, Mr. Peter Pan, that featured for
                  the first time the world's best cuisines in a pan.
                </Text>
              </Card>
            );
        }

        const renderLeaderItem = ({item, index}) => {

            return (
                <ListItem
                key={index}
                hideChevron={true}
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
        }
        return(
            <ScrollView>
                <History />
                <Card>
                    <Card.Title>Corporate Leadership</Card.Title>
                <Card.Divider />
                <FlatList
                    data={this.props.leaders.leaders}
                    renderItem={renderLeaderItem}
                    keyExtractor={item => item.id.toString()} 
                />
                </Card>
            </ScrollView>
        )
    }

}

export default connect(mapStateToProps)(About);