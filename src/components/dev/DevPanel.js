import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DevButton from './DevButton';

import { connect } from 'react-redux';
import { loadStateFromMemory } from '../../util/storageHelper';
import actions from '../../store/actions';
import Reactotron from 'reactotron-react-native';

import { fetchSubreddit } from '../../util/requestHelper';

import backgroundTask from '../../util/backgroundHelper';

function mapStateToProps (state) {
    return {
        state,
    };
}

function mapDispatchToProps (dispatch) {
    return {
        addSub: (sub, comments) => dispatch(actions.addSubreddit(sub, comments)),
        resetState: () => dispatch(actions.resetState()),
        dispatch,
    };
}
class DevPanel extends Component {

    makeid = () => {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for(let i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    addRandomSub = () => {
        const { addSub } = this.props;
        this.props.addSub(this.makeid());
    }

    green = () => {
        const { state, dispatch } = this.props;
        backgroundTask(state, dispatch);
    }

    render () {
        return (<View style={styles.containerStyle}>
                    <Text style={styles.fontStyle}> Dev Panel </Text>
                    <DevButton theme='grass' onPress={this.green} />
                    <DevButton theme='nuke' onPress={this.props.resetState} />
                    <DevButton theme='magic' onPress={this.addRandomSub} />
                </View>);
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'orange',
        width:'90%',
        padding: 10,
        alignItems: 'center',
    },
    fontStyle: {
        fontWeight: 'bold',
        fontSize: 24,
        marginVertical: 5,
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(DevPanel);
