import React, { useEffect } from 'react';
import {
  DdRum,
  RumActionType
} from '@datadog/mobile-react-native';
import { SessionReplay } from "@datadog/mobile-react-native-session-replay";
import { Image, StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Card from "@/components/Card";
import API from "../utils/API";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
const ReactNativeLogo = require("../assets/images/react-native-logo.png");
const MongoLogo = require("../assets/images/mongoDbLogo.png");

export default function HomeScreen() {
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState('');

  const fetchMessages = () => {
    API.findAllMessages().then((res) => {
      setMessages((messages) => res.data);
    })
  };

  setTimeout(fetchMessages, 5000)

  const saveMessage = () => {
    if (newMessage !== "") {
      API.createMessage(newMessage, new Date()).then((res) => {
        fetchMessages();
        setNewMessage(message => "");
      });
    } else if (newMessage === "") {
      throw new Error("Test Error: Message input is empty");
    }
  };

  useEffect(() => { fetchMessages(), DdRum.startView("home-view", "home", {}, Date.now());  SessionReplay.enable(); }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>React Native Mongo Template</Text>
          <View style={styles.imageRow}>
            <Image style={styles.image} source={ReactNativeLogo} />
            <Image style={styles.mongoImage} source={MongoLogo} />
          </View>
          <View>
            <TextInput
              style={styles.input}
              value={newMessage}
              
              onChangeText={setNewMessage}
              placeholder='Enter message here...'
              placeholderTextColor="grey"
              onPress={() => DdRum.addAction(RumActionType.TAP, 'Message input', {}, Date.now())}
            />
          </View>
          <TouchableOpacity style={styles.standardButton} onPress={() => { saveMessage(); DdRum.addAction(RumActionType.TAP, 'Submit button', {}, Date.now()); }}>
            <Text style={styles.standardButtonText}>Submit</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.subtitle}>Message List</Text>
          </View>
          <View>
            {messages.map((data, index) => (<Card key={"message_" + index} data={[data]} fetchMessages={fetchMessages} />))}
          </View>
        </View>
        <TouchableOpacity style={styles.navButton}>
          <Link href="/explore" onPress={() => DdRum.addAction(RumActionType.TAP, 'Additional Functionality button', {}, Date.now())}>
            <Text style={styles.navButtonText}>Additional Functionality</Text>
          </Link>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1f20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1
  },
  footer: {
    width: "100%",
    padding: 40
  },
  imageRow: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100, // Set the desired width
    height: 100, // Set the desired height
    marginHorizontal: 10, // Add space between images
    borderRadius: 10, // Optional for rounded corners
  },
  mongoImage: {
    width: 160, // Set the desired width
    height: 40, // Set the desired height
    marginHorizontal: 10, // Add space between images
    borderRadius: 10, // Optional for rounded corners
  },
  title: {
    color: "white",
    alignSelf: "center",
    fontSize: 24,
    fontWeight: '600',
    marginTop: 20
  },
  subtitle: {
    color: "white",
    alignSelf: "center",
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 15
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: '90%',
    padding: 10,
    borderColor: "#e83e8c",
    borderRadius: 4,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    backgroundColor: "#121617",
    color: "white",
    alignSelf: "center"
  },
  card: {
    color: "white"
  },
  standardButton: {
    marginTop: 5,
    paddingTop: 2,
    paddingBottom: 4,
    borderRadius: 4,
    backgroundColor: "#61dafb",
    alignSelf: "center",
    width: 80
  },
  standardButtonText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center'
  },
  navButton: {
    marginTop: 5,
    paddingTop: 2,
    paddingBottom: 4,
    borderRadius: 4,
    backgroundColor: "red",
    alignSelf: "center",
    width: 150
  },
  navButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center'
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  }
});