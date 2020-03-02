
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { SimpleLineIcons } from "@expo/vector-icons";

const Stories = props => {
    function excerpt(value, limit) {
        return (value.length<limit)?value:value.substring(0, limit)+'...';
    }
    
    return (
        <TouchableOpacity>
            <View style={styles.goalListItem}>
                <SimpleLineIcons 
                name="pin" size={22} color="#099a97" />
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