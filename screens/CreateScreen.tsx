import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  X,
  Settings,
  Zap,
  Timer,
  Palette,
  Music,
  Gauge,
  Film,
  RotateCcw,
} from 'lucide-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function CreateScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton}>
          <X size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.headerTabs}>
          <TouchableOpacity style={styles.headerTab}>
            <Text style={[styles.headerTabText, styles.activeTabText]}>
              Camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerTab}>
            <Text style={styles.headerTabText}>Templates</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.cameraContainer}>
        <Text style={styles.placeholderText}>Camera Preview</Text>
      </View>

      <View style={styles.controlsContainer}>
        <View style={styles.sideControls}>
          <TouchableOpacity style={styles.controlButton}>
            <Zap size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Timer size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Palette size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomControls}>
          <TouchableOpacity style={styles.galleryButton}>
            <View style={styles.galleryPreview} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.recordButton}>
            <View style={styles.recordButtonInner} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.flipButton}>
            <RotateCcw size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.optionsContainer}>
        <ScrollableOptions />
      </View>
    </View>
  );
}

function ScrollableOptions() {
  const options = [
    {icon: Music, label: 'Music'},
    {icon: Timer, label: '60s'},
    {icon: Zap, label: 'Flash'},
    {icon: Palette, label: 'Effects'},
    {icon: Gauge, label: 'Speed'},
    {icon: Film, label: 'Templates'},
  ];

  return (
    <View style={styles.scrollableOptions}>
      {options.map((option, index) => {
        const IconComponent = option.icon;
        return (
          <TouchableOpacity key={index} style={styles.optionButton}>
            <IconComponent size={22} color="white" />
            <Text style={styles.optionLabel}>{option.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTabs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTab: {
    paddingHorizontal: 15,
  },
  headerTabText: {
    color: '#999',
    fontSize: 16,
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  settingsButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
    fontSize: 18,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    paddingHorizontal: 15,
  },
  sideControls: {
    position: 'absolute',
    right: 15,
    top: -200,
    alignItems: 'center',
  },
  controlButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  bottomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  galleryButton: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  galleryPreview: {
    flex: 1,
    backgroundColor: '#333',
  },
  recordButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordButtonInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FF4040',
  },
  flipButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    height: 70,
  },
  scrollableOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  optionButton: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  optionLabel: {
    color: 'white',
    marginTop: 5,
    fontSize: 12,
  },
});
