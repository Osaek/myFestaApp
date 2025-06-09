/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  SafeAreaView,
} from 'react-native';
import {useCameraPermission} from 'react-native-vision-camera';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import CameraScreen from './components/CameraScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const {hasPermission, requestPermission} = useCameraPermission();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    (async () => {
      const permission = await requestPermission();
      console.log('Camera permission:', permission);
    })();
  }, [requestPermission]);

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>{hasPermission && <CameraScreen />}</View>
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
});

export default App;
