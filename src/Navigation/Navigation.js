import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useConnexionProvider } from '../Providers/ConnexionContext';
import React from 'react';
import HomeScreen from '../Views/Home';
import LoginScreen from '../Views/Login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { faBookmark, faHome,  faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import DetailScreen from '../Views/Detail';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeTabIcon = ({ color, size }) => (
    <FontAwesomeIcon icon={faHome} color={color} size={size} />
);
const SearchTabIcon = ({ color, size }) => (
    <FontAwesomeIcon icon={faSearch} color={color} size={size} />
);
const WishlistTabIcon = ({ color, size }) => (
    <FontAwesomeIcon icon={faBookmark} color={color} size={size} />
);
const ProfileTabIcon = ({ color, size }) => (
    <FontAwesomeIcon icon={faUser} color={color} size={size} />
);
function StackNavigator() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen}/>
    </Stack.Navigator>
    );
  }
export const Navigation = () => {
    const { isConnected } = useConnexionProvider();
    return (
        <>
            {isConnected ? (
                <Tab.Navigator screenOptions={{headerShown: false, tabBarStyle: {
                    paddingHorizontal: 5,
                    paddingTop: 0,
                    backgroundColor: 'black',
                    borderTopWidth: 0,
                },
                tabBarActiveTintColor : '#F2C94C',
                tabBarInactiveTintColor : 'white',
                }}>
                    <Tab.Screen
                    name="Home"
                    component={StackNavigator}
                    options={{
                        tabBarIcon: HomeTabIcon,
                      }}/>
                    <Tab.Screen
                        name="Search"
                        component={HomeScreen}
                        options={{
                            tabBarIcon: SearchTabIcon,
                        }}/>
                    <Tab.Screen
                        name="Whishlist"
                        component={HomeScreen}
                        options={{
                            tabBarIcon: WishlistTabIcon,
                        }}/>
                    <Tab.Screen
                        name="Profile"
                        component={HomeScreen}
                        options={{
                            tabBarIcon: ProfileTabIcon,
                        }}/>
                </Tab.Navigator>
            ) : (
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={LoginScreen} />
                </Stack.Navigator>
            )}
        </>
    );
};
