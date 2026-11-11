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
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AuthProviderType, InventoryItem, QuestItem, UserProfile } from '../types/cs2';
import { LiquidGlassCard } from './LiquidGlassUI';

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

const PROVIDERS: {
  key: AuthProviderType;
  label: string;
  domain: string;
  color: string;
  badge: string;
}[] = [
  { key: 'google', label: 'Google', domain: '@gmail.com', color: '#EA4335', badge: 'G' },
  { key: 'yandex', label: 'Яндекс', domain: '@yandex.ru', color: '#FC3F1D', badge: 'Я' },
  { key: 'mailru', label: 'Mail.ru', domain: '@mail.ru', color: '#005FF9', badge: '@' },
];

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
    const json = encodeURIComponent(JSON.stringify(compact));
    return `CS2SYNC-${json}`;
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
  const [selectedProvider, setSelectedProvider] = useState<AuthProviderType>('google');
  const [nickname, setNickname] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [password, setPassword] = useState('');

  // Email verification step
  const [verificationStep, setVerificationStep] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [pendingProfile, setPendingProfile] = useState<UserProfile | null>(null);

  // Sync token import
  const [syncTokenInput, setSyncTokenInput] = useState('');

  // Custom in-app auth banner (no system alerts!)
  const [banner, setBanner] = useState<{
    title: string;
    msg: string;
    type: 'error' | 'success' | 'info';
  } | null>(null);

  const currentProvider = PROVIDERS.find((p) => p.key === selectedProvider) || PROVIDERS[0];

  const normalizeEmail = (raw: string): string => {
    const trimmed = raw.trim().toLowerCase();
    if (!trimmed) return '';
    if (trimmed.includes('@')) return trimmed;
    return `${trimmed}${currentProvider.domain}`;
  };

  const loadAccountsRegistry = async (): Promise<Record<string, StoredAccountRecord>> => {
    try {
      const raw = await AsyncStorage.getItem(ACCOUNTS_REGISTRY_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  };

  const handleStartRegistration = async () => {
    const cleanNick = nickname.trim();
    const fullEmail = normalizeEmail(emailInput);

    if (cleanNick.length < 3) {
      setBanner({
        title: 'Укажите никнейм',
        msg: 'Никнейм игрока должен содержать минимум 3 символа.',
        type: 'error',
      });
      return;
    }

    const emailRegex = /^[a-z0-9._%+-]{3,}@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailRegex.test(fullEmail)) {
      setBanner({
        title: 'Некорректная почта',
        msg: 'Введите настоящую почту (минимум 3 символа до @). Вход под случайной почтой без проверки запрещён.',
        type: 'error',
      });
      return;
    }

    if (password.trim().length < 4) {
      setBanner({
        title: 'Слишком короткий пароль',
        msg: 'Придумайте пароль от 4 символов для защиты аккаунта от чужого входа.',
        type: 'error',
      });
      return;
    }

    const registry = await loadAccountsRegistry();
    if (registry[fullEmail]) {
      setBanner({
        title: 'Эта почта уже зарегистрирована!',
        msg: `Аккаунт ${fullEmail} уже существует и защищён паролем. Переключитесь на вкладку «Вход» и введите свой пароль.`,
        type: 'error',
      });
      setAuthMode('login');
      return;
    }

    // Generate 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const syncCode = `CS2-${simpleHash(fullEmail + Date.now())}`;

    setGeneratedCode(code);
    setEnteredCode('');
    setPendingProfile({
      email: fullEmail,
      nickname: cleanNick,
      provider: selectedProvider,
      avatarColor: currentProvider.color,
      createdAt: Date.now(),
      passwordHash: simpleHash(password.trim()),
      syncCode,
      verified: true,
    });
    setVerificationStep(true);
    setBanner({
      title: 'Код подтверждения отправлен!',
      msg: `Письмо от CS2 Drop Guard доставлено для ${fullEmail}. Введите 6-значный код ниже.`,
      type: 'info',
    });
  };

  const handleConfirmVerificationCode = async () => {
    if (!pendingProfile) return;
    if (enteredCode.trim() !== generatedCode) {
      setBanner({
        title: 'Неверный код подтверждения',
        msg: 'Проверьте 6-значный код из уведомления CS2 Drop Guard выше.',
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

    onLoginSuccess(pendingProfile, {
      balance: 25.0,
      inventory: [],
      eloRating: 1000,
      streakDay: 1,
      lastClaimDate: '',
      updatedAt: Date.now(),
    });
  };

  const handleLoginExisting = async () => {
    const fullEmail = normalizeEmail(emailInput);
    if (!fullEmail || password.trim().length < 1) {
      setBanner({
        title: 'Заполните почту и пароль',
        msg: 'Для входа в существующий аккаунт укажите почту и пароль.',
        type: 'error',
      });
      return;
    }

    const registry = await loadAccountsRegistry();
    const existing = registry[fullEmail];
    if (!existing) {
      setBanner({
        title: 'Аккаунт не найден на этом устройстве',
        msg: 'Эта почта ещё не зарегистрирована здесь. Создайте аккаунт или используйте вкладку «Синхронизация» для переноса с другого телефона!',
        type: 'error',
      });
      return;
    }

    const inputHash = simpleHash(password.trim());
    if (existing.profile.passwordHash !== inputHash) {
      setBanner({
        title: 'Неверный пароль!',
        msg: 'Доступ запрещён: пароль не подходит к аккаунту ' + fullEmail,
        type: 'error',
      });
      return;
    }

    onLoginSuccess(existing.profile, {
      balance: existing.balance,
      inventory: existing.inventory,
      quests: existing.quests,
      eloRating: existing.eloRating,
      streakDay: existing.streakDay,
      lastClaimDate: existing.lastClaimDate,
      updatedAt: existing.updatedAt,
    });
  };

  const handleImportSyncCode = async () => {
    const decoded = decodeCloudSyncToken(syncTokenInput);
    if (!decoded) {
      setBanner({
        title: 'Недействительный код синхронизации',
        msg: 'Скопируйте полный код CS2SYNC-... из вкладки «Настройки» на вашем первом устройстве.',
        type: 'error',
      });
      return;
    }

    const registry = await loadAccountsRegistry();
    registry[decoded.profile.email.toLowerCase()] = decoded;
    await AsyncStorage.setItem(ACCOUNTS_REGISTRY_KEY, JSON.stringify(registry));

    onLoginSuccess(decoded.profile, {
      balance: decoded.balance,
      inventory: decoded.inventory,
      quests: decoded.quests,
      eloRating: decoded.eloRating,
      streakDay: decoded.streakDay,
      lastClaimDate: decoded.lastClaimDate,
      updatedAt: decoded.updatedAt,
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.root}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={['#E0F2FE', '#BAE6FD', '#DBEAFE']}
        style={StyleSheet.absoluteFillObject}
      />

      <LiquidGlassCard
        themeMode="bright"
        glowColor="rgba(2, 132, 199, 0.45)"
        style={styles.card}
      >
        <Image
          source={require('../../assets/icon.png')}
          style={styles.appLogo}
        />
        <Text style={styles.badgeTop}>CS2 CASE SIMULATOR 2.0 • ЗАЩИТА АККАУНТА</Text>
        <Text style={styles.title}>АВТОРИЗАЦИЯ CS2 DROP</Text>
        <Text style={styles.subtitle}>
          Защита от дубликатов, подтверждение почты по коду и кросс-девайс синхронизация прогресса. Стартовый баланс:{' '}
          <Text style={{ color: '#059669', fontWeight: '900' }}>$25.00</Text>
        </Text>

        {/* Custom In-Game Notification Banner */}
        {banner && (
          <View
            style={[
              styles.authBanner,
              banner.type === 'error' && styles.authBannerError,
              banner.type === 'info' && styles.authBannerInfo,
            ]}
          >
            <Ionicons
              name={banner.type === 'error' ? 'alert-circle' : 'mail-unread'}
              size={20}
              color={banner.type === 'error' ? '#EF4444' : '#0284C7'}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.authBannerTitle}>{banner.title}</Text>
              <Text style={styles.authBannerMsg}>{banner.msg}</Text>
            </View>
          </View>
        )}

        {/* Mode Switcher */}
        <View style={styles.modeTabs}>
          {[
            { id: 'register', label: 'Регистрация' },
            { id: 'login', label: 'Вход' },
            { id: 'sync', label: 'Синхронизация' },
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
                style={[styles.modeTabBtn, active && styles.modeTabBtnActive]}
              >
                <Text style={[styles.modeTabText, active && styles.modeTabTextActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {authMode === 'sync' ? (
          <View>
            <Text style={styles.fieldLabel}>
              Код облачного переноса аккаунта (с другого устройства):
            </Text>
            <TextInput
              placeholder="Вставьте код CS2SYNC-..."
              placeholderTextColor="#64748B"
              value={syncTokenInput}
              onChangeText={setSyncTokenInput}
              multiline
              style={[styles.input, { minHeight: 84, textAlignVertical: 'top' }]}
            />
            <TouchableOpacity style={styles.submitBtn} onPress={handleImportSyncCode}>
              <Ionicons name="cloud-download-outline" size={18} color="#FFFFFF" />
              <Text style={styles.submitBtnText}>ВОССТАНОВИТЬ ПРОГРЕСС И СКИНЫ</Text>
            </TouchableOpacity>
          </View>
        ) : verificationStep ? (
          <View>
            {/* Simulated Email Inbox Verification Card */}
            <View style={styles.emailCodeCard}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Ionicons name="shield-checkmark" size={22} color="#0284C7" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.emailCodeHeader}>
                    ВХОДЯЩЕЕ ПИСЬМО • CS2 DROP GUARD
                  </Text>
                  <Text style={styles.emailCodeTo}>
                    Кому: {pendingProfile?.email}
                  </Text>
                </View>
              </View>
              <Text style={styles.emailCodeHint}>
                Ваш одноразовый 6-значный код подтверждения почты:
              </Text>
              <View style={styles.codeDigitsBox}>
                <Text style={styles.codeDigitsText}>{generatedCode}</Text>
              </View>
            </View>

            <Text style={styles.fieldLabel}>Введите 6-значный код подтверждения:</Text>
            <TextInput
              placeholder="Например: 123456"
              placeholderTextColor="#64748B"
              value={enteredCode}
              onChangeText={setEnteredCode}
              keyboardType="number-pad"
              maxLength={6}
              style={[styles.input, { fontSize: 18, letterSpacing: 4, textAlign: 'center' }]}
            />

            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleConfirmVerificationCode}
            >
              <Ionicons name="checkmark-done-circle" size={18} color="#FFFFFF" />
              <Text style={styles.submitBtnText}>ПОДТВЕРДИТЬ ПОЧТУ И ВОЙТИ</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBackBtn}
              onPress={() => setVerificationStep(false)}
            >
              <Text style={styles.secondaryBackText}>← Изменить почту или пароль</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
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
                      active && {
                        borderColor: p.color,
                        backgroundColor: `${p.color}18`,
                      },
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

            {authMode === 'register' && (
              <>
                <Text style={styles.fieldLabel}>Ваш никнейм в игре (от 3 символов)</Text>
                <TextInput
                  placeholder="Например: s1mple_boss"
                  placeholderTextColor="#64748B"
                  value={nickname}
                  onChangeText={setNickname}
                  style={styles.input}
                />
              </>
            )}

            <Text style={styles.fieldLabel}>
              Почта ({currentProvider.domain})
            </Text>
            <TextInput
              placeholder={`Логин или адрес (${currentProvider.domain})`}
              placeholderTextColor="#64748B"
              value={emailInput}
              onChangeText={setEmailInput}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
            />

            <Text style={styles.fieldLabel}>Пароль защиты аккаунта (от 4 символов)</Text>
            <TextInput
              placeholder="Введите пароль"
              placeholderTextColor="#64748B"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />

            {authMode === 'register' ? (
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={handleStartRegistration}
              >
                <Ionicons name="shield-checkmark-outline" size={18} color="#FFFFFF" />
                <Text style={styles.submitBtnText}>
                  ПОЛУЧИТЬ КОД ПОДТВЕРЖДЕНИЯ
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.submitBtn, { backgroundColor: '#0284C7' }]}
                onPress={handleLoginExisting}
              >
                <Ionicons name="log-in-outline" size={18} color="#FFFFFF" />
                <Text style={styles.submitBtnText}>ВОЙТИ В ЗАЩИЩЁННЫЙ АККАУНТ</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </LiquidGlassCard>
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
    padding: 20,
  },
  appLogo: {
    width: 78,
    height: 78,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 8,
  },
  badgeTop: {
    color: '#0284C7',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.1,
    textAlign: 'center',
  },
  title: {
    color: '#0F172A',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 4,
  },
  subtitle: {
    color: '#334155',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 14,
    lineHeight: 17,
  },
  authBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1.2,
    marginBottom: 12,
  },
  authBannerError: {
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderColor: '#EF4444',
  },
  authBannerInfo: {
    backgroundColor: 'rgba(2, 132, 199, 0.12)',
    borderColor: '#0284C7',
  },
  authBannerTitle: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '900',
  },
  authBannerMsg: {
    color: '#334155',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  modeTabs: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
    borderRadius: 12,
    padding: 4,
    marginBottom: 14,
  },
  modeTabBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 9,
    alignItems: 'center',
  },
  modeTabBtnActive: {
    backgroundColor: '#0284C7',
  },
  modeTabText: {
    color: '#475569',
    fontSize: 11,
    fontWeight: '800',
  },
  modeTabTextActive: {
    color: '#FFFFFF',
  },
  providerList: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  providerBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1.4,
    borderColor: 'rgba(15, 23, 42, 0.12)',
    backgroundColor: '#FFFFFF',
  },
  providerIcon: {
    width: 22,
    height: 22,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  providerIconText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 12,
  },
  providerLabel: {
    color: '#0F172A',
    fontWeight: '800',
    fontSize: 12,
  },
  fieldLabel: {
    color: '#1E293B',
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: 'rgba(2, 132, 199, 0.35)',
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 10,
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
  },
  submitBtn: {
    backgroundColor: '#10B981',
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 13,
  },
  emailCodeCard: {
    backgroundColor: 'rgba(2, 132, 199, 0.1)',
    borderWidth: 1.5,
    borderColor: '#0284C7',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },
  emailCodeHeader: {
    color: '#0284C7',
    fontSize: 10,
    fontWeight: '900',
  },
  emailCodeTo: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '800',
  },
  emailCodeHint: {
    color: '#334155',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 8,
  },
  codeDigitsBox: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  codeDigitsText: {
    color: '#FACC15',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 6,
  },
  secondaryBackBtn: {
    marginTop: 12,
    alignItems: 'center',
    paddingVertical: 6,
  },
  secondaryBackText: {
    color: '#0284C7',
    fontSize: 12,
    fontWeight: '800',
  },
});
