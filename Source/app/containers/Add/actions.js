import { Actions, ActionConst } from 'react-native-router-flux';
import {
	DatePickerAndroid,
  ToastAndroid
} from 'react-native';
import { Toast } from 'native-base';
import * as stringConst from '../../constants/string';
import {Keyboard} from 'react-native';


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
  let converted_deadline = date_arr[2] + '-' + date_arr[1] + '-' + date_arr[0];

  let currentdate = new Date();
  let created_date = (currentdate.getFullYear()) + '-'
                     + ('0' + (currentdate.getMonth() + 1)).slice(-2) + '-'
                     + ('0' + (currentdate.getDate())).slice(-2);

  let sql = 'INSERT INTO Tasks (name, project, priority, deadline, status, created_date)' +
            'VALUES ('
             + '"' + this.state.form.name + '"' + ','
             + '"' + this.state.form.project + '",'
             + '"' + this.state.form.priority + '",'
             + '"' + converted_deadline + '",'
             + '"' + stringConst.COMMING + '",'
             + '"' + created_date + '")';

  let on_success = () => {
    Toast.show({
      text: stringConst.SUCCESSFUL,
      position: 'bottom',
      buttonText: 'Cancel',
      type: 'success',
      duration: 2000 });

    //Set into default form
    this.state.form = JSON.parse(JSON.stringify(this._default_form));;
    this.setState (this.state);
  }

  let on_error = (error) => {
    Toast.show({
      text: error.message,
      position: 'bottom',
      buttonText: 'Cancel',
      type: 'danger',
      duration: 2000 });
  }

  this._db.executeSql(sql, [], on_success.bind(this), on_error);
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