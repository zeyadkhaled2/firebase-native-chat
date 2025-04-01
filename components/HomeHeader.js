import { View, Text, Platform } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { blurhash } from '../utils/common';
import { useAuth } from '../context/authContext';
// React pop-up menu components
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { MenuItem } from './CustomMenuItem';
import { AntDesign, Feather } from '@expo/vector-icons';
import Divider from './Divider';



const ios = Platform.OS == 'ios'
export default function HomeHeader() {

    const { top } = useSafeAreaInsets()
    const { user, logout } = useAuth();
    // const validProfileUrl = (user.profileUrl && user.profileUrl.startsWith('http')) 
    //     ? user.profileUrl 
    //     : 'https://picsum.photos/200/300' 

    const validProfileUrl = "https://picsum.photos/200/300"
    //TODO valiProfileUrl is HARDCODED as the profileurl we got into firebase not working for now

    const handleProfile = () => {

    }
    const handleLogout = async () => {
        await logout()

    }




    return (
        <View style={{ paddingTop: ios ? top : top + 10 }} className="flex-row justify-between px-5 bg-indigo-400 pb-6 rounded-b-3xl shadow">
            <View>
                <Text style={{ fontSize: hp(3) }} className="font-medium text-white">Chats</Text>
            </View>



            <View >

                <Menu>
                    <MenuTrigger
                        customStyles={
                            {
                                triggerOuterWrapper: {

                                }
                            }
                        } >

                        <Image
                            style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
                            source={{ uri: validProfileUrl }}
                            placeholder={blurhash}
                            contentFit="cover"
                            transition={500}
                            onError={(error) => {
                                console.error("Image loading error:", error);
                                // You could set a state here to fall back to a different image source
                            }}
                        />
                    </MenuTrigger>

                    <MenuOptions
                        customStyles={{
                            optionsContainer:{
                                borderRadius:10,
                                borderCurve: 'continous',
                                marginTop: 40,
                                marginLeft: -30,
                                backgroundColor: 'white',
                                shadowOpacity: 0.2,
                                shadowOffset:{width: 0 , height: 0},
                                width: 160
                            }
                        }}
                    >
                        <MenuItem
                            text='Profile'
                            action={handleProfile}
                            value={null}
                            icon={<Feather name='user' size={hp(2.5)} color="#737373"/>}
                        />
                        <Divider/>
                        <MenuItem
                            text='Sign Out'
                            action={handleLogout}
                            value={null}
                            icon={<AntDesign name='logout' size={hp(2.5)} color="#737373"/>}
                        />
                    </MenuOptions>
                </Menu>


            </View>
        </View>
    )
}