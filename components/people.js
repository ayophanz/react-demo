
import React, { useState } from 'react';
import {View, FlatList, Text, Button, Modal, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import PeopleStory from './peopleStory';
import db from './connection';

const people = props => {
    const [isStoryMode, setIsStoryMode] = useState(false);
    const [storyFollow, setStoryFollow] = useState([]);
    const [displayName, setDisplayName] = useState('Unknown');

    function excerpt(value, limit) {
        return (value.length<limit)?value:value.substring(0, limit)+'...';
    }

    function loadStory(uid) {
        setIsStoryMode(true);
        setStoryFollow([]);
        db.firestore().collection('story').where('user', '==', uid).onSnapshot(snapshot => {
          let changes = snapshot.docChanges();
          changes.forEach(change => {
                setStoryFollow(currentStory => [...currentStory, {key:change.doc.data().key, title:change.doc.data().title, desc:change.doc.data().desc}]);
          });
        });
        db.firestore().collection('name').where('key', '==', uid).onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                setDisplayName(change.doc.data().name)
            });
        });
    }

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.view1}>
                <PeopleStory
                    onClose={()=>setIsStoryMode(false)} 
                    visible={isStoryMode}
                    displayName={displayName}
                    story={storyFollow}/>
                <FlatList 
                    keyExtractor={(item, index) => item.key}
                    data={props.people} 
                    renderItem={itemData => 
                    <TouchableOpacity onPress={()=>loadStory(itemData.item.key)}>
                        <View style={styles.view2} >
                            <FontAwesome name="user-o" size={32} color="#15cda8"/>
                            <Text 
                                style={styles.titleStory}
                                id={itemData.item.key}>{excerpt(itemData.item.name, 30)}</Text>
                        </View>
                    </TouchableOpacity>}/>
            </View>
            <View><Button title="close" color="#fd5e53" onPress={props.onClose}/></View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    view1: {
        flex:1,
        marginTop: 20,
    },
    view2: {
        padding:10,
        marginTop:2,
        marginBottom:2,
        marginLeft:10,
        marginRight:10,
        borderColor:'#099a97',
        borderWidth:1,
        borderWidth:1,
        flexDirection:'row'
    },
    titleStory: {
        fontSize:18,
        fontWeight:'700',
        marginLeft:10
    }
});

export default people;