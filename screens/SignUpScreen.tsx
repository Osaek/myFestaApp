import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import {ArrowLeft, Camera, User, Mail, Lock} from 'lucide-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useUserStore} from '../store/userStore';

interface SignUpScreenProps {
  navigation: any;
}

export default function SignUpScreen({navigation}: SignUpScreenProps) {
  const insets = useSafeAreaInsets();
  const login = useUserStore(state => state.login);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: '',
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleSignUp = () => {
    // 간단한 유효성 검사
    if (!formData.username || !formData.email || !formData.password) {
      Alert.alert('오류', '모든 필수 필드를 입력해주세요.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('오류', '비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    // 회원가입 성공 시 사용자 정보를 store에 저장
    const newUser = {
      id: Date.now().toString(),
      username: formData.username,
      email: formData.email,
      profileImage: profileImage || undefined,
      bio: formData.bio || '',
      following: 0,
      followers: 0,
      likes: 0,
    };

    login(newUser);
    Alert.alert('성공', '회원가입이 완료되었습니다!', [
      {text: '확인', onPress: () => navigation.goBack()},
    ]);
  };

  const handleProfileImageSelect = () => {
    // 실제 구현에서는 이미지 피커를 사용
    Alert.alert('프로필 이미지', '이미지 선택 기능은 추후 구현됩니다.');
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>회원가입</Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileImageSection}>
          <TouchableOpacity
            style={styles.profileImageContainer}
            onPress={handleProfileImageSelect}>
            {profileImage ? (
              <Image source={{uri: profileImage}} style={styles.profileImage} />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Camera size={40} color="#666" />
              </View>
            )}
          </TouchableOpacity>
          <Text style={styles.profileImageText}>프로필 사진 추가</Text>
        </View>

        <View style={styles.formSection}>
          <View style={styles.inputContainer}>
            <User size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="사용자명"
              placeholderTextColor="#666"
              value={formData.username}
              onChangeText={text => setFormData({...formData, username: text})}
            />
          </View>

          <View style={styles.inputContainer}>
            <Mail size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="이메일"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={text => setFormData({...formData, email: text})}
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="비밀번호"
              placeholderTextColor="#666"
              secureTextEntry
              value={formData.password}
              onChangeText={text => setFormData({...formData, password: text})}
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="비밀번호 확인"
              placeholderTextColor="#666"
              secureTextEntry
              value={formData.confirmPassword}
              onChangeText={text =>
                setFormData({...formData, confirmPassword: text})
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.bioInput]}
              placeholder="자기소개 (선택사항)"
              placeholderTextColor="#666"
              multiline
              numberOfLines={3}
              value={formData.bio}
              onChangeText={text => setFormData({...formData, bio: text})}
            />
          </View>

          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>회원가입</Text>
          </TouchableOpacity>

          <View style={styles.loginSection}>
            <Text style={styles.loginText}>이미 계정이 있으신가요? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>로그인</Text>
            </TouchableOpacity>
          </View>
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
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileImageSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#333',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageText: {
    color: '#666',
    fontSize: 14,
  },
  formSection: {
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    paddingVertical: 15,
  },
  bioInput: {
    paddingTop: 15,
    paddingBottom: 15,
    textAlignVertical: 'top',
  },
  signUpButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loginSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#ff6b6b',
    fontSize: 14,
    fontWeight: '600',
  },
});
