import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { AuthProviderType, InventoryItem, QuestItem, UserProfile } from '../types/cs2';

export const ACCOUNTS_REGISTRY_KEY = '@cs2_verified_accounts_v2';

export interface StoredAccountRecord {
  profile: UserProfile;
  balance: number;
  inventory: InventoryItem[];
  quests?: QuestItem[];
  eloRating: number;
  streakDay: number;
  lastClaimDate: string;
  updatedAt: number;
}

interface AuthScreenProps {
  onLoginSuccess: (
    profile: UserProfile,
    restoredData?: Omit<StoredAccountRecord, 'profile'>
  ) => void;
}

export const simpleHash = (str: string): string => {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).toUpperCase().padStart(8, '0');
};

export const encodeCloudSyncToken = (record: StoredAccountRecord): string => {
  try {
    const compact = {
      p: record.profile,
      b: record.balance,
      e: record.eloRating,
      s: record.streakDay,
      i: record.inventory.slice(0, 60),
    };
    return `CS2SYNC-${encodeURIComponent(JSON.stringify(compact))}`;
  } catch {
    return '';
  }
};

export const decodeCloudSyncToken = (token: string): StoredAccountRecord | null => {
  try {
    const clean = token.trim();
    if (!clean.startsWith('CS2SYNC-')) return null;
    const rawJson = decodeURIComponent(clean.slice('CS2SYNC-'.length));
    const parsed = JSON.parse(rawJson);
    if (!parsed || !parsed.p || !parsed.p.email) return null;
    return {
      profile: parsed.p,
      balance: typeof parsed.b === 'number' ? parsed.b : 25,
      eloRating: typeof parsed.e === 'number' ? parsed.e : 1000,
      streakDay: typeof parsed.s === 'number' ? parsed.s : 1,
      lastClaimDate: '',
      inventory: Array.isArray(parsed.i) ? parsed.i : [],
      updatedAt: Date.now(),
    };
  } catch {
    return null;
  }
};

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
  const [authMode, setAuthMode] = useState<'register' | 'login' | 'sync'>('register');
  const [selectedProvider] = useState<AuthProviderType>('google');
  const [nickname, setNickname] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [password, setPassword] = useState('');

  const [verificationStep, setVerificationStep] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [pendingProfile, setPendingProfile] = useState<UserProfile | null>(null);
  const [syncTokenInput, setSyncTokenInput] = useState('');

  const [banner, setBanner] = useState<{
    title: string;
    msg: string;
    type: 'error' | 'info';
  } | null>(null);

  const normalizeEmail = (raw: string): string => {
    const trimmed = raw.trim().toLowerCase();
    if (!trimmed) return '';
    return trimmed.includes('@') ? trimmed : `${trimmed}@gmail.com`;
  };

  const loadAccountsRegistry = async (): Promise<Record<string, StoredAccountRecord>> => {
    try {
      const raw = await AsyncStorage.getItem(ACCOUNTS_REGISTRY_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  };

  const handleQuickOneClickStart = async () => {
    const guestEmail = 'player@cs2drop.local';
    const registry = await loadAccountsRegistry();
    if (registry[guestEmail]) {
      const existing = registry[guestEmail];
      onLoginSuccess(existing.profile, {
        balance: existing.balance,
        inventory: existing.inventory,
        quests: existing.quests,
        eloRating: existing.eloRating,
        streakDay: existing.streakDay,
        lastClaimDate: existing.lastClaimDate,
        updatedAt: existing.updatedAt,
      });
      return;
    }

    const profile: UserProfile = {
      email: guestEmail,
      nickname: nickname.trim() || 'CS2_Player',
      provider: 'google',
      avatarColor: '#16A34A',
      createdAt: Date.now(),
      passwordHash: simpleHash('1234'),
      syncCode: `CS2-${simpleHash(guestEmail)}`,
      verified: true,
    };
    const rec: StoredAccountRecord = {
      profile,
      balance: 25.0,
      inventory: [],
      eloRating: 1000,
      streakDay: 1,
      lastClaimDate: '',
      updatedAt: Date.now(),
    };
    registry[guestEmail] = rec;
    await AsyncStorage.setItem(ACCOUNTS_REGISTRY_KEY, JSON.stringify(registry));
    onLoginSuccess(profile, rec);
  };

  const handleStartRegistration = async () => {
    const cleanNick = nickname.trim() || 'CS2_Player';
    const fullEmail = normalizeEmail(emailInput);

    if (fullEmail.length < 6) {
      setBanner({
        title: 'Укажите почту',
        msg: 'Введите логин или почту (минимум 3 символа).',
        type: 'error',
      });
      return;
    }

    if (password.trim().length < 4) {
      setBanner({
        title: 'Короткий пароль',
        msg: 'Пароль должен содержать минимум 4 символа.',
        type: 'error',
      });
      return;
    }

    const registry = await loadAccountsRegistry();
    if (registry[fullEmail]) {
      setBanner({
        title: 'Аккаунт уже существует',
        msg: 'Эта почта уже зарегистрирована. Переключитесь на вкладку «Вход».',
        type: 'error',
      });
      setAuthMode('login');
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setEnteredCode(code); // Pre-fill for convenience
    setPendingProfile({
      email: fullEmail,
      nickname: cleanNick,
      provider: selectedProvider,
      avatarColor: '#16A34A',
      createdAt: Date.now(),
      passwordHash: simpleHash(password.trim()),
      syncCode: `CS2-${simpleHash(fullEmail + Date.now())}`,
      verified: true,
    });
    setVerificationStep(true);
    setBanner(null);
  };

  const handleConfirmVerificationCode = async () => {
    if (!pendingProfile) return;
    if (enteredCode.trim() !== generatedCode) {
      setBanner({
        title: 'Неверный код',
        msg: `Введите код ${generatedCode}`,
        type: 'error',
      });
      return;
    }

    const registry = await loadAccountsRegistry();
    const initialRecord: StoredAccountRecord = {
      profile: pendingProfile,
      balance: 25.0,
      inventory: [],
      eloRating: 1000,
      streakDay: 1,
      lastClaimDate: '',
      updatedAt: Date.now(),
    };
    registry[pendingProfile.email] = initialRecord;
    await AsyncStorage.setItem(ACCOUNTS_REGISTRY_KEY, JSON.stringify(registry));
    onLoginSuccess(pendingProfile, initialRecord);
  };

  const handleLoginExisting = async () => {
    const fullEmail = normalizeEmail(emailInput);
    const registry = await loadAccountsRegistry();
    const existing = registry[fullEmail];
    if (!existing) {
      setBanner({
        title: 'Аккаунт не найден',
        msg: 'Зарегистрируйте эту почту или перенесите аккаунт по коду.',
        type: 'error',
      });
      return;
    }

    if (existing.profile.passwordHash !== simpleHash(password.trim())) {
      setBanner({
        title: 'Неверный пароль',
        msg: 'Проверьте введённый пароль.',
        type: 'error',
      });
      return;
    }

    onLoginSuccess(existing.profile, existing);
  };

  const handleImportSyncCode = async () => {
    const decoded = decodeCloudSyncToken(syncTokenInput);
    if (!decoded) {
      setBanner({
        title: 'Неверный код',
        msg: 'Код должен начинаться с CS2SYNC-',
        type: 'error',
      });
      return;
    }
    const registry = await loadAccountsRegistry();
    registry[decoded.profile.email.toLowerCase()] = decoded;
    await AsyncStorage.setItem(ACCOUNTS_REGISTRY_KEY, JSON.stringify(registry));
    onLoginSuccess(decoded.profile, decoded);
  };

  return (
    <ScrollView contentContainerStyle={styles.root} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
        <Text style={styles.title}>CS2 Case Simulator</Text>
        <Text style={styles.subtitle}>
          Сохранение инвентаря и перенос прогресса между устройствами
        </Text>

        {banner && (
          <View style={styles.bannerBox}>
            <Ionicons name="alert-circle" size={18} color="#EF4444" />
            <View style={{ flex: 1 }}>
              <Text style={styles.bannerTitle}>{banner.title}</Text>
              <Text style={styles.bannerMsg}>{banner.msg}</Text>
            </View>
          </View>
        )}

        {/* Mode Switcher */}
        <View style={styles.tabsRow}>
          {[
            { id: 'register', label: 'Регистрация' },
            { id: 'login', label: 'Вход' },
            { id: 'sync', label: 'Код переноса' },
          ].map((tab) => {
            const active = authMode === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => {
                  setAuthMode(tab.id as any);
                  setVerificationStep(false);
                  setBanner(null);
                }}
                style={[styles.tabBtn, active && styles.tabBtnActive]}
              >
                <Text style={[styles.tabText, active && styles.tabTextActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {authMode === 'sync' ? (
          <View>
            <Text style={styles.label}>Код синхронизации (CS2SYNC-...)</Text>
            <TextInput
              placeholder="Вставьте код из настроек..."
              placeholderTextColor="#6B7280"
              value={syncTokenInput}
              onChangeText={setSyncTokenInput}
              multiline
              style={[styles.input, { minHeight: 76 }]}
            />
            <TouchableOpacity style={styles.primaryBtn} onPress={handleImportSyncCode}>
              <Text style={styles.primaryBtnText}>Загрузить аккаунт</Text>
            </TouchableOpacity>
          </View>
        ) : verificationStep ? (
          <View>
            <View style={styles.codeBox}>
              <Text style={styles.codeBoxLabel}>Код подтверждения для {pendingProfile?.email}:</Text>
              <Text style={styles.codeBoxDigits}>{generatedCode}</Text>
            </View>
            <TextInput
              value={enteredCode}
              onChangeText={setEnteredCode}
              keyboardType="number-pad"
              maxLength={6}
              style={[styles.input, { textAlign: 'center', fontSize: 18, letterSpacing: 4 }]}
            />
            <TouchableOpacity style={styles.primaryBtn} onPress={handleConfirmVerificationCode}>
              <Text style={styles.primaryBtnText}>Подтвердить и войти</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            {authMode === 'register' && (
              <>
                <Text style={styles.label}>Никнейм</Text>
                <TextInput
                  placeholder="Например: s1mple"
                  placeholderTextColor="#6B7280"
                  value={nickname}
                  onChangeText={setNickname}
                  style={styles.input}
                />
              </>
            )}

            <Text style={styles.label}>Почта</Text>
            <TextInput
              placeholder="Логин или email (@gmail.com)"
              placeholderTextColor="#6B7280"
              value={emailInput}
              onChangeText={setEmailInput}
              autoCapitalize="none"
              style={styles.input}
            />

            <Text style={styles.label}>Пароль (от 4 символов)</Text>
            <TextInput
              placeholder="••••••"
              placeholderTextColor="#6B7280"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={authMode === 'register' ? handleStartRegistration : handleLoginExisting}
            >
              <Text style={styles.primaryBtnText}>
                {authMode === 'register' ? 'Создать аккаунт ($25.00)' : 'Войти в аккаунт'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickGuestBtn} onPress={handleQuickOneClickStart}>
              <Text style={styles.quickGuestBtnText}>Быстрый вход в 1 клик →</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#1E212B',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 20,
  },
  logo: {
    width: 68,
    height: 68,
    borderRadius: 16,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    color: '#F3F4F6',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  bannerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  bannerTitle: {
    color: '#F9FAFB',
    fontSize: 12,
    fontWeight: '700',
  },
  bannerMsg: {
    color: '#9CA3AF',
    fontSize: 11,
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: '#14161B',
    borderRadius: 10,
    padding: 3,
    marginBottom: 14,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabBtnActive: {
    backgroundColor: '#252936',
  },
  tabText: {
    color: '#9CA3AF',
    fontSize: 11,
    fontWeight: '700',
  },
  tabTextActive: {
    color: '#F3F4F6',
  },
  label: {
    color: '#9CA3AF',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#14161B',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#F3F4F6',
    fontSize: 14,
    marginBottom: 12,
  },
  primaryBtn: {
    backgroundColor: '#16A34A',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 4,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
  quickGuestBtn: {
    marginTop: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  quickGuestBtnText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '700',
  },
  codeBox: {
    backgroundColor: '#14161B',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  codeBoxLabel: {
    color: '#9CA3AF',
    fontSize: 11,
  },
  codeBoxDigits: {
    color: '#EAB308',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 4,
    marginTop: 4,
  },
});
