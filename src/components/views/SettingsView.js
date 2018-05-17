import React, { Component } from 'react';
import { View, StyleSheet, Text, Switch, Platform, TextInput, Picker } from 'react-native';
import TBNumInput from '../TBNumInput';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import DevPanel from '../dev/DevPanel';
import actions from '../../store/actions';
import Well from '../Well';

function mapStateToProps(state) {
    return {
        backgroundTask: state.settings.backgroundTask,
        autoLoad: state.settings.autoLoad
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setBackgroundTaskProperty: key => value => dispatch(actions.setBackgroundProperty(key, value)),
        setAutoLoadProperty: key => value => dispatch(actions.setAutoLoadProperty(key,value)),
    };
}

class SettingsView extends Component {
    tryEnableBackgroundTask = (value) => {
        if(Platform.OS === 'ios' || Platform.OS === 'android' || __DEV__) {
            this.props.setBackgroundTaskProperty('isEnabled')(value);
        }
        else {
            alert('Background task not available on this platform'); // eslint-disable-line
        }
    }
    render() {
        const { backgroundTask, autoLoad, setAutoLoadProperty, setBackgroundTaskProperty } = this.props;
        return(
            <View style={styles.container}>
                <Well title={'Background Task'}>
                    <View style={styles.row}>
                        <Text>Enable background fetching</Text>
                        <Switch value={backgroundTask.isEnabled} onValueChange={this.tryEnableBackgroundTask} style={styles.switch} />
                    </View>
                    { backgroundTask.isEnabled && <View>
                            <View style={styles.row}>
                                <Text>Fetch over cellular network</Text>
                                <Switch value={backgroundTask.fetchOverCellular}
                                    onValueChange={setBackgroundTaskProperty('fetchOverCellular')}
                                    style={styles.switch} />
                            </View>
                            <View style={styles.row}>
                                <Text>Fetch on battery</Text>
                                <Switch value={backgroundTask.fetchOnBattery}
                                    onValueChange={setBackgroundTaskProperty('fetchOnBattery')}
                                    style={styles.switch} />
                            </View>
                            <View style={styles.row}>
                                <Text>Fetch this many subreddits</Text>
                                <TBNumInput value={backgroundTask.subredditsToFetch}
                                    onChangeNum={setBackgroundTaskProperty('subredditsToFetch')}
                                    style={styles.numInput}
                                    max={10}
                                    min={0} />
                            </View>
                            <View style={styles.row}>
                                <Text>Background Task Interval (Seconds) (X>900)</Text>
                                <TBNumInput value={backgroundTask.interval}
                                    onChangeNum={setBackgroundTaskProperty('interval')}
                                    style={styles.numInput}
                                    min={900} />
                            </View>
                        </View>
                    }
                </Well>
                <Well title={'Auto Load'}>
                    <View style={styles.row}>
                        <Text>Automatally fetch posts when you open a subreddit</Text>
                        <Switch value={autoLoad.autoLoadPosts}
                            onValueChange={setAutoLoadProperty('autoLoadPosts')}
                            style={styles.switch} />
                    </View>
                    <View style={styles.row}>
                        <Text>Automatally fetch comments when you open a post</Text>
                            <Switch value={autoLoad.autoLoadComments}
                                onValueChange={setAutoLoadProperty('autoLoadComments')}
                                style={styles.switch} />
                    </View>
                </Well>
                { __DEV__ && <DevPanel /> }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        margin: 10,
        fontSize: 16,
        fontFamily: 'Roboto',
    },
    switch: {

    },
    numInput: {
        marginRight: 9,
        width: 55,
    }
});

SettingsView.propTypes = {
    setBackgroundTaskProperty: PropTypes.func,
    backgroundTask: PropTypes.object,
    autoLoad: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);
