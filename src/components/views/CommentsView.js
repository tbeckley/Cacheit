import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';

function mapStateToProps(state, ownProps) {
    const { subredditName, postName } = ownProps.navigation.state.params;
    const subreddit = R.find(R.propEq('name', subredditName), state.subreddits);
    const post = R.find(R.propEq('name', postName), subreddit.posts);
    return {
        post,
        subredditName,
    };
}

class CommentsView extends Component {
    render() {
        const { post: { selftext, author, score, title, name }, subredditName } = this.props;
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{`${score} points - ${title} ~\n By: ${author}`}</Text>
                </View>
                <ScrollView style={styles.scrollContainer}>
                    <Text style={{ margin: 15 }}>{selftext}</Text>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#B3B3B3',
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        backgroundColor: '#F2F2F2',
    },
    title: {
        margin: 10,
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text: {
        margin: 10,
        fontSize: 16,
        fontFamily: 'Roboto',
        textAlign: 'justify',
    }
});

export default connect(mapStateToProps)(CommentsView);
