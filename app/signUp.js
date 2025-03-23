import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import Octicons from '@expo/vector-icons/Octicons';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {register} = useAuth();



  const emailRef = useRef("")
  const passwordRef = useRef("")
  const usernameRef = useRef("")
  const profileRef = useRef("")

  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !usernameRef.current || !profileRef.current) {
      Alert.alert("Sign in", "Please fill all fields")
      return;
    }
     
    setLoading(true)
    
    console.log("Email being sent:", emailRef.current);
    
    const response = await register(emailRef.current, passwordRef.current, usernameRef.current, profileRef.current);
    
    setLoading(false);

    console.log(response);
    
    if(!response.success){
      Alert.alert("Sign up", response.message)
    }
  }
  return (
    <CustomKeyboardView>

      <StatusBar style="dark" />
      <View className="flex-1 gap-12">
        {/* Sign in image */}
        <View style={{ paddingTop: hp(7), paddingHorizontal: wp(5) }} className="items-center">
          <Image
            source={require('../assets/images/favicon.png')}
            style={{
              resizeMode: 'contain',
              // borderColor: 'black',
              // borderWidth: 1,
              height: hp(25),
            }}
          />
        </View>
        {/* Sign in form */}
        <View className="gap-4 px-3">
          <Text style={{ fontSize: hp(4) }} className="font-bold tracking-wider text-center text-neutral-800">Sign Up</Text>
          {/* Inputs */}

          {/* username */}
          <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl">
            <Feather name="user" size={24} color="grey" />
            <TextInput
              onChangeText={value => usernameRef.current = value}
              style={{ height: hp(2) }}
              className="flex-1 font-semibold text-neutral-700"
              placeholder='Username'
              placeholderTextColor={'grey'}
            />
            
            {/* email */}
          </View><View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl">
            <Octicons name="mail" size={hp(2.7)} color="grey" />
            <TextInput
              onChangeText={value => emailRef.current = value}
              style={{ height: hp(2) }}
              className="flex-1 font-semibold text-neutral-700"
              placeholder='Email address'
              placeholderTextColor={'grey'}
            />

          </View>
          <View className="gap-3">
            {/* password  */}
            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl">
              <Octicons name="lock" size={hp(2.7)} color="grey" />
              <TextInput
                onChangeText={value => passwordRef.current = value}
                style={{ height: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder='Password'
                placeholderTextColor={'grey'}
                secureTextEntry={true}
              />
            </View>
            {/* profile url*/}
            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl">
              <Feather name="image" size={24} color="grey" />
              <TextInput
                onChangeText={value => profileRef.current = value}
                style={{ height: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder='Profile url'
                placeholderTextColor={'grey'}
              />

            </View>
            {/* submit button/ Sign in */}

            <View>

              {
                loading ? (
                  <View className="flex-row justify-center items-center">
                    <Loading size={hp(6.5)} />
                  </View>

                ) : (

                  <TouchableOpacity onPress={handleRegister} style={{ height: hp(6.5) }} className="bg-indigo-500 rounded-xl justify-center items-center py-3">
                    <Text style={{ fontSize: hp(2.7) }} className="text-white font-bold tracking-wider">
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                )

              }


            </View>
            {/* sign up text */}
            <View className="flex-row justify-center ">
              <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-500">Already Have an account ?</Text>
              <Pressable onPress={() => router.push('signIn')}>
                <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-indigo-500"> Sign In</Text>
              </Pressable>
            </View>
          </View>

        </View>
      </View>
    </CustomKeyboardView>
  )
}