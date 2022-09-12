import React, {useEffect, useState, useMemo} from 'react';
import {BSON} from 'realm';
import {useUser} from '@realm/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Overlay, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient'; // Only if no expo

import {CreateToDoPrompt} from './CreateToDoPrompt';
import RealmContext from './RealmContext';
import {LogoutButton} from './LogoutButton';
import TaskInputField from './TaskInputField';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {useNavigation} from '@react-navigation/native';
const {useRealm, useQuery} = RealmContext;

Icon.loadFont(); // load FontAwesome font

export function ItemListView({props}) {
  const navigation = useNavigation();
  const realm = useRealm();
  const items = useQuery('Item');
  const user = useUser();
  const [showNewItemOverlay, setShowNewItemOverlay] = useState(false);
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    // initialize the subscriptions
    const updateSubscriptions = async () => {
      await realm.subscriptions.update(mutableSubs => {
        // subscribe to all of the logged in user's to-do items
        let ownItems = realm
          .objects('Item')
          .filtered(`owner_id == "${user.id}"`);
        // use the same name as the initial subscription to update it
        mutableSubs.add(ownItems, {name: 'ownItems'});
      });
    };
    updateSubscriptions();
  }, [realm, user]);

  // createItem() takes in a summary and then creates an Item object with that summary
  const createItem = ({summary, priority, subsummary}) => {
    // if the realm exists, create an Item
    if (realm) {
      realm.write(() => {
        realm.create('Item', {
          _id: new BSON.ObjectID(),
          owner_id: user.id,
          summary,
          subsummary,
          priority,
        });
      });
    }
  };

  // deleteItem() deletes an Item with a particular _id
  const deleteItem = _id => {
    // if the realm exists, get the Item with a particular _id and delete it
    if (realm) {
      const item = realm.objectForPrimaryKey('Item', _id); // search for a realm object with a primary key that is an objectId
      realm.write(() => {
        realm.delete(item);
      });
    }
  };
  // toggleItemIsComplete() updates an Item with a particular _id to be 'completed'
  const toggleItemIsComplete = _id => {
    // if the realm exists, get the Item with a particular _id and update it's 'isCompleted' field
    if (realm) {
      const item = realm.objectForPrimaryKey('Item', _id); // search for a realm object with a primary key that is an objectId
      realm.write(() => {
        item.isComplete = !item.isComplete;
      });
    }
  };

  const onPress = () => {
    navigation.navigate({
      name: 'DetailScreen',
      params: {
        detailscreensummary: props?.summary,
        detailscreensubsummary: props?.subsummary,
      },
    });
  };

  return (
    <SafeAreaProvider style={{backgroundColor: 'red'}}>
      <View style={styles.viewWrapper}>
        <TouchableOpacity style={styles.logoutbutton}>
          <LogoutButton />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: styles.addbutton.width,
            height: styles.addbutton.height,
            left: 340,
            top: 15,
          }}
          onPress={() => setShowNewItemOverlay(true)}>
          <Image
            source={require('../src/assets/plus.png')}
            style={styles.addbutton}
          />
        </TouchableOpacity>
        <ScrollView style={{marginTop: 30}}>
          <Overlay
            isVisible={showNewItemOverlay}
            onBackdropPress={() => setShowNewItemOverlay(false)}>
            <CreateToDoPrompt
              onSubmit={({summary, priority, subsummary}) => {
                setShowNewItemOverlay(false);
                createItem({summary, priority, subsummary});
              }}
            />
          </Overlay>
          {items.map(item => (
            <TouchableOpacity onPress={onPress}>
              <ListItem key={`${item._id}`} bottomDivider topDivider>
                <Text>{item.priority}</Text>
                {/*<ListItem.Content>*/}
                <ListItem.Title style={styles.itemTitle}>
                  {item.summary}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.itemTitle1}>
                  {item.subsummary}
                </ListItem.Subtitle>
                <ListItem.CheckBox
                  checked={item.isComplete}
                  onPress={() => toggleItemIsComplete(item._id)}
                />
                <Button
                  type="clear"
                  onPress={() => deleteItem(item._id)}
                  icon={<Icon name="remove" size={12} color="#979797" />}
                />
                {/*</ListItem.Content>*/}
              </ListItem>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    backgroundColor: '#016f7a',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  addToDoButton: {
    backgroundColor: '#00BAD4',
    borderRadius: 4,
    margin: 5,
  },
  itemTitle: {
    flex: 1,
  },
  itemTitle1: {
    flex: 1,
    color: 'rgba(0,0,0,0.34)',
  },
  addbutton: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
  logoutbutton: {
    alignSelf: 'flex-start',
    top: 50,
    left: 10,
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
  },
});
