import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import SignUp from './signUp'
import SignIn from './signIn'
export default function StartPage() {
  console.log("StartPage rendered!") // This will print in the terminal

  return (
    <View className ="flex-1  ">
      <Text>Index page</Text>
      <SignIn/>
    </View>
  )
}