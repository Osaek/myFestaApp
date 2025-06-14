import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Search, Play} from 'lucide-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function MainScreen() {
  const insets = useSafeAreaInsets();

  const categories = [
    'For You',
    'Gaming',
    'Comedy',
    'Fashion',
    'Sports',
    'Food',
    'Beauty',
    'Animals',
  ];

  const trendingVideos = [
    {
      id: '1',
      thumbnail: 'https://picsum.photos/id/237/300/400',
      views: '2.3M',
      user: {
        username: 'dancequeen',
        profilePic: 'https://randomuser.me/api/portraits/women/32.jpg',
      },
    },
    {
      id: '2',
      thumbnail: 'https://picsum.photos/id/238/300/400',
      views: '1.8M',
      user: {
        username: 'travelguy',
        profilePic: 'https://randomuser.me/api/portraits/men/42.jpg',
      },
    },
    {
      id: '3',
      thumbnail: 'https://picsum.photos/id/239/300/400',
      views: '4.1M',
      user: {
        username: 'foodlover',
        profilePic: 'https://randomuser.me/api/portraits/women/65.jpg',
      },
    },
    {
      id: '4',
      thumbnail: 'https://picsum.photos/id/240/300/400',
      views: '950K',
      user: {
        username: 'fitnesscoach',
        profilePic: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
    },
  ];

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Search size={22} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                index === 0 ? styles.activeCategoryButton : null,
              ]}>
              <Text
                style={[
                  styles.categoryText,
                  index === 0 ? styles.activeCategoryText : null,
                ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Trending Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Now</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingContent}>
            {trendingVideos.map(video => (
              <TouchableOpacity key={video.id} style={styles.videoCard}>
                <Image
                  source={{uri: video.thumbnail}}
                  style={styles.videoThumbnail}
                />
                <View style={styles.videoOverlay}>
                  <Play size={24} color="white" />
                  <Text style={styles.videoViews}>{video.views}</Text>
                </View>
                <View style={styles.videoUserInfo}>
                  <Image
                    source={{uri: video.user.profilePic}}
                    style={styles.userProfilePic}
                  />
                  <Text style={styles.username}>@{video.user.username}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Popular Creators */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Creators</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.creatorsContent}>
            {[1, 2, 3, 4, 5].map(item => (
              <TouchableOpacity key={item} style={styles.creatorCard}>
                <Image
                  source={{
                    uri: `https://randomuser.me/api/portraits/${
                      item % 2 === 0 ? 'women' : 'men'
                    }/${20 + item}.jpg`,
                  }}
                  style={styles.creatorProfilePic}
                />
                <Text style={styles.creatorUsername}>creator{item}</Text>
                <Text style={styles.creatorFollowers}>2.{item}M</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesContainer: {
    marginTop: 10,
  },
  categoriesContent: {
    paddingHorizontal: 10,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#222',
  },
  activeCategoryButton: {
    backgroundColor: '#FF4040',
  },
  categoryText: {
    color: 'white',
    fontWeight: '500',
  },
  activeCategoryText: {
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginTop: 25,
    paddingHorizontal: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#FF4040',
    fontSize: 14,
  },
  trendingContent: {
    paddingRight: 15,
  },
  videoCard: {
    width: 150,
    marginRight: 15,
  },
  videoThumbnail: {
    width: 150,
    height: 200,
    borderRadius: 10,
  },
  videoOverlay: {
    position: 'absolute',
    bottom: 40,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoViews: {
    color: 'white',
    marginLeft: 5,
    fontWeight: '500',
  },
  videoUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  userProfilePic: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  username: {
    color: 'white',
    marginLeft: 5,
    fontSize: 12,
  },
  creatorsContent: {
    paddingRight: 15,
  },
  creatorCard: {
    alignItems: 'center',
    marginRight: 20,
  },
  creatorProfilePic: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#FF4040',
  },
  creatorUsername: {
    color: 'white',
    marginTop: 8,
    fontWeight: '500',
  },
  creatorFollowers: {
    color: '#999',
    fontSize: 12,
    marginTop: 3,
  },
});
