import React, { Component } from 'react';
import { View, StyleSheet, Text, Switch, Platform, TextInput } from 'react-native';
import { connect } from 'react-redux';
import DevPanel from '../dev/DevPanel';
import actions from '../../store/actions';
import Well from '../Well';

function mapStateToProps(state) {
    return {
        backgroundTask: state.settings.backgroundTask
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setBackgroundTaskProperty: key => value => dispatch(actions.setBackgroundProperty(key, value))
    };
}

class SettingsView extends Component {
    tryEnableBackgroundTask = (value) => {
        if(Platform.OS === 'ios' || Platform.OS === 'android' || __DEV__) {
            this.props.setBackgroundTaskProperty('isEnabled', value);
        }
        else {
            alert('Background task not available on this platform'); // eslint-disable-line
        }
    }
    render() {
        const { backgroundTask, setBackgroundTaskProperty } = this.props;
        return(
            <View style={styles.container}>
                <Text style={styles.text}>
                    This is a settings page. It would presumably do something if it came to that.
                </Text>
                <Well title={'Background Task'} >
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
                                <TextInput value={backgroundTask.subredditsToFetch}
                                    keyboardType='numeric'
                                    onChangeText ={setBackgroundTaskProperty('subredditsToFetch')}
                                    style={styles.numInput} />
                            </View>
                        </View>
                    }
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
        width: 47,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);
