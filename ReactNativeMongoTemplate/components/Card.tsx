import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import API from "../utils/API";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
    DdRum,
    RumActionType
} from '@datadog/mobile-react-native';

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

    const deleteMessage = (message_id: string) => {
        API.deleteOneMessage(message_id).then(() => {
            fetchMessages(); // ✅ Now correctly calling the function
        });
    };

    const styles = StyleSheet.create({
        card: {
            borderWidth: 1,
            borderRadius: 4,
            margin: 5,
            padding: 5,
            alignSelf: "center",
            alignItems: "center",
            width: "100%",
            flexDirection: "row",
            backgroundColor: "#121617"
        },
        cardContent: {
            color: "whitesmoke",
            paddingLeft: 10,
            paddingBottom: 5
        },
        cardContentSmall: {
            color: "whitesmoke",
            paddingLeft: 10,
            paddingBottom: 5,
            fontSize: 12
        },
        leftColumn: {
            flex: 3, // 75% of the width
            justifyContent: 'space-between',
            paddingRight: 10,
        },
        rightColumn: {
            flex: 1, // 25% of the width
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            borderRadius: 5,
        },
        row: {
            backgroundColor: '#ddd',
            padding: 10,
            borderRadius: 5,
            marginBottom: 5,
        },
        deleteButton: {
           
            paddingVertical: 4,
            paddingHorizontal: 8,

        }
    });

    const datetimeReformat = (timestamp: Date) => {
        let currentday = timestamp.getDate();

        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        let currentMonth = month[timestamp.getMonth()]
        
        let currentYear = timestamp.getFullYear();

        let currentHour = timestamp.getHours() <= 12 ? timestamp.getHours():(timestamp.getHours() % 12);
        let currentMinute = timestamp.getMinutes() < 10 ? "0" + timestamp.getMinutes():timestamp.getMinutes();
        let amPm = timestamp.getHours() > 12 ? "PM":"AM"

        let reformattedTimestamp = currentday + " " + currentMonth + " " + currentYear + ", " + currentHour + ":" + currentMinute + " " + amPm;
        return reformattedTimestamp;
    };

    return (
        <View style={styles.card}>
            <View style={styles.leftColumn}>
                <Text style={styles.cardContent}>{data[0]?.message}</Text>
                <Text style={styles.cardContentSmall}>{datetimeReformat(new Date(data[0]?.created_date))}</Text>
            </View>
            <View style={styles.rightColumn}>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => { deleteMessage(data[0]._id); DdRum.addAction(RumActionType.TAP, 'Delete message ' + data[0]._id + " button", {}, Date.now()) }}
            >
                <MaterialIcons name="delete" size={25} color="grey" />
            </TouchableOpacity>
            </View>
        </View>
    );
}
