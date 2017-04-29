import React, { Component } from 'react';
import {
	Container,
	Content,
	Text,
  Button,
	Footer,
	FooterTab,
  Body,
  Header,
  Left,
  Icon,
  Right
} from 'native-base';
import {
	Keyboard,
	StatusBar,
} from 'react-native';
import * as stringConst from '../../constants/string';
import styles from './styles';
import * as actions from './actions';
import TaskManagement from '../TaskManagement';
import Login from '../Login';
import Setting from '../Setting';
import common_styles from '../Index/styles';

export default class Index extends Component
{
  constructor(props)
  {
    super(props);

    //Init State
    this.state = {
      current_component: stringConst.TASK_MANAGEMENT,
      title: stringConst.DEFAULT,
      hidden_header: true,
			hidden_footer: false,
      active: {
        [stringConst.LOGIN]: false,
        [stringConst.SETTING]: false,
      }
    };

    //Init public function
    this.hide_footer = this._hide_footer;
  }

  componentWillMount ()
  {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', actions._keyboard_did_show.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', actions._keyboard_did_hide.bind(this));
  }

  componentWillUnmount ()
  {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  render()
  {
    return (
      <Container>
        {
          !this.state.hidden_header &&
            this._render_header()
        }
        {this._render_content()}
        {this._render_footer()}
      </Container>
    );
  }

  _render_header()
	{
		return (
			<Header style={styles.primary_color}>
				<Left>
					<Button style={styles.primary_color} onPress={actions._back_to_index.bind(this)}>
						<Icon name='arrow-back' />
					</Button>
				</Left>
				<Body>
					<Text style={styles.text}>{this.state.title}</Text>
				</Body>
				<Right />
			</Header>
		);
	}

  _render_content()
  {
    let current_component = <TaskManagement />;

    switch (this.state.current_component) {
      case stringConst.TASK_MANAGEMENT:
        current_component = <TaskManagement />;
        break;
      case stringConst.LOGIN:
        current_component = <Login parent={this} />;
        break;
      case stringConst.SETTING:
        current_component = <Setting />;
        break;
      default:

    }

    return (
      current_component
    );
  }

  _render_footer()
  {
		if ( this.state.hidden_footer )
		{
				return;
		}

    return (
      <Footer>
        <FooterTab style={styles.primary_color}>
          <Button
						style={styles.primary_color}
						key={stringConst.LOGIN + this.state.active[stringConst.LOGIN]}
            active={this.state.active[stringConst.LOGIN]}
            onPress={actions._set_current_component.bind(this, stringConst.LOGIN)}>
            <Text style={styles.tab_text}>{stringConst.LOGIN}</Text>
          </Button>
          <Button
						style={styles.primary_color}
            key={stringConst.SETTING + this.state.active[stringConst.SETTING]}
            active={this.state.active[stringConst.SETTING]}
            onPress={actions._set_current_component.bind(this, stringConst.SETTING)}>
            <Text style={styles.tab_text}>{stringConst.SETTING}</Text>
          </Button>
          <Button>
            <Text style={styles.tab_text}>{stringConst.ABOUT}</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }

  _render_tab(component_name)
  {
    let buttoon = (
      <Button
        onPress={actions._set_current_component.bind(this, component_name)}>
        <Text style={styles.tab_text}>{component_name}</Text>
      </Button>
    );

    button = (
      <Button active
        onPress={actions._set_current_component.bind(this, component_name)}>
        <Text style={styles.tab_text}>{component_name}</Text>
      </Button>
    );
  }

}
