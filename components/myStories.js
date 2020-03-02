
import React, { useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { SimpleLineIcons } from "@expo/vector-icons";
import Single from './single';

const Stories = props => {
    const [isSingleMode, setIsSingleMode] = useState(false);

    function excerpt(value, limit) {
        return (value.length<limit)?value:value.substring(0, limit)+'...';
    }
    
    return (
        <TouchableOpacity onPress={()=>setIsSingleMode(true)}>
            <View style={styles.goalListItem}>
                <Single id={props.id} title={props.title} desc={props.desc} onClose={()=>setIsSingleMode(false)} visible={isSingleMode}/>
                <SimpleLineIcons name="pin" size={22} color="#099a97" />
                <Text style={styles.titleStory}>{excerpt(props.title, 30)}</Text>
                <Text>{excerpt(props.desc, 150)}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    goalListItem: {
        padding:10,
        marginTop:2,
        marginBottom:2,
        backgroundColor:'#ffffff',
        color:'white',
        borderColor:'#099a97',
        borderWidth:1
        //flex:1
    },
    titleStory: {
        fontSize:26,
        fontWeight:'700',
        borderBottomColor:'#099a97',
        borderBottomWidth:1,
        paddingBottom:10,
        marginBottom:5
    }
});

export default Stories;