
import React, {useState} from 'react';
import {View, TextInput, Button, Modal, StyleSheet, Alert, YellowBox} from 'react-native';
import db from './connection';

const postStory = props => {
    YellowBox.ignoreWarnings(['Setting a timer']);
    const [enteredStory, setEnteredStory] = useState('');
    const [enteredStoryDesc, setEnteredStoryDesc] = useState('');

    function storyInputTitleHandler(enteredText) {
        setEnteredStory(enteredText);
        enteredText = '';
    }

    function storyInputDescHandler(enteredText) {
        setEnteredStoryDesc(enteredText);
        enteredText = '';
    }

    function addStoryHandler() {
        if(enteredStory=='') return Alert.alert('Empty title', 'Please enter title of story');
        if(enteredStoryDesc=='') return Alert.alert('Empty description', 'Please enter description of story');
        new Promise((res, rej) => {
            db.firestore().collection('story').add({
                key:new Date().valueOf().toString(),  
                title:enteredStory,
                desc:enteredStoryDesc,
                user:db.auth().currentUser.uid,
                create_at: new Date()
            });
        });
        props.onAddStory(enteredStory, enteredStoryDesc);
        setEnteredStory('');
        setEnteredStoryDesc('');
    }
    
    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.view1}>
                <TextInput 
                    onChangeText={storyInputTitleHandler}
                    value={enteredStory}
                    placeholder="Enter your story title" 
                    style={styles.inputGoalTxt}/>
                <TextInput
                    onChangeText={storyInputDescHandler}
                    placeholder="Your story description"
                    value={enteredStoryDesc}
                    style={styles.inputGoalTxt}
                    multiline={true}/>  
                <View style={styles.btnPublish}>    
                    <Button 
                        onPress={addStoryHandler}
                        color='#4fc08d'
                        borderColor='#4fc08d'
                        title="Publish" 
                        style={styles.addGoalBtn}/>
                </View>
            </View>
            <View><Button title="close" color="#fd5e53" onPress={props.onClose}/></View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    view1: {
        flex:1,
        flexDirection:'column', 
        justifyContent:'center', 
        alignItems:'center'
    },
    scrollView1: {
        width:'100%'
    },
    inputGoalTxt: {
        width:'80%',
        borderColor:'transparent',
        borderBottomColor:'#099a97', 
        borderWidth:1,
        paddingBottom:0,
        padding:10,
        marginBottom:20
    },
    addGoalBtn: {
        padding:10,
        color:'#4fc08d',
        borderColor:'#4fc08d'
    },
    btnPublish: {
        width:'80%'
    }
});

export default postStory;