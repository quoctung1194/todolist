import * as stringConst from '../../constants/string';
import {NORMAL_SIZE} from '../../components/Task/styles';
import { Dimensions } from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import {
  Animated
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

//Lấy các tham số tọa độ và kích thước của các region
export const _set_region_layouts = function (region, e)
{
  let region_layouts = this.state.region_layouts;
  region_layouts[region] = e.nativeEvent.layout;
  this.state.region_layouts = region_layouts;
  //Set các giá trị layout cho các Task
  if(Object.keys(region_layouts).length == 3 && !this.state.render_task) {
    this.state.render_task = true;
    this.setState(this.state);
  }
}

//Hiển thị hiệu ứng khi drag
export const _highlight_region = function (region)
{
  if (region == stringConst.COMMING)
  {
    Animated.spring( this.state.color[stringConst.COMMING], {toValue: 500}).start();
  }
  else if (region == stringConst.CURRENT)
  {
    Animated.spring( this.state.color[stringConst.COMMING], {toValue: 500}).start();
    Animated.spring( this.state.color[stringConst.DONE], {toValue: 500}).start();
  }
  else if (region == stringConst.DONE)
  {
    Animated.spring( this.state.color[stringConst.DONE], {toValue: 500}).start();
  }
}

//Tắt hết toàn bộ hiệu ứng
export const _unhighlight_region = function ()
{
  Animated.spring( this.state.color[stringConst.COMMING], {toValue: 0}).start();
  Animated.spring( this.state.color[stringConst.DONE], {toValue: 0}).start();
}

//Tính toàn điểm bắt đầu theo trục X
export const _calculate_start_x = function (number, distance, task_size)
{
  //Tính tổng khối chiều dài dựa vào số lượng task truyền vào
  let screen_width = Dimensions.get('window').width;
  let total_width = task_size.width * number + distance * (number - 1);
  return (screen_width - total_width) / 2;
}

//Xét xem có thể drop vào vùng current task hay không
export const _is_max_current_tasks = function ()
{
  return this.state.current_task.length >= this.state.max_current_task;
}

//Hàm xử lý drop
export const _drop_process = function (attributes, region)
{
  if (attributes.status == stringConst.COMMING)
  {
    _drop_process_comming_task.bind(this)(attributes, region);
  }
  else if (attributes.status == stringConst.CURRENT)
  {
    _drop_process_current_task.bind(this)(attributes, region);
  }

  this.setState(this.state);
}

//Hàm xử lý drop cho task có status là comming tasks
const _drop_process_comming_task = function (attributes, region)
{
  //Xóa khỏi mảng comming task hiện hành
  for (let i = 0; i < this.state.comming_tasks.length; i++)
  {
    let task = this.state.comming_tasks[i];

    if(attributes.id == task.id)
    {
      //Xóa phần tử tại index hiện hành
      this.state.comming_tasks.splice(i, 1);
      break;
    }
  }

  //Thêm vào current Task hiện hành
  attributes.status = stringConst.CURRENT;
  this.state.current_task.unshift(attributes);

  //Init current date
  let currentdate = new Date();
  let datetime =  currentdate.getFullYear() + "-"
                  + (currentdate.getMonth() + 1)  + "-"
                  + currentdate.getDate() + " "
                  + currentdate.getHours() + ":"
                  + currentdate.getMinutes() + ":"
                  + currentdate.getSeconds();

  this._db.executeSql (
    'UPDATE Tasks SET status = ?, started_date = ? WHERE id = ?',
    [stringConst.CURRENT, datetime, attributes.id],
    _load_tasks.bind(this),
  );
}

//Hàm xử lý drop cho task có status là current tasks
const _drop_process_current_task = function (attributes, region)
{
  //Xóa khỏi mảng current task hiện hành
  for (let i = 0; i < this.state.current_task.length; i++)
  {
    let task = this.state.current_task[i];

    if(attributes.id == task.id)
    {
      //Xóa phần tử tại index hiện hành
      this.state.current_task.splice(i, 1);
      break;
    }
  }

  //Xác định vùng drop là vùng COMMING
  if(region == stringConst.COMMING)
  {
    //Thêm vào COMMING Task hiện hành
    attributes.status = stringConst.COMMING;
    this.state.comming_tasks.push(attributes);

    this._db.executeSql (
      'UPDATE Tasks SET status = ?, started_date = ? WHERE id = ?',
      [stringConst.COMMING, null, attributes.id],
      _load_tasks.bind(this)
    );
  }
  else if (region == stringConst.DONE)
  {
    //Xóa phần tử cuối cùng trong mảng DONE task hiện hành
    this.state.done_tasks.pop();
    //Thêm vào DONE Task hiện hành
    attributes.status = stringConst.DONE;
    this.state.done_tasks.unshift(attributes);

    //Init current date
    let currentdate = new Date();
    let datetime =  currentdate.getFullYear() + "-"
                    + (currentdate.getMonth() + 1)  + "-"
                    + currentdate.getDate() + " "
                    + currentdate.getHours() + ":"
                    + currentdate.getMinutes() + ":"
                    + currentdate.getSeconds();

    this._db.executeSql (
      'UPDATE Tasks SET status = ?, completed_date = ? WHERE id = ?',
      [stringConst.DONE, datetime, attributes.id],
      _load_tasks.bind(this)
    );
  }
}

//Hàm dùng để chuyển sang trang add
export const _add_redirect = function ()
{
  Actions.add({index: this});
}

//Hàm dùng để chuyển sang trang TaskList
export const _task_list_redirect = function (task_type)
{
  Actions.task_list({index: this, task_type: task_type});
}

//Hàm tạo database
export const _init_database = function ()
{
  this._db = SQLite.openDatabase('localDB.db');

  //Tiến hành kiểm tra database được tao hay chưa
  this._db.executeSql ('SELECT * FROM Tasks', [], null, (db) => {
    //Thực hiện tạo database với transaction
    let transaction_func = (tx) => {
      tx.executeSql (
        'CREATE TABLE Tasks (' +
  	       'id	INTEGER PRIMARY KEY AUTOINCREMENT,' +
  	       'name	TEXT,' +
           'project TEXT,' +
           'priority	INTEGER,' +
  	       'deadline	TEXT,' +
  	       'status	INTEGER,' +
  	       'created_date	TEXT,' +
  	       'started_date	TEXT,' +
  	       'completed_date	TEXT' +
        ');');

      // Hàm insert vào database
      let insertData = function (tx) {
        tx.executeSql ('INSERT INTO Settings (name, number) VALUES ("'+ stringConst.COMMING +'", 10);');
        tx.executeSql ('INSERT INTO Settings (name, number) VALUES ("'+ stringConst.CURRENT +'", 3);');
        tx.executeSql ('INSERT INTO Settings (name, number) VALUES ("'+ stringConst.DONE +'", 3);');
      };
      tx.executeSql (
        'CREATE TABLE Settings (' +
  	       'id	INTEGER PRIMARY KEY AUTOINCREMENT,' +
  	       'name	TEXT,' +
           'number INTEGER,' +
  	       'created_date	TEXT,' +
  	       'updated_date	TEXT' +
        ');', [], insertData.bind(tx));
    }

    this._db.transaction(transaction_func, error_handle);
  });
}

let load_count = 0;
//Hiển thị task lên screen
export const _load_tasks = function ()
{
  load_count = 0;

  //Loading comming tasks
  let callback = function (task_type ,results)
  {
    this.state[task_type] = [];
    for (let i = 0; i < results.rows.length; i++)
    {
      let item = results.rows.item(i);
      this.state[task_type].push(item);
    }

    // Chờ load hết 3 table thì mới tiến hành vẽ screen
    if (load_count == 2)
    {
      this.setState(this.state);
    }
    else
    {
      load_count++;
    }
  };

  //Lấy các tham số settings
  this._db.executeSql ('SELECT * FROM Settings', [], (results) => {
    comming = results.rows.item(0).number;
    current = results.rows.item(1).number;
    done = results.rows.item(2).number;

    this._db.executeSql ('SELECT * FROM Tasks WHERE status = ? ORDER BY priority ASC, deadline DESC LIMIT ?',
      [stringConst.COMMING, comming],
      callback.bind(this, 'comming_tasks'),
      error_handle
    );
    this._db.executeSql ('SELECT * FROM Tasks WHERE status = ? ORDER BY started_date DESC LIMIT ?',
      [stringConst.CURRENT, current],
      callback.bind(this, 'current_task'),
      error_handle
    );
    this._db.executeSql ('SELECT * FROM Tasks WHERE status = ? ORDER BY completed_date DESC LIMIT ?',
      [stringConst.DONE, done],
      callback.bind(this, 'done_tasks'),
      error_handle
    );

  }, error_handle);
}

//Hàm xuất message lỗi
export const error_handle = function (error)
{
  alert(error.message);
}
