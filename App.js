import React, {Component} from 'react';
import {View, StyleSheet} from "react-native";
import moment from 'moment-jalaali'
//import moment from 'moment-hijri';
import Calendar from './src/Calendar';

export default class App extends Component {
    render() {
        return (
            <View style={styles.main}>
                <Calendar
                    type={'jalali'}
                    monthsCount={10}
                    // onSelectionChange={(value) => {
                    //     console.log(value)
                    // }}
                    //bodyBackColor={'#273238'}
                    // rangeSelect={true}
                    moment={moment}
                    //staticMonthBackColor={'#3E4E54'}
                    //staticMonthTextColor={'#fff'}
                    // staticWeekdaysBackColor={'#3E4E54'}
                    // staticWeekdaysTextColor={'#fff'}
                    // day={{
                    //     commonTextColor: '#fff',
                    //     disabledTextColor: '#8c8c8c',
                    //     selectedBackColor: '#7fcbc3',
                    //     selectedTextColor: '#fff',
                    //     selectedBorderRadius: 25,
                    //     todayBorderColor: '#7fcbc3',
                    //     todayTextColor: '#7fcbc3',
                    //     todayBorderRadius: 25,
                    //     todayBorderWidth: 0.5,
                    //     inRangeBackColor: '#aaa',
                    //     inRangeTextColor: '#444',
                    //
                    // }}
                    // month={{
                    //     header: {
                    //         headerTextStyle: {
                    //             color: '#fff'
                    //         }
                    //     },
                    //     style: {
                    //         backgroundColor: '#273238'
                    //     }
                    // }}
                    //style={{ marginBottom: 200 }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex:1,
        width: '100%',
        height: '100%',
        marginTop: 50,
    }
})