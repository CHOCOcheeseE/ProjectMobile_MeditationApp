import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Share,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { METRICS } from '../../constants/metrics';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// (FIX) Impor HomeStackParamList
import { HomeStackParamList } from '../../navigation/types';

// (FIX) Sederhanakan Tipe Props
type Props = NativeStackScreenProps<HomeStackParamList, 'Tutorial'>;

const TutorialScreen: React.FC<Props> = ({ navigation, route }) => {
  const { theme } = useTheme();
  const { title, subtitle, image, description } = route.params;

  const onShare = async () => {
    try {
      await Share.share({
        message: `Ayo coba ${title} di Silent Moon! ${description.substring(
          0,
          100,
        )}...`,
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.imageBackground}>
          {/* Header Kustom */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color={theme.text} />
            </TouchableOpacity>
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="heart-outline" size={24} color={theme.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={onShare}>
                <Ionicons name="share-outline" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {/* Konten Teks */}
        <ScrollView
          style={[styles.contentContainer, { backgroundColor: theme.background }]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              {subtitle.toUpperCase()}
            </Text>
          </View>

          {/* Separator */}
          <View style={[styles.separator, { backgroundColor: theme.textSecondary }]} />

          {/* Render Description as Steps if detected, else plain text */}
          {description.includes('1.') ? (
            <View style={styles.stepsContainer}>
              {/* Intro Text (before '1.') */}
              {description.split('1.')[0].trim().length > 0 && (
                <Text style={[styles.introText, { color: theme.text }]}>
                  {description.split('1.')[0].trim()}
                </Text>
              )}

              {/* Steps */}
              {description.split(/\d+\.\s+/).slice(1).map((step, index) => (
                <View key={index} style={[styles.stepCard, { backgroundColor: theme.card }]}>
                  <View style={[styles.stepNumber, { backgroundColor: theme.primary }]}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={[styles.stepText, { color: theme.text }]}>
                    {step.trim()}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={[styles.description, { color: theme.text }]}>
              {description}
            </Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  imageBackground: {
    width: '100%',
    height: METRICS.screenHeight * 0.35, // Slightly shorter
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: METRICS.padding,
    paddingTop: METRICS.margin,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Darker background for visibility
    borderRadius: 20,
    marginHorizontal: 5,
  },
  contentContainer: {
    flex: 1,
    marginTop: -30, // Overlap effect
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: METRICS.padding,
    paddingTop: 30,
  },
  titleContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '800', // Extra bold
    marginBottom: 5,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.7,
    letterSpacing: 1,
  },
  separator: {
    height: 1,
    opacity: 0.1,
    width: '100%',
    marginBottom: 20,
  },
  // New Styles for Rich Content
  stepsContainer: {
    gap: 15,
  },
  introText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    fontStyle: 'italic',
    opacity: 0.8,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
    borderRadius: 16,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginTop: 2, // Align with first line of text
  },
  stepNumberText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  description: {
    fontSize: 17,
    lineHeight: 28,
  },
});

export default TutorialScreen;