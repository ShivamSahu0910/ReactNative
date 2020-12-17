import React, { Component } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import Login from './LoginComponent';
import About from './AboutComponent';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders} from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }

const mapDispatchToProps = dispatch => {
    return{
        fetchDishes: () => dispatch(fetchDishes()),
        fetchComments: () => dispatch(fetchComments()),
        fetchPromos: () => dispatch(fetchPromos()),
        fetchLeaders: () => dispatch(fetchLeaders())
    }
}

const StackNavigator = createStackNavigator();

function MenuNavigatorScreen({ navigation }) {
    return(
        <StackNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <StackNavigator.Screen
                name="Menu"
                component={Menu}
                options={{ headerTitle: "Menu",
                headerLeft:() => ( <Icon name="menu" size={24}
                        iconStyle={{marginLeft: 10}} 
                        color= 'white'
                        onPress={ () => navigation.toggleDrawer() } />)
            }}
            />
            <StackNavigator.Screen
                name="DishDetail"
                component={DishDetail}
                options={{ headerTitle: "Dish Detail"}}
            />          
        </StackNavigator.Navigator>
    );
}

function HomeNavigatorScreen({ navigation }) {
    return(
        <StackNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                },
                headerLeft:() => ( <Icon name="menu" size={24}
                        iconStyle={{marginLeft: 10}} 
                        color= 'white'
                        onPress={ () => navigation.toggleDrawer() } />)
            }}
        >
            <StackNavigator.Screen
                name="Home"
                component={Home}
            />
        </StackNavigator.Navigator>
    );
}

function AboutNavigatorScreen({ navigation }) {
    return(
        <StackNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                },
                headerLeft:() => ( <Icon name="menu" size={24}
                        iconStyle={{marginLeft: 10}} 
                        color= 'white'
                        onPress={ () => navigation.toggleDrawer() } />)
            }}
        >
            <StackNavigator.Screen
                name="About Us"
                component={About}
            />
        </StackNavigator.Navigator>
    );
}

function ContactNavigatorScreen({ navigation }) {
    return(
        <StackNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                },
                headerLeft:() => ( <Icon name="menu" size={24}
                        iconStyle={{marginLeft: 10}} 
                        color= 'white'
                        onPress={ () => navigation.toggleDrawer() } />)
            }}
        >
            <StackNavigator.Screen
                name="Contact Us"
                component={Contact}
            />
        </StackNavigator.Navigator>
    );
}

function ReservationNavigatorScreen({ navigation }) {
    return(
        <StackNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                },
                headerLeft:() => ( <Icon name="menu" size={24} 
                        iconStyle={{marginLeft: 10}}
                        color= 'white'
                        onPress={ () => navigation.toggleDrawer() } />)
            }}
        >
            <StackNavigator.Screen
                name="Resevation"
                component={Reservation}
            />
        </StackNavigator.Navigator>
    );
}

function FavoritesNavigatorScreen({ navigation }) {
    return(
        <StackNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                },
                headerLeft:() => ( <Icon name="menu" size={24}
                        iconStyle={{marginLeft: 10}} 
                        color= 'white'
                        onPress={ () => navigation.toggleDrawer() } />)
            }}
        >
            <StackNavigator.Screen
                name="My Favorites"
                component={Favorites}
            />
        </StackNavigator.Navigator>
    );
}

function LoginNavigatorScreen({ navigation }) {
    return(
        <StackNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                },
                headerLeft:() => ( <Icon name="menu" size={24}
                        iconStyle={{marginLeft: 10}} 
                        color= 'white'
                        onPress={ () => navigation.toggleDrawer() } />)
            }}
        >
            <StackNavigator.Screen
                name="Login"
                component={Login}
            />
        </StackNavigator.Navigator>
    );
}

const CustomDrawerContentComponent = (props) => (
    <DrawerContentScrollView {...props}>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{ flex: 1 }}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{ flex: 1.75 }}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItemList {...props} />
        </SafeAreaView>
    </DrawerContentScrollView>
);

const Drawer = createDrawerNavigator();

function MainNavigatorScreen() {
    return(
        <Drawer.Navigator
            drawerStyle={{
                backgroundColor: '#D1C4E9'
            }}
            initialRouteName="Home"
            drawerContent={ props => <CustomDrawerContentComponent {...props} /> }
        >
            <Drawer.Screen
                name="Login"
                component={LoginNavigatorScreen}
                options={{ headerTitle: 'Login', drawerLabel:'Login',
                drawerIcon: () => (
                    <Icon
                    name='sign-in'
                    type='font-awesome'            
                    size={24}
                    />
                  ) 
                }}
            />
            <Drawer.Screen
                name="Home"
                component={HomeNavigatorScreen}
                options={{ headerTitle: 'Home', drawerLabel:'Home',
                drawerIcon: () => (
                    <Icon
                    name='home'
                    type='font-awesome'            
                    size={24}
                    />
                  ) 
                }}
            />
            <Drawer.Screen
                name="About Us"
                component={AboutNavigatorScreen}
                options={{ headerTitle: 'About Us', drawerLabel:'About Us',
                drawerIcon: () => (
                    <Icon
                    name='info-circle'
                    type='font-awesome'            
                    size={24}
                    />
                  )
                }}
            />
            <Drawer.Screen
                name="Menu"
                component={MenuNavigatorScreen}
                options={{ headerTitle: 'Menu', drawerLabel:'Menu',
                drawerIcon: () => (
                    <Icon
                    name='restaurant-menu'
                    type='material'            
                    size={24}
                    />
                  )
                }}
            />
            <Drawer.Screen
                name="Contact Us"
                component={ContactNavigatorScreen}
                options={{ headerTitle: 'Contact Us', drawerLabel:'Contact Us',
                drawerIcon: () => (
                    <Icon
                    name='address-card'
                    type='font-awesome'            
                    size={24}
                    />
                  )
                }}
            />
            <Drawer.Screen
                name="My Favorites"
                component={FavoritesNavigatorScreen}
                options={{ headerTitle: 'My Favorites', drawerLabel:'My Favorites',
                drawerIcon: () => (
                    <Icon
                    name='heart'
                    type='font-awesome'            
                    size={24}
                    />
                  )
                }}
            />
            <Drawer.Screen
                name="Reserve Table"
                component={ReservationNavigatorScreen}
                options={{ headerTitle: 'Reserve table', drawerLabel:'Reserve Table',
                drawerIcon: () => (
                    <Icon
                    name='cutlery'
                    type='font-awesome'            
                    size={24}
                    />
                  )
                }}
            />
        </Drawer.Navigator>
    );
}
class Main extends Component {

    componentDidMount(){
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

  render() {
 
    return (
        <View style={{ flex: 1, paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight }}>
            <NavigationContainer>
                <MainNavigatorScreen/>
            </NavigationContainer>
        </View> 
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
})
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);;