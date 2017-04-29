import * as stringConst from '../../constants/string';
import { Keyboard } from 'react-native';

//Xét header cho các component
export const _set_header = function (title = stringConst.DEFAULT, hidden_header = false)
{
  this.state.title = title;
  this.state.hidden_header = hidden_header;
}

//Thay đổi component
export const _set_current_component = function (component_name)
{
  this.state.current_component = component_name;
  //Set header title
  this.state.title = component_name;

  //Ẩn header title
  if(component_name == stringConst.TASK_MANAGEMENT)
  {
    this.state.hidden_header = true;
    this.state.hidden_footer  = false;
  }

  //Set active giao diện nếu có
  for(let key in this.state.active)
  {
    if(key == component_name)
    {
      this.state.active[key] = true;
      this.state.hidden_header = false;
    }
    else
    {
      this.state.active[key] = false;
    }
  }
  this.setState(this.state);
}

//Sự kiện keyboard
export const _keyboard_did_show = function ()
{
  this.state.hidden_footer  = true;
  this.setState(this.state);
}

export const _keyboard_did_hide = function ()
{
  this.state.hidden_footer  = false;
  this.setState(this.state);

  //Nhận biết có phải trở về trang index hay không
  if (this.state.is_back_home)
  {
    _set_current_component.bind(this)(stringConst.TASK_MANAGEMENT);
    //Reset về giá trị default
    this.state.is_back_home = false;
  }
}

//Sự kiện back to index
export const _back_to_index = function ()
{
  //Nhận biết virtual keyboard có show lên không
  let is_keyboard_display = this.state.hidden_footer;
  if(!is_keyboard_display)
  {
    _set_current_component.bind(this)(stringConst.TASK_MANAGEMENT);
  }
  else
  {
    Keyboard.dismiss();
    this.state.is_back_home = true;
  }
}
