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
	View,
	Picker,
	InputGroup
} from 'native-base';
import {
	TouchableOpacity,
	DatePickerAndroid,
	StatusBar
} from 'react-native';
import SpeechAndroid from 'react-native-android-voice';
import common_styles from '../Index/styles';
import styles from './styles';
import * as actions from './actions';
import * as stringConst from '../../constants/string';
import SQLite from 'react-native-sqlite-storage';

export default class Add extends Component
{
	constructor(props)
  {
		super(props);

		//Init current date
		let currentdate = new Date();
	  let datetime = ('0' + (currentdate.getDate())).slice(-2) + "-"
						+ ('0' + (currentdate.getMonth() + 1)).slice(-2) + "-"
						+ (currentdate.getFullYear())

		 //Set default form
 		this._default_form = {
 			name: '',
 			project: '',
 			priority: stringConst.PRIORITY_LOW,
 			deadline: datetime,
 		};

		//Default state
		this.state = {
		    form: JSON.parse(JSON.stringify(this._default_form)),
		 };

		//Init DB
		this._db = SQLite.openDatabase('localDB.db');
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

	_render_header()
	{
		return (
			<Header style={common_styles.primary_color}>
				<StatusBar
					backgroundColor={common_styles.dark_primary_color.backgroundColor}
					barStyle="light-content"
				/>
				<Left>
					<Button style={common_styles.primary_color} onPress={actions._back_to_index.bind(this)}>
						<Icon name='arrow-back' />
					</Button>
				</Left>
				<Body>
					<Text style={common_styles.text}>{stringConst.ADD}</Text>
				</Body>
				<Right>
					<Button style={common_styles.primary_color} onPress={actions._add_task.bind(this)}>
						<Icon name='add' />
					</Button>
				</Right>
			</Header>
		);
	}

	_render_content()
	{
		return (
			<Content style={common_styles.content}>
				<View style={styles.main}>

					<View style={styles.content}>
						<Label style={styles.label}>{stringConst.NAME}</Label>
						<InputGroup style={styles.input}>
							<Input
								style={styles.inputText}
								onChangeText={actions._update_input.bind(this, 'name')}
								value={this.state.form.name}
								autoFocus={true}
							/>
							<TouchableOpacity
                                style={styles.voice_icon_container}
                                onPress={this._voice.bind(this, 'name')}
                            >
								<Icon
									name='mic'
									style={styles.voice_icon}
								/>
							</TouchableOpacity>
						</InputGroup>
					</View>

					<View style={styles.content}>
						<Label style={styles.label}>{stringConst.PROJECT}</Label>
						<InputGroup style={styles.input}>
							<Input
								style={styles.inputText}
								ref='pro'
								onChangeText={actions._update_input.bind(this, 'project')}
								value={this.state.form.project}
							/>
							<TouchableOpacity
                                style={styles.voice_icon_container}
                                onPress={this._voice.bind(this, 'project')}
                            >
								<Icon
									name='mic'
									style={styles.voice_icon}
								/>
							</TouchableOpacity>
						</InputGroup>
					</View>

					<View style={styles.content}>
						<Label style={styles.label}>{stringConst.PRIORITY}</Label>
						<Picker
							style={styles.picker}
							selectedValue={this.state.form.priority}
  						onValueChange={actions._update_input.bind(this, 'priority')}
							mode="dropdown">
							<Picker.Item label={stringConst.PRIORITY_LOW_LABEL} value={stringConst.PRIORITY_LOW} />
							<Picker.Item label={stringConst.PRIORITY_NORMAL_LABEL} value={stringConst.PRIORITY_NORMAL} />
							<Picker.Item label={stringConst.PRIORITY_HIGH_LABEL} value={stringConst.PRIORITY_HEIGHT} />
						</Picker>
					</View>

					<View style={styles.deadline}>
						<Label style={styles.label}>Deadline</Label>
						<TouchableOpacity style={styles.date_picker} onPress={actions._show_picker.bind(this)}>
           		<Text>{this.state.form.deadline}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Content>
		);
	}
  	_voice = async (input, value) => {
  		 try {
	        //More Locales will be available upon release.
	        var spokenText = await SpeechAndroid.startSpeech("Please speaking", SpeechAndroid.VIETNAMESE);
	        //ToastAndroid.show(spokenText , ToastAndroid.LONG);
	        this.state.form[input] = spokenText;
	        this.setState(this.state);
	    } catch (error) {
	        switch(error) {
	            case SpeechAndroid.E_VOICE_CANCELLED:
	                ToastAndroid.show("Voice Recognizer cancelled" , ToastAndroid.LONG);
	                break;
	            case SpeechAndroid.E_NO_MATCH:
	                ToastAndroid.show("No match for what you said" , ToastAndroid.LONG);
	                break;
	            case SpeechAndroid.E_SERVER_ERROR:
	                ToastAndroid.show("Google Server Error" , ToastAndroid.LONG);
	                break;
	        }
	    }
  	}
}
