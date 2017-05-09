import Api from './Api';
import {
    NetInfo,
    AsyncStorage
} from 'react-native';
import { Toast } from 'native-base';

import Setting from './Setting';
import * as Route from '../constants/route';
import SQLite from 'react-native-sqlite-storage';

class Sync
{
    /**
     *  Sync action
     */
    static async sync(item)
    {
        // checking connection
        NetInfo.isConnected.fetch().then( async (isConnected) => {
            // update data local history
            await Sync.updateLocalHistory(item);

            // start sync to server
            if (isConnected && Setting.user != null) {
                await Sync.updateContentFromServer();
            }
        });
    }

    /**
     *  Update local history
     */
    static async updateLocalHistory(item) 
    {
        let content = await AsyncStorage.getItem('content');
        let result = [];

        // process content
        if (content != null) {
            // convert string content to array
            result = JSON.parse(content);
        }

        result.push(item);
        await AsyncStorage.setItem('content', JSON.stringify(result));
    }

    /**
     *  Update content from server
     */
    static async updateContentFromServer()
    {
        // send current sync_time
        let sync_time = await AsyncStorage.getItem('sync_time');
        if (sync_time == null) {
            sync_time = 0;
        }

        let params = {
            sync_time: sync_time
        };

        let result = null;
        // get response from server
        await Api.post(Route.CHECKING, params)
            .then( async (response) => {
                result = response;
            })
            .catch( error => {
                alert(error);
            });

        // checking synced or not
        if(result.status) { // synced
            Sync.updateContentToServer();
            return;
        }

        // not synced
        let content = JSON.parse(result.result);

        // save tasks from server
        let db = SQLite.openDatabase('localDB.db');
        let currentdate = new Date();
        let created_date = (currentdate.getFullYear()) + '-'
             + ('0' + (currentdate.getMonth() + 1)).slice(-2) + '-'
             + ('0' + (currentdate.getDate())).slice(-2);

        db.executeSql('SELECT * FROM Tasks', [], (results) => {
            let transaction = (tx) => {
                let newIds = [];

                for(let i = 0; i < content.length; i++) {
                    let task = content[i];
                    let sql = '';
                    let isInsert = true;

                    // checking update or insert
                    for(let k = 0; k < results.rows.length; k++) {
                        if (task.id == results.rows.item(k).id) {
                            isInsert = false;
                        }
                    }
                    
                    if (newIds.indexOf(task.id.toString()) > -1) {
                        isInsert = false;
                    }

                    if (isInsert) { // insert
                        sql = 'INSERT INTO Tasks (id, name, project, priority, deadline, status, created_date)' +
                            'VALUES ('
                             + '"' + task.id + '"' + ','
                             + '"' + task.name + '"' + ','
                             + '"' + task.project + '",'
                             + '"' + task.priority + '",'
                             + '"' + task.deadline + '",'
                             + '"' + task.status + '",'
                             + '"' + created_date + '")';
                        newIds.push(task.id.toString());
                    } else { // update
                        sql = 'UPDATE Tasks SET '
                            + 'name = "' + task.name + '",'
                            + 'project = "' + task.project + '",'
                            + 'priority = "' + task.priority + '",'
                            + 'deadline = "' + task.deadline + '",'
                            + 'status = "' + task.status + '" '
                            + 'WHERE id = "' + task.id + '"'
                    }
                    
                    tx.executeSql(sql);
                }
            }

            let on_error = (error) => {
                Toast.show({
                    text: error.message,
                    position: 'bottom',
                    buttonText: 'Cancel',
                    type: 'danger',
                    duration: 10000
                });
            }

            let callback = async () => {
                Sync.updateContentToServer();
            }

            db.transaction(transaction, on_error, callback);
        });
        
    }


    /**
     *  Update content to server
     */
    static async updateContentToServer()
    {
        let content = await AsyncStorage.getItem('content');
        let params = {
            content: content,
        };

        if (content == null) {
            return;
        }

        Api.post(Route.SYNC, params)
            .then( (result) => {
                if(result.status) {
                    AsyncStorage.removeItem('content');
                    AsyncStorage.setItem('sync_time', result.sync_time.date);
                }
            })
            .catch( error => {
                alert(error);
            });
    }
}

export default Sync;