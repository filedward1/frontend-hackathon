import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useQuizStore } from "../core/store";

interface FeedbackProps {
  route: {
    params: {
      question: Question;
      selectedAnswer: string;
    };
  };
}

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

const module = "Module 5: IT Era"; // Replace with the actual module name if needed

export default function Feedback({ route }: FeedbackProps) {
  const navigation = useNavigation();
  const { question, selectedAnswer } = route.params;
  const { submitAnswer, userAnswers } = useQuizStore((state) => ({
    submitAnswer: state.submitAnswer,
    userAnswers: state.userAnswers,
  }));

  const questionArray = useQuizStore((state) => state.questionArray);
  const currentQuestion = questionArray[0]; // Get the first question from the store

  const isCorrect = userAnswers[question.question_number]?.isCorrect;

  useEffect(() => {
    // Submit the answer when the component mounts
    submitAnswer(currentQuestion.getQuestionId(), selectedAnswer);
  }, [question.question_number, selectedAnswer, submitAnswer]);

  const handleNextQuestion = () => {
    navigation.goBack(); // Or navigate to the next question
  };

  return (
    <ImageBackground 
      source={require('../assets/BACKGROUND IMAGE QUIZ.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />
      
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <Text style={styles.moduleTitle}>{module}</Text>
        
        {/* Empty view to balance the header */}
        <View style={{ width: 24 }} />
      </View>

      {/* Question Card with Number */}
      <View style={styles.questionCard}>
        <Text style={styles.questionNumber}>QUESTION # 1</Text>
        <Text style={styles.questionText}>What is one of the capabilities of Internet of Things (IoT)?</Text>
      </View>

      {/* Selected Answer Card */}
      <View style={styles.choicesContainer}>
        <View style={[
          styles.selectedAnswerCard,
          isCorrect === false && styles.incorrectAnswerCard
        ]}>
          <Text style={styles.choiceLetter}>B.</Text>
          <Text style={styles.choiceText}>It can be used to improve business processes, such as manufacturing and production.</Text>
        </View>
      </View>

      {/* Feedback Card */}
      <View style={styles.feedbackCard}>
        <Text style={styles.feedbackTitle}>Feedback</Text>
        
        <View style={styles.feedbackItem}>
          <Text style={styles.feedbackLabel}>You Answered:</Text>
          <Text style={styles.feedbackText}>B.</Text>
        </View>
        
        <View style={styles.feedbackItem}>
          <Text style={styles.feedbackLabel}>Correct Answer:</Text>
          <Text style={styles.feedbackText}>
           B. It can be used to improve business processes, such as manufacturing and production.
          </Text>
        </View>
        
        <View style={styles.feedbackItem}>
          <Text style={styles.feedbackLabel}>Explanation:</Text>
          <Text style={styles.feedbackText}>IoT can be used to improve business processes, such as manufacturing and production, through the use of sensors.</Text>
        </View>
      </View>

      {/* Next Question Button */}
      <View style={styles.submitButtonContainer}>
        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={handleNextQuestion}
        >
          <Text style={styles.submitButtonText}>Next Question</Text>
        </TouchableOpacity>
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
    marginTop: 34,
    marginBottom: 16,
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
    fontSize: 18,
    fontWeight: '600',
    color: '#0C092A',
    lineHeight: 26,
    textAlign: 'center',
  },
  choicesContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  selectedAnswerCard: {
    backgroundColor: 'rgba(106, 90, 224, 0.8)', // 80% opacity for correct answer
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(106, 90, 224, 0.5)', // 50% opacity border
  },
  incorrectAnswerCard: {
    backgroundColor: 'rgba(255, 0, 0, 0.8)', // 80% opacity for incorrect answer
    borderColor: 'rgba(255, 0, 0, 0.5)', // 50% opacity border
  },
  choiceLetter: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 12,
    fontSize: 16,
    minWidth: 20,
  },
  choiceText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 22,
  },
  feedbackCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    flex: 1,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0C092A',
    marginBottom: 16,
    textAlign: 'center',
  },
  feedbackItem: {
    marginBottom: 16,
  },
  feedbackLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6A5AE0',
    marginBottom: 4,
  },
  feedbackText: {
    fontSize: 15,
    color: '#0C092A',
    lineHeight: 22,
  },
  submitButtonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 12,
    backgroundColor: 'transparent',
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
  submitButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});