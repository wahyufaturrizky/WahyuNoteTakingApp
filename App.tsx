/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 *
 * @author
 * https://www.linkedin.com/in/wahyu-fatur-rizky/
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import SignInScreen from './src/sreens/SignIn';
import SplashScreen from './src/sreens/Splash';

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Splash">
            {props => <SplashScreen {...props} />}
          </Stack.Screen>

          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="SignIn">
            {props => <SignInScreen {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

export default App;
