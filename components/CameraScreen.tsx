import React, {useRef, useEffect, useState} from 'react';
import {View, Button, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useCameraPermission,
} from 'react-native-vision-camera';

interface CameraScreenProps {
  onBack: () => void;
}

export default function CameraScreen({onBack}: CameraScreenProps) {
  const cameraRef = useRef<Camera>(null);
  const [isRecording, setIsRecording] = useState(false);
  const {hasPermission, requestPermission} = useCameraPermission();
  const devices = useCameraDevices();
  const device = devices.find(device => device.position === 'back');

  useEffect(() => {
    (async () => {
      if (!hasPermission) {
        await requestPermission();
      }
    })();
  }, [hasPermission, requestPermission]);

  const startRecording = async () => {
    if (cameraRef.current == null) return;
    setIsRecording(true);
  };

  const stopRecording = () => {
    cameraRef.current?.stopRecording();
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>카메라 권한이 필요합니다</Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>권한 요청하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.permissionButton, styles.cancelButton]}
            onPress={onBack}>
            <Text style={styles.permissionButtonText}>돌아가기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (device == null) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>카메라를 찾을 수 없습니다</Text>
          <TouchableOpacity
            style={[styles.permissionButton, styles.cancelButton]}
            onPress={onBack}>
            <Text style={styles.permissionButtonText}>돌아가기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

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
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← 뒤로</Text>
      </TouchableOpacity>
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
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
});
