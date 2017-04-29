import {
  StyleSheet,
  Dimensions
} from 'react-native';

export const NORMAL_SIZE = {
  width: 0.2 * Dimensions.get('window').width,
  height: (0.21 * Dimensions.get('window').width) / 2,
};

export const BIG_SIZE = {
  width: NORMAL_SIZE.width * 1.5,
  height: NORMAL_SIZE.height * 1.7,
};

export default styles = StyleSheet.create({
  mainContainer: {
      flex    : 1
  },
  dropZone    : {
      height  : 100,
      backgroundColor:'#2c3e50'
  },
  text        : {
      textAlign   : 'center',
      color       : '#fff',
  },
  draggableContainer: {
      position    : 'absolute',
  },
  circle      : {
      backgroundColor     : '#4CAF50',
      justifyContent      : 'center',
      borderRadius        : 3,
  }
});
