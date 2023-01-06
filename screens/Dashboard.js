import React, { Component, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import * as shape from 'd3-shape'
import { CircularProgress } from "react-native-circular-progress";
import * as theme from '../theme';
import { Block, Text } from '../components';
import mocks from '../settings';
import { getDatabase, ref, onValue, set, database, update } from 'firebase/database';
import settings from '../settings';
import { db } from '../firebase-config';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


function Dashboard({ navigation }) {
  const navigationOptions = {
    header: null
  };
  const LivRoomIcon = settings['livingroom'].icon;
  const BedroomIcon = settings['bedroom'].icon;
  const BathroomIcon = settings['bathroom'].icon;
  const KitchenIcon = settings['kitchen'].icon;
  const DoorIcon = settings['door'].icon;
  const GardenIcon = settings['garden'].icon;
  const LightIcon = settings['light'].icon;
  const ACIcon = settings['ac'].icon;
  const TempIcon = settings['temperature'].icon;
  const FanIcon = settings['fan'].icon;
  const WiFiIcon = settings['wi-fi'].icon;
  const ElectricityIcon = settings['electricity'].icon;

  let [humid, setHumid] = useState(0);
  let [temp, setTemp] = useState(0)

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
  const storeHighScore = (keyfirebase) => {

    var previousval;
    const db = getDatabase();
    const reference = ref(db, keyfirebase);
    onValue(reference, (snapshot) => {
      previousval = snapshot.val().led1;
    });
    set(reference, {
      led1: !previousval,
    });
    
  }

  /* Reading data from firebase */
  useEffect(() => {
    const reference = ref(db, "/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/readings");
    onValue(reference, (snapshot) => {
      setTemp(snapshot.val().temperature)
      setHumid(snapshot.val().humidity)
    });
  }, []);

  return (
    <Block style={styles.dashboard}>
      <Block column style={{ marginVertical: theme.sizes.base * 2, }}>
        <Text welcome>Hello</Text>
        <Text name>Nguyên Dương</Text>
      </Block>
      <Block row style={{ paddingVertical: 0 }}>
        <Block flex={2} row style={{ alignItems: 'flex-end', }}>
          <Text h1 size={110} >{temp}</Text>
          <Text h1 size={34} height={80} weight='600' spacing={0.1}>°C</Text>
        </Block>
        <Block flex={0.7} column>
          <Text caption>Humidity</Text>
          <CircularProgress
            size={100} // can use  with * .5 => 50%
            fill={humid} // percentage
            lineCap="round" // line ending style
            rotation={0}
            arcSweepAngle={360}
            width={theme.sizes.base}
            tintColor={theme.colors.accent} // gradient is not supported :(
            backgroundColor={theme.colors.gray}
            backgroundWidth={theme.sizes.base / 2}
          >
            {() => (
              <Block center middle>
                <Text button medium>
                  {humid}
                </Text>
                <Text button transform="uppercase">
                  %
                </Text>
              </Block>
            )}
          </CircularProgress>
        </Block>
      </Block>

      <ScrollView contentContainerStyle={styles.buttons} showsVerticalScrollIndicator={false}>
        <Block column space="between">
          <Block row space="around" style={{ marginVertical: theme.sizes.base }}>
            <TouchableOpacity
              activeOpacity={0.8}
              //</Block>onPress={() => storeHighScore("/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/writings/ledstatus")}> 
              onPress={() => navigation.navigate('Living Room', { name: 'livingroom' })}
            >
              <Block center middle style={styles.button}>
                <LivRoomIcon size={38} />
                <Text
                  button
                  style={{ marginTop: theme.sizes.base * 0.5 }}
                >
                  {settings['livingroom'].name}
                </Text>
              </Block>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Bedroom', { name: 'bedroom' })}
            >
              <Block center middle style={styles.button}>
                <BedroomIcon size={38} />
                <Text
                  button
                  style={{ marginTop: theme.sizes.base * 0.5 }}
                >
                  {settings['bedroom'].name}
                </Text>
              </Block>
            </TouchableOpacity>
          </Block>

          <Block row space="around" style={{ marginVertical: theme.sizes.base }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Bathroom', { name: 'bathroom' })}
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
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Kitchen', { name: 'kitchen' })}
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
            </TouchableOpacity>
          </Block>

          <Block row space="around" style={{ marginVertical: theme.sizes.base }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Door', { name: 'door' })}
              >
                <Block center middle style={styles.button}>
                  <DoorIcon size={38} />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5 }}
                  >
                    {settings['door'].name}
                  </Text>
                </Block>
              </TouchableOpacity>
              
              {/* <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Settings', { name: 'garden' })}
              >
                <Block center middle style={styles.button}>
                  <GardenIcon size={38} />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5 }}
                  >
                    {settings['garden'].name}
                  </Text>
                </Block>
              </TouchableOpacity> */}
            </Block>
        </Block>
      </ScrollView>
    </Block>
  )
}

Dashboard.defaultProps = {
  settings: mocks,
}

export default Dashboard;

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
