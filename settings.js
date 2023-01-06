import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as theme from './theme';

export default {
  'livingroom': {
    name: 'Living Room',
    icon: ({size, color, ...props}) => (
      <MaterialCommunityIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.accent}
        name="sofa-outline"
        {...props}
      />
    ),
  },
  'bedroom': {
    name: 'Bedroom',
    icon: ({size, color, ...props}) => (
      <MaterialCommunityIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.accent}
        name="bed"
        {...props}
      />
    ),
  },
  'bathroom': {
    name: 'Bathroom',
    icon: ({size, color, ...props}) => (
      <MaterialCommunityIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.accent}
        name="bathtub-outline"
        {...props}
      />
    ),
  },
  'kitchen': {
    name: 'Kitchen',
    icon: ({size, color, ...props}) => (
      <MaterialCommunityIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.accent}
        name="silverware"
        {...props}
      />
    ),
  },
  'door': {
    name: 'Door',
    icon: ({size, color, ...props}) => (
      <MaterialCommunityIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.accent}
        name="door-open"
        {...props}
      />
    ),
  },
  'garden': {
    name: 'Garden',
    icon: ({size, color, ...props}) => (
      <MaterialCommunityIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.accent}
        name="shovel"
        {...props}
      />
    ),
  },
  'light': {
    name: 'Light',
    icon: ({size, color, ...props}) => (
      <MaterialCommunityIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.accent}
        name="lightbulb-on-outline"
        {...props}
      />
    ),
  },
  'lightoff': {
    name: 'LightOff',
    icon: ({size, color, ...props}) => (
      <MaterialCommunityIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.accent}
        name="lightbulb-outline"
        {...props}
      />
    ),
  },
  'ac': {
    name: 'AC',
    icon: ({size, color, ...props}) => (
      <MaterialCommunityIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.accent}
        name="air-conditioner"
        {...props}
      />
    ),
  },
  'temperature': {
    name: 'Temperature',
    icon: ({size, color, ...props}) => (
      <MaterialCommunityIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.accent}
        name="temperature-celsius"
        {...props}
      />
    ),
  },
  'fan': {
    name: 'Fan',
    icon: ({size, color, ...props}) => (
      <MaterialCommunityIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.accent}
        name="fan"
        {...props}
      />
    ),
  },
  'wi-fi': {
    name: 'Wi-Fi',
    icon: ({size, color, ...props}) => (
      <FontAwesome
        size={size || theme.sizes.font}
        color={color || theme.colors.accent}
        name="wifi"
        {...props}
      />
    ),
  },
  'electricity': {
    name: 'Electricity',
    icon: ({size, color, ...props}) => (
      <MaterialIcons
        size={size || theme.sizes.font}
        color={color || theme.colors.accent}
        name="power"
        {...props}
      />
    ),
  },
};