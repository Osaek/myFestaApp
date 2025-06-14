import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import {
  Heart,
  MessageCircle,
  Share,
  Music,
  Plus,
  Play,
  VolumeX,
  Volume2,
} from 'lucide-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Video as VideoType} from '../types/index';

const {width, height} = Dimensions.get('window');

interface VideoItemProps {
  video: VideoType;
  isActive: boolean;
}

export default function VideoItem({video, isActive}: VideoItemProps) {
  const [paused, setPaused] = useState<boolean>(!isActive);
  const [muted, setMuted] = useState<boolean>(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    setPaused(!isActive);
  }, [isActive]);

  const onVideoPress = (): void => {
    setPaused(!paused);
  };

  const onMutePress = (): void => {
    setMuted(!muted);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onVideoPress}
        style={StyleSheet.absoluteFill}>
        <Video
          source={{uri: video.uri}}
          style={styles.video}
          resizeMode="cover"
          repeat
          paused={paused}
          muted={muted}
        />
      </TouchableOpacity>

      {/* Video Controls */}
      <View
        style={[styles.controlsContainer, {paddingBottom: insets.bottom + 50}]}>
        {/* Right Side Buttons */}
        <View style={styles.rightContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={{uri: video.user.profilePic}}
              style={styles.profilePic}
            />
            <View style={styles.followButton}>
              <Plus size={14} color="white" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <Heart size={40} color="white" />
            <Text style={styles.statsLabel}>{formatNumber(video.likes)}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <MessageCircle size={38} color="white" />
            <Text style={styles.statsLabel}>
              {formatNumber(video.comments)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <Share size={38} color="white" />
            <Text style={styles.statsLabel}>{formatNumber(video.shares)}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.iconButton, styles.recordButton]}>
            <Image
              source={{uri: video.user.profilePic}}
              style={styles.recordButtonImage}
            />
          </TouchableOpacity>
        </View>

        {/* Bottom Info */}
        <View style={styles.bottomContainer}>
          <View>
            <Text style={styles.username}>@{video.user.username}</Text>
            <Text style={styles.description}>{video.description}</Text>

            <View style={styles.songContainer}>
              <Music size={15} color="white" />
              <Text style={styles.songName}>{video.song}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Mute Button */}
      <TouchableOpacity style={styles.muteButton} onPress={onMutePress}>
        {muted ? (
          <VolumeX size={20} color="white" />
        ) : (
          <Volume2 size={20} color="white" />
        )}
      </TouchableOpacity>

      {/* Paused Indicator */}
      {paused && (
        <View style={styles.pausedContainer}>
          <Play size={80} color="rgba(255,255,255,0.6)" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: 'black',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controlsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  rightContainer: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 70,
    left: 10,
    right: 90,
  },
  iconButton: {
    alignItems: 'center',
    marginBottom: 15,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
  },
  followButton: {
    position: 'absolute',
    bottom: -7,
    backgroundColor: '#FF4040',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsLabel: {
    color: 'white',
    fontSize: 14,
    marginTop: 3,
  },
  recordButton: {
    marginTop: 10,
  },
  recordButtonImage: {
    width: 35,
    height: 35,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FF4040',
  },
  username: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    color: 'white',
    fontSize: 14,
    marginBottom: 10,
    width: '80%',
  },
  songContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  songName: {
    color: 'white',
    fontSize: 14,
    marginLeft: 5,
  },
  muteButton: {
    position: 'absolute',
    right: 10,
    top: 40,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pausedContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
