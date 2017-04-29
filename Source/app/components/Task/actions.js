import {
  Animated
} from 'react-native';
import * as stringConst from '../../constants/string';

//Event Drag
export const _onPanResponderMove = function (e, gesture)
{
  let mover = Animated.event([null, {
    dx : this.state.pan.x,
    dy : this.state.pan.y
  }]);

  //Thể hiện hiệu ứng khi drag
  //Giá trị tham chiếu hàm _is_drop trả về
  let result = {
    region: ''
  };

  if(_is_drop.bind(this)(gesture, result))
  {
    this.props.parent.highlight_region(result.region);
  }
  else
  {
    this.props.parent.unhighlight_region();
  }

  return mover(e, gesture);
}

//Xác nhận có thể drop được vùng hiện hành hay không
const _is_drop = function (gesture, result = {})
{
  //Attribute default của Task
  let status = this.props.attributes.status;

  //Nếu vùng hiện hành là current region và status của task hiện hành là comming task thì có thể drop
  dz = this.state.region_values[stringConst.CURRENT];
  is_comming_region =  gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
  if(is_comming_region && status == stringConst.COMMING && !this.props.parent.is_max_current_tasks())
  {
    result.region = stringConst.CURRENT;
    return true;
  }

  //Nếu vùng hiện hành là comming region và status của task hiện hành là current task thì có thể drop
  let dz = this.state.region_values[stringConst.COMMING];
  let is_comming_region =  gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
  if(is_comming_region && status == stringConst.CURRENT)
  {
    result.region = stringConst.COMMING;
    return true;
  }

  //Nếu vùng hiện hành là done region và status của task hiện hành là current task thì có thể drop
  dz = this.state.region_values[stringConst.DONE];
  is_comming_region =  gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
  if(is_comming_region && status == stringConst.CURRENT)
  {
    result.region = stringConst.DONE;
    return true;
  }

  return false;
}

//Event Release
export const _onPanResponderRelease = function (e, gesture)
{
  if (gesture.dx == 0 && gesture.dy == 0) {
    this.props.onPress();
  }

  //Giá trị tham chiếu hàm _is_drop trả về
  let result = {
    region: ''
  };

  if(_is_drop.bind(this)(gesture, result))
  {
    this.props.parent.drop_process(this.props.attributes, result.region);
    Animated.timing (
      this.state.pan,
      {
        toValue: {x:0, y:0},
        duration: 0,
      },
    ).start();
}
  else
  {
    Animated.spring (
      this.state.pan,
      {toValue:{x:0, y:0}}
    ).start();
  }

  //Tắt toàn bộ hiệu ứng khi release
  this.props.parent.unhighlight_region();
}
