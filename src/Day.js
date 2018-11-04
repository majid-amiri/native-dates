import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import {styles} from './Style';

export default class Day extends React.PureComponent {
    render() {
        let {date, status, disabled, onDayPress, width, bodyBackColor , moment , day , type} = this.props;
        let momentPrefix = '';
        if(type === 'jalali')
            momentPrefix = 'j';
        else if(type === 'hijri')
            momentPrefix = 'i';
        if( day.dayComponent ){
            return (
                <View style={{width: width / 7, height: width / 7}}>
                    {day.dayComponent(date,status,disabled,onDayPress)}
                </View>
            )
        }
        let onPress, textColor, backColor;
        let containerStyle = {};
        let circleStyle = null;
        let circleOutlineStyle = null;
        if (disabled) {
            status = 'disabled';
            onPress = null;
        } else {
            onPress = () => {
                onDayPress(date);
            }
        }
        if(date && date.toDateString() === new Date().toDateString() && status === 'common'){
            circleOutlineStyle = {
                backgroundColor: day.todayBackColor,
                width: '100%',
                height: '100%',
                borderColor: day.todayBorderColor,
                borderWidth: day.todayBorderWidth,
                borderRadius: day.todayBorderRadius * 4,
                alignItems: 'center',
                justifyContent: 'center'
            }
        }
        if (status === 'firstDay' || status === 'lastDay' || status ==='singleDate') {
            circleStyle = {
                backgroundColor: day.selectedBackColor,
                width: '100%',
                height: '100%',
                borderRadius: day.selectedBorderRadius * 4,
                alignItems: 'center',
                justifyContent: 'center'
            }
        }

        switch (status) {
            case 'disabled':
                textColor = day.disabledTextColor;
                containerStyle = {backgroundColor: day.disabledBackColor};
                break;

            case 'common':
                textColor = day.commonTextColor;
                containerStyle = {backgroundColor: day.commonBackColor};
                break;

            case 'firstDay':
                textColor = day.selectedTextColor;
                containerStyle = momentPrefix ? {backgroundColor: day.inRangeBackColor , borderTopEndRadius: day.selectedBorderRadius, borderBottomEndRadius: day.selectedBorderRadius}
                    : {backgroundColor: day.inRangeBackColor , borderTopStartRadius: day.selectedBorderRadius, borderBottomStartRadius: day.selectedBorderRadius}
                break;

            case 'lastDay':
                textColor = day.selectedTextColor;
                containerStyle = momentPrefix ? {backgroundColor: day.inRangeBackColor , borderTopLeftRadius: day.selectedBorderRadius, borderBottomLeftRadius: day.selectedBorderRadius}
                    : {backgroundColor: day.inRangeBackColor , borderTopRightRadius: day.selectedBorderRadius, borderBottomRightRadius: day.selectedBorderRadius}
                break;

            case 'inRange':
                textColor = day.inRangeTextColor;
                containerStyle = {backgroundColor: day.inRangeBackColor};
                break;

            case 'singleDate':
                textColor = day.selectedTextColor;
                containerStyle = {backgroundColor: day.commonBackColor};
                break;
        }
        if (date) {
            return (
                <TouchableOpacity
                    activeOpacity={disabled ? 1 : 0.5}
                    onPress={onPress}
                    style={[
                        styles.common,
                        {backgroundColor : bodyBackColor , width: width / 7, height: width / 7},
                        containerStyle,
                    ]}
                >
                    { circleStyle || circleOutlineStyle ? (
                        <View style={circleStyle ? circleStyle : circleOutlineStyle}>
                            <Text style={[{color: circleOutlineStyle ? day.todayTextColor : textColor} , {...day.textStyle}]}>{momentPrefix ? moment(date).format(`${momentPrefix}D`) : date.getDate()}</Text>
                        </View>
                    ) : (
                        <Text style={[{color: textColor} , {...day.textStyle}]}>{momentPrefix ? moment(date).format(`${momentPrefix}D`) : date.getDate()}</Text>
                    )}
                </TouchableOpacity>
            );
        } else {
            return (
                <View style={[styles.common, {backgroundColor : day.commonBackColor , width: width / 7, height: width / 7}]}/>
            )
        }
    }
}