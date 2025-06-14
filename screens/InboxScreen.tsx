import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {
  Send,
  Heart,
  MessageCircle,
  UserPlus,
  AtSign,
} from 'lucide-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function InboxScreen() {
  const insets = useSafeAreaInsets();

  const notifications = [
    {
      id: '1',
      type: 'like',
      user: {
        username: 'dancequeen',
        profilePic: 'https://randomuser.me/api/portraits/women/32.jpg',
      },
      content: 'liked your video',
      time: '2m',
      thumbnail: 'https://picsum.photos/id/237/100/100',
    },
    {
      id: '2',
      type: 'comment',
      user: {
        username: 'travelguy',
        profilePic: 'https://randomuser.me/api/portraits/men/42.jpg',
      },
      content: 'commented: "This is amazing!"',
      time: '15m',
      thumbnail: 'https://picsum.photos/id/238/100/100',
    },
    {
      id: '3',
      type: 'follow',
      user: {
        username: 'foodlover',
        profilePic: 'https://randomuser.me/api/portraits/women/65.jpg',
      },
      content: 'started following you',
      time: '1h',
    },
    {
      id: '4',
      type: 'mention',
      user: {
        username: 'fitnesscoach',
        profilePic: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      content: 'mentioned you in a comment',
      time: '3h',
      thumbnail: 'https://picsum.photos/id/240/100/100',
    },
    {
      id: '5',
      type: 'like',
      user: {
        username: 'musicfan',
        profilePic: 'https://randomuser.me/api/portraits/women/22.jpg',
      },
      content: 'liked your video',
      time: '5h',
      thumbnail: 'https://picsum.photos/id/241/100/100',
    },
    {
      id: '6',
      type: 'follow',
      user: {
        username: 'artlover',
        profilePic: 'https://randomuser.me/api/portraits/men/52.jpg',
      },
      content: 'started following you',
      time: '1d',
    },
  ];

  const messages = [
    {
      id: '1',
      user: {
        username: 'dancequeen',
        profilePic: 'https://randomuser.me/api/portraits/women/32.jpg',
      },
      lastMessage: 'Hey! How are you doing?',
      time: '2m',
      unread: true,
    },
    {
      id: '2',
      user: {
        username: 'travelguy',
        profilePic: 'https://randomuser.me/api/portraits/men/42.jpg',
      },
      lastMessage: 'Check out my new video!',
      time: '1h',
      unread: false,
    },
    {
      id: '3',
      user: {
        username: 'foodlover',
        profilePic: 'https://randomuser.me/api/portraits/women/65.jpg',
      },
      lastMessage: 'Thanks for the follow!',
      time: '2d',
      unread: false,
    },
  ];

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inbox</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Send size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>
            Notifications
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Messages</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({item}) => <NotificationItem notification={item} />}
        ListHeaderComponent={() => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today</Text>
          </View>
        )}
        ListFooterComponent={() => (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Messages</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>
            {messages.map(message => (
              <MessageItem key={message.id} message={message} />
            ))}
            <View style={{height: 20}} />
          </>
        )}
      />
    </View>
  );
}

function NotificationItem({notification}: {notification: any}) {
  const getIcon = () => {
    switch (notification.type) {
      case 'like':
        return <Heart size={16} color="#FF4040" />;
      case 'comment':
        return <MessageCircle size={16} color="#5B68FF" />;
      case 'follow':
        return <UserPlus size={16} color="#4CAF50" />;
      case 'mention':
        return <AtSign size={16} color="#FF9800" />;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity style={styles.notificationItem}>
      <Image
        source={{uri: notification.user.profilePic}}
        style={styles.userProfilePic}
      />
      <View style={styles.notificationContent}>
        <Text style={styles.notificationText}>
          <Text style={styles.username}>{notification.user.username}</Text>{' '}
          {notification.content}
        </Text>
        <Text style={styles.timeText}>{notification.time}</Text>
      </View>
      <View style={styles.notificationRight}>
        {notification.thumbnail ? (
          <Image
            source={{uri: notification.thumbnail}}
            style={styles.thumbnailImage}
          />
        ) : (
          <View style={styles.iconContainer}>{getIcon()}</View>
        )}
      </View>
    </TouchableOpacity>
  );
}

function MessageItem({message}: {message: any}) {
  return (
    <TouchableOpacity style={styles.messageItem}>
      <View style={styles.messageProfileContainer}>
        <Image
          source={{uri: message.user.profilePic}}
          style={styles.messageProfilePic}
        />
        {message.unread && <View style={styles.unreadIndicator} />}
      </View>
      <View style={styles.messageContent}>
        <Text style={styles.messageUsername}>{message.user.username}</Text>
        <Text style={styles.messageText} numberOfLines={1}>
          {message.lastMessage}
        </Text>
      </View>
      <Text style={styles.messageTime}>{message.time}</Text>
    </TouchableOpacity>
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
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  tabText: {
    color: '#999',
    fontSize: 15,
  },
  activeTabText: {
    color: 'white',
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#111',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  seeAllText: {
    color: '#FF4040',
    fontSize: 14,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  userProfilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  notificationContent: {
    flex: 1,
    marginLeft: 10,
  },
  notificationText: {
    color: 'white',
    fontSize: 14,
  },
  username: {
    fontWeight: 'bold',
  },
  timeText: {
    color: '#999',
    fontSize: 12,
    marginTop: 3,
  },
  notificationRight: {
    marginLeft: 10,
  },
  thumbnailImage: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  messageProfileContainer: {
    position: 'relative',
  },
  messageProfilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  unreadIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF4040',
    borderWidth: 2,
    borderColor: '#000',
  },
  messageContent: {
    flex: 1,
    marginLeft: 10,
  },
  messageUsername: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  messageText: {
    color: '#999',
    fontSize: 13,
    marginTop: 3,
  },
  messageTime: {
    color: '#999',
    fontSize: 12,
  },
});
