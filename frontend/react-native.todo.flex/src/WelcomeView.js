import React, {useState} from 'react';
import Realm from 'realm';
import {useApp} from '@realm/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont(); // load FontAwesome font

export function WelcomeView({navigation, route}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // state values for toggable visibility of features in the UI
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [isInSignUpMode, setIsInSignUpMode] = useState(true);

  const app = useApp();

  // signIn() uses the emailPassword authentication provider to log in
  const signIn = async () => {
    const creds = Realm.Credentials.emailPassword(email, password);
    await app.logIn(creds);
  };

  // onPressSignIn() uses the emailPassword authentication provider to log in
  const onPressSignIn = async () => {
    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert(`Failed to sign in: ${error.message}`);
    }
  };

  // onPressSignUp() registers the user and then calls signIn to log the user in
  const onPressSignUp = async () => {
    try {
      await app.emailPasswordAuth.registerUser({email, password});
      signIn(email, password);
    } catch (error) {
      Alert.alert(`Failed to sign up: ${error.message}`);
    }
  };

  return (
    <SafeAreaProvider>
      <View style={{backgroundColor: 'rgba(245,245,245,255)', flex: 1}}>
        <View
          style={{
            flex: 1.5,
            backgroundColor: 'rgba(245,245,245,255)',
            borderRadius: 30,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 30,
              fontWeight: 'bold',
              fontStyle: 'italic',
              fontFamily: 'Helvetica-Bold',
              textShadowOffset: {width: -1, height: 1},
              textShadowRadius: 0.1,
              textShadowColor: '#016f7a',
            }}>
            Task Manager
          </Text>
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: 'flex-start',
            backgroundColor: '#016f7a',
            borderRadius: 30,
          }}>
          <TextInput
            autoCapitalize={'words'}
            style={styles.loginemailStyle}
            placeholder="email"
            placeholderTextColor={'#8a8a8a'}
            onChangeText={setEmail}
          />
          <TextInput
            autoCapitalize={'words'}
            style={styles.loginpasswordStyle}
            placeholder={'Password'}
            placeholderTextColor={'#8a8a8a'}
            onChangeText={value => setPassword(value)}
            secureTextEntry={passwordHidden}
          />
          <Icon
            style={{
              width: 20,
              height: 20,
              left: 300,
              bottom: 30,
            }}
            name={passwordHidden ? 'eye-slash' : 'eye'}
            size={18}
            color="black"
            onPress={() => setPasswordHidden(!passwordHidden)}
          />

          {isInSignUpMode ? (
            <>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={onPressSignUp}>
                <Text style={styles.loginText}>Sign-Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsInSignUpMode(!isInSignUpMode)}>
                <Text style={styles.accountButton}>
                  Already have an account?
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={onPressSignIn}>
                <Text style={styles.loginText}>Log-In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsInSignUpMode(!isInSignUpMode)}>
                <Text style={styles.accountButton}>
                  Already have an account?
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    height: 125,
    width: 125,
    marginTop: 70,
  },
  title: {
    fontSize: 18,
  },
  mainButton: {
    width: 350,
  },
  loginemailStyle: {
    backgroundColor: 'rgba(245,245,245,255)',
    height: 40,
    width: '70%',
    borderWidth: 1,
    borderRadius: 25,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 100,
  },
  loginpasswordStyle: {
    backgroundColor: 'rgba(245,245,245,255)',
    height: 40,
    width: '70%',
    borderWidth: 1,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 30,
  },
  loginButton: {
    width: '40%',
    borderRadius: 25,
    height: 40,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(245,245,245,255)',
  },
  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  accountButton: {
    height: 20,
    width: 165,
    alignSelf: 'center',
    margin: 20,
  },
});
