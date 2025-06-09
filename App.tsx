/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import CameraScreen from './components/CameraScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [showCamera, setShowCamera] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleStartCamera = () => {
    setShowCamera(true);
  };

  const handleBackToMain = () => {
    setShowCamera(false);
  };

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        {showCamera ? (
          <CameraScreen onBack={handleBackToMain} />
        ) : (
          <View style={styles.mainContainer}>
            <TouchableOpacity style={styles.button} onPress={handleStartCamera}>
              <Text style={styles.buttonText}>카메라 시작하기</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  background: {
    flex: 1,
    width: '100%',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;
