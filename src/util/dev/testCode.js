import { NetInfo } from 'react-native';


const parseInfo = info => {
    let x = info;
    debugger;

}

NetInfo.isConnected.fetch().then(isConnected => {
    console.log("Status: "+isConnected);
})
NetInfo.getConnectionInfo().then(parseInfo);

