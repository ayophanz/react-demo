
import React, {useState} from 'react';
import {View, TextInput, Button, Modal, StyleSheet, Alert} from 'react-native';
import db from './connection';

const additionalUserInfo = props => {
    const [enteredName, setEnteredName] = useState('');

    function inputNameHandler(enteredName) {
        setEnteredName(enteredName);
        enteredName = '';
    }

    function onCreateUser(name, email, password) {
        db.auth().createUserWithEmailAndPassword(email, password).then(function(user){
            new Promise((res, rej) => {
                db.firestore().collection('name').add({
                    key:db.auth().currentUser.uid,  
                    name: name,
                    create_at: new Date()
                });
                props.onCreatedUser();
                props.ifNotAuth(false);
            });
            Alert.alert('Signup Successfully!', 'Congratz!');
        }).catch(function(error) {
            Alert.alert('Something went wrong!', error.message);
        });
    }
    
    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.view1}>
                <TextInput 
                    onChangeText={inputNameHandler}
                    value={enteredName}
                    placeholder="Your nickname" 
                    style={styles.name}/>     
                <View style={styles.btnCreate}>    
                    <Button 
                        onPress={() => onCreateUser(enteredName, props.email, props.password)}
                        color='#4fc08d'
                        borderColor='#4fc08d'
                        title="Finish" 
                        style={styles.createUser}/>
                </View>
            </View>
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
    name: {
        width:'80%',
        borderColor:'transparent',
        borderBottomColor:'black', 
        borderWidth:1,
        paddingBottom:0,
        padding:10,
        marginBottom:20
    }, 
    btnCreate: {
        marginBottom:10,
        width:'80%'
    },
    createUser: {

    }
});

export default additionalUserInfo;