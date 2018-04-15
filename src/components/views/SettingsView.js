import React, { Component } from 'react';
import { AsyncStorage, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Reactotron from 'reactotron-react-native';
import { connect } from 'react-redux';
import DevButton from '../../util/dev/DevButton';
import actions from '../../store/actions';

import { loadStateFromMemory } from '../../util/storageHelper'

function mapStateToProps(state) {
    return {
        subs: state.subreddits,
        reduxState: state,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addSub: (sub, comments) => dispatch(actions.addSubreddit(sub, comments)),
        resetState: () => dispatch(actions.resetState())
    };
}

class SettingsView extends Component {

    constructor(props) {
        super(props);
        const { addSub, wipeState } = this.props;
    }

    makeid = () => {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for(let i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    magicPress = (event) => {
        const { addSub, fetchSub } = this.props;
        addSub(this.makeid());
    }

    nukePress = () => {
        const { resetState } = this.props;
        resetState();
    }

    grassPress = () => {
        loadStateFromMemory((obj) => {
            Reactotron.log({ message: 'Currently in memory', value: obj });
        });
    }

    getDevPanel = () => {
        return (<View>
                    <DevButton theme='grass' onPress={this.grassPress} />
                    <DevButton theme='nuke' onPress={this.nukePress} />
                    <DevButton theme='magic' onPress={this.magicPress} />
                </View>);
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.text}>
                    This is a settings page. It would presumably do something if it came to that.
                </Text>
                { __DEV__ && this.getDevPanel() }
                <View style={{ flex: 1 }}>
                    <Text>
                        { JSON.stringify(this.props.reduxState) }
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    text: {
        margin: 10,
        fontSize: 16,
        fontFamily: 'Roboto',
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);
