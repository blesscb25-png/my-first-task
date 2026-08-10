import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { conversations, messagesByConversation } from '@/data/mockData';
import { professionals } from '@/data/professionals';
import { ChatBubble } from '@/components/ChatBubble';
import { Send, Phone, Video, ChevronLeft, Plus, Mic, Image as ImageIcon } from 'lucide-react-native';

export default function ChatListScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.convCard}
            onPress={() => router.push(`/chat/${item.participantId}`)}
            activeOpacity={0.85}
          >
            <View style={{ position: 'relative' }}>
              <Image source={{ uri: item.participantAvatar }} style={styles.avatar} />
              {item.isOnline && <View style={styles.onlineDot} />}
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.convHeader}>
                <Text style={styles.convName} numberOfLines={1}>{item.participantName}</Text>
                <Text style={styles.convTime}>{item.lastMessageTime}</Text>
              </View>
              <View style={styles.convFooter}>
                <Text style={styles.convMsg} numberOfLines={1}>{item.lastMessage}</Text>
                {item.unreadCount > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{item.unreadCount}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export function ChatDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const pro = professionals.find((p) => p.id === id);
  const conv = conversations.find((c) => c.participantId === id);
  const [messages, setMessages] = useState(
    conv ? messagesByConversation[conv.id] || [] : []
  );
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: `m_${Date.now()}`,
      senderId: 'user_1',
      receiverId: id,
      text: input,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
    };
    setMessages([...messages, newMsg as any]);
    setInput('');
  };

  return (
    <KeyboardAvoidingView style={styles.chatContainer} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Image source={{ uri: pro?.avatar }} style={styles.chatAvatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.chatName}>{pro?.name || conv?.participantName}</Text>
          <Text style={styles.chatStatus}>{conv?.isOnline ? 'Online' : 'Offline'}</Text>
        </View>
        <TouchableOpacity style={styles.chatIconBtn}><Phone size={20} color={Colors.primary} /></TouchableOpacity>
        <TouchableOpacity style={styles.chatIconBtn}><Video size={20} color={Colors.primary} /></TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, gap: 4 }}
        renderItem={({ item, index }) => (
          <ChatBubble
            message={item}
            isMe={item.senderId === 'user_1'}
            showAvatar={item.senderId !== 'user_1' && (index === 0 || messages[index - 1]?.senderId !== item.senderId)}
            avatarUri={pro?.avatar}
          />
        )}
      />

      <View style={styles.inputBar}>
        <TouchableOpacity style={styles.inputIconBtn}><Plus size={22} color={Colors.textSecondary} /></TouchableOpacity>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor={Colors.textMuted}
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.inputIconBtn}><ImageIcon size={20} color={Colors.textSecondary} /></TouchableOpacity>
          <TouchableOpacity style={styles.inputIconBtn}><Mic size={20} color={Colors.textSecondary} /></TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Send size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 56,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: Colors.white,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  convCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 14,
    ...Shadow.card,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  convHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  convName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    flex: 1,
  },
  convTime: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  convFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  convMsg: {
    fontSize: 13,
    color: Colors.textSecondary,
    flex: 1,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.white,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 56,
    paddingHorizontal: 16,
    paddingBottom: 14,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  chatAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  chatStatus: {
    fontSize: 12,
    color: Colors.success,
    fontWeight: '500',
  },
  chatIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(10,91,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 32,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  inputIconBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.gray,
    borderRadius: 20,
    paddingHorizontal: 14,
    height: 44,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadow.sm,
  },
});
