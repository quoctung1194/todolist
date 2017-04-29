import React, {Component} from 'react';
import {
  View,
  Text,
  PanResponder,
  Animated,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';

import styles, {NORMAL_SIZE, BIG_SIZE} from './styles';
import * as actions from './actions';
import * as stringConst from '../../constants/string'
import Tabs from 'react-native-tabs';

export default class Task extends Component
{
  constructor(props)
  {
    super(props);
    //Thiết lập state ban đầu cho đối tượng
    this.state = {
      showDraggable   : true,
      dropZoneValues  : null,
      pan             : new Animated.ValueXY(),
      region_values   : this.props.region_layouts,
    };

    //Thiết lập panResponder
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder    : () => true,
      onPanResponderMove              : actions._onPanResponderMove.bind(this),
      onPanResponderRelease           : actions._onPanResponderRelease.bind(this),
    });
  }

  //Render Task
  render()
  {
    //Kích thước của Task
    let size = {
      width: NORMAL_SIZE.width,
      height: NORMAL_SIZE.height
    };

    if(this.props.size == 'big')
    {
      size = {
        width: BIG_SIZE.width ,
        height: BIG_SIZE.height
      };
    }

    return (
      <View
        onLayout={this.props.onLayout}
        style={ [styles.draggableContainer, {top: this.props.initTop, left: this.props.initLeft} ]}>
          <Animated.View
              {...this.panResponder.panHandlers}
              style={[this.state.pan.getLayout(), styles.circle, size]}>
                <Text style={styles.text}
                  numberOfLines={2}
                >
                  {this.props.name}
                </Text>
          </Animated.View>
      </View>
    );
  }

  //Gán các tham số tọa độ, kích thước của các region drag, drop
  set_region_values(values)
  {
    actions._set_region_values.bind(this)(values);
  }
}
