import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Search, Star} from 'lucide-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface DiscoverScreenProps {}

interface Festival {
  id: string;
  title: string;
  rating: number;
  period: string;
  location: string;
  image: string;
}

interface CategoryItem {
  id: string;
  title: string;
  image: string;
}

export default function DiscoverScreen({}: DiscoverScreenProps) {
  const insets = useSafeAreaInsets();

  const categories: CategoryItem[] = [
    {
      id: '1',
      title: '구미 축제',
      image: 'https://picsum.photos/id/100/200/200',
    },
    {
      id: '2',
      title: '민속 축제',
      image: 'https://picsum.photos/id/101/200/200',
    },
    {
      id: '3',
      title: '불꽃놀이',
      image: 'https://picsum.photos/id/102/200/200',
    },
    {
      id: '4',
      title: '꽃놀이',
      image: 'https://picsum.photos/id/102/200/200',
    },
    {
      id: '5',
      title: '드론페스티벌',
      image: 'https://picsum.photos/id/102/200/200',
    },
  ];

  const nearbyFestivals = [
    {
      id: '1',
      title: '맥주 축제',
      period: '기간: 04.02 ~ 04.28',
      location: '위치: 서울, 영등포 역삼동',
      image: 'https://picsum.photos/id/200/300/200',
    },
    {
      id: '2',
      title: '워터밤',
      period: '기간: 04.02 ~ 04.28',
      location: '위치: 서울, 영등포 역삼동',
      image: 'https://picsum.photos/id/201/300/200',
    },
  ];

  const popularFestivals: Festival[] = [
    {
      id: '1',
      title: '불꽃 축제',
      rating: 4.8,
      period: '기간: 05.24-05.29',
      location: '',
      image: 'https://picsum.photos/id/300/100/100',
    },
    {
      id: '2',
      title: '불꽃 축제',
      rating: 4.8,
      period: '기간: 05.24-05.29',
      location: '',
      image: 'https://picsum.photos/id/301/100/100',
    },
    {
      id: '3',
      title: '불꽃 축제',
      rating: 4.8,
      period: '기간: 05.24-05.29',
      location: '',
      image: 'https://picsum.photos/id/302/100/100',
    },
    {
      id: '4',
      title: '불꽃 축제',
      rating: 4.8,
      period: '기간: 05.24-05.29',
      location: '',
      image: 'https://picsum.photos/id/303/100/100',
    },
    {
      id: '5',
      title: '불꽃 축제',
      rating: 4.8,
      period: '기간: 05.24-05.29',
      location: '',
      image: 'https://picsum.photos/id/304/100/100',
    },
  ];

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Festivals</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Search size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        {/* This Month's Festivals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>이달의 축제</Text>
          <TouchableOpacity style={styles.mainFestivalCard}>
            <Image
              source={{uri: 'https://picsum.photos/id/400/400/200'}}
              style={styles.mainFestivalImage}
            />
            <View style={styles.mainFestivalOverlay}>
              <Text style={styles.mainFestivalTitle}>축제 캐러셀</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Summer Festival Question */}
        <View style={styles.section}>
          <Text style={styles.questionTitle}>시원한 여름,</Text>
          <Text style={styles.questionTitle}>이런 축제 어때요?</Text>
          <Text style={styles.questionSubtitle}>
            현재 사람들이 즐겨 가고있는 축제예요
          </Text>
          <View style={styles.creatorsContentView}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.creatorsContent}>
              {categories.map(category => (
                <TouchableOpacity key={category.id} style={styles.creatorCard}>
                  <Image
                    source={{uri: category.image}}
                    style={styles.creatorProfilePic}
                  />
                  <Text style={styles.creatorUsername}>{category.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Nearby Festivals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>내 주변 축제</Text>
          <Text style={styles.sectionSubtitle}>
            우리에서 가장 축제를 하고있어요
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.nearbyFestivalsContainer}>
            {nearbyFestivals.map(festival => (
              <TouchableOpacity
                key={festival.id}
                style={styles.nearbyFestivalCard}>
                <Image
                  source={{uri: festival.image}}
                  style={styles.nearbyFestivalImage}
                />
                <View style={styles.nearbyFestivalInfo}>
                  <Text style={styles.nearbyFestivalTitle}>
                    {festival.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Popular Festivals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>지금 사람들이 관심있는 축제</Text>
          <Text style={styles.sectionSubtitle}>
            사람들이 최근 많이 찾고 있어 본 축제들
          </Text>

          <View style={styles.popularFestivalsContainer}>
            {popularFestivals.map((festival, index) => (
              <TouchableOpacity
                key={festival.id}
                style={styles.popularFestivalItem}>
                <View style={styles.popularFestivalLeft}>
                  <Text style={styles.popularFestivalNumber}>{index + 1}.</Text>
                  <View style={styles.popularFestivalInfo}>
                    <Text style={styles.popularFestivalTitle}>
                      {festival.title}
                    </Text>
                    <View style={styles.popularFestivalRating}>
                      <Star size={12} color="#FFD700" fill="#FFD700" />
                      <Text style={styles.ratingText}>
                        {festival.rating}(32)
                      </Text>
                      <Text style={styles.periodText}>{festival.period}</Text>
                    </View>
                  </View>
                </View>
                <Image
                  source={{uri: festival.image}}
                  style={styles.popularFestivalImage}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={{height: 100}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  searchButton: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  mainFestivalCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 10,
  },
  mainFestivalImage: {
    width: '100%',
    height: 150,
  },
  mainFestivalOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 15,
  },
  mainFestivalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    lineHeight: 28,
  },
  creatorsContentView: {
    marginHorizontal: -20,
  },
  creatorsContent: {
    paddingLeft: 20,
  },
  questionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    marginBottom: 20,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryItem: {
    alignItems: 'center',
    flex: 1,
  },
  categoryImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 8,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryTitle: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  nearbyFestivalsContainer: {
    paddingRight: 20,
  },
  nearbyFestivalCard: {
    width: 160,
    marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#2A2A2A',
  },
  nearbyFestivalImage: {
    width: '100%',
    height: 100,
  },
  nearbyFestivalInfo: {
    padding: 12,
  },
  nearbyFestivalTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  nearbyFestivalPeriod: {
    color: '#CCCCCC',
    fontSize: 12,
    marginBottom: 2,
  },
  nearbyFestivalLocation: {
    color: '#CCCCCC',
    fontSize: 12,
  },
  popularFestivalsContainer: {
    marginTop: 10,
  },
  popularFestivalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  popularFestivalLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  popularFestivalNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 12,
    width: 20,
  },
  popularFestivalInfo: {
    flex: 1,
  },
  popularFestivalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  popularFestivalRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    marginRight: 8,
  },
  periodText: {
    fontSize: 12,
    color: '#666',
  },
  popularFestivalImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  tipTitle: {
    fontSize: 16,
    color: '#000',
    marginTop: 8,
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
    color: 'black',
    marginTop: 8,
    fontWeight: '500',
  },
});
