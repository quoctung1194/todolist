import React, {Component} from 'react';
import {Scene, Router} from 'react-native-router-flux';
import * as stringConst from './constants/string';
import Setting from './containers/Setting';
import Login from './containers/Login';
import Add from './containers/Add';
import TaskList from './containers/TaskList';
import TaskManagement from './containers/TaskManagement';
import Index from './containers/Index';

export default class App extends Component
{
  render()
  {
    return (
      <Router>
        <Scene key="root">
          <Scene key="index" component={Index} title={stringConst.DEFAULT} hideNavBar={true} />
          <Scene key="task_management" component={TaskManagement} title={stringConst.TASK_MANAGEMENT} hideNavBar={true} />
          <Scene key="add" component={Add} title={stringConst.ADD} hideNavBar={true} />
          <Scene key="task_list" component={TaskList} title={stringConst.TASK_LIST} hideNavBar={true} />
          <Scene key="setting" component={Setting} title={stringConst.SETTING} hideNavBar={true} />
          <Scene key="login" component={Login} title={stringConst.LOGIN} hideNavBar={true} />
        </Scene>
      </Router>
    );
  }
}
