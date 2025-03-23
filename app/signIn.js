import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import Octicons from '@expo/vector-icons/Octicons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import { useAuth } from '../context/authContext';

export default function SignIn() {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const emailRef = useRef("")
  const passwordRef = useRef("")


  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign in", "Please fill all fields")
      return;
    }
    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current)
    setLoading(false);
    console.log("login response : ", response);

    if(!response.success){
      Alert.alert("Sign In ", response.message)
    }
    // login process
  }
  return (
    <View className="flex-1">
      <Text>SignIn</Text>
      <StatusBar style="dark" />
      <View className="flex-1 gap-12">
        {/* Sign in image */}
        <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className="items-center">
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
          <Text style={{ fontSize: hp(4) }} className="font-bold tracking-wider text-center text-neutral-800">Sign In</Text>
          {/* Inputs */}
          <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl">
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
            <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-right text-neutral-500"> forgot password ?</Text>
            {/* submit button/ Sign in */}

            <View>

              {
                loading ? (
                  <View className="flex-row justify-center items-center">
                    <Loading size={hp(6.5)} />
                  </View>

                ) : (

                  <TouchableOpacity onPress={handleLogin} style={{ height: hp(6.5) }} className="bg-indigo-500 rounded-xl justify-center items-center py-3">
                    <Text style={{ fontSize: hp(2.7) }} className="text-white font-bold tracking-wider">
                      Sign in
                    </Text>
                  </TouchableOpacity>
                )

              }


            </View>
            {/* sign up text */}
            <View className="flex-row justify-center ">
              <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-500"> Don't Have an account ?</Text>
              <Pressable onPress={() => router.push('signUp')}>
                <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-indigo-500"> Sign up</Text>
              </Pressable>
            </View>
          </View>

        </View>
      </View>
    </View>
  )
}