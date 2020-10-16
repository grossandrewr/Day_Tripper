import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import store from './store';
import { Login, HomeScreen, Chat, AllTrips, SingleTrip, Itinerary, SingleEvent, CreateEvent, Signup, CreateTrip, GuestList } from './screens';
import './socket';

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="CreateTrip" component={CreateTrip} />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={() => ({
                headerLeft: null,
              })}
            />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="AllTrips" component={AllTrips} />
            <Stack.Screen name="SingleTrip" component={SingleTrip} />
            <Stack.Screen name="Itinerary" component={Itinerary} />
            <Stack.Screen name="Event Details" component={SingleEvent} />
            <Stack.Screen name="Create Event" component={CreateEvent} />
            <Stack.Screen name="Guest List" component={GuestList} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

export default App;
