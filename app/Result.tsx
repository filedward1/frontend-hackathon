import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, StatusBar, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


interface Question {
  question_number: number;
  question: string;
  choices: {
    [key: string]: string;
  };
  correct_answer: string;
  explanation: string;
  module: string;
}

export default function Result() {
  const navigation = useNavigation();
  const [currentQuestion] = useState<Question>({
    question_number: 1,
    question: "What is one of the capabilities of Internet of Things (IoT)?",
    choices: {
      "A": "It can be used for traffic management in smart cities",
      "B": "It can be used to improve business processes, such as manufacturing and production",
      "C": "It provides analytics to help organizations in their decision-making",
      "D": "It is capable of providing security services for IoT devices"
    },
    correct_answer: "B",
    explanation: "IoT can be used to improve business processes, such as manufacturing and production, through the use of sensors.",
    module: "Your Results"
  });

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswerSelect = (choice: string) => {
    setSelectedAnswer(choice);
  };

  const handleSubmit = () => {
    // Handle the submission logic here
    navigation.navigate("Home" as never); // Navigate to the Home screen
  }

  return (
    <ImageBackground 
      source={require('../assets/BACKGROUND IMAGE 1.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />
      
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <Text style={styles.moduleTitle}>{currentQuestion.module}</Text>
        
        {/* Empty view to balance the header */}
        <View style={{ width: 30 }} />
        
      </View>
      <View>

      </View>
      <View style={styles.contentCard}>
      {/* 1️⃣ Icon View (floats half over top) */}
      <View style={styles.iconWrapper}>
        <Image
          source={require('../assets/avatar.png')}
          style={styles.icon}
        />
      </View>

      {/* 2️⃣ Name View */}
      <View style={styles.nameWrapper}>
        <Text style={styles.nameText}>Christlei Daniel Aguila</Text>
      </View>

      {/* 3️⃣ Middle View (purple container) */}
      <View style={styles.middleWrapper}>
      <Text style={styles.statusText}>
    You have answered 1/5 questions correctly! Awesome!
  </Text>
      </View>
      <View style={styles.submitButtonContainer}>
    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
    <Text style={styles.submitButtonText}>Back to Home</Text>
  </TouchableOpacity>
</View>
    </View>

      
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: Platform.OS === 'ios' ? 50 : 30,
      paddingBottom: 16,
    },
    backButton: {
      padding: 8,
    },
    moduleTitle: {
      fontSize: 18,
      color: '#FFFFFF',
      textAlign: 'center',
    },
    questionCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 24,
      marginHorizontal: 20,
      marginTop: 8,
      marginBottom: 8, // Reduced space between question and choices
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 5,
    },
    questionNumber: {
      fontSize: 14,
      fontWeight: '600',
      color: '#0C092A',
      textAlign: 'center',
      marginBottom: 12,
    },
    questionText: {
      fontSize: 18, // Increased font size
      fontWeight: '600',
      color: '#0C092A', // Changed to dark blue
      lineHeight: 26,
      textAlign: 'center',
    },
    choicesContainer: {
      flex: 1,
      paddingHorizontal: 20,
      justifyContent: 'flex-end',
      paddingBottom: 12, // Bring choices closer to submit button
    },
    choiceCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    selectedChoice: {
      borderWidth: 2,
      borderColor: '#6A5AE0',
      backgroundColor: '#F0F0FF',
    },
    choiceLetter: {
      fontWeight: 'bold',
      color: '#6A5AE0',
      marginRight: 12,
      fontSize: 16,
      minWidth: 20,
    },
    choiceText: {
      flex: 1,
      color: '#0C092A', // Changed to dark blue
      fontSize: 15,
      lineHeight: 22,
    },
    submitButtonContainer: {
      backgroundColor: 'transparent',
      justifyContent: 'flex-end',
      flex: 0.25,
    },
    submitButton: {
      backgroundColor: '#6A5AE0',
      paddingVertical: 16,
      borderRadius: 30,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
    },
    disabledButton: {
      backgroundColor: '#CCCCCC',
    },
    submitButtonText: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 16,
    },
    contentCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        padding: 16,
        flex: 1,
        margin: 10,
        marginBottom: 20,
        marginTop: 100,
    
        // allow the icon to overflow
        overflow: 'visible',
        position: 'relative',
      },
    
      // 1️⃣ Icon wrapper
      iconWrapper: {
        position: 'absolute',
        top: -50,              // half of icon height
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 1,
      },
      icon: {
        width: 100,
        height: 100,
      },
    
      // 2️⃣ Name
      nameWrapper: {
        marginTop: 50 + 16,    // icon half height + padding
        alignItems: 'center',
      },
      nameText: {
        fontSize: 18,
        fontWeight: '600',
      },
    
      // 3️⃣ Middle colored box
      
      middleWrapper: {
        flex: 0.75,
        width: "90%",
        marginVertical: 16,
        backgroundColor: '#C4BCFF',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        alignSelf: 'center',
      },
      
      statusText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
      
      progressBarContainer: {
        width: '80%',
        alignItems: 'center',
      },
      
      progressBarBackground: {
        width: '100%',
        height: 30,
        backgroundColor: '#eee',
        borderRadius: 15,
        justifyContent: 'center',
      },
      
      progressBarFill: {
        position: 'absolute',
        left: 0,
        height: 30,
        width: '60%', // 60% for 3/5 correct
        backgroundColor: '#6A5ACD',
        borderRadius: 15,
      },
      
      progressText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
      },
      
      positiveFeedback: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: '600',
        color: '#4CAF50',
      },
  });