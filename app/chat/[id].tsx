import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { conversations, messagesByConversation } from '@/data/mockData';
import { professionals } from '@/data/professional';
import { ChatBubble } from '@/components/ChatBubble';
import { Send, Phone, Video, ChevronLeft, Plus, Mic, Image as ImageIcon } from 'lucide-react-native';

export default function ChatDetailScreen() {
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
      receiverId: id || '',
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
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
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
