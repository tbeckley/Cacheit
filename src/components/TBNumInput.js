import React, { Component } from 'React';
import { TextInput, ViewPropTypes, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class TBNumInput extends Component {
    _onChangeText = val => {
        const { max, min, onChangeNum } = this.props;
        onChangeNum(val > max ? max : val < min ? min : val);
    }

    render() {
        const { value, style } = this.props;
        return <TextInput value={value.toString()}
                keyboardType='numeric'
                onChangeText ={this._onChangeText}
                style={[styles.default, style]} />;
    }
}

const styles = StyleSheet.create({
    default: {
        textAlign: 'right',
        paddingRight: 0,
    }
});

TBNumInput.propTypes = {
    max: PropTypes.number,
    min: PropTypes.number,
    style: ViewPropTypes.style,
    onChangeNum: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

TBNumInput.defaultProps = {
    max: Number.MAX_SAFE_INTEGER,
    min: Number.MIN_SAFE_INTEGER
};
