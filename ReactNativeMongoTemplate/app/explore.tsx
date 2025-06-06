import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import {
  DdSdkReactNative,
  DdSdkReactNativeConfiguration,
  DdLogs,
  DdRum,
  RumActionType
} from '@datadog/mobile-react-native';
import { Link } from 'expo-router';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Card from "@/components/Card";
import API from "../utils/API";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
const ReactNativeLogo = require("../assets/images/react-native-logo.png");
const MongoLogo = require("../assets/images/mongoDbLogo.png");

const generateLogs = () => {
  DdLogs.debug('A debug message.', { customAttribute: 'something' });
  DdLogs.info('Some relevant information ?', { customCount: 42 });
  DdLogs.warn('An important warning…', {});
  DdLogs.error('An error was met!', {});
};

export default function ExploreScreen() {
  useEffect(() => { DdRum.startView("explore-view", "explore", {}, Date.now()); }, [])
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>React Native Mongo Template</Text>
          <Text style={styles.subtitle}>Additional RUM Functionality</Text>
          <View style={styles.imageRow}>
            <Image style={styles.image} source={ReactNativeLogo} />
            <Image style={styles.mongoImage} source={MongoLogo} />
          </View>
          <TouchableOpacity style={styles.redButton} onPress={() => { throw new Error("My Error"); }}>
            <Text style={styles.whiteButtonText}>Throw Error</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.amberButton} onPress={() => { generateLogs(); }}>
            <Text style={styles.blackButtonText}>Generate RN Logs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tealButton}>
            <Link style={styles.whiteButtonText} href="/webview" onPress={() => DdRum.addAction(RumActionType.TAP, 'Webview button', {}, Date.now())}>
              <Text>React Mongo Template Webview</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={styles.footerButtons}>
        <TouchableOpacity style={styles.navButton}>
          <Link style={styles.navButtonText} href="/" onPress={() => DdRum.addAction(RumActionType.TAP, 'Go back button', {}, Date.now())}>
            <Text>Go Back</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1
  },
  footer: {
    backgroundColor: "blue",
    padding: 40
  },
  footerButtons: {
    backgroundColor: "black",
    paddingBottom: 30,
    paddingTop: 20
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
   navButton: {
    marginTop: 5,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#a50050",
    alignSelf: "center",
    width: 200
  },
  navButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center'
  },
  whiteButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center'
  },
  blackButtonText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center'
  },
  blueButton: {
    marginTop: 5,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "blue",
    alignSelf: "center",
    width: 200
  },
  amberButton: {
    marginTop: 5,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#FFBF00",
    alignSelf: "center",
    width: 200
  },
  redButton: {
    marginTop: 5,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#950606",
    alignSelf: "center",
    width: 200
  },
  tealButton: {
    marginTop: 5,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#008080",
    alignSelf: "center",
    width: 200
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
