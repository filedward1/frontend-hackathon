import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';

// Sample quiz data - in a real app, this would come from an API or database
const quizData = [
  { 
    id: '1', 
    title: 'Application Dev - Midterms',
    author: 'Dwyght Dela Cruz',
    isFavorite: true,
    avatarColor: '#ff4d4d'
  },
  { 
    id: '2', 
    title: 'Application Dev - Midterms',
    author: 'Dwyght Dela Cruz',
    isFavorite: false,
    avatarColor: '#3366ff'
  },
  { 
    id: '3', 
    title: 'Application Dev - Midterms',
    author: 'Dwyght Dela Cruz',
    isFavorite: true,
    avatarColor: '#ff4d4d'
  },
  { 
    id: '4', 
    title: 'Application Dev - Midterms',
    author: 'Dwyght Dela Cruz',
    isFavorite: true,
    avatarColor: '#ff9933'
  },
  { 
    id: '5', 
    title: 'Application Dev - Midterms',
    author: 'Dwyght Dela Cruz',
    isFavorite: false,
    avatarColor: '#3366ff'
  },
];

const Avatar = ({ color }: { color: string }) => {
  return (
    <View style={[styles.avatar, { backgroundColor: color }]}>
      <Ionicons name="glasses-outline" size={18} color="#fff" />
    </View>
  );
};

const QuizCard = ({ 
  title, 
  author, 
  isFavorite, 
  avatarColor,
  onToggleFavorite
}: { 
  title: string; 
  author: string; 
  isFavorite: boolean;
  avatarColor: string;
  onToggleFavorite: () => void;
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Avatar color={avatarColor} />
        <View style={styles.quizInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.quizTitle}>{title}</Text>
            <TouchableOpacity onPress={onToggleFavorite}>
              <Ionicons 
                name={isFavorite ? "star" : "star-outline"} 
                size={24} 
                color={isFavorite ? "#000" : "#999"} 
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.quizAuthor}>{author}</Text>
        </View>
      </View>
    </View>
  );
};

interface TabProps {
  name: string;
  isActive: boolean;
  onPress: () => void;
}

const Tab: React.FC<TabProps> = ({ name, isActive, onPress }) => (
  <TouchableOpacity 
    style={[styles.tab, isActive && styles.activeTab]} 
    onPress={onPress}
  >
    <Text style={[styles.tabText, isActive && styles.activeTabText]}>
      {name}
    </Text>
  </TouchableOpacity>
);

export default function Library() {
  const [activeTab, setActiveTab] = useState('All');
  const [quizzes, setQuizzes] = useState(quizData);
  
  const toggleFavorite = (id: string) => {
    setQuizzes(quizzes.map(quiz => 
      quiz.id === id ? { ...quiz, isFavorite: !quiz.isFavorite } : quiz
    ));
  };
  
  const filteredQuizzes = quizzes.filter(quiz => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Favorites') return quiz.isFavorite;
    // Add more filters as needed
    return true;
  });

  return (
    <ImageBackground 
      source={require('../assets/BACKGROUND IMAGE QUIZ.png')} // Update path to your image
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={32} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Library</Text>
          <View style={styles.profileIcon}>
            <Image 
              source={require('../assets/avatar.png')} 
              style={styles.profileImage}
              defaultSource={require('../assets/avatar.png')}
            />
          </View>
        </View>
        
        {/* Main Content */}
        <View style={styles.content}>
          <ScrollView style={styles.quizList}>
            {/* Tabs inside ScrollView */}
            <View style={styles.tabs}>
              {['All', 'Favorites', 'My Quizzes'].map((tabName) => (
                <Tab
                  key={tabName}
                  name={tabName}
                  isActive={activeTab === tabName}
                  onPress={() => setActiveTab(tabName)}
                />
              ))}
            </View>
            
            {/* Quiz Cards */}
            {filteredQuizzes.map((quiz) => (
              <QuizCard 
                key={quiz.id}
                title={quiz.title}
                author={quiz.author}
                isFavorite={quiz.isFavorite}
                avatarColor={quiz.avatarColor}
                onToggleFavorite={() => toggleFavorite(quiz.id)}
              />
            ))}
          </ScrollView>
        </View>
        
        {/* Bottom Navigation */}
        <BottomNav />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    position: 'relative',
    // Remove or adjust backgroundColor if you want the image to show through
  },
  // Add overlay if you want to dim the background image
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(108, 92, 231, 0.7)', // Your theme color with opacity
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  backButton: {
    width: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  content: { 
    flex: 1, 
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    paddingBottom: 80,
    marginHorizontal: 13,
    backgroundColor: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    padding: 22,  // Reduced padding
    gap: 8,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    marginBottom: 15, // Add spacing after tabs
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(108, 92, 231, 0.1)', // Light purple background
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: '#6c5ce7',
  },
  tabText: {
    fontSize: 13,
    color: '#6c5ce7',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  quizList: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 0, // Reset margin to remove extra space
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,         // Slightly smaller border radius
    padding: 16, // Slightly reduced padding
    marginBottom: 10, // Reduced margin between cards
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#e5e5ff',
    minHeight: 80,          // Set minimum height
    maxHeight: 100,         // Set maximum height
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,      // Add right padding
  },
  avatar: {
    width: 35,             // Smaller avatar
    height: 35,            // Smaller avatar
    borderRadius: 17.5,    // Half of width/height for circle
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,       // Slightly reduced margin
  },
  quizInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 10,
  },
  quizTitle: {
    fontSize: 16,          // Smaller font size
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    marginRight: 8,
  },
  quizAuthor: {
    fontSize: 14,          // Smaller font size
    color: '#666',
    marginTop: 2,         // Reduced top margin
  },
});