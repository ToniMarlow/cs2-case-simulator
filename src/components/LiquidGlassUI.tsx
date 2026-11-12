import React, { memo, useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { InventoryItem, RARITIES, RarityKey, SkinTemplate, ThemeMode } from '../types/cs2';
import { playClickSound, playStickerApplySound, playStickerScrapeSound } from '../utils/soundManager';

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
            {isInstance && item.isLocked && (
              <Ionicons name="lock-closed" size={11} color="#EAB308" />
            )}
            {(item.rarity === 'gold' || item.weapon.includes('Knife') || item.weapon.includes('Bayonet') || item.weapon.includes('Karambit') || item.weapon.includes('Gloves')) && (
              <Text style={{ color: '#FFD700', fontSize: 10, fontWeight: '900' }}>★</Text>
            )}
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

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            {isInstance && item.marketTrend && (
              <Text
                style={[
                  styles.cardTrendPill,
                  { color: item.marketTrend.isUp ? '#22C55E' : '#EF4444' },
                ]}
              >
                {item.marketTrend.isUp ? '↗' : '↘'}
                {Math.abs(item.marketTrend.trendPct)}%
              </Text>
            )}
            <Text style={styles.priceTag}>${price.toFixed(2)}</Text>
          </View>
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

export interface InspectSkinModalProps {
  item: InventoryItem | null;
  visible: boolean;
  themeMode?: ThemeMode;
  availableStickers?: InventoryItem[];
  onClose: () => void;
  onToggleLock?: (instanceId: string) => void;
  onSell?: (item: InventoryItem) => void;
  onContract?: (item: InventoryItem) => void;
  onApplySticker?: (instanceId: string, sticker: InventoryItem, slot: number) => void;
  onScrapeSticker?: (instanceId: string, slot: number) => void;
  onRemoveSticker?: (instanceId: string, slot: number) => void;
}

export const InspectSkinModal: React.FC<InspectSkinModalProps> = memo(
  ({
    item,
    visible,
    themeMode = 'obsidian',
    availableStickers = [],
    onClose,
    onToggleLock,
    onSell,
    onContract,
    onApplySticker,
    onScrapeSticker,
    onRemoveSticker,
  }) => {
    if (!item) return null;
    const [stickerPickerOpen, setStickerPickerOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(0);

    const theme = THEMES[themeMode] || THEMES.obsidian;
    const rarity = RARITIES[item.rarity as RarityKey] || RARITIES.milspec;
    const isKnifeOrGlove =
      item.rarity === 'gold' ||
      item.weapon.includes('Knife') ||
      item.weapon.includes('Bayonet') ||
      item.weapon.includes('Karambit') ||
      item.weapon.includes('Gloves');

    const floatPct = Math.min(100, Math.max(0, item.floatValue * 100));

    return (
      <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
        <View style={styles.inspectOverlay}>
          <View
            style={[
              styles.inspectModalBox,
              {
                backgroundColor: theme.cardBg,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            {/* Header */}
            <View style={styles.inspectHeader}>
              <View style={{ flex: 1 }}>
                <View style={styles.inspectBadgeRow}>
                  <View style={[styles.rarityPill, { backgroundColor: rarity.color }]}>
                    <Text style={styles.rarityPillText}>
                      {isKnifeOrGlove ? '★ ' : ''}
                      {rarity.name}
                    </Text>
                  </View>
                  {item.statTrak && (
                    <View style={styles.stPill}>
                      <Text style={styles.stPillText}>StatTrak™</Text>
                    </View>
                  )}
                  {item.souvenir && (
                    <View style={styles.svPill}>
                      <Text style={styles.svPillText}>Сувенир</Text>
                    </View>
                  )}
                  {item.isLocked && (
                    <View style={styles.lockPill}>
                      <Ionicons name="lock-closed" size={11} color="#EAB308" />
                      <Text style={styles.lockPillText}>Замок</Text>
                    </View>
                  )}
                </View>
                <Text style={[styles.inspectWeaponTitle, { color: theme.textSecondary }]}>
                  {item.weapon}
                </Text>
                <Text style={[styles.inspectSkinTitle, { color: theme.textPrimary }]}>
                  {item.name}
                </Text>
              </View>

              <TouchableOpacity
                onPress={onClose}
                style={[styles.inspectCloseBtn, { backgroundColor: theme.surfaceBg }]}
              >
                <Ionicons name="close" size={20} color={theme.textPrimary} />
              </TouchableOpacity>
            </View>

            {/* Weapon Showcase */}
            <View style={styles.inspectStage}>
              <View
                style={[
                  styles.inspectGlowCircle,
                  { backgroundColor: rarity.glow || 'rgba(255,255,255,0.06)' },
                ]}
              />
              <Image source={{ uri: item.image }} style={styles.inspectLargeImg} resizeMode="contain" />
            </View>

            {/* Float & Condition Scale */}
            {!item.isSticker && (
              <View style={[styles.inspectSectionBox, { backgroundColor: theme.surfaceBg }]}>
                <View style={styles.inspectRowBetween}>
                  <Text style={[styles.inspectSectionLabel, { color: theme.textSecondary }]}>
                    Износ (Float Value)
                  </Text>
                  <Text style={[styles.inspectFloatNumber, { color: theme.textPrimary }]}>
                    {item.floatValue.toFixed(6)}
                  </Text>
                </View>

                {/* CS2 Colored Float Bar */}
                <View style={styles.floatBarWrap}>
                  <View style={styles.floatBarSegments}>
                    <View style={[styles.floatSeg, { flex: 7, backgroundColor: '#22C55E' }]} />
                    <View style={[styles.floatSeg, { flex: 8, backgroundColor: '#3B82F6' }]} />
                    <View style={[styles.floatSeg, { flex: 23, backgroundColor: '#EAB308' }]} />
                    <View style={[styles.floatSeg, { flex: 7, backgroundColor: '#F97316' }]} />
                    <View style={[styles.floatSeg, { flex: 55, backgroundColor: '#EF4444' }]} />
                  </View>
                  {/* Indicator Arrow */}
                  <View style={[styles.floatIndicator, { left: `${floatPct}%` }]}>
                    <View style={styles.floatPointerTriangle} />
                  </View>
                </View>

                <View style={styles.floatLabelsRow}>
                  <Text style={styles.floatTierLabel}>FN</Text>
                  <Text style={styles.floatTierLabel}>MW</Text>
                  <Text style={styles.floatTierLabel}>FT</Text>
                  <Text style={styles.floatTierLabel}>WW</Text>
                  <Text style={styles.floatTierLabel}>BS</Text>
                </View>

                <View style={styles.inspectMetaRow}>
                  <Text style={[styles.inspectMetaText, { color: theme.textPrimary }]}>
                    Состояние: <Text style={{ fontWeight: '700' }}>{item.wearName}</Text>
                  </Text>
                  <Text style={[styles.inspectMetaText, { color: theme.textSecondary }]}>
                    Шаблон (Pattern): <Text style={{ fontWeight: '700' }}>#{item.patternSeed || 1}</Text>
                  </Text>
                </View>
              </View>
            )}

            {/* Live Steam Market Trends (Feature 5) */}
            <View style={[styles.inspectSectionBox, { backgroundColor: theme.surfaceBg }]}>
              <View style={styles.inspectRowBetween}>
                <Text style={[styles.inspectSectionLabel, { color: theme.textSecondary }]}>
                  Торговая площадка Steam (24ч)
                </Text>
                <View style={styles.trendRow}>
                  <Text
                    style={[
                      styles.trendValText,
                      { color: item.marketTrend?.isUp ? '#22C55E' : '#EF4444' },
                    ]}
                  >
                    {item.marketTrend?.isUp ? '↗ +' : '↘ '}
                    {Math.abs(item.marketTrend?.trendPct || 0)}%
                  </Text>
                </View>
              </View>
              <Text style={[styles.trendHintText, { color: theme.textSecondary }]}>
                {item.marketTrend?.isUp
                  ? '🔥 Высокий спрос! Скин в активном восходящем тренде.'
                  : '📉 Небольшая коррекция цены на торговой площадке.'}
              </Text>
            </View>

            {/* Interactive Sticker Slots (Feature 1) */}
            {!item.isSticker && (
              <View style={[styles.inspectSectionBox, { backgroundColor: theme.surfaceBg }]}>
                <View style={styles.inspectRowBetween}>
                  <Text style={[styles.inspectSectionLabel, { color: theme.textSecondary }]}>
                    Наклейки на оружии ({item.stickers?.length || 0}/4)
                  </Text>
                  {availableStickers && availableStickers.length > 0 && (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedSlot(Math.min(3, item.stickers?.length || 0));
                        setStickerPickerOpen(true);
                      }}
                      style={styles.applyStickerBtnSmall}
                    >
                      <Text style={styles.applyStickerBtnSmallText}>+ Наклеить</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <View style={styles.stickerSlotsRow}>
                  {[0, 1, 2, 3].map((slotIdx) => {
                    const st = item.stickers && item.stickers[slotIdx];
                    if (st) {
                      return (
                        <View key={slotIdx} style={[styles.stickerSlotItem, { backgroundColor: theme.cardBg }]}>
                          <Image source={{ uri: st.image }} style={styles.stickerSlotImg} resizeMode="contain" />
                          <Text numberOfLines={1} style={[styles.stickerSlotTitle, { color: theme.textPrimary }]}>
                            {st.name.replace(' | Copenhagen 2024', '').replace(' | Paris 2023', '')}
                          </Text>
                          <View style={styles.stickerSlotActions}>
                            <TouchableOpacity
                              onPress={() => onScrapeSticker && onScrapeSticker(item.instanceId, slotIdx)}
                              style={styles.scrapeBtn}
                            >
                              <Text style={styles.scrapeBtnText}>Потереть</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => onRemoveSticker && onRemoveSticker(item.instanceId, slotIdx)}
                              style={styles.removeStickerBtn}
                            >
                              <Ionicons name="close" size={10} color="#EF4444" />
                            </TouchableOpacity>
                          </View>
                        </View>
                      );
                    }
                    return (
                      <TouchableOpacity
                        key={slotIdx}
                        onPress={() => {
                          if (availableStickers && availableStickers.length > 0) {
                            setSelectedSlot(slotIdx);
                            setStickerPickerOpen(true);
                          }
                        }}
                        style={[styles.stickerSlotEmpty, { borderColor: theme.cardBorder }]}
                      >
                        <Ionicons name="add" size={14} color={theme.textMuted} />
                        <Text style={[styles.stickerSlotEmptyText, { color: theme.textMuted }]}>
                          Слот {slotIdx + 1}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            {/* Sticker Picker Modal */}
            <Modal visible={stickerPickerOpen} transparent animationType="fade">
              <View style={styles.inspectOverlay}>
                <View
                  style={[
                    styles.stickerPickerBox,
                    { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
                  ]}
                >
                  <View style={styles.inspectHeader}>
                    <Text style={[styles.inspectSectionLabel, { color: theme.textPrimary, fontSize: 14 }]}>
                      Наклеить в Слот #{selectedSlot + 1}
                    </Text>
                    <TouchableOpacity onPress={() => setStickerPickerOpen(false)}>
                      <Ionicons name="close" size={20} color={theme.textPrimary} />
                    </TouchableOpacity>
                  </View>

                  <ScrollView style={{ maxHeight: 260, marginTop: 10 }}>
                    <View style={styles.stickerPickerGrid}>
                      {availableStickers && availableStickers.length > 0 ? (
                        availableStickers.map((st) => (
                          <TouchableOpacity
                            key={st.instanceId}
                            onPress={() => {
                              setStickerPickerOpen(false);
                              if (onApplySticker) {
                                onApplySticker(item.instanceId, st, selectedSlot);
                              }
                            }}
                            style={[
                              styles.stickerPickerItem,
                              { backgroundColor: theme.surfaceBg, borderColor: theme.cardBorder },
                            ]}
                          >
                            <Image source={{ uri: st.image }} style={styles.pickerStickerImg} resizeMode="contain" />
                            <Text numberOfLines={1} style={[styles.pickerStickerName, { color: theme.textPrimary }]}>
                              {st.name}
                            </Text>
                            <Text style={styles.pickerStickerPrice}>+${(st.price * 0.25).toFixed(2)} к пушке</Text>
                          </TouchableOpacity>
                        ))
                      ) : (
                        <Text style={[styles.trendHintText, { color: theme.textMuted, textAlign: 'center', width: '100%', padding: 20 }]}>
                          У вас нет наклеек на складе. Откройте капсулы в магазине!
                        </Text>
                      )}
                    </View>
                  </ScrollView>
                </View>
              </View>
            </Modal>

            {/* Lock / Favorite Toggle Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => onToggleLock && onToggleLock(item.instanceId)}
              style={[
                styles.inspectLockBtn,
                item.isLocked
                  ? styles.inspectLockBtnActive
                  : { backgroundColor: theme.surfaceBg, borderColor: theme.cardBorder },
              ]}
            >
              <Ionicons
                name={item.isLocked ? 'lock-closed' : 'lock-open-outline'}
                size={18}
                color={item.isLocked ? '#FFFFFF' : theme.textSecondary}
              />
              <Text
                style={[
                  styles.inspectLockBtnText,
                  { color: item.isLocked ? '#FFFFFF' : theme.textPrimary },
                ]}
              >
                {item.isLocked
                  ? 'Скин защищён замком (Нельзя продать)'
                  : 'Поставить замок 🔒 (Защитить от случайной продажи)'}
              </Text>
            </TouchableOpacity>

            {/* Actions Bar */}
            <View style={styles.inspectActionsRow}>
              {onSell && (
                <TouchableOpacity
                  activeOpacity={0.85}
                  disabled={item.isLocked}
                  onPress={() => {
                    onClose();
                    onSell(item);
                  }}
                  style={[
                    styles.inspectActionBtn,
                    styles.inspectSellBtn,
                    item.isLocked && styles.inspectBtnDisabled,
                  ]}
                >
                  <Ionicons name="cash-outline" size={17} color="#FFFFFF" />
                  <Text style={styles.inspectActionBtnText}>
                    {item.isLocked ? 'Заблокирован' : `Продать $${item.price.toFixed(2)}`}
                  </Text>
                </TouchableOpacity>
              )}

              {onContract && !isKnifeOrGlove && !item.isSticker && (
                <TouchableOpacity
                  activeOpacity={0.85}
                  disabled={item.isLocked}
                  onPress={() => {
                    onClose();
                    onContract(item);
                  }}
                  style={[
                    styles.inspectActionBtn,
                    { backgroundColor: theme.surfaceBg, borderColor: theme.cardBorder, borderWidth: 1 },
                    item.isLocked && styles.inspectBtnDisabled,
                  ]}
                >
                  <Ionicons name="layers-outline" size={17} color={theme.textPrimary} />
                  <Text style={[styles.inspectActionBtnText, { color: theme.textPrimary }]}>
                    В контракт
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
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
  inspectOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  inspectModalBox: {
    width: '100%',
    maxWidth: 440,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    overflow: 'hidden',
  },
  inspectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  inspectBadgeRow: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
    marginBottom: 6,
  },
  rarityPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  rarityPillText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 10,
  },
  stPill: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: 'rgba(249, 115, 22, 0.2)',
    borderWidth: 1,
    borderColor: '#F97316',
  },
  stPillText: {
    color: '#F97316',
    fontWeight: '800',
    fontSize: 10,
  },
  svPill: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: 'rgba(234, 179, 8, 0.2)',
    borderWidth: 1,
    borderColor: '#EAB308',
  },
  svPillText: {
    color: '#EAB308',
    fontWeight: '800',
    fontSize: 10,
  },
  lockPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: 'rgba(234, 179, 8, 0.2)',
  },
  lockPillText: {
    color: '#EAB308',
    fontWeight: '800',
    fontSize: 10,
  },
  inspectWeaponTitle: {
    fontSize: 12,
    fontWeight: '600',
  },
  inspectSkinTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginTop: 2,
  },
  inspectCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inspectStage: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    position: 'relative',
  },
  inspectGlowCircle: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  inspectLargeImg: {
    width: '90%',
    height: 160,
  },
  inspectSectionBox: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  inspectRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  inspectSectionLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  inspectFloatNumber: {
    fontSize: 12,
    fontWeight: '800',
  },
  floatBarWrap: {
    height: 14,
    position: 'relative',
    marginVertical: 4,
  },
  floatBarSegments: {
    flexDirection: 'row',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 4,
  },
  floatSeg: {
    height: '100%',
  },
  floatIndicator: {
    position: 'absolute',
    top: 0,
    marginLeft: -4,
  },
  floatPointerTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFFFFF',
  },
  floatLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  floatTierLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#9CA3AF',
  },
  inspectMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  inspectMetaText: {
    fontSize: 11,
  },
  inspectLockBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 10,
    marginBottom: 10,
  },
  inspectLockBtnActive: {
    backgroundColor: '#D97706',
    borderColor: '#F59E0B',
  },
  inspectLockBtnText: {
    fontSize: 12,
    fontWeight: '800',
  },
  inspectActionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  inspectActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 10,
  },
  inspectSellBtn: {
    backgroundColor: '#16A34A',
  },
  inspectActionBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
  inspectBtnDisabled: {
    opacity: 0.4,
  },
  cardTrendPill: {
    fontSize: 9,
    fontWeight: '800',
    marginRight: 2,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendValText: {
    fontSize: 12,
    fontWeight: '900',
  },
  trendHintText: {
    fontSize: 10,
    marginTop: 2,
    lineHeight: 14,
  },
  applyStickerBtnSmall: {
    backgroundColor: '#16A34A',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  applyStickerBtnSmallText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  stickerSlotsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
    marginTop: 8,
  },
  stickerSlotItem: {
    flex: 1,
    borderRadius: 8,
    padding: 6,
    alignItems: 'center',
  },
  stickerSlotImg: {
    width: 32,
    height: 24,
  },
  stickerSlotTitle: {
    fontSize: 8,
    fontWeight: '700',
    marginTop: 2,
  },
  stickerSlotActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 4,
  },
  scrapeBtn: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  scrapeBtnText: {
    color: '#9CA3AF',
    fontSize: 8,
    fontWeight: '700',
  },
  removeStickerBtn: {
    padding: 2,
  },
  stickerSlotEmpty: {
    flex: 1,
    height: 58,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stickerSlotEmptyText: {
    fontSize: 8,
    fontWeight: '700',
    marginTop: 2,
  },
  stickerPickerBox: {
    width: '100%',
    maxWidth: 380,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
  },
  stickerPickerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  stickerPickerItem: {
    width: '48%',
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  pickerStickerImg: {
    width: 50,
    height: 38,
  },
  pickerStickerName: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
  },
  pickerStickerPrice: {
    fontSize: 9,
    fontWeight: '800',
    color: '#16A34A',
    marginTop: 2,
  },
});
