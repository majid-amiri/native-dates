import React from 'react';
import {View, Text} from 'react-native'
import Day from './Day';
import PropTypes from 'prop-types';
import idx from 'idx';
import {styles} from './Style';
import {MonthWeekdays} from "./Weekdays";

export default class Month extends React.PureComponent {
    constructor(props) {
        super(props);
        const {type} = this.props;
        this.momentPrefix = '';
        if (type === 'jalali')
            this.momentPrefix = 'j';
        else if (type === 'hijri')
            this.momentPrefix = 'i';
    }

    _renderMonthName = () => {
        const {month, moment, monthsLocale, monthNameMode, days, weekDaysLocale} = this.props;
        let monthName = this.momentPrefix ? moment(days[7].date).format(`${this.momentPrefix}MMMM`) : monthsLocale[days[7].date.getMonth()];
        let year = this.momentPrefix ? moment(days[7].date).format(`${this.momentPrefix}YYYY`) : days[7].date.getFullYear();
        let monthHeader = idx(month, _ => _.header.monthHeader) ? month.header.monthHeader(year, monthName, weekDaysLocale) : `${monthName} ${year}`;
        if (monthNameMode === 'simple' || monthNameMode === 'both') {
            return (
                <View key={monthName + year} style={idx(month, _ => _.header.headerStyle)}>
                    <Text style={[styles.monthHeader, {...idx(month, _ => _.header.headerTextStyle)}]}>
                        {monthHeader}
                    </Text>
                </View>
            )
        }
        return null
    }

    render() {
        let {days, type, changeSelection, monthsLocale, width, moment, month, weekDaysLocale, weekdaysNameMode, style} = this.props;
        let monthName = this.momentPrefix ? moment(days[7].date).format(`${this.momentPrefix}MMMM`) : monthsLocale[days[7].date.getMonth()];
        let year = this.momentPrefix ? moment(days[7].date).format(`${this.momentPrefix}YYYY`) : days[7].date.getFullYear();
        let isRTL = type === 'jalali' || type === 'hijri';
        return (
            <View style={[{
                flex: 1,
                width: width + 0.1,
                justifyContent: 'center',
                backgroundColor: '#eee'
            }, {...style}, {...idx(month, _ => _.style)}]}>
                {
                    idx(month, _ => _.header.monthHeader) ? month.header.monthHeader(year, monthName, weekDaysLocale) : [
                        this._renderMonthName(),
                        (weekdaysNameMode === 'simple' || weekdaysNameMode === 'both') && <MonthWeekdays key={year + monthName + year} {...this.props}/>
                    ]}
                <View style={[styles.monthDays, {flexDirection: isRTL ? 'row-reverse' : 'row'}]}>
                    {days.map((day, i) => {
                        return (
                            <Day
                                key={`${days[7].date.getMonth()}monthDay${i}`}
                                {...this.props}
                                disabled={day.disabled}
                                status={day.status}
                                date={day.date}
                                onDayPress={changeSelection}
                            />
                        );
                    })}
                </View>
            </View>
        );
    }
}