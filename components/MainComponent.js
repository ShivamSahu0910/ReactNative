import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer'
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';

const StackNavigator = createStackNavigator();

function MenuNavigatorScreen() {
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
            />
            <StackNavigator.Screen
                name="DishDetail"
                component={DishDetail}
                options={{ headerTitle: "Dish Detail"}}
            />          
        </StackNavigator.Navigator>
    );
}

function HomeNavigatorScreen() {
    return(
        <StackNavigator.Navigator
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
                name="Home"
                component={Home}
            />

        </StackNavigator.Navigator>
    );
}

function AboutNavigatorScreen() {
    return(
        <StackNavigator.Navigator
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
                name="About"
                component={About}
            />

        </StackNavigator.Navigator>
    );
}

function ContactNavigatorScreen() {
    return(
        <StackNavigator.Navigator
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
                name="Contact"
                component={Contact}
            />

        </StackNavigator.Navigator>
    );
}

const Drawer = createDrawerNavigator();

function MainNavigatorScreen() {
    return(
        <Drawer.Navigator
        drawerStyle={{
            backgroundColor: '#C9DFE7',
            width: 240,
          }}
        initialRouteName="Home"
        >
            <Drawer.Screen
                name="Home"
                component={HomeNavigatorScreen}
                options={{ title: 'Home',drawerLabel:'Home'  }}
            />
            <Drawer.Screen
                name="About Us"
                component={AboutNavigatorScreen}
                options={{ title: 'About Us',drawerLabel:'About Us'  }}
            />
            <Drawer.Screen
                name="Menu"
                component={MenuNavigatorScreen}
                options={{ title: 'Menu', drawerLabel:'Menu' }}
            />
            <Drawer.Screen
                name="Contact Us"
                component={ContactNavigatorScreen}
                options={{ title: 'Contact Us', drawerLabel:'Contact Us' }}
            />

        </Drawer.Navigator>
    );
}
class Main extends Component {

  render() {
 
    return (
        <NavigationContainer>
            <MainNavigatorScreen/>           
        </NavigationContainer> 
    );
  }
}
  
export default Main;