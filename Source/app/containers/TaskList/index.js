import React, { Component } from 'react';
import {
	Container,
	Content,
	Header,
	Left,
	Button,
	Text,
	Body,
	Icon,
	Right,
	Footer,
	FooterTab,
	Form,
	Item,
	Label,
	Input,
	View
} from 'native-base';
import {
	ListView,
	ToastAndroid
} from 'react-native';
import common_styles from '../Index/styles';
import styles from './styles';
import * as actions from './actions';
import * as stringConst from '../../constants/string';
import SQLite from 'react-native-sqlite-storage';

export default class TaskList extends Component
{
	constructor(props)
	{
    	super(props);

    	const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    	//Init state
    	this.state = {
    		task_list: [],
      		data_source: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    	};

    	actions._load_tasks();

  	}

  	componentDidMount()
  	{
	    this.setState({
	      data_source: this.state.data_source.cloneWithRows(this.state.task_list),
	    });
  	}

	render()
	{
		return (
			<Container>
				{this._render_header()}
				{this._render_content()}
			</Container>
		)
	}

	//TODO: Viết Common cho Header
	_render_header()
	{
		return (
			<Header style={common_styles.primary_color}>
				<Left>
					<Button onPress={actions._back_to_index.bind(this)} style={common_styles.primary_color}>
						<Icon name='arrow-back' />
					</Button>
				</Left>
				<Body>
					<Text style={common_styles.text}>{stringConst.TASK_LIST}</Text>
				</Body>
				<Right />
			</Header>
		);
	}

	_render_content()
	{
		return (
			<Content>
				<View style={styles.main}>
					<ListView
						dataSource={this.state.data_source}
						renderRow={this._render_row.bind(this)}
					/>
				</View>
			</Content>
		);
	}

	_render_row(task)
	{
		return (
			<View>
				<Text style={styles.text}>{task.name}</Text>
			</View>
		);
	}
}
