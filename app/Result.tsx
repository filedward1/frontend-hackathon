import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";
import { useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import { initializeQuiz } from "../core/store";
import { quizData } from "../core/sampleData";

export default function Result() {
  const navigation = useNavigation();
  const [greeting, setGreeting] = useState("");
  const [username, setUsername] = useState("Your Name");
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "easy" | "medium" | "hard" | null
  >(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editableFileName, setEditableFileName] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("GOOD MORNING");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("GOOD AFTERNOON");
    } else {
      setGreeting("GOOD EVENING");
    }
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Add your screen content here */}
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#7864e4",
  },
});
