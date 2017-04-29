import React, { Component } from 'react';
import {
	Container,
	Content,
	Text,
	View,
	Picker
} from 'native-base';
import {
	StatusBar
} from 'react-native';
import styles from './styles';
import * as stringConst from '../../constants/string';
import * as actions from './actions';
import common_styles from '../Index/styles';

export default class Setting extends Component
{
	constructor(props)
	{
    super(props);

  }

	componentWillMount()
	{
		//Init state
		this.state = {
			[stringConst.COMMING]: 5,
			[stringConst.CURRENT]: 3,
			[stringConst.DONE]: 3,
		}

		//lấy dữ liệu settings
		actions._load_settings.bind(this)();
	}

	render()
	{
		return (
			<Container>
				{this._render_content()}
			</Container>
		)
	}

	_render_content()
	{
		return (
			<Content style={common_styles.content}>
				<StatusBar
					backgroundColor={common_styles.dark_primary_color.backgroundColor}
					barStyle="light-content"
				/>
				<View style={styles.main}>
					<View style={styles.content}>
						<Text style={styles.text}>Coming Task</Text>
						<Picker
							style={styles.picker}
							mode="dropdown"
							selectedValue={this.state[stringConst.COMMING].toString()}
							onValueChange={actions._on_value_change.bind(this, stringConst.COMMING)}
						>
							<Picker.Item label="5" value="5" />
							<Picker.Item label="6" value="6" />
							<Picker.Item label="7" value="7" />
							<Picker.Item label="8" value="8" />
							<Picker.Item label="9" value="9" />
							<Picker.Item label="10" value="10" />
						</Picker>
					</View>

					<View style={styles.content}>
						<Text style={styles.text}>Current Task</Text>
						<Picker
							style={styles.picker}
							mode="dropdown"
							selectedValue={this.state[stringConst.CURRENT].toString()}
							onValueChange={actions._on_value_change.bind(this, stringConst.CURRENT)}
						>
							<Picker.Item label="1" value="1" />
							<Picker.Item label="2" value="2" />
							<Picker.Item label="3" value="3" />
						</Picker>
					</View>

					<View style={styles.content}>
						<Text style={styles.text}>Done Task</Text>
						<Picker
						  style={styles.picker}
							mode="dropdown">
							<Picker.Item label="3" value="3" />
						</Picker>
					</View>
				</View>
			</Content>
		);
	}
}
