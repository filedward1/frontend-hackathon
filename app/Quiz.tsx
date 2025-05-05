import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';

interface Question {
  question_number: number;
  question: string;
  choices: {
    [key: string]: string;
  };
  correct_answer: string;
  explanation: string;
}

export default function Quiz() {
  // Sample question data - this would typically come from props or API
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    "question_number": 1,
    "question": "Question 1: What is one of the capabilities of Internet of Things (IoT)?",
    "choices": {
      "A": "It can be used for traffic management in smart cities.",
      "B": "It can be used to improve business processes, such as manufacturing and production.",
      "C": "It provides analytics to help organizations in their decision-making.",
      "D": "It is capable of providing security services for IoT devices."
    },
    "correct_answer": "B",
    "explanation": "IoT can be used to improve business processes, such as manufacturing and production, through the use of sensors."
  });

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (choice: string) => {
    setSelectedAnswer(choice);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    // Here you would typically load the next question
    // For now, we'll just reset the state for the demo
    setSelectedAnswer(null);
    setShowExplanation(false);
    
    // In a real app, you would fetch the next question here
    // setCurrentQuestion(nextQuestionData);
  };

  return (
    <ImageBackground 
      source={require('../assets/BACKGROUND IMAGE QUIZ.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.content}>
        {/* Quiz Header */}
        <View style={styles.header}>
          <Text style={styles.questionNumber}>
            Question {currentQuestion.question_number}
          </Text>
        </View>

        {/* Question Card */}
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          
          {/* Choices */}
          {Object.entries(currentQuestion.choices).map(([key, value]) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.choiceButton,
                selectedAnswer === key && styles.selectedChoice,
                selectedAnswer && key === currentQuestion.correct_answer && styles.correctChoice,
                selectedAnswer && selectedAnswer !== currentQuestion.correct_answer && 
                  selectedAnswer === key && styles.incorrectChoice
              ]}
              onPress={() => handleAnswerSelect(key)}
              disabled={selectedAnswer !== null}
            >
              <Text style={styles.choiceLetter}>{key}.</Text>
              <Text style={styles.choiceText}>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Explanation */}
        {showExplanation && (
          <View style={styles.explanationCard}>
            <View style={styles.explanationHeader}>
              <Ionicons name="information-circle" size={24} color="#5B45FF" />
              <Text style={styles.explanationTitle}>Explanation</Text>
            </View>
            <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
          </View>
        )}
      </View>

      {/* Next Question Button */}
      {showExplanation && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
          <Text style={styles.nextButtonText}>Next Question</Text>
        </TouchableOpacity>
      )}

      <BottomNav />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80,
  },
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  questionNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5B45FF',
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
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
    marginBottom: 20,
  },
  choiceButton: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedChoice: {
    borderColor: '#5B45FF',
    backgroundColor: '#F0F0FF',
  },
  correctChoice: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  incorrectChoice: {
    borderColor: '#F44336',
    backgroundColor: '#FFEBEE',
  },
  choiceLetter: {
    fontWeight: 'bold',
    color: '#5B45FF',
    marginRight: 8,
    fontSize: 16,
  },
  choiceText: {
    flex: 1,
    color: '#333',
    fontSize: 14,
  },
  explanationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5B45FF',
    marginLeft: 8,
  },
  explanationText: {
    color: '#555',
    fontSize: 14,
    lineHeight: 20,
  },
  nextButton: {
    position: 'absolute',
    bottom: 110,
    alignSelf: 'center',
    backgroundColor: '#5B45FF',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 1,
  },
  nextButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});