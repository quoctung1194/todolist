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
export const _load_tasks = function ()
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
	    this.setState(this.state);
	}
	this._db.executeSql ('SELECT * FROM Tasks WHERE status = ? ORDER BY priority DESC, deadline DESC',
		[stringConst.COMMING],
		success,
		error_handle
	);
}

//Hàm xuất message lỗi
export const error_handle = function (error)
{
  alert(error.message);
}