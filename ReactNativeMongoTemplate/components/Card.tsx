import React from 'react';
import API from "../utils/API";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Define TypeScript interface for message data
interface Message {
  _id: string;
  message: string;
  created_date: string;
}

interface CardProps {
  data: Message[];
  fetchMessages: () => void;
}

export default function Card({ data, fetchMessages }: CardProps) {

    console.log(data[0]);

    const deleteMessage = (message_id: string) => {
        API.deleteOneMessage(message_id).then(() => {
            fetchMessages(); // ✅ Now correctly calling the function
        });
    };

    const styles = StyleSheet.create({
        card: {
            borderWidth: 1,
            borderColor: "#61dafb",
            borderRadius: 4,
            margin: 5,
            padding: 5,
            alignSelf: "center",
            alignItems: "center",
            width: "90%",
            backgroundColor: "#121617"
        },
        cardContent: {
            color: "white",
            fontStyle: "italic"
        },
        redButton: {
            marginTop: 5,
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderRadius: 4,
            backgroundColor: "#e83e8c"
        },
        redButtonText: {
            color: '#fff',
            fontSize: 12,
            textAlign: 'center'
        },
    });

    return (
        <View style={styles.card}>
            <Text style={styles.cardContent}>"{data[0]?.message}"</Text>
            <Text style={styles.cardContent}>{data[0]?.created_date}</Text>
            <TouchableOpacity 
                style={styles.redButton}
                onPress={() => deleteMessage(data[0]._id)}
            >
                <Text style={styles.redButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
}
