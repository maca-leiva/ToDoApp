/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './app/screens/Home';
import AddTodo from './app/screens/AddTodo';
import {store} from './app/redux/store';
import {Provider} from 'react-redux';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Add"
            component={AddTodo}
            options={{presentation: 'modal', animation: 'slide_from_bottom'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
