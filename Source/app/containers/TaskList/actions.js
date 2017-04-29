import { Actions } from 'react-native-router-flux';
import {
  ToastAndroid
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import * as stringConst from '../../constants/string';

export const _on_value_change = function (picker_name, value)
{
  this.state[picker_name] = value;
  this.setState(this.state);
}

//Quay trở lại trang index
export const _back_to_index = function ()
{
    let timeout_func = function()
    {
        Actions.pop();
        this.props.index.load_tasks();
    }

    setTimeout(timeout_func.bind(this), 100);
}

//Hiển thị task list lên screen
export const _load_tasks = function (task_type)
{
     //Init DB
    this._db = SQLite.openDatabase('localDB.db');

    let success = (results) => {
        let task_list = [];
        for (let i = 0; i < results.rows.length; i++)
        {
          let item = results.rows.item(i);
          task_list.push(item);
        }
        this.state.task_list = task_list;
        
        this.state.data_source = this.state.data_source.cloneWithRows(this.state.task_list),
        this.setState(this.state);
    }

    let sql = 'SELECT * FROM Tasks WHERE status = ? ORDER BY priority DESC, deadline DESC';
    if (task_type == stringConst.DONE) {
      sql = 'SELECT * FROM Tasks WHERE status = ? ORDER BY completed_date DESC';
    }

    this._db.executeSql (sql,
        [task_type],
        success,
        error_handle
    );
}

//Hàm xuất message lỗi
export const error_handle = function (error)
{
  alert(error.message);
}

//Hàm dùng để hiện popup chỉnh sửa
export const displayPopup = function (id) {
    this.popupDialog.show();
    this.editForm.loadDetail(id);
}
