import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';

interface Quiz {
  id: string;
  title: string;
  author: string;
  isFavorite: boolean;
  avatarColor: string;
}

const quizData: Quiz[] = [
  { 
    id: '1', 
    title: 'Application Dev - Midterms',
    author: 'Dwyght Dela Cruz',
    isFavorite: true,
    avatarColor: '#ff4d4d'
  },
  { 
    id: '2', 
    title: 'GayI',
    author: 'Maria Santos',
    isFavorite: false,
    avatarColor: '#3366ff'
  },
  { 
    id: '3', 
    title: 'Python Programming',
    author: 'John Smith',
    isFavorite: true,
    avatarColor: '#33cc33'
  },
  { 
    id: '4', 
    title: 'Database Management',
    author: 'Sarah Johnson',
    isFavorite: false,
    avatarColor: '#ff9933'
  },
  { 
    id: '5', 
    title: 'Mobile App Development',
    author: 'Alex Rivera',
    isFavorite: true,
    avatarColor: '#9933ff'
  },
  { 
    id: '6', 
    title: 'UI/UX Design Principles',
    author: 'Emma Wilson',
    isFavorite: false,
    avatarColor: '#ff66b2'
  },
  { 
    id: '7', 
    title: 'JavaScript Fundamentals',
    author: 'Michael Chen',
    isFavorite: true,
    avatarColor: '#ffcc00'
  },
  { 
    id: '8', 
    title: 'Data Structures',
    author: 'David Kim',
    isFavorite: false,
    avatarColor: '#00cccc'
  },
  { 
    id: '9', 
    title: 'Network Security',
    author: 'Lisa Anderson',
    isFavorite: true,
    avatarColor: '#cc3366'
  },
  { 
    id: '10', 
    title: 'Cloud Computing',
    author: 'Carlos Rodriguez',
    isFavorite: false,
    avatarColor: '#6699ff'
  }
];

const Avatar = ({ color }: { color: string }) => {
  return (
    <View style={[styles.avatar, { backgroundColor: color }]}>
      <Ionicons name="glasses-outline" size={18} color="#fff" />
    </View>
  );
};

interface QuizCardProps {
  title: string;
  author: string;
  isFavorite: boolean;
  avatarColor: string;
  onToggleFavorite: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ 
  title, 
  author, 
  isFavorite, 
  avatarColor,
  onToggleFavorite
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

export default function Explore(): JSX.Element {
  const [quizzes, setQuizzes] = useState<Quiz[]>(quizData);
  
  const toggleFavorite = (id: string) => {
    setQuizzes(quizzes.map(quiz => 
      quiz.id === id ? { ...quiz, isFavorite: !quiz.isFavorite } : quiz
    ));
  };

  return (
    <ImageBackground 
      source={require('../assets/BACKGROUND IMAGE QUIZ.png')}
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
          <Text style={styles.headerTitle}>Explore</Text>
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
            {/* Quiz Cards */}
            {quizzes.map((quiz) => (
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
  // Remove tab-related styles and keep others
  container: { 
    flex: 1, 
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(108, 92, 231, 0.7)',
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
  quizList: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#e5e5ff',
    minHeight: 80,
    maxHeight: 100,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    marginRight: 8,
  },
  quizAuthor: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});
