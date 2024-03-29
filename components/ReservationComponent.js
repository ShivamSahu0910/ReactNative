import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Switch, Button, TouchableOpacity, Alert, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Moment from 'moment';
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';
import {Notifications} from 'expo';//•	import * as Notifications from 'expo-notification' is latest but still not working thus using this.

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: new Date(),
            show: false,
            mode: 'date',
        }
    }

    handleReservation() {
        Alert.alert(
            'Your Reservation OK?',
            'Number of Guests: ' + this.state.guests + '\nSmoking? '+ this.state.smoking +'\nDate and Time:' + this.state.date,
            [
                {text: 'Cancel', onPress: () => { console.log('Cancel Pressed'); this.resetForm();}, style: 'cancel'},
                {text: 'OK', onPress: () => { 
                    this.presentLocalNotification(this.state.date);
                    //this.getDefaultCalendarSource();
                    this.addReservationToCalendar(this.state.date);
                    this.resetForm(); 
                    }
                },
            ],
            { cancelable: false }
        );
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date(),
            show: false,
            mode: 'date',
        });
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    obtainCalendarPermission = async () => {
        let permission = await Permissions.getAsync(Permissions.CALENDAR);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.CALENDAR);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    getDefaultCalendarSource = async () => {
        let calendar = null;
    if (Platform.OS === 'ios') {
      // ios: get default calendar
      calendar = await Calendar.getDefaultCalendarAsync();
    } else {
      // Android: find calendar with `allowsModifications` == true
      const calendars = await Calendar.getCalendarsAsync();
      calendar = (calendars) ?
        (calendars.find(cal => cal.allowsModifications) || calendars[0])
        : null;
    }
    return (calendar) ? calendar.id : null;
    }

    addReservationToCalendar = async ( date ) => {
        await this.obtainCalendarPermission();

        const tempDate = Date.parse(date)
        const startDate = new Date(tempDate)
        const endDate = new Date(tempDate + 2 * 60 * 60 * 1000)

        const calendarID = await this.getDefaultCalendarSource();

        await Calendar.createEventAsync(calendarID, {
            title: 'Con Fusion Table Reservation',
            startDate: startDate,
            endDate: endDate,
            timeZone: 'Asia/Hong_Kong',
            location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
        })
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for '+ date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }


    
    render() {
        return(
            <ScrollView>
                <Animatable.View animation="zoomIn" duration={2000} >
                    <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                    </Picker>
                    </View>
                    <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.smoking}
                        onTintColor='#512DA8'
                        onValueChange={(value) => this.setState({smoking: value})}>
                    </Switch>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date and Time</Text>
                        <TouchableOpacity style={styles.formItem}
                                style={{
                                    padding: 7,
                                    borderColor: '#512DA8',
                                    borderWidth: 2,
                                    flexDirection: "row"
                                }}
                                onPress={() => this.setState({ show: true, mode: 'date' })}
                        >
                            <Icon type='font-awesome' name='calendar' color='#512DA8' />
                            <Text >
                                {' ' + Moment(this.state.date).format('DD-MMM-YYYY h:mm A') }
                            </Text>
                        </TouchableOpacity>
                        {/* Date Time Picker */}
                        {this.state.show && (
                            <DateTimePicker
                                value={this.state.date}
                                mode={this.state.mode}
                                minimumDate={new Date()}
                                minuteInterval={15}
                                onChange={(event, date) => {
                                    if (date === undefined) {
                                        this.setState({ show: false });
                                    }
                                    else {
                                        this.setState({
                                            show: this.state.mode === "time" ? false : true,
                                            mode: "time",
                                            date: new Date(date)
                                        });
                                    }
                                }}
                            />
                        )}
                    </View>
                    <View style={styles.formRow}>
                    <Button
                        onPress={() => this.handleReservation()}
                        title="Reserve"
                        color="#512DA8"
                        accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                </Animatable.View>
            </ScrollView>
        );
    }

};

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1,
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
});

export default Reservation;