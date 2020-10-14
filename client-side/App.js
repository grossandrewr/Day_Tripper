import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './store';
import { Login, HomeScreen, Chat, AllTrips } from './screens';
import './socket'

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={() => ({
              headerLeft: null,
            })}
          />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="AllTrips" component={AllTrips} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
