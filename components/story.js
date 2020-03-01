
import React from 'react';
import {View, FlatList, Text, Button, Modal, TouchableOpacity, StyleSheet} from 'react-native';

const Story = props => {
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
                <TouchableOpacity>
                    <View style={styles.view2}>
                        <Text style={styles.titleStory}>{excerpt(itemData.item.title, 30)}</Text>
                        <Text>{excerpt(itemData.item.desc, 150)}</Text>
                    </View>
                </TouchableOpacity>}/>
            </View>
            <View><Button title="close" color="red" onPress={props.onClose}/></View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    view1 : {
        flex:1
    },
    view2: {
        padding:10,
        marginTop:15,
        marginBottom:15,
        marginLeft:10,
        marginRight:10,
        marginVertical:1,
        backgroundColor:'#ffffff',
        color:'white',
        borderColor:'#4fc08d',
        borderWidth:1
    },
    titleStory: {
        fontSize:26,
        fontWeight:'700'
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

export default Story;