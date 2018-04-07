import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

Reactotron.configure({ name: 'Cacheit' }).use(reactotronRedux()).connect();
