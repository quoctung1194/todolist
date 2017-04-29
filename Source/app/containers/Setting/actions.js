import SQLite from 'react-native-sqlite-storage';
import * as stringConst from '../../constants/string';

export const _on_value_change = function (picker_name, value)
{
  this.state[picker_name] = value;
  this._db.executeSql ('UPDATE Settings SET number = ? WHERE name = ?',
    [value, picker_name],
    () => this.setState(this.state),
    error_handle
  );

  this.setState(this.state);
}

//Lấy dữ liệu settings
export const _load_settings = function ()
{
  this._db = SQLite.openDatabase('localDB.db');

  //Lấy các tham số settings
  this._db.executeSql ('SELECT * FROM Settings', [], (results) => {
    let comming = results.rows.item(0).number;
    let current = results.rows.item(1).number;
    let done = results.rows.item(2).number;

    this.state[stringConst.COMMING] = comming;
    this.state[stringConst.CURRENT] = current;
    this.state[stringConst.DONE] = done;

    this.setState(this.state);
  }, error_handle);
}

//Hàm xuất message lỗi
export const error_handle = function (error)
{
  alert(error.message);
}
