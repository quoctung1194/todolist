import React, { Component } from 'react';
import {
	Container,
	Content,
	Button,
	Text,
	Footer,
	Form,
	Item,
	Label,
	Input,
	View
} from 'native-base';
import {
	StatusBar
} from 'react-native';
import styles from './styles';
import * as stringConst from '../../constants/string';
import common_styles from '../Index/styles';

export default class Login extends Component
{
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
			<Content>
				<StatusBar
					backgroundColor={common_styles.dark_primary_color.backgroundColor}
					barStyle="light-content"
				/>
				<View style={styles.main}>
					<Form>
						<Item floatingLabel>
							<Label>{stringConst.USERNAME}</Label>
							<Input />
						</Item>

						<Item floatingLabel>
							<Label>{stringConst.PASSWORD}</Label>
							<Input />
						</Item>
					</Form>

					<Button block style={styles.button_login}>
						<Text>{stringConst.LOGIN}</Text>
					</Button>
				</View>
			</Content>
		);
	}
}
