import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { RouteNames } from '../../nav/routes.js';

function mapStateToProps(state) {
    return {
        subs: state.content.subreddits,
    };
}

class SettingsView extends Component {
    goToPosts() {
        if (this.props.navigation) {
            this.props.navigation.navigate({ routeName: RouteNames.POSTS });
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.text}>
                    This is a subreddits page. It would presumably list subreddits if it came to that.
                </Text>
                <TouchableOpacity onPress={() => this.goToPosts()}>
                    <Text style={styles.text}>Go to posts</Text>
                </TouchableOpacity>
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

export default connect(mapStateToProps)(SettingsView);
