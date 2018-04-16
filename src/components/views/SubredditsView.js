import React, { Component } from 'react';
import { View, ScrollView, StyleSheet,
        Text, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';

import { RouteNames } from '../../nav/routes.js';
import actions from '../../store/actions';
import { fetchSubreddit } from '../../util/requestHelper';
import { getTimeAgo } from '../../util/timeHelper';

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

class SubredditsView extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Cacheit',
            headerRight: <SettingsButton />,
        };
    };

    constructor(props) {
        super(props);
        this.state = { subName: '' };
    }

    goToPosts = (subredditName) => {
        const { navigation, fetchSub } = this.props;
        if (navigation) {
            fetchSub(subredditName);
            navigation.navigate({ routeName: RouteNames.POSTS, params: { subredditName } });
        }
    }

    generateCard = (subreddit, key) => {
        const { name, posts, lastFetched } = subreddit;

        const backgroundColorStyle = {
            backgroundColor: (key % 2 === 0) ? '#B3B3B3' : '#F2F2F2'
        };

        return (
            <TouchableOpacity key={key} style={[styles.cardStyle, backgroundColorStyle]} onPress={() => this.goToPosts(subreddit.name)}>
                <Text style={styles.subredditName}>/r/{name}</Text>
                <Text style={styles.subredditCaption}>{`Last updated: ${getTimeAgo(lastFetched)}, Unread Posts: ${posts.length}`}</Text>
            </TouchableOpacity>
        );
    }

    addSubreddit = () => {
        const { addSub } = this.props;
        const { subName, comments } = this.state;
        if(subName) {
            addSub(subName, comments);
            this.setState({ subName: '' });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.addSubredditContainer}>
                    <TextInput  onChangeText={subName => this.setState({ subName })}
                                value={this.state.subName}
                                style={styles.textContainer}
                                placeholder='Add another sub!' />
                    <TouchableOpacity style={styles.textButton} onPress={this.addSubreddit}>
                        <Text>Add</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.container}>
                    {this.props.subreddits.map(this.generateCard)}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#66b3ff',
    },
    addSubredditContainer: {
        flexDirection: 'row',
    },
    textContainer: {
        flex: 1
    },
    textButton: {
        padding: 5,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    subredditName: {
        fontSize: 22,
        fontFamily: 'Roboto',
    },
    subredditCaption: {

    },
    cardStyle: {
        paddingVertical: 20,
        padding: 15,
        justifyContent: 'center',
        paddingLeft: 50,
        width: '100%',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SubredditsView);
