
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Button,
  FlatList, 
  YellowBox,
  Alert
} from 'react-native';
import { AntDesign, FontAwesome } from "@expo/vector-icons";

import MyStories from './components/myStories'; 
import PostStory from './components/postStory';
import LoginSignup from './components/loginSignup';
import People from './components/people';
import db from './components/connection';
import {decode, encode} from 'base-64';

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

export default function App() {
  YellowBox.ignoreWarnings(['Setting a timer']);
  const [isNotAuth, setIsNotAuth] = useState(() => {
    db.auth().onAuthStateChanged(function(user) {
      if(user) {
        setIsNotAuth(false);
        loadStories();
        loadPeople();
        return;
      }else return setIsNotAuth(true);
    });
  });
  const [dailyGoals, setStories] = useState([]);
  const [peopleFollow, setPeopleFollow] = useState([]);
  const [isPeopleMode, setIsPeopleMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  function addStoryHandler(story, storyDesc) {
   // setStories(currentGoals => [...currentGoals, {key:new Date().valueOf().toString(), title:story, desc:storyDesc}]);
    setIsAddMode(false);
  }

  function removeGoalHandler(goalKey) {
    setStories(currentStories => {
      return currentStories.filter((goal) =>goal.key !== goalKey);
    });
  }

  function hasAccess(value) {
    setIsNotAuth(value);
  }

  function loadStories() {
    setStories([]);
    const userId = (db.auth().currentUser!=null)? db.auth().currentUser.uid.toString():'0';
    db.firestore().collection('story').where('user', '==', userId).onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      changes.forEach(change => {
        setStories(currentStories => [...currentStories, {key:change.doc.data().key, title:change.doc.data().title, desc:change.doc.data().desc}]);
      });
    });
  }

  function loadPeople() {
    setPeopleFollow([]);
    const userId = (db.auth().currentUser!=null)? db.auth().currentUser.uid.toString():'0';
    db.firestore().collection('name').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      changes.forEach(change => {
        if(change.doc.data().key.toString()!=userId) setPeopleFollow(currentFollow => [...currentFollow, {key:change.doc.data().key, name:change.doc.data().name}]);
      });
    });
  }

  function logout() {
    db.auth().signOut().then(function() {
      setIsNotAuth(true);
      Alert.alert('Logout Successfully!', 'Your welcome');
    }).catch(function(error) {
      Alert.alert('Something went wrong!', error);
    });
  }

  return (
    <View style={styles.main} >
      <LoginSignup ifNotAuth={hasAccess} visible={isNotAuth}/>
      <PostStory onClose={()=>setIsAddMode(false)} visible={isAddMode} onAddStory={addStoryHandler}/>
      <People 
        onClose={()=>setIsPeopleMode(false)} 
        visible={isPeopleMode}
        people={peopleFollow}/>
      <View style={styles.appDiv}>
        <Text style={styles.appTitle}>My Story</Text>
      </View>
      <View style={styles.view1}>
        <View style={styles.mainTopBtn}>
            <AntDesign 
              onPress={logout}
              style={styles.logoutBtn}
              name="logout" size={32} color="#fd5e53" />
            <View style={styles.addDiv}>
            <Button 
              title="Add story" 
              color='#4fc08d'
              onPress={() => setIsAddMode(true)}
              style={styles.addBtn}/>
          </View> 
          <FontAwesome
            onPress={() => setIsPeopleMode(true)}
            style={styles.peopleBtn}
            name="users" size={32} color="#9764c7"/>
        </View>
        <FlatList
          style={{maxHeight:'86%', marginTop:5}}
          keyExtractor={(item, index) => item.key}
          data={dailyGoals} 
          renderItem={itemData => 
          <MyStories 
            id={itemData.item.key} 
            title={itemData.item.title}
            desc={itemData.item.desc} /> }/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
  },  
  view1: {
    padding:10,
    marginVertical:1
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
  },
  mainTopBtn: {
    flexDirection:'row',
    justifyContent:'center', 
    alignItems:'center'
  },
  addDiv: {
    width:'75%',
    marginLeft:10,
    marginRight:10
  },
  logoutBtn: {

  },
  addBtn: {
    
  },
  peoplBtn: {

  }
});
