
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Stories = props => {
    function excerpt(value, limit) {
        return (value.length<limit)?value:value.substring(0, limit)+'...';
    }
    
    return (
        <TouchableOpacity>
            <View style={styles.goalListItem}>
                <Text style={styles.titleStory}>{excerpt(props.title, 30)}</Text>
                <Text>{excerpt(props.desc, 150)}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    goalListItem: {
        padding:10,
        marginTop:15,
        marginBottom:15,
        marginVertical:1,
        backgroundColor:'#ffffff',
        color:'white',
        borderColor:'#4fc08d',
        borderWidth:1
    },
    titleStory: {
        fontSize:26,
        fontWeight:'700'
    }
});

export default Stories;