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
    TouchableWithoutFeedback 
} from 'react-native';
import common_styles from '../Index/styles';
import styles from './styles';
import * as actions from './actions';
import * as stringConst from '../../constants/string';
import SQLite from 'react-native-sqlite-storage';
import PopupDialog from 'react-native-popup-dialog';
import EditForm from '../../components/EditForm';

export default class TaskList extends Component
{
    constructor(props)
    {
        super(props);

        //Init state
        this.state = {
            task_list: [],
            data_source: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        };
        actions._load_tasks.bind(this)(this.props.task_type);

        this.load_tasks = actions._load_tasks.bind(this, this.props.task_type);
    }

    render()
    {
        return (
            <Container>
                {this._render_header()}
                {this._render_content()}
                {this._renderPopup()}
            </Container>
        )
    }

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
        if (this.state.task_list.length == 0) {
            return (
                <Content>
                    <View style={styles.noData}>
                        <Text>{stringConst.NODATA}</Text>
                    </View>
                </Content>
            );
        }
        return (
            <Content>
                <View style={styles.main}>
                    <ListView
                        dataSource={this.state.data_source}
                        renderRow={this._render_row.bind(this)}
                        renderSeparator={this._render_separator}
                    />
                </View>
            </Content>
        );
    }

    _render_row(task)
    {
        return (
            <TouchableWithoutFeedback  onPress={actions.displayPopup.bind(this, task.id)}>
                <View>
                    <Text style={styles.text}>{task.name}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    _render_separator(sectionID: number, rowID: number) {
        return (
            <View
                key={rowID}
                style={styles.separator}
            />
        );
    }

    _renderPopup() {
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
}
