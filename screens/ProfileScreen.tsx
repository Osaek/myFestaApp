import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  Menu,
  MoreHorizontal,
  Grid,
  Heart,
  Lock,
  Plus,
  Play,
} from 'lucide-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('videos');

  const userStats = {
    following: 125,
    followers: '10.5K',
    likes: '142.7K',
  };

  const userVideos = [
    {id: '1', thumbnail: 'https://picsum.photos/id/237/300/400', views: '2.3M'},
    {id: '2', thumbnail: 'https://picsum.photos/id/238/300/400', views: '1.8M'},
    {id: '3', thumbnail: 'https://picsum.photos/id/239/300/400', views: '4.1M'},
    {id: '4', thumbnail: 'https://picsum.photos/id/240/300/400', views: '950K'},
    {id: '5', thumbnail: 'https://picsum.photos/id/241/300/400', views: '1.2M'},
    {id: '6', thumbnail: 'https://picsum.photos/id/242/300/400', views: '3.5M'},
  ];

  const likedVideos = [
    {id: '7', thumbnail: 'https://picsum.photos/id/243/300/400', views: '5.7M'},
    {id: '8', thumbnail: 'https://picsum.photos/id/244/300/400', views: '2.1M'},
    {id: '9', thumbnail: 'https://picsum.photos/id/245/300/400', views: '8.3M'},
  ];

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.header}>
        <Menu size={24} color="white" />
        <Text style={styles.headerTitle}>@username</Text>
        <MoreHorizontal size={24} color="white" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <Image
            source={{uri: 'https://randomuser.me/api/portraits/men/32.jpg'}}
            style={styles.profilePic}
          />

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userStats.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userStats.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userStats.likes}</Text>
              <Text style={styles.statLabel}>Likes</Text>
            </View>
          </View>

          <View style={styles.bioContainer}>
            <Text style={styles.username}>John Smith</Text>
            <Text style={styles.bio}>
              Creating awesome short videos ✨ | Follow for daily content 🎬
            </Text>
          </View>

          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>

          <View style={styles.favoritesContainer}>
            <Text style={styles.favoritesTitle}>Favorites</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.favoritesScroll}>
              {[1, 2, 3, 4].map(item => (
                <View key={item} style={styles.favoriteItem}>
                  <Image
                    source={{
                      uri: `https://picsum.photos/id/${240 + item}/100/100`,
                    }}
                    style={styles.favoriteImage}
                  />
                  <Text style={styles.favoriteLabel}>Favorite {item}</Text>
                </View>
              ))}
              <TouchableOpacity style={styles.addFavoriteButton}>
                <Plus size={30} color="white" />
                <Text style={styles.addFavoriteText}>New</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>

        <View style={styles.contentTabsContainer}>
          <TouchableOpacity
            style={[
              styles.contentTab,
              activeTab === 'videos' && styles.activeContentTab,
            ]}
            onPress={() => setActiveTab('videos')}>
            <Grid size={24} color={activeTab === 'videos' ? 'white' : '#999'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.contentTab,
              activeTab === 'liked' && styles.activeContentTab,
            ]}
            onPress={() => setActiveTab('liked')}>
            <Heart size={24} color={activeTab === 'liked' ? 'white' : '#999'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.contentTab,
              activeTab === 'private' && styles.activeContentTab,
            ]}
            onPress={() => setActiveTab('private')}>
            <Lock
              size={24}
              color={activeTab === 'private' ? 'white' : '#999'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.videosContainer}>
          <FlatList
            data={
              activeTab === 'videos'
                ? userVideos
                : activeTab === 'liked'
                ? likedVideos
                : []
            }
            numColumns={3}
            scrollEnabled={false}
            renderItem={({item}) => (
              <TouchableOpacity style={styles.videoItem}>
                <Image
                  source={{uri: item.thumbnail}}
                  style={styles.videoThumbnail}
                />
                <View style={styles.videoOverlay}>
                  <Play size={16} color="white" />
                  <Text style={styles.videoViews}>{item.views}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Lock size={50} color="#666" />
                <Text style={styles.emptyText}>This content is private</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
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
  headerTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  profilePic: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 15,
    width: '80%',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#999',
    fontSize: 13,
    marginTop: 3,
  },
  bioContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  username: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  bio: {
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
    paddingHorizontal: 20,
  },
  editProfileButton: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 40,
    marginTop: 15,
  },
  editProfileText: {
    color: 'white',
    fontWeight: '500',
  },
  favoritesContainer: {
    width: '100%',
    marginTop: 20,
  },
  favoritesTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  favoritesScroll: {
    paddingBottom: 10,
  },
  favoriteItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  favoriteImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FF4040',
  },
  favoriteLabel: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
  addFavoriteButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  addFavoriteText: {
    color: 'white',
    fontSize: 12,
    marginTop: 2,
  },
  contentTabsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#333',
    marginTop: 20,
  },
  contentTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeContentTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  videosContainer: {
    paddingTop: 2,
  },
  videoItem: {
    flex: 1 / 3,
    aspectRatio: 0.8,
    padding: 1,
  },
  videoThumbnail: {
    flex: 1,
  },
  videoOverlay: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoViews: {
    color: 'white',
    fontSize: 12,
    marginLeft: 3,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    color: '#666',
    marginTop: 10,
    fontSize: 16,
  },
});
