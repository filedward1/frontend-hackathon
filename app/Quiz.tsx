import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, StatusBar } from 'react-native';
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

export default function Quiz() {
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
    module: "Module 5: IT Era"
  });

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswerSelect = (choice: string) => {
    setSelectedAnswer(choice);
  };

  const handleSubmit = () => {
    // if (selectedAnswer) {
    //   navigation.navigate('Feedback', {
    //     question: currentQuestion,
    //     selectedAnswer: selectedAnswer
    //   });
    // }
  };

  return (
    <ImageBackground 
      source={require('../assets/BACKGROUND IMAGE QUIZ.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" />
      
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#5B45FF" />
        </TouchableOpacity>
        
        <Text style={styles.moduleTitle}>{currentQuestion.module}</Text>
        
        {/* Empty view to balance the header */}
        <View style={{ width: 24 }} />
      </View>

      {/* Question Card */}
      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      {/* Choices with Spacing */}
      <View style={styles.choicesContainer}>
        {Object.entries(currentQuestion.choices).map(([key, value]) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.choiceCard,
              selectedAnswer === key && styles.selectedChoice
            ]}
            onPress={() => handleAnswerSelect(key)}
          >
            <Text style={styles.choiceLetter}>{key}.</Text>
            <Text style={styles.choiceText}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Submit Button (Fixed at Bottom) */}
      <TouchableOpacity 
        style={[
          styles.submitButton,
          !selectedAnswer && styles.disabledButton
        ]} 
        onPress={handleSubmit}
        disabled={!selectedAnswer}
      >
        <Text style={styles.submitButtonText}>Submit Answer</Text>
      </TouchableOpacity>
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
    paddingTop: 16,
    paddingBottom: 20,
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5B45FF',
    textAlign: 'center',
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    lineHeight: 24,
  },
  choicesContainer: {
    paddingHorizontal: 20,
    marginBottom: 80, // Space for submit button
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
    borderColor: '#5B45FF',
    backgroundColor: '#F0F0FF',
  },
  choiceLetter: {
    fontWeight: 'bold',
    color: '#5B45FF',
    marginRight: 12,
    fontSize: 16,
    minWidth: 20,
  },
  choiceText: {
    flex: 1,
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
  },
  submitButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#5B45FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
});