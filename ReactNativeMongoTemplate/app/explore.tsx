import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Card from "@/components/Card";
import API from "../utils/API";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ReactNativeLogo from "../assets/images/react-native-logo.png";
import MongoLogo from "../assets/images/mongoDbLogo.png";

export default function ExploreScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>React Native Mongo Template - Explore</Text>
          <View style={styles.imageRow}>
            <Image style={styles.image} source={ReactNativeLogo} />
            <Image style={styles.mongoImage} source={MongoLogo} />
          </View>
          <View>
            <Text style={styles.subtitle}>Additional Functionality</Text>
          </View>
          <View style={styles.navButton}>
            <TouchableOpacity style={styles.navButton}>
              <Link href="/">
                <Text style={styles.navButtonText}>Go Back</Text>
              </Link>
            </TouchableOpacity>
          </View>
        </View>


      </SafeAreaView>
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
    fontWeight: '400',
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
    width: 80
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
