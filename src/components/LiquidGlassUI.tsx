import React, { memo, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { InventoryItem, RARITIES, RarityKey, SkinTemplate, ThemeMode } from '../types/cs2';

export interface ThemePalette {
  id: ThemeMode;
  name: string;
  subtitle: string;
  bgGradient: [string, string, string];
  headerBg: string;
  cardBg: string;
  skinCardBg: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentSecondary: string;
  tabBarBg: string;
  surfaceBg: string;
  isLight: boolean;
}

// Clean Minimalist CS2 Panorama Palettes — NO neon glows or harsh borders
export const THEMES: Record<ThemeMode, ThemePalette> = {
  obsidian: {
    id: 'obsidian',
    name: 'CS2 Panorama Dark (Тёмная матовая)',
    subtitle: 'Фирменный спокойный графитовый стиль оригинальной CS2 без неона',
    bgGradient: ['#14161B', '#14161B', '#14161B'],
    headerBg: '#1B1E26',
    cardBg: '#1E212B',
    skinCardBg: '#222631',
    cardBorder: 'rgba(255, 255, 255, 0.07)',
    textPrimary: '#F3F4F6',
    textSecondary: '#9CA3AF',
    textMuted: '#6B7280',
    accent: '#16A34A',
    accentSecondary: '#EAB308',
    tabBarBg: '#181B22',
    surfaceBg: '#252936',
    isLight: false,
  },
  bright: {
    id: 'bright',
    name: 'CS2 Clean Light (Светлый минимализм)',
    subtitle: 'Чистый светлый интерфейс с белыми матовыми карточками',
    bgGradient: ['#F3F4F6', '#F3F4F6', '#F3F4F6'],
    headerBg: '#FFFFFF',
    cardBg: '#FFFFFF',
    skinCardBg: '#FFFFFF',
    cardBorder: '#E5E7EB',
    textPrimary: '#111827',
    textSecondary: '#4B5563',
    textMuted: '#9CA3AF',
    accent: '#16A34A',
    accentSecondary: '#D97706',
    tabBarBg: '#FFFFFF',
    surfaceBg: '#F9FAFB',
    isLight: true,
  },
  cyber_blue: {
    id: 'cyber_blue',
    name: 'CS2 Tactical Slate (Спокойный стальной)',
    subtitle: 'Матовый тёмно-стальной оттенок инвентаря Steam',
    bgGradient: ['#171B24', '#171B24', '#171B24'],
    headerBg: '#1E2430',
    cardBg: '#212736',
    skinCardBg: '#252C3D',
    cardBorder: 'rgba(255, 255, 255, 0.08)',
    textPrimary: '#F9FAFB',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    accent: '#3B82F6',
    accentSecondary: '#F59E0B',
    tabBarBg: '#1B202C',
    surfaceBg: '#2A3245',
    isLight: false,
  },
};

export interface InGameNotification {
  id: string;
  title: string;
  message: string;
  type: 'error' | 'warning' | 'success' | 'info' | 'reward';
}

export const GameNotificationBanner: React.FC<{
  notification: InGameNotification | null;
  onDismiss: () => void;
}> = memo(({ notification, onDismiss }) => {
  if (!notification) return null;

  const palette = {
    error: {
      accent: '#EF4444',
      icon: 'alert-circle' as const,
    },
    warning: {
      accent: '#F59E0B',
      icon: 'warning' as const,
    },
    success: {
      accent: '#10B981',
      icon: 'checkmark-circle' as const,
    },
    reward: {
      accent: '#EAB308',
      icon: 'trophy' as const,
    },
    info: {
      accent: '#3B82F6',
      icon: 'information-circle' as const,
    },
  }[notification.type];

  return (
    <View style={styles.toastOuter} pointerEvents="box-none">
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={onDismiss}
        style={[styles.toastCard, { borderLeftColor: palette.accent }]}
      >
        <Ionicons name={palette.icon} size={22} color={palette.accent} />
        <View style={{ flex: 1 }}>
          <Text style={styles.toastTitle}>{notification.title}</Text>
          <Text style={styles.toastMsg}>{notification.message}</Text>
        </View>
        <Ionicons name="close" size={18} color="#9CA3AF" />
      </TouchableOpacity>
    </View>
  );
});

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  glowColor?: string;
  themeMode?: ThemeMode;
}

// Minimalist matte container — ignores neon glowColor for a clean look
export const LiquidGlassCard: React.FC<GlassCardProps> = memo(
  ({ children, style, themeMode = 'obsidian' }) => {
    const theme = THEMES[themeMode] || THEMES.obsidian;
    return (
      <View
        style={[
          styles.cardWrapper,
          {
            backgroundColor: theme.cardBg,
            borderColor: theme.cardBorder,
          },
          style,
        ]}
      >
        {children}
      </View>
    );
  }
);

interface SkinCardProps {
  item: InventoryItem | SkinTemplate;
  onPress?: () => void;
  selected?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  compact?: boolean;
  themeMode?: ThemeMode;
}

export const SkinCard: React.FC<SkinCardProps> = memo(
  ({ item, onPress, selected, actionLabel, onAction, compact, themeMode = 'obsidian' }) => {
    const [imgError, setImgError] = useState(false);
    const rarityInfo = RARITIES[item.rarity as RarityKey] || RARITIES.milspec;
    const isInstance = 'instanceId' in item;
    const price = isInstance ? item.price : item.basePrice;
    const theme = THEMES[themeMode] || THEMES.obsidian;

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={[
          styles.skinCard,
          compact && styles.skinCardCompact,
          {
            backgroundColor: theme.skinCardBg,
            borderColor: selected ? '#16A34A' : theme.cardBorder,
          },
          selected && styles.selectedBorder,
        ]}
      >
        {/* Top Row: Wear / StatTrak & Clean Price */}
        <View style={styles.badgeRow}>
          <View style={styles.badgesLeft}>
            {isInstance && !item.isSticker ? (
              <Text style={[styles.wearText, { color: theme.textSecondary }]}>
                {item.wear}
              </Text>
            ) : (
              <View style={[styles.rarityDot, { backgroundColor: rarityInfo.color }]} />
            )}
            {isInstance && item.statTrak && (
              <Text style={styles.stText}>ST™</Text>
            )}
            {isInstance && item.souvenir && (
              <Text style={styles.souvText}>SV</Text>
            )}
          </View>

          <Text style={styles.priceTag}>${price.toFixed(2)}</Text>
        </View>

        {/* Weapon Image */}
        <View style={[styles.imageContainer, compact && { height: 68 }]}>
          {!imgError && item.image ? (
            <Image
              source={{ uri: item.image }}
              style={compact ? styles.skinImgCompact : styles.skinImg}
              resizeMode="contain"
              onError={() => setImgError(true)}
            />
          ) : (
            <View style={styles.fallbackIcon}>
              <MaterialCommunityIcons
                name={item.rarity === 'gold' ? 'knife-military' : 'pistol'}
                size={24}
                color={rarityInfo.color}
              />
            </View>
          )}

          {isInstance && item.stickers && item.stickers.length > 0 && (
            <View style={styles.miniStickerRow}>
              {item.stickers.slice(0, 4).map((st, idx) => (
                <Image
                  key={idx}
                  source={{ uri: st.image }}
                  style={styles.miniStickerImg}
                  resizeMode="contain"
                />
              ))}
            </View>
          )}
        </View>

        {/* Weapon & Skin Name */}
        <View style={styles.infoBottom}>
          <Text numberOfLines={1} style={[styles.weaponText, { color: theme.textSecondary }]}>
            {item.weapon}
          </Text>
          <Text numberOfLines={1} style={[styles.skinNameText, { color: theme.textPrimary }]}>
            {item.name}
          </Text>
        </View>

        {/* Authentic CS2 3px Bottom Rarity Line */}
        <View style={[styles.rarityBar, { backgroundColor: rarityInfo.color }]} />

        {actionLabel && onAction && (
          <TouchableOpacity
            style={[
              styles.sellBtn,
              {
                backgroundColor: theme.isLight ? '#F3F4F6' : 'rgba(255,255,255,0.06)',
              },
            ]}
            onPress={onAction}
          >
            <Text style={[styles.sellBtnText, { color: theme.textPrimary }]}>
              {actionLabel}
            </Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  toastOuter: {
    position: 'absolute',
    top: 50,
    left: 14,
    right: 14,
    zIndex: 9999,
    alignItems: 'center',
  },
  toastCard: {
    width: '100%',
    maxWidth: 440,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E212B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderLeftWidth: 4,
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  toastTitle: {
    color: '#F9FAFB',
    fontSize: 13,
    fontWeight: '700',
  },
  toastMsg: {
    color: '#9CA3AF',
    fontSize: 11,
    marginTop: 2,
    lineHeight: 15,
  },
  cardWrapper: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  skinCard: {
    width: '48.4%',
    borderRadius: 12,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  skinCardCompact: {
    width: 132,
    marginRight: 8,
    padding: 8,
    marginBottom: 4,
  },
  selectedBorder: {
    borderWidth: 2,
    borderColor: '#16A34A',
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badgesLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  rarityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  wearText: {
    fontSize: 10,
    fontWeight: '700',
  },
  stText: {
    color: '#F97316',
    fontSize: 10,
    fontWeight: '800',
  },
  souvText: {
    color: '#EAB308',
    fontSize: 10,
    fontWeight: '800',
  },
  priceTag: {
    color: '#16A34A',
    fontWeight: '800',
    fontSize: 11,
  },
  imageContainer: {
    height: 84,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
    position: 'relative',
  },
  skinImg: {
    width: '92%',
    height: 78,
  },
  skinImgCompact: {
    width: 108,
    height: 62,
  },
  miniStickerRow: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    gap: 2,
  },
  miniStickerImg: {
    width: 16,
    height: 16,
  },
  fallbackIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  infoBottom: {
    marginTop: 2,
  },
  weaponText: {
    fontSize: 10,
    fontWeight: '600',
  },
  skinNameText: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 1,
  },
  rarityBar: {
    height: 3,
    borderRadius: 1.5,
    marginTop: 8,
  },
  sellBtn: {
    marginTop: 8,
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
  },
  sellBtnText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
