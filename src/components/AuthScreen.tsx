import React, { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthProviderType, UserProfile } from '../types/cs2';
import { LiquidGlassCard } from './LiquidGlassUI';

interface AuthScreenProps {
  onLoginSuccess: (profile: UserProfile) => void;
}

const PROVIDERS: {
  key: AuthProviderType;
  label: string;
  domain: string;
  color: string;
  badge: string;
}[] = [
  { key: 'google', label: 'Google Почта', domain: '@gmail.com', color: '#EA4335', badge: 'G' },
  { key: 'yandex', label: 'Яндекс Почта', domain: '@yandex.ru', color: '#FC3F1D', badge: 'Я' },
  { key: 'mailru', label: 'Mail.ru Почта', domain: '@mail.ru', color: '#005FF9', badge: '@' },
];

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
  const [selectedProvider, setSelectedProvider] = useState<AuthProviderType>('google');
  const [nickname, setNickname] = useState('');
  const [emailPrefix, setEmailPrefix] = useState('');

  const currentProvider = PROVIDERS.find((p) => p.key === selectedProvider) || PROVIDERS[0];

  const handleConfirm = () => {
    const cleanNick = nickname.trim() || 'CS2_Player';
    const cleanEmail = emailPrefix.trim()
      ? emailPrefix.includes('@')
        ? emailPrefix.trim()
        : `${emailPrefix.trim()}${currentProvider.domain}`
      : `player_${Math.floor(Math.random() * 9000 + 1000)}${currentProvider.domain}`;

    if (cleanEmail.length < 5) {
      Alert.alert('Ошибка', 'Укажите корректный почтовый адрес');
      return;
    }

    onLoginSuccess({
      email: cleanEmail,
      nickname: cleanNick,
      provider: selectedProvider,
      avatarColor: currentProvider.color,
      createdAt: Date.now(),
    });
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#060913', '#0F172A', '#1E1B4B']}
        style={StyleSheet.absoluteFillObject}
      />

      <LiquidGlassCard glowColor="rgba(56, 189, 248, 0.4)" style={styles.card}>
        <Image
          source={require('../../assets/icon.png')}
          style={{ width: 92, height: 92, borderRadius: 22, alignSelf: 'center', marginBottom: 10 }}
        />
        <Text style={styles.badgeTop}>CS2 CASE SIMULATOR • LIQUID GLASS</Text>
        <Text style={styles.title}>Вход в аккаунт</Text>
        <Text style={styles.subtitle}>
          Выбери удобную почту для сохранения инвентаря и получи стартовый бонус{' '}
          <Text style={{ color: '#10B981', fontWeight: '900' }}>$1,000.00</Text>
        </Text>

        {/* Provider Selector */}
        <View style={styles.providerList}>
          {PROVIDERS.map((p) => {
            const active = selectedProvider === p.key;
            return (
              <TouchableOpacity
                key={p.key}
                onPress={() => setSelectedProvider(p.key)}
                style={[
                  styles.providerBtn,
                  active && { borderColor: p.color, backgroundColor: 'rgba(255,255,255,0.12)' },
                ]}
              >
                <View style={[styles.providerIcon, { backgroundColor: p.color }]}>
                  <Text style={styles.providerIconText}>{p.badge}</Text>
                </View>
                <Text style={styles.providerLabel}>{p.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.fieldLabel}>Твой никнейм в игре</Text>
        <TextInput
          placeholder="Например: s1mple_boss"
          placeholderTextColor="#64748B"
          value={nickname}
          onChangeText={setNickname}
          style={styles.input}
        />

        <Text style={styles.fieldLabel}>Почта ({currentProvider.label})</Text>
        <View style={styles.emailRow}>
          <TextInput
            placeholder={`Логин или почта (${currentProvider.domain})`}
            placeholderTextColor="#64748B"
            value={emailPrefix}
            onChangeText={setEmailPrefix}
            autoCapitalize="none"
            keyboardType="email-address"
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
          />
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleConfirm}>
          <Text style={styles.submitBtnText}>ВОЙТИ И ПОЛУЧИТЬ $1,000</Text>
        </TouchableOpacity>
      </LiquidGlassCard>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    padding: 24,
  },
  badgeTop: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
    textAlign: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 6,
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
    lineHeight: 19,
  },
  providerList: {
    gap: 10,
    marginBottom: 18,
  },
  providerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  providerIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  providerIconText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 15,
  },
  providerLabel: {
    color: '#F8FAFC',
    fontWeight: '800',
    fontSize: 14,
  },
  fieldLabel: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  input: {
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 14,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  submitBtn: {
    backgroundColor: '#10B981',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#042F2E',
    fontWeight: '900',
    fontSize: 15,
  },
});
