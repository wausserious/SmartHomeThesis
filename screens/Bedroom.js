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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


function Bedroom ({navigation}) {
    const navigationOptions = {
    header: null
    };
    const LivRoomIcon = settings['livingroom'].icon;
    const BedroomIcon = settings['bedroom'].icon;
    const BathroomIcon = settings['bathroom'].icon;
    const KitchenIcon = settings['kitchen'].icon;
  
    const GardenIcon = settings['garden'].icon;
    const LightIcon = settings['light'].icon;
    const ACIcon = settings['ac'].icon;
    const TempIcon = settings['temperature'].icon;
    const FanIcon = settings['fan'].icon;
    const WiFiIcon = settings['wi-fi'].icon;
    const ElectricityIcon = settings['electricity'].icon;

    let [humid, setHumid] = useState(0);
    let [temp, setTemp]= useState(0)
    let [lightactive, setLightative] = useState(true)
    let [fanactive, setFanactive] = useState(true)
    
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
    const setLightValue = (keyfirebase) => {
     
        var previousval;
        const db = getDatabase();
        const reference = ref(db,   keyfirebase);
        onValue(reference, (snapshot) => {
          previousval = snapshot.val().led;
          });
        set(reference, {
          led: !previousval,
        });
      
    }
    const setFanValue = (keyfirebase) => {
     
      var previousval;
      const db = getDatabase();
      const reference = ref(db,   keyfirebase);
      onValue(reference, (snapshot) => {
        previousval = snapshot.val().fan;
        });
      set(reference, {
        fan: !previousval,
      });
    
    }

    /* Reading data from firebase */
    useEffect(() => {
        const reference = ref(db, "/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/readings");
        onValue(reference, (snapshot) => {
            setTemp( snapshot.val().temperature)
            setHumid (snapshot.val().humidity)
          });
        },[]);

    useEffect(() => {
      const reference = ref(db, "/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/writings/bedroom/ledstatus");
      onValue(reference, (snapshot) => {
          setLightative( snapshot.val().led)
          
        });
      },[]);

      useEffect(() => {
        const reference = ref(db, "/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/writings/bedroom/fanstatus");
        onValue(reference, (snapshot) => {
            setFanactive( snapshot.val().fan)
            
          });
        },[]);

    return (
      <Block style={styles.dashboard}>
        <ScrollView contentContainerStyle={styles.buttons} showsVerticalScrollIndicator={false}>
          <Block column space="between">
            <Block row space="around" style={{ marginVertical: theme.sizes.base }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setLightValue("/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/writings/bedroom/ledstatus")}
                
              > 
                <Block center middle style={styles.button}>
                  <LightIcon size={38} color ={lightactive ==true? "green":""} />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5 }}
                  >
                    {settings['light'].name}
                  </Text>
                </Block>
              </TouchableOpacity>
              
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setFanValue("/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/writings/bedroom/fanstatus")}
              >
                <Block center middle style={styles.button}>
                  <FanIcon size={38} color ={fanactive ==true? "green":""} />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5 }}
                  >
                    {settings['fan'].name}
                  </Text>
                </Block>
              </TouchableOpacity>
            </Block>
            
            <Block row space="around" style={{ marginVertical: theme.sizes.base }}>
              {/* <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Settings', { name: 'bathroom' })}
              >
                <Block center middle style={styles.button}>
                  <BathroomIcon size={38} />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5 }}
                  >
                    {settings['bathroom'].name}
                  </Text>
                </Block>
              </TouchableOpacity> */}
              
              {/* <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Settings', { name: 'kitchen' })}
              >
                <Block center middle style={styles.button}>
                  <KitchenIcon size={38} />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5 }}
                  >
                    {settings['kitchen'].name}
                  </Text>
                </Block>
              </TouchableOpacity> */}
            </Block>
          </Block>
        </ScrollView>
      </Block>
    )
}

Bedroom.defaultProps = {
  settings: mocks,
}

export default Bedroom;

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
