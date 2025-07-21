import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  Modal,
} from 'react-native';
import {MapPin, ChevronDown, ArrowDown} from 'lucide-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function MainScreen() {
  const insets = useSafeAreaInsets();
  const [selectedDistance, setSelectedDistance] = useState('1km');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const distanceOptions = ['10km', '20km', '30km', '50km'];

  const nearbyFestivals = [
    {
      id: '1',
      title: '서울 재즈 페스티벌',
      subtitle: '올림픽공원',
      image:
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: '2',
      title: '부산 불꽃축제',
      subtitle: '광안리 해수욕장',
      image:
        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: '3',
      title: '제주 유채꽃축제',
      subtitle: '서귀포시',
      image:
        'https://images.unsplash.com/photo-1520637836862-4d197d17c93a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: '4',
      title: '강릉 커피축제',
      subtitle: '안목해변',
      image:
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
  ];

  const teamPicks = [
    {
      id: '1',
      title: '인천 펜타포트 락 페스티벌',
      subtitle: '대한민국 락의 자존심!',
      image:
        'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: '2',
      title: '전주 남강 유등축제',
      subtitle: '아름다운 빛의 향연',
      image:
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    },
  ];

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>거리기반 추천</Text>
          </View>
          <TouchableOpacity
            style={styles.locationContainer}
            onPress={() => setIsDropdownOpen(true)}>
            <MapPin size={16} color="#666" />
            <Text style={styles.locationText}>{selectedDistance} 이내</Text>
            <ChevronDown size={16} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Nearby Festivals */}
        <View style={styles.sectionContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.festivalsContent}>
            {nearbyFestivals.map((festival, _index) => (
              <TouchableOpacity key={festival.id} style={styles.festivalCard}>
                <ImageBackground
                  source={{uri: festival.image}}
                  style={styles.festivalImage}
                  imageStyle={styles.festivalImageStyle}>
                  <View style={styles.festivalOverlay}>
                    <Text style={styles.festivalTitle}>{festival.title}</Text>
                    <Text style={styles.festivalSubtitle}>
                      {festival.subtitle}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Team Pick Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>팀 오색 멤버's Pick! 💎</Text>

          <View style={styles.picksContainer}>
            {teamPicks.map((pick, _index) => (
              <TouchableOpacity key={pick.id} style={styles.pickCard}>
                <Image
                  source={{uri: pick.image}}
                  style={styles.pickImageSquare}
                />
                <View style={styles.pickTextContainer}>
                  <Text style={styles.pickTitle}>{pick.title}</Text>
                  <Text style={styles.pickSubtitle}>{pick.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* New Festival Suggestion Section */}
        <View style={styles.suggestionSection}>
          <Text style={styles.suggestionTitle}>
            이번에는... 이 축제 어때요?
          </Text>
          <Text style={styles.suggestionSubtitle}>
            아래로 당겨서 새로운 축제를 찾아보세요!
          </Text>
          <View style={styles.arrowContainer}>
            <ArrowDown size={24} color="#666" />
          </View>
        </View>
      </ScrollView>

      {/* Distance Selection Modal */}
      <Modal
        visible={isDropdownOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsDropdownOpen(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsDropdownOpen(false)}>
          <View style={styles.dropdownMenu}>
            {distanceOptions.map(distance => (
              <TouchableOpacity
                key={distance}
                style={[
                  styles.dropdownItem,
                  selectedDistance === distance && styles.selectedDropdownItem,
                ]}
                onPress={() => {
                  setSelectedDistance(distance);
                  setIsDropdownOpen(false);
                }}>
                <Text
                  style={[
                    styles.dropdownItemText,
                    selectedDistance === distance &&
                      styles.selectedDropdownItemText,
                  ]}>
                  {distance} 이내
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  locationText: {
    color: '#666',
    fontSize: 14,
    marginLeft: 4,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  festivalsContent: {
    paddingRight: 20,
  },
  festivalCard: {
    width: 150,
    height: 120,
    marginRight: 15,
  },
  festivalImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  festivalImageStyle: {
    borderRadius: 12,
  },
  festivalOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  festivalTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  festivalSubtitle: {
    color: '#ccc',
    fontSize: 12,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  picksContainer: {
    gap: 15,
  },
  pickCard: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    overflow: 'hidden',
  },
  pickImageSquare: {
    width: 100,
    height: 100,
  },
  pickTextContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  pickTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  pickSubtitle: {
    color: '#ccc',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  dropdownMenu: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 8,
    alignSelf: 'flex-end',
    minWidth: 120,
    borderWidth: 1,
    borderColor: '#333',
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  selectedDropdownItem: {
    backgroundColor: '#FF4040',
  },
  dropdownItemText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  selectedDropdownItemText: {
    color: 'white',
    fontWeight: 'bold',
  },
  suggestionSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  suggestionTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  suggestionSubtitle: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  arrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
