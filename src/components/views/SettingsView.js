import React, { Component } from 'react';
import { View, StyleSheet, Text, Switch, Platform } from 'react-native';
import { connect } from 'react-redux';
import DevPanel from '../dev/DevPanel';
import actions from '../../store/actions';
import Well from '../Well';

function mapStateToProps(state) {
    return {
        settings: state.settings
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toggleBackgroundTask: value => dispatch(actions.toggleBackgroundTask(value))
    };
}

class SettingsView extends Component {
    tryToggleBackgroundTask = (value) => {
        if(Platform.OS === 'ios' || Platform.OS === 'android') {
            this.props.toggleBackgroundTask(value);
        }
        else {
            alert('Background task not available on this platform'); // eslint-disable-line
        }
    }
    render() {
        const { settings: { backgroundTask }, toggleBackgroundTask } = this.props;
        return(
            <View style={styles.container}>
                <Text style={styles.text}>
                    This is a settings page. It would presumably do something if it came to that.
                </Text>
                <Well title={'Background Task'} >
                    <View style={styles.row}>
                        <Text>Enable background fetching</Text>
                        <Switch value={backgroundTask.isEnabled}
                                onValueChange={this.tryToggleBackgroundTask}
                                style={styles.switch} />
                    </View>
                    { backgroundTask.isEnabled && <View>
                            <View style={styles.row}>
                            <Text>Fetch over cellular network</Text>
                            <Switch value={backgroundTask.fetchOverCellular}
                                    onValueChange={toggleBackgroundTask}
                                    style={styles.switch} />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);
