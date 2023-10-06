/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {Alert, StatusBar, useColorScheme} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm} from 'react-hook-form';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Button} from '../components/Button';
import {Input} from '../components/Input';
import {SafeAreaView} from '../components/SafeAreaView';
import {Text} from '../components/Text';
import {View} from '../components/View';
import {colors} from '../style/color';
import {useSignIn} from '../services/note/useNote';
import TouchID from 'react-native-touch-id';

const optionalConfigObject = {
  title: 'Please Authenticate', // Android
  imageColor: '#000', // Android
  imageErrorColor: '#ff0000', // Android
  sensorDescription: 'Slightly Touch sensor', // Android
  sensorErrorDescription: 'Failed', // Android
  cancelText: 'Cancel', // Android
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false, // iOS
};

const SignInScreen = ({navigation}: {navigation: any}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const {control, handleSubmit} = useForm({
    defaultValues: {
      email: 'wahyufaturrizkyy@gmail.com',
      password: 'Welcome1',
    },
  });

  const {mutate: createSignIn, isLoading: isLoadingSignIn} = useSignIn({
    options: {
      onSuccess: (data: any) => {
        console.log('🚀 ~ file: SignIn.tsx:39 ~ SignInScreen ~ data:', data);
        const {session} = data.data;
        const {access_token} = session;
        console.log(
          '🚀 ~ file: SignIn.tsx:43 ~ SignInScreen ~ access_token:',
          access_token,
        );
        AsyncStorage.setItem('token', access_token);

        navigation.navigate('HomeScreen');
      },
      onError: () => {},
    },
  });

  const onSubmit = (data: {email: string; password: string}) => {
    createSignIn(data);
  };

  const handleAuth = (data: {email: string; password: string}) => {
    TouchID.isSupported()
      .then(biometryType => {
        if (biometryType === 'FaceID') {
          TouchID.authenticate('', optionalConfigObject)
            .then(success => {
              createSignIn(data);
            })
            .catch(error => {
              Alert.alert('Authentication Failed', error.message);
            });
        } else {
          TouchID.authenticate('', optionalConfigObject)
            .then(success => {
              createSignIn(data);
            })
            .catch(error => {
              Alert.alert('Authentication Failed', error.message);
            });
        }
      })
      .catch(error => {
        // Failure code
        console.log(error);
        Alert.alert('Authentication Failed', error.message);
      });
  };

  useEffect(() => {
    const fetchToken = async () => {
      const res = await AsyncStorage.getItem('token');
      if (res) {
        navigation.navigate('HomeScreen');
      }
    };

    fetchToken();
  }, []);

  return (
    <SafeAreaView flex={1} padding={24} backgroundColor={colors.white.lighter}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <View flex={1}>
        <Text
          label={'Note Taking App'}
          fontSize={24}
          textAlign="center"
          fontWeight="700"
          color={colors.green.regular}
          marginVertical={56}
        />

        <Input
          borderColor={colors.black.light}
          borderRadius={12}
          borderWidth={4}
          label="Username"
          labelColor={colors.black.light}
          labelFontSize={16}
          marginBottom={16}
          rules={{
            required: {
              value: true,
              message: 'Username required',
            },
          }}
          name="email"
          control={control}
        />

        <Input
          borderColor={colors.black.light}
          borderRadius={12}
          borderWidth={4}
          label="Password"
          labelColor={colors.black.light}
          labelFontSize={16}
          secureTextEntry={true}
          rules={{
            required: {
              value: true,
              message: 'Password required',
            },
          }}
          name="password"
          control={control}
        />
      </View>

      <Button
        backgroundColor={colors.green.regular}
        label={isLoadingSignIn ? 'Loading...' : 'Use Biometric Auth'}
        labelColor={colors.white.regular}
        textTransform="uppercase"
        onPress={handleSubmit(handleAuth)}
        sizeLabel={20}
        disabled={isLoadingSignIn}
        marginBottom={24}
      />

      <Button
        backgroundColor={colors.green.regular}
        label={isLoadingSignIn ? 'Loading...' : 'Login'}
        labelColor={colors.white.regular}
        textTransform="uppercase"
        onPress={handleSubmit(onSubmit)}
        sizeLabel={20}
        disabled={isLoadingSignIn}
      />
    </SafeAreaView>
  );
};

export default SignInScreen;
