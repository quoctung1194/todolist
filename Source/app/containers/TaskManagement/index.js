import React, {Component} from 'react';
import {
  Container,
  Content,
  Button,
  Icon,
  Text,
  View,
  Body,
  Footer,
  FooterTab
} from 'native-base';
import {
  StatusBar,
  Animated
} from 'react-native';
import styles from './styles';
import Task from '../../components/Task';
import * as actions from './actions';
import * as stringConst from '../../constants/string';
import {NORMAL_SIZE, BIG_SIZE} from '../../components/Task/styles';
import SQLite from 'react-native-sqlite-storage';
import common_styles from '../Index/styles';
import PopupDialog from 'react-native-popup-dialog';
import EditForm from '../../components/EditForm';

//Khoản cách giữa các task
const NORMAL_DISTANCE_X = 10;
const COMMING_TASK_TOP_PERCENT = 0.6;
const COMMING_TASK_BOTTOM_PERCENT = 1 - COMMING_TASK_TOP_PERCENT;

export default class TaskManagement extends Component
{
  constructor(props)
  {
    super(props);

    //Init State
    this.state = {
      region_layouts: {},
      color: {
        [stringConst.COMMING]: new Animated.Value(0),
        [stringConst.DONE]: new Animated.Value(0),
      },
      comming_tasks: [],
      current_task: [],
      done_tasks: [],
      render_task: false,
      max_current_task: 3,
    }

    //Init public function
    this.highlight_region = actions._highlight_region;
    this.unhighlight_region = actions._unhighlight_region;
    this.is_max_current_tasks = actions._is_max_current_tasks;
    this.drop_process = actions._drop_process;
    this.load_tasks = actions._load_tasks;
  }

  render()
  {
    return(
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {this._render_comming_region()}
        {this._render_current_region()}
        {this._render_done_region()}
        {
          this.state.render_task &&
            this._render_tasks()
        }
        {this.renderPopup()}
      </View>
    )
  }

  _render_comming_region()
  {
    let color = this.state.color[stringConst.COMMING].interpolate({
      inputRange: [0, 500],
      outputRange: ['black', 'green']
    });

    return (
      <Animated.View style={[ styles.comming_region, {borderColor: color} ]} ref={stringConst.COMMING}
        onLayout={actions._set_region_layouts.bind(this, stringConst.COMMING)}>
          <View style={styles.comming_region_start} />
          <View style={styles.comming_region_center}>
            <Icon onPress={actions._task_list_redirect.bind(this, stringConst.COMMING)}
              name='ios-more' style={styles.load_more_button} />
          </View>
          <View style={styles.comming_region_end}>
            <Icon onPress={actions._add_redirect.bind(this)} name='ios-add-circle' style={styles.add_button} />
          </View>
      </Animated.View>
    )
  }

  _render_current_region()
  {
    return (
      <View style={styles.current_region }
        onLayout={actions._set_region_layouts.bind(this, stringConst.CURRENT)} />
    )
  }

  _render_done_region()
  {
    let color = this.state.color[stringConst.DONE].interpolate({
      inputRange: [0, 500],
      outputRange: ['black', 'green']
    });

    return (
      <Animated.View style={[ styles.done_region, {borderColor: color} ]} onLayout={actions._set_region_layouts.bind(this, stringConst.DONE)}>
        <View style={styles.done_region_center}>
          <Icon onPress={actions._task_list_redirect.bind(this, stringConst.DONE)}
            name='ios-more' style={styles.load_more_button} />
        </View>
      </Animated.View>
    )
  }

  _render_tasks()
  {
    //Render comming_tasks;
    return [
      ...this._render_comming_tasks(),
      ...this._render_current_task(),
      ...this._render_done_task(),
    ];
  }

  _render_comming_tasks()
  {
    let comming_tasks = this.state.comming_tasks;

    return [
      ...this._render_top_comming_tasks(comming_tasks),
      ...this._render_bottom_comming_tasks(comming_tasks),
    ];
  }


  _render_top_comming_tasks(comming_tasks = [])
  {
    //Lấy số lượng hiện 60%
    let top_size = Math.round(comming_tasks.length * COMMING_TASK_TOP_PERCENT);
    // số lượng tối đa bắt buộc phải xuống dòng
    const breakNumber = 4;

    //Lọc lấy số lượng cần thiết
    let top_comming_tasks = [];
    for(let i = 0; i < top_size; i++)
    {
      top_comming_tasks.push(comming_tasks[i]);
    }
     // flag xem thử có phải 2 dòng hay không
    this.isTwoRow = (top_comming_tasks.length / 4) > 1;

    //Lấy vị trị start_y
    const OFFSET_TOP = 20;
    let start_y = this.state.region_layouts[stringConst.COMMING].y + OFFSET_TOP + NORMAL_SIZE.height/2;

    //Mảng chứa các task
    let components = [];
    let indexSencondRow = 0;
    for(let i = 0; i < top_comming_tasks.length; i++)
    {
      let task = top_comming_tasks[i];
      // lấy vị trí start x
      let start_x = actions._calculate_start_x(breakNumber, NORMAL_DISTANCE_X, NORMAL_SIZE);
      if (top_comming_tasks.length <= breakNumber) { //Xet trường hợp dưới top comming task số lượng dưới breakNumber
        start_x = actions._calculate_start_x(top_comming_tasks.length, NORMAL_DISTANCE_X, NORMAL_SIZE);
      } else if (i >= breakNumber) {
        start_x = actions._calculate_start_x(top_comming_tasks.length - breakNumber, NORMAL_DISTANCE_X, NORMAL_SIZE);
      }
      let value_x = start_x + ( NORMAL_SIZE.width + NORMAL_DISTANCE_X ) * i;

      // Xử lý xuống dòng
      if (i >= breakNumber) {
        value_x = start_x + ( NORMAL_SIZE.width + NORMAL_DISTANCE_X ) * indexSencondRow;
        indexSencondRow++;
        const OFFSET = 10;
        start_y = this.state.region_layouts[stringConst.COMMING].y + OFFSET_TOP + 1.5 * NORMAL_SIZE.height + OFFSET;
      }

      components.push(
        <Task
          ref={task.id}
          key={task.id}
          attributes={task}
          name={task.name}
          region_layouts={this.state.region_layouts}
          initLeft={value_x} initTop={start_y}
          onPress={() => {
            this.popupDialog.show();
            this.editForm.loadDetail(task.id) ;
          }}
          parent={this} status={stringConst.COMMING} />
      );
    }

    return components;
  }

  _render_bottom_comming_tasks(comming_tasks = [])
  {
    //Lấy số lượng hiện 40%
    let bottom_size = comming_tasks.length - Math.round(comming_tasks.length * COMMING_TASK_TOP_PERCENT);
    // số lượng tối đa bắt buộc phải xuống dòng
    const breakNumber = 3;

    //Lọc lấy số lượng cần thiết
    let bottom_comming_tasks = [];
    for(let i = 0; i < bottom_size; i++)
    {
      bottom_comming_tasks.unshift(comming_tasks[comming_tasks.length - 1 - i]);
    }

    //Lấy vị trị start_y
    const OFFSET_TOP = 10;
    let start_top_y = this.state.region_layouts[stringConst.COMMING].y + OFFSET_TOP + NORMAL_SIZE.height/2;
    // tính toàn khoản cách so với các task trên
    if (this.isTwoRow) {
      start_top_y = this.state.region_layouts[stringConst.COMMING].y + OFFSET_TOP + 1.5 * NORMAL_SIZE.height + OFFSET_TOP;
    }
    let start_y = start_top_y + NORMAL_SIZE.height/2 + BIG_SIZE.height/2 + OFFSET_TOP;

    //Mảng chứa các task
    let components = [];
    let indexSencondRow = 0;
    for(let i = 0; i < bottom_comming_tasks.length; i++)
    {
      let task = bottom_comming_tasks[i];

      //Lấy vị trí start_x
      let start_x = actions._calculate_start_x(breakNumber, NORMAL_DISTANCE_X, BIG_SIZE);
      if (bottom_comming_tasks.length <= breakNumber) { //Xét trường hợp dưới bottom comming task số lượng dưới breakNumber
        start_x = actions._calculate_start_x(bottom_comming_tasks.length, NORMAL_DISTANCE_X, BIG_SIZE);
      } else if (i >= breakNumber) {
        start_x = actions._calculate_start_x(bottom_comming_tasks.length - breakNumber, NORMAL_DISTANCE_X, BIG_SIZE);
      }
      let value_x = start_x + ( BIG_SIZE.width + NORMAL_DISTANCE_X ) * i;

      // Xử lý xuống dòng
      if (i >= breakNumber) {
        value_x = start_x + ( BIG_SIZE.width + NORMAL_DISTANCE_X ) * indexSencondRow;
        indexSencondRow++;
        const OFFSET = 10;
        start_y = start_top_y + NORMAL_SIZE.height/2 + 1.5 * BIG_SIZE.height + 2 * OFFSET;
      }

      components.push(
        <Task
          ref={task.id}
          key={task.id}
          attributes={task}
          name={task.name}
          region_layouts={this.state.region_layouts}
          initLeft={value_x} initTop={start_y}
          size={'big'}
          onPress={() => {
            this.popupDialog.show();
            this.editForm.loadDetail(task.id) ;
          }}
          parent={this} status={stringConst.COMMING} />
      );
    }

    return components;
  }

  _render_current_task()
  {
    let current_task = this.state.current_task;
    //Lấy vị trí start_x
    let start_x = actions._calculate_start_x(current_task.length, NORMAL_DISTANCE_X, BIG_SIZE);
    //Lấy vị trị start_y
    let start_y = this.state.region_layouts[stringConst.CURRENT].y +
      this.state.region_layouts[stringConst.CURRENT].height / 2 - BIG_SIZE.height / 2;

    //Mảng chứa các task
    let components = [];
    for(let i = 0; i < current_task.length; i++)
    {
      let task = current_task[i];
      let value_x = start_x + ( BIG_SIZE.width + NORMAL_DISTANCE_X ) * i;

      components.push(
        <Task
          ref={task.id}
          key={task.id}
          name={task.name}
          attributes={task}
          region_layouts={this.state.region_layouts}
          size={'big'}
          initLeft={value_x} initTop={start_y}
          onPress={() => {
            this.popupDialog.show();
            this.editForm.loadDetail(task.id) ;
          }}
          parent={this} status={stringConst.CURRENT} />
      );
    }

    return components;
  }

  _render_done_task()
  {
    let done_tasks = this.state.done_tasks;

    //Lấy vị trí start_x
    let start_x = actions._calculate_start_x(done_tasks.length, NORMAL_DISTANCE_X, NORMAL_SIZE);
    //Lấy vị trị start_y
    const OFFSET_TOP = -10;
    let start_y = this.state.region_layouts[stringConst.DONE].y +
      this.state.region_layouts[stringConst.DONE].height / 2 - NORMAL_SIZE.height / 2 + OFFSET_TOP;

    //Mảng chứa các task
    let components = [];
    for(let i = 0; i < done_tasks.length; i++)
    {
      let task = done_tasks[i];
      let value_x = start_x + ( NORMAL_SIZE.width + NORMAL_DISTANCE_X ) * i;
      components.push(
        <Task
          ref={task.id}
          key={task.id}
          name={task.name}
          attributes={task}
          region_layouts={this.state.region_layouts}
          initLeft={value_x} initTop={start_y}
          onPress={() => {
            this.popupDialog.show();
            this.editForm.loadDetail(task.id) ;
          }}
          parent={this} status={stringConst.DONE} />
      );
    }

    return components;
  }

  renderPopup() {
    return (
      <PopupDialog
        ref={(popupDialog) => { this.popupDialog = popupDialog; }}>
        <EditForm
          ref={(editForm) => { this.editForm = editForm; }}
          parent={this.popupDialog}
          taskManagement={this}
        />
      </PopupDialog>
    )
  }

  componentDidMount()
  {
    actions._init_database.bind(this)();
    actions._load_tasks.bind(this)();
  }
}
