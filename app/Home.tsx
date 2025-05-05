import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  StatusBar,
  ImageBackground
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav"; // Using your existing BottomNav component
import { useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import { initializeQuiz } from "../core/store";
import { quizData } from "../core/sampleData";

interface SelectedFile {
  name: string;
  uri: string;
}

export default function Home() {
  const navigation = useNavigation();
  const [greeting, setGreeting] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState("Christlei Daniel Aguila");
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "easy" | "medium" | "hard" | null
  >(null);
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
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

  const openFileUploadModal = () => {
    setModalVisible(true);
  };

  const handleDifficultySelect = (difficulty: "easy" | "medium" | "hard") => {
    setSelectedDifficulty(difficulty);
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "text/plain",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ], // Specify allowed file types
        multiple: false,
      });

      if (result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setSelectedFile({
          name: file.name,
          uri: file.uri,
        });
        setEditableFileName(file.name); // Set initial editable name
        console.log("Selected file:", file.name);
      }
    } catch (err) {
      console.log("Document picking failed:", err);
    }
  };

  const handleFileUpload = () => {
    initializeQuiz(quizData); // initialize the quiz with the selected file and difficulty
    console.log("-----Quiz initialized with data:", quizData);
    setModalVisible(false);
    setSelectedDifficulty(null);
    setSelectedFile(null);
  };

  return (
    <ImageBackground 
      source={require('../assets/BACKGROUND IMAGE 1.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        {/* Search and Avatar Row */}
        <View style={styles.headerRow}>
          <View style={styles.searchBar}>
            <Ionicons
              name="search"
              size={20}
              color="#888"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#888"
            />
          </View>
          <View style={styles.avatarContainer}>
            <Image
              source={require("../assets/avatar.png")} // Adjust the path as needed
              style={styles.avatar}
              defaultSource={require("../assets/default-avatar.png")} // Adjust the path as needed
            />
          </View>
        </View>

        {/* Greeting Card */}
        <View style={styles.greetingCard}>
          <View style={styles.greetingRow}>
            <Ionicons name="sunny" size={24} color="#FFD700" />
            <Text style={styles.greetingText}>{greeting}</Text>
          </View>
          <Text style={styles.usernameText}>{username}</Text>
        </View>

        {/* Content Area */}
        <View style={styles.contentCard}>
          {/* Content will go here */}
        </View>
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={openFileUploadModal}>
        <Ionicons name="add" size={30} color="#FFF" />
      </TouchableOpacity>

      {/* File Upload Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Difficulty</Text>

            <View style={styles.difficultyButtons}>
              <TouchableOpacity
                style={[
                  styles.difficultyButton,
                  selectedDifficulty === "easy" && styles.selectedButton,
                ]}
                onPress={() => handleDifficultySelect("easy")}
              >
                <Text
                  style={[
                    styles.difficultyText,
                    selectedDifficulty === "easy" && styles.selectedText,
                  ]}
                >
                  Easy
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.difficultyButton,
                  selectedDifficulty === "medium" && styles.selectedButton,
                ]}
                onPress={() => handleDifficultySelect("medium")}
              >
                <Text
                  style={[
                    styles.difficultyText,
                    selectedDifficulty === "medium" && styles.selectedText,
                  ]}
                >
                  Medium
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.difficultyButton,
                  selectedDifficulty === "hard" && styles.selectedButton,
                ]}
                onPress={() => handleDifficultySelect("hard")}
              >
                <Text
                  style={[
                    styles.difficultyText,
                    selectedDifficulty === "hard" && styles.selectedText,
                  ]}
                >
                  Hard
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.uploadButton}
              onPress={pickDocument}
            >
              <Text style={styles.uploadButtonText}>
                {selectedFile ? selectedFile.name : "Select File to Upload"}
              </Text>
            </TouchableOpacity>

            {selectedFile && (
              <View style={styles.fileNameBox}>
                <Text style={styles.fileNameLabel}>Quiz Name:</Text>
                <TextInput
                  style={styles.fileNameInput}
                  value={editableFileName}
                  onChangeText={setEditableFileName}
                  placeholder="Enter quiz name"
                  placeholderTextColor="#999"
                />
              </View>
            )}

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.submitButton,
                  !selectedDifficulty && styles.disabledButton,
                ]}
                onPress={handleFileUpload}
                disabled={!selectedDifficulty}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 25,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 20,
    paddingHorizontal: 12,
    flex: 1,
    marginRight: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "#333",
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2A4CFF",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greetingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  greetingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  greetingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#777",
    marginLeft: 6,
  },
  usernameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  contentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    flex: 1,
    marginBottom: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 110,
    alignSelf: 'center',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#5B45FF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  difficultyButtons: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    padding: 4,
    marginBottom: 20,
  },
  difficultyButton: {
    flex: 1,
    padding: 12,
    margin: 2,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  selectedButton: {
    backgroundColor: '#7864e4',
    elevation: 2,
    shadowOpacity: 0.3,
  },
  difficultyText: {
    fontWeight: '600',
    color: '#666',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  uploadButton: {
    backgroundColor: "#5B45FF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
    minWidth: "100%",
  },
  uploadButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 10,
    flexWrap: "wrap",
  },
  modalButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    flex: 1,
    padding: 14,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
  },
  submitButton: {
    flex: 1,
    padding: 14,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: "#5B45FF",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
  },
  cancelButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  submitButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  fileNameBox: {
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 8,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    width: '100%',
  },
  fileNameLabel: {
    color: "#333",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  fileNameInput: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    color: "#333",
    fontSize: 14,
  },
});
