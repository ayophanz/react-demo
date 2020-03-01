
import React, {useState} from 'react';
import {View, Alert, TextInput, Button, Modal, StyleSheet} from 'react-native';
import AdditionalUserInfo from './additionalUserInfo';
import db from './connection';

const loginSignup = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [IsAdditionalInfo, setIsAdditionalInfo] = useState(false);

    function nameHandler(enteredEmail) {
        setEmail(enteredEmail);
        enteredEmail = '';
    }

    function pincodeHandler(enteredPassword) {
        setPassword(enteredPassword);
        enteredPassword = '';
    }

    function isEmailValid(email) {
        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(String(email).toLowerCase())
   }

    function signUpUser(email, password){
        try {
            if(email.length <= 0 || isEmailValid(email)==false) {
                return alert("Please enter valid email");
            }
            if (password.length < 6) {
                return alert("Please enter atleast 6 characters of password");
            }
            setIsAdditionalInfo(true);
            // db.auth().createUserWithEmailAndPassword(email, password).then(function(user){
            //     //Alert.alert('Signup Successfully!', 'Congratz!');
            //     setEmail('');
            //     setPassword('');
            // }).catch(function(error) {
            //     Alert.alert('Something went wrong!', error.message);
            // });
            
        }
        catch (error) {
            Alert.alert('Something went wrong!', error.toString());
        }
    }
    
    function clearField() {
        setEmail('');
        setPassword('');
        setIsAdditionalInfo(false);
    }
    

    function loginUser(email, password) {
        try {
            if(email.length <= 0 || isEmailValid(email)==false) {
                return alert("Please enter valid email");
            }
            if (password.length < 6) {
                return alert("Please enter atleast 6 characters of password");
            }
            db.auth().signInWithEmailAndPassword(email, password).then(function (user) {
                setEmail('');
                setPassword('');
                props.ifNotAuth(false);
                Alert.alert('Login Successfully!', 'Welcome!');
            }).catch(function(error) {
                Alert.alert('Something went wrong!', error.message);
            });
            
        }
        catch (error) {
            Alert.alert('Something went wrong!', error.toString());
        }
    }

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.view1}>
                <AdditionalUserInfo onCreatedUser={clearField} email={email} password={password} visible={IsAdditionalInfo}/>
                <TextInput
                    onChangeText={nameHandler}
                    value={email}
                    placeholder="Email" 
                    style={styles.inputGoalTxt}/>
                <TextInput
                    secureTextEntry={true}
                    onChangeText={pincodeHandler}
                    placeholder="Password"
                    value={password}
                    style={styles.inputGoalTxt}/>    
                <View style={styles.buttonDiv1}>
                    <Button 
                        onPress={() => loginUser(email, password)}
                        title="Login" 
                        color='#4fc08d'
                        style={styles.login}/>
                </View>
                <View style={styles.buttonDiv2}>
                    <Button 
                        onPress={() => signUpUser(email, password)}
                        title="Signup" 
                        style={styles.signup}/>     
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
    buttonDiv1: {
        marginBottom:10,
        width:'80%'
    },
    buttonDiv2: {
        marginBottom:10,
        width:'80%',
    },
    inputGoalTxt: {
        width:'80%',
        borderColor:'transparent',
        borderBottomColor:'black', 
        borderWidth:1,
        paddingBottom:0,
        padding:10,
        marginBottom:20
    },
    login: {
        padding:10
    },
    signup: {
        padding:10
    }
});

export default loginSignup;