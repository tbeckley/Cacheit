import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch } from 'react-native';
import styles from '../../assets/style/commonStyle';
import { connect } from 'react-redux';
import actionTypes from '../../store/actionTypes';

function mapStateToProps(state) {
    return {
        subs: state.content.subreddits,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addSubreddit: payload => dispatch({ type: actionTypes.ADD_SUBREDDIT, payload }),
        removeSubreddit: payload => dispatch({ type: actionTypes.REMOVE_SUBREDDIT, payload }),
    };
}

class TopView extends Component {
    constructor() {
        super();
        this.state = { name: '', comments: false };
    }

    addSub = () => {
        const { name, comments } = this.state;
        this.props.addSubreddit([{ name, comments }]);
    }
    removeSub = () => {
        const { name } = this.state;
        this.props.removeSubreddit([ name ]);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.container, styles.full, styles.pink]}>
                    <View>
                        <TouchableOpacity onPress={this.addSub}>
                            <Text>Add Subreddit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.removeSub}>
                            <Text>Remove Subreddit</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TextInput onChangeText={name => this.setState({ name })} />
                        <Switch onValueChange={comments => this.setState({ comments })} value={this.state.comments} />
                    </View>
                </View >
                <View style={[styles.container, styles.full, styles.yellow]}>
                    <Text>{JSON.stringify(this.props.subs)}</Text>
                </View >
            </View >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopView);
