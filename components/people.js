
import React, { useState } from 'react';
import {View, FlatList, Text, Button, Modal, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import Story from './story';
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
                <Story 
                    onClose={()=>setIsStoryMode(false)} 
                    visible={isStoryMode}
                    displayName={displayName}
                    story={storyFollow}/>
                <FlatList 
                    keyExtractor={(item, index) => item.key}
                    data={props.people} 
                    renderItem={itemData => 
                    <TouchableOpacity>
                        <View style={styles.view2}>
                            <Text 
                                style={styles.titleStory}
                                onPress={()=>loadStory(itemData.item.key)} 
                                id={itemData.item.key}>{excerpt(itemData.item.name, 30)}</Text>
                        </View>
                    </TouchableOpacity>}/>
            </View>
            <View><Button title="close" color="red" onPress={props.onClose}/></View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    view1: {
        flex:1,
        marginTop: 20,
    },
    view2: {
        padding:2,
        paddingLeft:10,
        paddingRight:10,
        marginTop:1,
        marginBottom:1,
        marginLeft:10,
        marginRight:10,
        backgroundColor:'#ffffff',
        borderColor:'#4fc08d',
        borderWidth:1,
        justifyContent:'center',
    },
    titleStory: {
        fontSize:18,
        fontWeight:'700'
    }
});

export default people;