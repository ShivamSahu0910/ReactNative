import React  from 'react';
import { FlatList, Image, StyleSheet} from 'react-native';
import { ListItem } from 'react-native-elements';

export default function Menu(props) {

    const styles = StyleSheet.create({
        tinyLogo: {
          width: 50,
          height: 50,
        },
      });

    const renderMenuItem = ({item, index}) => {
        return (
            <ListItem >
                <Image style={styles.tinyLogo} source={require('./images/uthappizza.png')}/>
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    }
    
    return(
        <FlatList
            data={props.dishes}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()} 
            />
    );
} 