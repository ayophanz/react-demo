
import React, { useState } from 'react';
import {View, FlatList, Text, Button, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import { SimpleLineIcons } from "@expo/vector-icons";
import Single from './single';

const PeopleStory = props => {
    const [isSingleMode, setIsSingleMode] = useState(false);

    function excerpt(value, limit) {
        return (value.length<limit)?value:value.substring(0, limit)+'...';
    }
    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.appDiv}>
                <Text style={styles.appTitle}>{props.displayName+'\'s Story'}</Text>
            </View>
            <View style={styles.view1}>
            <FlatList 
                keyExtractor={(item, index) => item.key}
                data={props.story} 
                renderItem={itemData => 
                <TouchableOpacity onPress={()=>setIsSingleMode(true)}>
                    <View style={styles.view2}>
                    <Single id={props.id} title={itemData.item.title} desc={itemData.item.desc} onClose={()=>setIsSingleMode(false)} visible={isSingleMode}/>
                        <SimpleLineIcons name="pin" size={22} color="#099a97" />
                        <Text style={styles.titleStory}>{excerpt(itemData.item.title, 30)}</Text>
                        <Text>{excerpt(itemData.item.desc, 150)}</Text>
                    </View>
                </TouchableOpacity>}/>
            </View>
            <View><Button title="close" color="#fd5e53" onPress={props.onClose}/></View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    view1 : {
        flex:1
    },
    view2: {
        padding:10,
        marginTop:2,
        marginBottom:2,
        marginLeft:10,
        marginRight:10,
        marginVertical:1,
        backgroundColor:'#ffffff',
        color:'white',
        borderColor:'#099a97',
        borderWidth:1
    },
    titleStory: {
        fontSize:26,
        fontWeight:'700',
        borderBottomColor:'#099a97',
        borderBottomWidth:1,
        paddingBottom:10,
        marginBottom:5
    },
    appTitle: {
        textAlign:'center',
        color:'#ffffff',
        fontSize:26,
        fontWeight:'700',
        marginTop:10,
        padding:15
    },
    appDiv: {
        backgroundColor:'#4fc08d'
    }
});

export default PeopleStory;