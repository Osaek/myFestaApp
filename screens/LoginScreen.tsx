import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {ArrowLeft, Mail, Lock, User} from 'lucide-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useUserStore} from '../store/userStore';
import {
  login,
  getProfile as getKakaoProfile,
  getAccessToken,
} from '@react-native-seoul/kakao-login';

interface LoginScreenProps {
  navigation: any;
}

export default function LoginScreen({navigation}: LoginScreenProps) {
  const insets = useSafeAreaInsets();
  const userLogin = useUserStore(state => state.userLogin);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = () => {
    // 간단한 유효성 검사
    if (!formData.email || !formData.password) {
      Alert.alert('오류', '이메일과 비밀번호를 입력해주세요.');
      return;
    }

    // 실제 구현에서는 서버에서 인증을 처리해야 합니다
    // 여기서는 데모용으로 간단한 로그인 처리
    const mockUser = {
      id: Date.now().toString(),
      username: 'demo_user',
      email: formData.email,
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Creating awesome short videos ✨ | Follow for daily content 🎬',
      following: 125,
      followers: 10500,
      likes: 142700,
    };

    userLogin(mockUser);
    Alert.alert('성공', '로그인이 완료되었습니다!', [
      {text: '확인', onPress: () => navigation.goBack()},
    ]);
  };

  const handleKakaoLogin = async () => {
    try {
      console.log('카카오 로그인 시작...');

      // 기존 토큰 확인
      try {
        const existingToken = await getAccessToken();
        console.log('기존 토큰 존재:', existingToken);
      } catch (error) {
        console.log('기존 토큰 없음');
      }

      // 카카오 로그인 실행
      console.log('카카오 로그인 API 호출...');
      const token = await login();
      console.log('카카오 로그인 성공, 토큰:', token);

      // 잠시 대기 (카카오 서버 동기화를 위해)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 사용자 정보 가져오기
      console.log('사용자 정보 가져오기 시작...');
      const profile = await getKakaoProfile();
      console.log('사용자 정보 성공:', profile);

      // 카카오 사용자 정보로 로그인 처리
      const kakaoUser = {
        id: profile.id.toString(),
        username: profile.nickname || 'kakao_user',
        email: profile.email || 'kakao@example.com',
        profileImage:
          profile.profileImageUrl ||
          'https://randomuser.me/api/portraits/women/32.jpg',
        bio: '카카오로 로그인한 사용자입니다 ✨',
        following: 89,
        followers: 2340,
        likes: 56700,
      };

      console.log('카카오 사용자 정보:', kakaoUser);
      userLogin(kakaoUser);
      Alert.alert('성공', '카카오 로그인이 완료되었습니다!', [
        {text: '확인', onPress: () => navigation.goBack()},
      ]);
    } catch (error: any) {
      console.error('카카오 로그인 오류 상세:', error);
      console.error('에러 타입:', typeof error);
      console.error('에러 메시지:', error?.message);
      console.error('에러 스택:', error?.stack);

      let errorMessage = '카카오 로그인에 실패했습니다. 다시 시도해주세요.';

      if (error?.message && error.message.includes('SdkError error 2')) {
        errorMessage =
          '카카오 앱 설정에 문제가 있습니다. 개발자에게 문의해주세요.';

        // SdkError error 2의 경우 재시도 옵션 제공
        Alert.alert('오류', errorMessage, [
          {text: '취소', style: 'cancel'},
          {text: '재시도', onPress: () => handleKakaoLogin()},
        ]);
        return;
      }

      Alert.alert('오류', errorMessage);
    }
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>로그인</Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeSection}>
          <User size={80} color="#ff6b6b" />
          <Text style={styles.welcomeTitle}>
            MyFesta에 오신 것을 환영합니다
          </Text>
          <Text style={styles.welcomeSubtitle}>
            계정에 로그인하여 모든 기능을 이용해보세요
          </Text>
        </View>

        <View style={styles.formSection}>
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

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>
              비밀번호를 잊으셨나요?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>로그인</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>또는</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.kakaoButton}
            onPress={handleKakaoLogin}>
            <Text style={styles.kakaoButtonText}>💬 카카오톡으로 로그인</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.demoButton} onPress={handleLogin}>
            <Text style={styles.demoButtonText}>데모 로그인 (테스트용)</Text>
          </TouchableOpacity>

          <View style={styles.signUpSection}>
            <Text style={styles.signUpText}>계정이 없으신가요? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpLink}>회원가입</Text>
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
  welcomeSection: {
    alignItems: 'center',
    marginVertical: 40,
  },
  welcomeTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#ff6b6b',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  kakaoButton: {
    backgroundColor: '#FEE500',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  kakaoButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#333',
  },
  dividerText: {
    color: '#666',
    marginHorizontal: 15,
    fontSize: 14,
  },
  demoButton: {
    backgroundColor: '#333',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  demoButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  signUpText: {
    color: '#666',
    fontSize: 14,
  },
  signUpLink: {
    color: '#ff6b6b',
    fontSize: 14,
    fontWeight: '600',
  },
});
