import React, { Component, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import * as shape from 'd3-shape'
import { CircularProgress } from "react-native-circular-progress";
import * as theme from '../theme';
import { Block, Text } from '../components';
import mocks from '../settings';
import { getDatabase, ref, onValue, set, database, update } from 'firebase/database';
import settings from '../settings';
import { db } from '../firebase-config';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { onChange } from 'react-native-reanimated';

function comparearray(doorSignal, ...doorConstant ){
  return doorConstant.includes(doorSignal);
}

function checkindex(doorSignal,...doorConstant){
  return doorConstant.indexOf(doorSignal)
}


function Door ({navigation}) {
    const navigationOptions = {
    header: null
    };

    const DoorIcon = settings['door'].icon


    let [dooractive, setDooractive] = useState(true)
    let [doorSignal, setDoorSignal] = useState(String)
    let [doorConstant, setDoorConstant] =useState(Array)
 
    
    /* Sign in via email and password */
    const auth = getAuth();
      signInWithEmailAndPassword(auth, "nguyenduong.bte@gmail.com", "mothaibabon")
      .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      })
      .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

    /* Write data to firebase */
    const setDoorValue = (keyfirebase) => {
     
        var previousval;
        const db = getDatabase();
        const reference = ref(db,   keyfirebase);
        onValue(reference, (snapshot) => {
          previousval = snapshot.val().door;
          });
        set(reference, {
          door: !previousval,
        });
    }
    
    /* Reading data from firebase */
  
    useEffect(() => {
      const reference = ref(db, "/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/writings/frontdoor/doorstatus");
      onValue(reference, (snapshot) => {
          setDooractive( snapshot.val().door)
          
        });
      },[]);


    useEffect(() => {
      const reference = ref(db, "/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/constant");
      onValue(reference, (snapshot) => {
          setDoorConstant(snapshot.val())
        });
      },[]);   
    
    /* Reading Authentification Signal from Door */
     
  
    useEffect(() => {
      const reference = ref(db, "/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/doors" )
      onValue(reference, (snapshot) => {
        setDoorSignal (snapshot.val().doorsignal.toString())
        
      });
    },[]);
   
  /*Compare input card with database*/ 
    let checkinInfor = new Array(true,"")
    checkinInfor[0] = comparearray(doorSignal, ...doorConstant)
    checkinInfor[1] = checkindex(doorSignal, ...doorConstant)
    
    if (checkinInfor[1]==("-1")){
      checkinInfor[1]="Unknown"
    }
    else {
      checkinInfor[1]=doorConstant[checkinInfor[1]-1]
    }

 
  /*Real time*/  
    const time = new Date();
    
    return (
      <Block style={styles.dashboard}>
        <ScrollView contentContainerStyle={styles.buttons} showsVerticalScrollIndicator={false}>
          <Block column space="between">

            <Block row space="around" style={{ marginVertical: theme.sizes.base }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setDoorValue("/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/writings/frontdoor/doorstatus")
                //console.log(doorSignal[3])    
                }> 
                <Block center middle style={styles.button}>
                  <DoorIcon size={38} color ={dooractive ==true? "green":""} />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5 }}
                  >
                    {settings['door'].name}
                  </Text>
                </Block>
              </TouchableOpacity>
            </Block>

           <Block row style={{ marginVertical: theme.sizes.base * 2 }}>
              <Block column space="between" flex ={1.5}>
                <Text welcome color="black" bold >Latest Wipe</Text>
                 <Text welcome color="black" >{time.getHours()}h{time.getMinutes()}m</Text>  
              </Block>     

              <Block column space="between" flex ={1.2}>
                <Text welcome color="black" bold >User</Text>
                <Text welcome color="black" >{checkinInfor[1]}</Text>
              </Block>
              
              <Block colum space="between" flex = {0.7}>
                <Text welcome color="black" bold >Status</Text>
                <Text welcome color="black" >{checkinInfor[0] == true ? "Accept": "Reject"}</Text>
              </Block>     

            </Block>

            </Block>
        </ScrollView>
      </Block>
    )
}

Door.defaultProps = {
  settings: mocks,
}

export default Door;

const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    padding: theme.sizes.base * 2,
    marginBottom: -theme.sizes.base * 6,
  },
  buttons: {
    flex: 1,
    marginBottom: -theme.sizes.base * 6,
  },
  button: {
    backgroundColor: theme.colors.button,
    width: 151,
    height: 151,
    borderRadius: 151 / 2,
  }
})
