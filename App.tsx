import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  Home,
  Search,
  PlusCircle,
  MessageCircle,
  User,
} from 'lucide-react-native';

import MainScreen from './screens/MainScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import CreateScreen from './screens/CreateScreen';
import InboxScreen from './screens/InboxScreen';
import ProfileScreen from './screens/ProfileScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          const iconSize = route.name === 'Create' ? 40 : size;
          const iconColor = color;

          switch (route.name) {
            case 'Home':
              return <Home size={iconSize} color={iconColor} />;
            case 'Discover':
              return <Search size={iconSize} color={iconColor} />;
            case 'Create':
              return <PlusCircle size={iconSize} color={iconColor} />;
            case 'Inbox':
              return <MessageCircle size={iconSize} color={iconColor} />;
            case 'Profile':
              return <User size={iconSize} color={iconColor} />;
            default:
              return <Home size={iconSize} color={iconColor} />;
          }
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopWidth: 0,
          elevation: 0,
          height: 50,
          paddingBottom: 5,
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={MainScreen} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={{tabBarLabel: ''}}
      />
      <Tab.Screen name="Inbox" component={InboxScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
