/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ConnexionProvider from './src/Providers/ConnexionContext';
import { Navigation } from './src/Navigation/Navigation';

function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <ConnexionProvider>
          <Navigation />
        </ConnexionProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
