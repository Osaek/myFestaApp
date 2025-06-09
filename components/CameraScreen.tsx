import React, {useRef, useEffect, useState} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

export default function CameraScreen() {
  const cameraRef = useRef<Camera>(null);
  const [isRecording, setIsRecording] = useState(false);
  const devices = useCameraDevices();
  const device = devices.find(device => device.position === 'back');

  useEffect(() => {
    Camera.requestCameraPermission();
    Camera.requestMicrophonePermission();
  }, []);

  const startRecording = async () => {
    if (cameraRef.current == null) return;
    setIsRecording(true);
  };

  const stopRecording = () => {
    cameraRef.current?.stopRecording();
  };

  if (device == null) return <View style={styles.container} />;

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        device={device}
        isActive={true}
        video={true}
        audio={true}
      />
      <View style={styles.buttonContainer}>
        <Button
          title={isRecording ? 'Stop' : 'Record'}
          onPress={isRecording ? stopRecording : startRecording}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
});
