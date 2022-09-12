import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AppProvider, UserProvider, useUser} from '@realm/react';

import {appId, baseUrl} from '../realm';
import {LogoutButton} from './LogoutButton';
import {WelcomeView} from './WelcomeView';
import {ItemListView} from './ItemListView';
import RealmContext from './RealmContext';
import {DetailScreen} from './DetailScreen';
const {RealmProvider} = RealmContext;

const Stack = createStackNavigator();

const AppWrapper = () => {
  return (
    <AppProvider id={appId} baseUrl={baseUrl}>
      <UserProvider fallback={WelcomeView}>
        <App />
      </UserProvider>
    </AppProvider>
  );
};

const App = () => {
  return (
    <>
      {/* After login, user will be automatically populated in realm configuration */}
      <RealmProvider
        sync={{
          flexible: true,
          initialSubscriptions: {
            update: (subs, realm) => {
              // subscribe to all of the logged in user's to-do items
              subs.add(realm.objects('Item'), {name: 'ownItems'});
            },
          },
        }}
        fallback={() => (
          <View style={styles.activityContainer}>
            <ActivityIndicator size="large" />
          </View>
        )}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Your To-Do List"
                component={ItemListView}
                options={{
                  headerShown: false,
                  headerLeft: () => {
                    return <LogoutButton />;
                  },
                }}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                  headerTitle: 'Details',
                  headerTintColor: '#fff',
                  headerTitleStyle: {color: '#fff'},
                  headerStyle: {backgroundColor: '#001e1f'},
                }}
                name="DetailScreen"
                component={DetailScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </RealmProvider>
    </>
  );
};

const styles = StyleSheet.create({
  footerText: {
    fontSize: 10,
    textAlign: 'center',
  },
  footer: {
    margin: 40,
  },
  activityContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default AppWrapper;
