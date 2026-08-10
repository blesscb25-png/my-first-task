import React from 'react';
import { View, Text, StyleSheet, Image, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { Message } from '@/types';
import { Check, CheckCheck } from 'lucide-react-native';

interface ChatBubbleProps {
  message: Message;
  isMe: boolean;
  showAvatar?: boolean;
  avatarUri?: string;
  style?: ViewStyle;
}

export function ChatBubble({ message: m, isMe, showAvatar, avatarUri, style }: ChatBubbleProps) {
  return (
    <View style={[styles.container, isMe ? styles.meContainer : styles.themContainer, style]}>
      {!isMe && showAvatar && (
        <Image source={{ uri: avatarUri }} style={styles.avatar} />
      )}
      <View style={{ maxWidth: '75%' }}>
        {m.isImage && m.imageUrl ? (
          <Image source={{ uri: m.imageUrl }} style={styles.imageMsg} />
        ) : (
          <View style={[styles.bubble, isMe ? styles.meBubble : styles.themBubble]}>
            <Text style={[styles.text, isMe ? styles.meText : styles.themText]}>
              {m.text}
            </Text>
          </View>
        )}
        <View style={[styles.meta, isMe && styles.meMeta]}>
          <Text style={styles.time}>{m.time}</Text>
          {isMe && (
            m.isRead ? <CheckCheck size={12} color={Colors.primary} /> : <Check size={12} color={Colors.textMuted} />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginBottom: 10,
  },
  meContainer: {
    justifyContent: 'flex-end',
  },
  themContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  marginBottom: 2,
  },
  bubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  meBubble: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 6,
  },
  themBubble: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 6,
    ...Shadow.sm,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
  meText: {
    color: Colors.white,
    fontWeight: '500',
  },
  themText: {
    color: Colors.textPrimary,
  },
  imageMsg: {
    width: 200,
    height: 200,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
    paddingHorizontal: 4,
  },
  meMeta: {
    justifyContent: 'flex-end',
  },
  time: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '500',
  },
});
