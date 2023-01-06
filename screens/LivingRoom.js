import React, { Component, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, Dimensions, Switch, View} from 'react-native';
import * as theme from '../theme';
import { Block, Text, PanSlider } from '../components';
import mocks from '../settings';
import { getDatabase, ref, onValue, set, database, update } from 'firebase/database';
import settings from '../settings';
import { db } from '../firebase-config';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Slider from '@react-native-community/slider';
import { RadioButton } from 'react-native-paper';







function LivingRoom({ navigation }) {
  const navigationOptions = {
    header: null
  };
  const LightIcon = settings['light'].icon;
  const FanIcon = settings['fan'].icon;

  let [humid, setHumid] = useState(0);
  let [temp, setTemp] = useState(0)

  let [lightactive, setLightative] = useState(true)
  let [fanactive, setFanative] = useState(true)
  let [luxvalue, setLuxvalue] = useState(0)
  let [luxrealtime,setLuxrealtime]= useState(0)
  let [maydovalue,setMaydo] = useState(false);


  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  const [value, setValue] = React.useState('fourth');
 

  // useEffect(() => {
  //  if(isEnabled){
  //   if((time.getHours()>=7)&&(time.getHours()<18)){
  //     setluxsetpoint("/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/writings/pid",500);
  //   }
  //   else if ((time.getHours()>=18)&&(time.getHours()<24)){
  //     setluxsetpoint("/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/writings/pid",300);
  //   }
  //   else{
  //     setluxsetpoint("/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/writings/pid",100);
  //   }
  //  }
   
  // }, [isEnabled]);


  useEffect(() => {
    if(isEnabled){
      if(value == 'first'){
        setluxsetpoint("/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/writings/pid",1000);
        setLightOn("/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/writings/livingroom/ledstatus")
        setFanOn("/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/writings/livingroom/fanstatus")
      }
      else if (value == 'second'){
        setluxsetpoint("/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/writings/pid",5000);
        setLightOn("/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/writings/livingroom/ledstatus")
        setFanOn("/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/writings/livingroom/fanstatus")
      }
      else if(value == 'third'){
        setluxsetpoint("/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/writings/pid",500);
        setLightOn("/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/writings/livingroom/ledstatus")
        setFanOff("/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/writings/livingroom/fanstatus")
      }
      else if(value == 'fourth'){
        setluxsetpoint("/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/writings/pid",0);
        setLightOff("/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/writings/livingroom/ledstatus")
        setFanOff("/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/writings/livingroom/fanstatus")

      }    
    }
   }, [value,isEnabled]);



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
    const reference = ref(db, keyfirebase);
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
    const reference = ref(db, keyfirebase);
    onValue(reference, (snapshot) => {
      previousval = snapshot.val().fan;
    });
    set(reference, {
      fan: !previousval,
    });

  }

  const setluxsetpoint = (keyfirebase,value) => {

    var value;
    const db = getDatabase();
    const reference = ref(db, keyfirebase);
    set(reference, {
      luxsetpoint: parseInt(value,10),
    });

  }

  const setLightOn = (keyfirebase) => {
    const db = getDatabase();
    const reference = ref(db, keyfirebase);
    set(reference, {
      led: true,
    });

  }

  const setLightOff = (keyfirebase) => {
    const db = getDatabase();
    const reference = ref(db, keyfirebase);
    set(reference, {
      led: false,
    });

  }

  const setFanOn = (keyfirebase) => {
    const db = getDatabase();
    const reference = ref(db, keyfirebase);
    set(reference, {
      fan: true,
    });

  }

  const setFanOff = (keyfirebase) => {
    const db = getDatabase();
    const reference = ref(db, keyfirebase);
    set(reference, {
      fan: false,
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

  /* Reading data maydo from firebase */
  useEffect(() => {
    const reference = ref(db, "/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/doors");
    onValue(reference, (snapshot) => {
      setMaydo(snapshot.val().maydo)
      
    });
  }, []);


  useEffect(() => {
    const reference = ref(db, "/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/writings/livingroom/ledstatus");
    onValue(reference, (snapshot) => {
      setLightative(snapshot.val().led)

    });
  }, []);

  useEffect(() => {
    const reference = ref(db, "/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/writings/livingroom/fanstatus");
    onValue(reference, (snapshot) => {
      setFanative(snapshot.val().fan)

    });
  }, []);



  useEffect(() => {
    const reference = ref(db, "/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/writings/pid");
    onValue(reference, (snapshot) => {
      setLuxvalue((snapshot.val().luxsetpoint))

    });
  }, []);

  useEffect(() => {
    const reference = ref(db, "/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/readings");
    onValue(reference, (snapshot) => {
      setLuxrealtime(snapshot.val().light)

    });
  }, []);


  /*Real time*/  
  const time = new Date();

      
/*Cap nhat 2s mot lan */
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log(isEnabled)
  //   }, 2000);
  
  //   return () => clearInterval(interval);
  // }, []);
  


  return (
    <Block style={styles.dashboard}>
      <ScrollView contentContainerStyle={styles.buttons} showsVerticalScrollIndicator={false}>
        <Block column space="between">
       
          <Text
                  button
                  style={{ marginTop: theme.sizes.base * 0.5 }}
                >
                  Manual/Auto
            </Text>
            
          <Switch
            trackColor={{ false: "#FFFFFF", true: "#00e600" }}
            thumbColor={isEnabled ? "#FFFFFF" : "#FA754C"}
            ios_backgroundColor="#FFFFFF"
            onValueChange={ toggleSwitch}
              //setLightValue("/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/writings/livingroom/switchstatus")}
            value={isEnabled}
          />



          
          <Block row space="around" style={{ marginVertical: theme.sizes.base }}>

          
            <TouchableOpacity disabled={isEnabled} 
              activeOpacity={0.8}
              onPress={() => setLightValue("/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/writings/livingroom/ledstatus")}

            >
              <Block center middle style={styles.button}>
                <LightIcon size={38} color={lightactive == true ? "green" : ""} />
                <Text
                  button
                  style={{ marginTop: theme.sizes.base * 0.5 }}
                >
                  {settings['light'].name}
                </Text>
              </Block>
            </TouchableOpacity>

            <TouchableOpacity disabled={isEnabled} 
              activeOpacity={0.8}
              onPress={() => setFanValue("/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/writings/livingroom/fanstatus")}
            >
              <Block center middle style={styles.button}>
                <FanIcon size={38} color={fanactive == true ? "green" : ""} />
                <Text
                  button
                  style={{ marginTop: theme.sizes.base * 0.5 }}
                >
                  {settings['fan'].name}
                </Text>
                <Text
                  button
                  style={{ marginTop: theme.sizes.base * 0.5 }}
                >
                  {maydovalue == true?"ON":"OFF"}
                </Text>
              </Block>
            </TouchableOpacity>
          </Block>



          <Block column style={{ marginVertical: theme.sizes.base * 2 }}>
            <Block row space="between">
              <Text welcome color="black">Set Light Intensity</Text>
              <Text welcome color="black">{luxvalue} Lux</Text>
            </Block>
            <Slider
              value={45}
              minimumValue={0}
              maximumValue={35000}
              thumbTintColor={theme.colors.accent}
              minimumTrackTintColor={theme.colors.accent}
              maximumTrackTintColor={theme.colors.gray2}
              onValueChange={value =>  setluxsetpoint("/UsersData/EdkZfh7MW0bJ09CZ0I1LMIh6ezm1/writings/pid",value)}
              disabled={isEnabled}   
            />
            <Block row space="between">
              <Text welcome color="black">Light Intensity</Text>
              <Text welcome color="black">{luxrealtime } Lux </Text>
              
            </Block>
          </Block>

          
          <Block  column style={{ marginVertical: theme.sizes.base * 2 }}>
            <RadioButton.Group  onValueChange={value => setValue(value)} value={value}>
              <RadioButton.Item disabled={!isEnabled} label="Chilling Mode" value="first" />
              <RadioButton.Item disabled={!isEnabled} label="Working Mode" value="second" />
              <RadioButton.Item disabled={!isEnabled} label="Sleeping Mode" value="third" />
              <RadioButton.Item disabled={!isEnabled} label="Off Mode" value="fourth" />
            </RadioButton.Group>
          </Block>

        </Block>
      </ScrollView>
    </Block>
  )
}

LivingRoom.defaultProps = {
  settings: mocks,
}

export default LivingRoom;

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
