
import React from 'react';
import {View, Text, Button, Modal, StyleSheet} from 'react-native';
import { SimpleLineIcons } from "@expo/vector-icons";

const Single = props => {

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.view1}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.desc}>{props.desc}</Text>
            </View>
            <View><Button title="close" color="#fd5e53" onPress={props.onClose}/></View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    view1 : {
        flex:1,
        padding:10,
        justifyContent:'center'
    },
    title: {
        fontSize:26,
        fontWeight:'700',
        borderBottomColor:'#099a97',
        borderBottomWidth:1,
        paddingBottom:10,
        marginBottom:5
    },
    desc: {
        fontSize: 18
    }
});

export default Single;