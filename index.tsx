import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { registerRootComponent } from 'expo';

// Define the stages and their respective questions and answers
const stages = [
  {
    stageTitle: "Stage 1: The Basics",
    questions: [
      { question: 'What is the color of the sky?', answer: 'blue' },
      { question: 'What sound does a dog make?', answer: 'bark' },
      { question: 'What is the capital of France?', answer: 'paris' }
    ],
  },
  {
    stageTitle: "Stage 2: The Paradox",
    questions: [
      { question: 'What is 2 + 2?', answer: '4' },
      { question: 'What is the sound of one hand clapping?', answer: 'silence' },
      { question: 'What is the meaning of life?', answer: 'connections' }
    ],
  },
  {
    stageTitle: "Stage 3: The Absurdity",
    questions: [
      { question: 'What is the square root of 144?', answer: '12' },
      { question: 'Can a cat play the piano?', answer: 'no' },
      { question: 'What is the answer to the ultimate question?', answer: '42' }
    ],
  }
];

// Define some random quirky responses for incorrect answers
const randomResponses = [
  'Nice try! But you\'ll need to think outside the universe for this one.',
  'Hmm, not quite! Try channeling the energy of a quantum hamster.',
  'Not bad, but the answer is closer to the sound of a rainbow singing.',
  'Almost there! But the true answer lies beneath the surface of a moonlit lake.',
  'You’re close! Think of a cactus doing a salsa dance under the stars.'
];

const App = () => {
  const [currentStage, setCurrentStage] = useState(0); // Track current stage
  const [answers, setAnswers] = useState(['', '', '']); // Track answers for the current stage
  const [response, setResponse] = useState(''); // Store response after submission
  const [isStageComplete, setIsStageComplete] = useState(false); // Check if stage is complete

  const currentQuestions = stages[currentStage].questions;

  // Check if the user answers all questions correctly
  const checkAnswers = () => {
    const correctAnswers = currentQuestions.map(q => q.answer.toLowerCase());
    const userAnswers = answers.map(a => a.toLowerCase());
    
    return correctAnswers.every((correct, index) => correct === userAnswers[index]);
  };

  // Handle the user's answer submission
  const handleAnswerSubmit = () => {
    if (checkAnswers()) {
      // If all answers are correct, move to the next stage
      setResponse("Great job! You're correct! Moving to the next stage.");
      setAnswers(['', '', '']); // Clear the text boxes after submission
      setIsStageComplete(true);
      setTimeout(() => {
        if (currentStage + 1 < stages.length) {
          setCurrentStage(currentStage + 1); // Move to the next stage
          setIsStageComplete(false); // Reset stage completion status
          setResponse(''); // Clear response
        } else {
          // If Stage 3 is completed, reset to Stage 1
          setCurrentStage(0); // Reset to Stage 1
          setResponse("All stages complete! Resetting to Stage 1.");
        }
      }, 2000); // Wait 2 seconds before moving to the next stage
    } else {
      // If any answer is incorrect, provide a random quirky response
      const randomResponse = randomResponses[Math.floor(Math.random() * randomResponses.length)];
      setResponse(randomResponse);
      setAnswers(['', '', '']); // Clear the text boxes after submission
    }
  };

  return (
    <PaperProvider>
      <ImageBackground source={{uri: 'https://www.shutterstock.com/shutterstock/photos/2052894734/display_1500/stock-vector-quiz-and-question-marks-trivia-night-quiz-symbol-neon-sign-night-online-game-with-questions-2052894734.jpg'}} style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.stageTitle}>{stages[currentStage].stageTitle}</Text>

          {/* Render the current questions */}
          {currentQuestions.map((question, index) => (
            <View key={index} style={styles.questionContainer}>
              <Text style={styles.questionText}>{question.question}</Text>
              <TextInput
                style={styles.input}
                value={answers[index]}
                onChangeText={(text) => {
                  const newAnswers = [...answers];
                  newAnswers[index] = text;
                  setAnswers(newAnswers);
                }}
                placeholder="Type your answer here"
                placeholderTextColor="#888"
              />
            </View>
          ))}

          {/* Submit Button */}
          <Button
            title="Submit"
            color="#4A90E2"
            onPress={handleAnswerSubmit}
          />

          {/* Display the response after submission */}
          {response && (
            <View style={styles.responseContainer}>
              <Text style={styles.responseText}>{response}</Text>
            </View>
          )}

          {/* Final Congratulations Message after all stages */}
          {currentStage === stages.length && !isStageComplete && (
            <Text style={styles.finalMessage}>Congratulations! You've completed all the stages!</Text>
          )}
        </View>
      </ImageBackground>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for overlay effect
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  stageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  questionContainer: {
    marginBottom: 20,
    width: '100%',
  },
  questionText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 45,
    width: '80%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    color: '#333',
  },
  responseContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f8d7da',
    borderRadius: 5,
    width: '80%',
    marginBottom: 20,
  },
  responseText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#721c24',
    textAlign: 'center',
  },
  finalMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF5722',
    textAlign: 'center',
    marginTop: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  }
});

registerRootComponent(App);