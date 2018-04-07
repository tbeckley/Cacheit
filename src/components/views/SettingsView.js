import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import TBIcon from '../TBIcon';
import { connect } from 'react-redux';
import { routeNames } from '../../nav/routes';
import MagicButton from '../../util/dev/MagicButton';
import actions from '../../store/actions';

import { parseSubreddit } from '../../util/responseHelper';
import JSONData from '../../assets/data/sample_response.json';

function mapStateToProps(state) {
    return {
        subs: state.content.subreddits,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        addSub: (sub, comments) => dispatch(actions.addSubreddit(sub, comments)),
        removeSub: (sub) => dispatch(actions.removeSubreddit(sub)),
    };
}


class SettingsView extends Component {

    magicPress = (event) => {
        const y = parseSubreddit(JSONData);
        debugger;
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.text}>
                    This is a settings page. It would presumably do something if it came to that.
                </Text>
                { __DEV__ && <MagicButton onPress={this.magicPress} /> }
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
