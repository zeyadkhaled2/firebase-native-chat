import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useAuth } from '../../context/authContext';
export default function Home() {

  const router = useRouter()
  const {logout} = useAuth();
  const handleLogout = async () =>{
      await logout();
  }

  return (
    <View className="flex-1 bg-white">
      <TouchableOpacity 
        onPress={() => handleLogout()} 
        style={{ height: hp(6.5) }} 
        className="bg-indigo-500 rounded-xl justify-center items-center py-3 m-4">
        <Text style={{ fontSize: hp(2.7) }} className="text-white font-bold tracking-wider">
          Logout
        </Text>
      </TouchableOpacity>
    
    </View>
  )
}