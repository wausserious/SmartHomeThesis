import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from "../screens/Dashboard";
import Settings from '../screens/Settings';
import LivingRoom from '../screens/LivingRoom';
import Bedroom from '../screens/Bedroom';
import Bathroom from '../screens/Bathroom';
import Kitchen from '../screens/Kitchen';
import Door from '../screens/Door';
const Stack = createStackNavigator();

function MainNavigator  () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Dashboard'>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Living Room" component={LivingRoom}/>
        <Stack.Screen name="Bedroom" component={Bedroom}/>
        <Stack.Screen name="Bathroom" component={Bathroom}/>
        <Stack.Screen name="Door"   component={Door}/>
        <Stack.Screen name="Kitchen" component={Kitchen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;