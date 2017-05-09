import { Actions, ActionConst } from 'react-native-router-flux';
import {
	DatePickerAndroid,
  ToastAndroid
} from 'react-native';
import { Toast } from 'native-base';
import * as stringConst from '../../constants/string';
import {Keyboard} from 'react-native';
import Sync from '../../utilizes/Sync';

//Quay trở lại trang index
export const _back_to_index = function ()
{
	Keyboard.dismiss();

	let timeout_func = function()
	{
		Actions.pop();
		this.props.index.load_tasks();
	}

	setTimeout(timeout_func.bind(this), 100);
}

//Hiển thị date picker
export const _show_picker = async function ()
{
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({date: new Date()});

      if (action != DatePickerAndroid.dismissedAction)
      {
        let date = new Date(year, month, day);
        let datetime = ('0' + (date.getDate())).slice(-2) + "-"
                      + ('0' + (date.getMonth() + 1)).slice(-2) + "-"
                      + (date.getFullYear())
        this.state.form.deadline = datetime;
        this.setState(this.state);
      }

    } catch ({message}) {
      alert(message);
    }
};

//Cập nhật textinput
export const _update_input = function (input, value)
{
  this.state.form[input] = value;
  this.setState(this.state);
}

//Thêm task
export const _add = function ()
{
  //Convert deadline to format YYYY-MM-DD
  let date_arr = this.state.form.deadline.split('-');
  let converted_deadline = date_arr[0] + '-' + date_arr[1] + '-' + date_arr[2];

  let currentdate = new Date();
  let created_date = (currentdate.getFullYear()) + '-'
                     + ('0' + (currentdate.getMonth() + 1)).slice(-2) + '-'
                     + ('0' + (currentdate.getDate())).slice(-2);

	let sql = 'UPDATE Tasks ' +
						'SET name = ?, project = ?, priority = ?, deadline = ? ' +
						'WHERE id = ? ';

  let item = {
    id: this.state.form.id,
    name: this.state.form.name,
    project: this.state.form.project,
    priority: this.state.form.priority,
    deadline: converted_deadline,
    status: this.item.status
  };

  let on_success = () => {
    Toast.show({
      text: stringConst.SUCCESSFUL,
      position: 'bottom',
      buttonText: 'Cancel',
      type: 'success',
      duration: 2000 });

    this.setState(this.state);
		this.props.taskManagement.load_tasks();

    // sync
    Sync.sync(item);
  }

  let on_error = (error) => {
    Toast.show({
      text: error.message,
      position: 'bottom',
      buttonText: 'Cancel',
      type: 'danger',
      duration: 2000 });
  }

  this._db.executeSql(sql, [
		this.state.form.name,
		this.state.form.project,
		this.state.form.priority,
		converted_deadline,
		this.state.form.id
	], on_success.bind(this), on_error);
}

//Check input
const _check_input = function ()
{
  if (this.state.form.name == '')
  {
    ToastAndroid.show(stringConst.VALIDATE_REQUIRED_NAME, ToastAndroid.SHORT);
    return false;
  }

  if (this.state.form.project == '')
  {
    ToastAndroid.show(stringConst.VALIDATE_REQUIRED_PROJECT, ToastAndroid.SHORT);
    return false;
  }
  return true;
}

export const _add_task = function ()
{
  if (_check_input.bind(this)() == true)
  {
    _add.bind(this)();
  }
}

// Hàm get task
export const getTask = function (id)
{
	this._db.executeSql ('SELECT * FROM Tasks WHERE id = ?', [id], (results) => {
    let item = results.rows.item(0);
		this.state.form.id = item.id;
		this.state.form.name = item.name;
		this.state.form.project = item.project;
    this.state.form.priority = item.priority;
    this.state.form.deadline = item.deadline;
    this.item = item;

		this.setState(this.state);
	}, error_handle);
}

//Hàm xuất message lỗi
export const error_handle = function (error)
{
  alert(error.message);
}
