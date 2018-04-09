import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { RouteNames } from '../../nav/routes.js';
import R from 'ramda';
import Swiper from 'react-native-swiper';

function mapStateToProps(state, ownProps) {
    const subredditName = ownProps.navigation.state.params.subredditName;

    return {
        subreddit: R.find(R.propEq('name', subredditName), state.subreddits),
    };
}

class PostsView extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `/r/${navigation.state.params.subredditName}`,
    });

    getEmptyPage = () => {
        // Empty page here
        const containerobj = { flex: 1, justifyContent: 'center', alignItems: 'center' };
        return <View style={containerobj}><Text style={styles.postName}>Empty</Text></View>;
    }

    goToComments = (postName) => {
        const { subreddit: { name }, navigation } = this.props;
        navigation.navigate({ routeName: RouteNames.COMMENTS, params: { subredditName: name, postName } });
    }

    getPostCard = (post, key) => {
        const { name, title, score, author } = post;

        const cardStyle = {
            paddingVertical: 20,
            padding: 15,
            justifyContent: 'center',
            paddingLeft: 50,
            width: '100%',
            backgroundColor: (key % 2 === 0) ? '#B3B3B3' : '#F2F2F2'
        };

        return (
            <TouchableOpacity key={key} style={cardStyle} onPress={() => this.goToComments(name)}>
                    <Text style={styles.postName}>{`${score} - ${title} ~\n By: ${author}`}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        const { posts } = this.props.subreddit;

        if(R.isEmpty(posts)) return this.getEmptyPage();
        else {
            return (
                <ScrollView style={styles.container}>
                    { posts.map(this.getPostCard) }
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f4aa42',
        width: '100%',
        height: '100%',
    },
    postName: {
        margin: 10,
        fontSize: 16,
        fontFamily: 'Roboto',
    }
});
export default connect(mapStateToProps)(PostsView);
