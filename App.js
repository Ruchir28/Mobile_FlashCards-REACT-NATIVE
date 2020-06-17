import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {FontAwesome,AntDesign} from '@expo/vector-icons';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Decks from './Components/Decks'
import Adddeck from './Components/Adddeck'
import Reducer from './Reducers'
import ViewDeck from './Components/ViewDeck'
import AddQuestion from './Components/AddQuestion'
import TakeQuiz from './Components/TakeQuiz'


// function Decks() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Decks</Text>

//     </View>
//   );
// }

const Stack=createStackNavigator();

function MainNavigator()
{
  return(
    <Stack.Navigator>
      <Stack.Screen options={{headerShown:false}} name='MyTabs' component={MyTabs}></Stack.Screen>
      <Stack.Screen name='ViewDeck' component={ViewDeck}></Stack.Screen>
      <Stack.Screen name='AddQuestion' component={AddQuestion}></Stack.Screen>
      <Stack.Screen name='TakeQuiz' component={TakeQuiz}></Stack.Screen>
    </Stack.Navigator>
  )
}


const Tab = createBottomTabNavigator();

function MyTabs()
{
  return(
  <Tab.Navigator>
      <Tab.Screen name="Decks" component={Decks} options={{
         tabBarIcon:({tintColor,size})=>(<AntDesign name="folder1" size={24} color="black" />)
       }} />
        <Tab.Screen name="AddDeck" component={Adddeck} options={{
         tabBarIcon:({tintColor,size})=>(<FontAwesome name='plus-square' size={30} color={tintColor}></FontAwesome>)
      }} />
      </Tab.Navigator>
  )
}

export default function App() {
  return (
    <Provider store={createStore(Reducer)}>
    <NavigationContainer>
     <MainNavigator></MainNavigator>
    </NavigationContainer>
    </Provider>
  );
}