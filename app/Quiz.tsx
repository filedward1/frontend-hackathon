import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useQuizStore } from "../core/store";

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
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
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

  const module = "Module 5: IT Era"; // Replace with the actual module name if needed
  const letters = ["A", "B", "C", "D"];

  const handleSubmit = () => {
    if (selectedAnswer) {
      navigation.navigate('Feedback', {
        question: currentQuestion,
        selectedAnswer: selectedAnswer,
      });
    }
  };

  return (
    <ImageBackground
      source={require("../assets/BACKGROUND IMAGE QUIZ.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.moduleTitle}>{module}</Text>

        {/* Empty view to balance the header */}
        <View style={{ width: 24 }} />
      </View>
      {/* Question Card with Number */}
      <View style={styles.questionCard}>
        <Text style={styles.questionNumber}>
          QUESTION #{currentQuestion?.getQuestionId()}
        </Text>
        <Text style={styles.questionText}>
          {currentQuestion?.getQuestion()}
        </Text>
      </View>
      {/* Choices Container */}
      <View style={styles.choicesContainer}>
        {(currentQuestion?.getChoices() || []).map((value, index) => {
          const key = letters[index]; 
          return (
            <TouchableOpacity
              key={key}
              style={[
                styles.choiceCard,
                selectedAnswer === key && styles.selectedChoice,
              ]}
              onPress={() => handleAnswerSelect(key)}
            >
              <Text style={styles.choiceLetter}>{key}.</Text>
              <Text style={styles.choiceText}>{value}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* Submit Button */}
      <View style={styles.submitButtonContainer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            !selectedAnswer && styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={!selectedAnswer}
        >
          <Text style={styles.submitButtonText}>Submit Answer</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  questionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 16, // Space before choices
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6A5AE0",
    textAlign: "center",
    marginBottom: 12,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    lineHeight: 24,
    textAlign: "center",
  },
  choicesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  choiceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedChoice: {
    borderWidth: 2,
    borderColor: "#6A5AE0",
    backgroundColor: "#F0F0FF",
  },
  choiceLetter: {
    fontWeight: "bold",
    color: "#6A5AE0",
    marginRight: 12,
    fontSize: 16,
    minWidth: 20,
  },
  choiceText: {
    flex: 1,
    color: "#333",
    fontSize: 14,
    lineHeight: 20,
  },
  submitButtonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 12,
    backgroundColor: "transparent",
  },
  submitButton: {
    backgroundColor: "#6A5AE0",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
  },
  submitButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
