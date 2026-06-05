/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 * @format
 */
import * as React from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { Avatar } from '@fluentui-react-native/avatar';
import { ButtonV1 as Button } from '@fluentui-react-native/button';
import { TextV1 as Text } from '@fluentui-react-native/text';
import { useTheme } from '@fluentui-react-native/theme-types';

type Message = { id: string; mine?: boolean; name: string; text: string; time: string };

const seed: Message[] = [
  { id: '1', name: 'Kat Larsson', text: 'Did the Storybook integration land?', time: '9:41 AM' },
  { id: '2', mine: true, name: 'You', text: 'Yep — the V1 controls render with live theming.', time: '9:41 AM' },
  { id: '3', name: 'Kat Larsson', text: 'Nice! Does dark mode work too?', time: '9:42 AM' },
  { id: '4', mine: true, name: 'You', text: 'Flip the Appearance switch up top and the whole pane re-themes.', time: '9:42 AM' },
  { id: '5', name: 'Kat Larsson', text: 'Love it. Ship it 🚀', time: '9:43 AM' },
];

const quickReplies = ['👍 Sounds good', 'On it', 'Thanks!'];

interface BubbleColors {
  mineBg: string;
  themBg: string;
  mineFg: string;
  themFg: string;
  subtle: string;
}

const Bubble: React.FunctionComponent<{ message: Message; colors: BubbleColors }> = ({ message, colors }) => {
  const { mine } = message;
  const bg = mine ? colors.mineBg : colors.themBg;
  const fg = mine ? colors.mineFg : colors.themFg;
  return (
    <View style={[styles.row, mine ? styles.rowMine : styles.rowThem]}>
      {!mine && <Avatar size={28} name={message.name} avatarColor="colorful" />}
      <View style={[styles.bubble, { backgroundColor: bg }, mine ? styles.bubbleMine : styles.bubbleThem]}>
        <Text variant="body2" style={{ color: fg }}>
          {message.text}
        </Text>
        <Text variant="caption1" style={[styles.time, { color: fg }]}>
          {message.time}
        </Text>
      </View>
    </View>
  );
};

/** A chat pane that exercises Avatar, Text, Button and live theming. */
export const ChatPane: React.FunctionComponent = () => {
  const theme = useTheme();
  const c = theme.colors as Record<string, string>;
  const colors: BubbleColors = {
    mineBg: c.brandBackground ?? '#0F6CBD',
    themBg: c.neutralBackground3 ?? '#F0F0F0',
    mineFg: c.neutralForegroundInverted ?? '#FFFFFF',
    themFg: c.neutralForeground1 ?? '#242424',
    subtle: c.neutralForeground3 ?? '#616161',
  };

  const [messages, setMessages] = React.useState<Message[]>(seed);
  const [draft, setDraft] = React.useState('');
  const scrollRef = React.useRef<ScrollView>(null);

  const send = React.useCallback((text: string) => {
    const body = text.trim();
    if (!body) {
      return;
    }
    setMessages((prev) => [...prev, { id: String(prev.length + 1), mine: true, name: 'You', text: body, time: 'now' }]);
    setDraft('');
  }, []);

  return (
    <View style={styles.stage}>
      <View style={[styles.pane, { backgroundColor: c.neutralBackground1 ?? '#FFFFFF', borderColor: c.menuDivider ?? '#E0E0E0' }]}>
        <View style={[styles.header, { borderBottomColor: c.menuDivider ?? '#E0E0E0' }]}>
          <Avatar size={32} name="Kat Larsson" avatarColor="colorful" active="active" />
          <View style={styles.headerText}>
            <Text variant="body1Strong">Kat Larsson</Text>
            <Text variant="caption1" style={{ color: colors.subtle }}>
              Active now
            </Text>
          </View>
        </View>

        <ScrollView
          ref={scrollRef}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((message) => (
            <Bubble key={message.id} message={message} colors={colors} />
          ))}
        </ScrollView>

        <View style={styles.quickReplies}>
          {quickReplies.map((reply) => (
            <Button key={reply} appearance="outline" size="small" style={styles.quickReply} onClick={() => send(reply)}>
              {reply}
            </Button>
          ))}
        </View>

        <View style={[styles.composer, { borderTopColor: c.menuDivider ?? '#E0E0E0' }]}>
          <TextInput
            style={[styles.input, { borderColor: c.menuDivider ?? '#E0E0E0', color: colors.themFg }]}
            placeholder="Type a message…"
            placeholderTextColor={colors.subtle}
            value={draft}
            onChangeText={setDraft}
            onSubmitEditing={() => send(draft)}
          />
          <Button appearance="primary" onClick={() => send(draft)}>
            Send
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stage: { flex: 1, alignItems: 'center', padding: 12 },
  pane: { flex: 1, width: '100%', maxWidth: 560, borderRadius: 10, borderWidth: StyleSheet.hairlineWidth, overflow: 'hidden' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: StyleSheet.hairlineWidth },
  headerText: { marginLeft: 10 },
  list: { flex: 1 },
  listContent: { padding: 12 },
  row: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 10 },
  rowThem: { justifyContent: 'flex-start' },
  rowMine: { justifyContent: 'flex-end' },
  bubble: { maxWidth: '78%', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 14, marginHorizontal: 8 },
  bubbleThem: { borderBottomLeftRadius: 4 },
  bubbleMine: { borderBottomRightRadius: 4 },
  time: { marginTop: 3, opacity: 0.7 },
  quickReplies: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, paddingBottom: 4 },
  quickReply: { marginRight: 8, marginBottom: 8 },
  composer: { flexDirection: 'row', alignItems: 'center', padding: 8, borderTopWidth: StyleSheet.hairlineWidth },
  input: { flex: 1, height: 38, borderWidth: StyleSheet.hairlineWidth, borderRadius: 19, paddingHorizontal: 14, marginRight: 8 },
});
