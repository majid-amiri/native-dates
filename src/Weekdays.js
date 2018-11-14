import React from 'react';
import {styles} from "./Style";
import {View, Text} from "react-native";
import idx from "idx/lib/idx";

const jalaliWeekdays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
const hijriWeekdays = ['س', 'ح', 'ن', 'ث', 'ع', 'خ', 'ج'];

export const StaticWeekdays = (props) => {
    const {weekDaysLocale, width, type, staticWeekdaysBackColor, staticWeekdaysTextColor} = props;
    const weekDays = type === 'jalali' ? jalaliWeekdays : type === 'hijri' ? hijriWeekdays : weekDaysLocale;
    const isRTL = ['jalali', 'hijri'].some(item => item === type);
    return (
        <View
            style={[styles.weekDayNames, staticWeekdaysBackColor && {backgroundColor: staticWeekdaysBackColor}, isRTL && {flexDirection: 'row-reverse'}]}>
            {weekDays.map((dayName, i) => {
                return (
                    <View key={i} style={[styles.weekDayNamesItem, {width: (width) / 7, height: (width) / 7}]}>
                        <Text
                            style={[{color: '#444'}, staticWeekdaysTextColor && {color: staticWeekdaysTextColor}]}>{dayName}</Text>
                    </View>
                );
            })}
        </View>
    );
};

export const MonthWeekdays = (props) => {
    const {days, month, weekDaysLocale, width, type} = props;
    const weekDays = type === 'jalali' ? jalaliWeekdays : type === 'hijri' ? hijriWeekdays : weekDaysLocale;
    return (
        <View key={`month${days[7].date.getMonth()}Weekdays`}
              style={[{...styles.weekDayNames}, {borderBottomWidth: 0}, {...idx(month, _ => _.header.weekdaysStyle)}]}>
            {weekDays.map((dayName, i) => {
                return (
                    <View
                        key={`month${days[7].date.getMonth()}WeekdayName${i}`}
                        style={[{...styles.weekDayNamesItem},
                            {
                                width: width / 7,
                                height: width / 7
                            },
                            {...idx(month, _ => _.header.weekdaysItemStyle)}
                        ]}
                    >
                        <Text style={idx(month, _ => _.header.weekdaysTextStyle)}>{dayName}</Text>
                    </View>
                );
            })}
        </View>
    )
}
