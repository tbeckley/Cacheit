import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';

import { RouteNames } from '../../nav/routes.js';
import actions from '../../store/actions';
import { fetchSubreddit } from '../../util/requestHelper';

import SettingsButton from '../SettingsButton';

function mapStateToProps(state) {
    return {
        subreddits: state.subreddits,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addSub: (sub, comments) => dispatch(actions.addSubreddit(sub, comments)),
        fetchSub: sub => fetchSubreddit(sub, dispatch),
    };
}

class SettingsView extends Component {

    static navigationOptions = (thing) => {
        return {
            headerTitle: 'Cacheit',
            headerRight: <SettingsButton navigation={thing.navigation} />,
        };
    };

    constructor(props) {
        super(props);
        const a = 'x'; // Do the thing
    }

    goToPosts = (subredditName) => {
        if (this.props.navigation) {
            this.props.navigation.navigate({ routeName: RouteNames.POSTS, params: { subredditName } });
        }
    }

    generateCard = (subreddit, key) =>
    {
        const { name } = subreddit;
        const cardStyle = {
            paddingVertical: 20,
            padding: 15,
            justifyContent: 'center',
            paddingLeft: 50,
            width: '100%',
            backgroundColor: (key % 2 === 0) ? '#B3B3B3' : '#F2F2F2'
        };

        return (
            <TouchableOpacity key={key} style={cardStyle} onPress={() => this.goToPosts(subreddit.name)}>
                    <Text style={styles.subredditName}>/r/{ name }</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return(
            <ScrollView style={styles.container}>
                { this.props.subreddits.map(this.generateCard) }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#66b3ff',
    },
    subredditName: {
        fontSize: 22,
        fontFamily: 'Roboto',
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);
