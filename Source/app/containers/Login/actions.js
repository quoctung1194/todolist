import {
    NetInfo,
    AsyncStorage
} from 'react-native';
import Api from '../../utilizes/Api';
import Setting from '../../utilizes/Setting';
import * as Route from '../../constants/route';
import { Actions } from 'react-native-router-flux';
import Sync from '../../utilizes/Sync';

// Login action
export const login = function ()
{
    let params = {
        email: this.state.email,
        password: this.state.password,
    }
    let context = this;

    // checking network is available
    NetInfo.isConnected
    .fetch()
    .then(isConnected => {
        authenticate.bind(context)(params);
    });
}

const authenticate = function (params = [], callback = undefined) 
{
    // AsyncStorage.getItem('user', (err, result) => {
    //     let user = JSON.parse(result);
    //     Setting.user = user;
    // });
    let context = this;

    Api.post(Route.LOGIN, params)
    .then( result => {

        if(result.status) {
            // gán vào local storage
            AsyncStorage.setItem('user', JSON.stringify(result.user), async () => {
                Setting.user = result.user;
                await Sync.updateContentFromServer();
                // back to index
                context.props.parent.actions._back_to_index.bind(context.props.parent)();
            });
        } else {
            alert(result.error);
        }
        
    })
    .catch( error => {
        alert(error);
    });
}

// Assgin value to state
export const assignToState = function (key, value)
{
    this.state[key] = value;
}