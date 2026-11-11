import React, { memo, useState } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { InventoryItem, RARITIES, RarityKey, SkinTemplate } from '../types/cs2';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  glowColor?: string;
}

// GPU-friendly Liquid Glass container without expensive per-card BlurView
export const LiquidGlassCard: React.FC<GlassCardProps> = memo(
  ({ children, style, glowColor = 'rgba(255, 255, 255, 0.14)' }) => {
    return (
      <View style={[styles.glassWrapper, { borderColor: glowColor }, style]}>
        <LinearGradient
          colors={[
            'rgba(28, 37, 64, 0.88)',
            'rgba(14, 19, 34, 0.94)',
            'rgba(8, 11, 21, 0.98)',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
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
}

export const SkinCard: React.FC<SkinCardProps> = memo(
  ({ item, onPress, selected, actionLabel, onAction, compact }) => {
    const [imgError, setImgError] = useState(false);
    const rarityInfo = RARITIES[item.rarity as RarityKey] || RARITIES.milspec;
    const isInstance = 'instanceId' in item;
    const price = isInstance ? item.price : item.basePrice;

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={[
          styles.skinCard,
          compact && styles.skinCardCompact,
          {
            borderColor: selected ? '#10B981' : 'rgba(255, 255, 255, 0.11)',
          },
          selected && styles.selectedBorder,
        ]}
      >
        <LinearGradient
          colors={['rgba(20, 27, 46, 0.96)', 'rgba(10, 14, 25, 0.98)']}
          style={StyleSheet.absoluteFillObject}
        />

        {/* Lightweight top rarity tint */}
        <View
          style={[
            styles.spotlightTop,
            { backgroundColor: rarityInfo.color, opacity: 0.14 },
          ]}
        />

        {/* Top Row: Badges & Price */}
        <View style={styles.badgeRow}>
          <View style={styles.badgesLeft}>
            <View style={[styles.rarityIndicator, { backgroundColor: rarityInfo.color }]} />
            {isInstance && (
              <View style={styles.wearBadge}>
                <Text style={styles.wearText}>{item.wear}</Text>
              </View>
            )}
            {isInstance && item.statTrak && (
              <View style={styles.stBadge}>
                <Text style={styles.stText}>ST™</Text>
              </View>
            )}
            {isInstance && item.souvenir && (
              <View style={styles.souvBadge}>
                <Text style={styles.souvText}>SV</Text>
              </View>
            )}
          </View>

          <View style={styles.priceBadge}>
            <Text style={styles.priceTag}>${price.toFixed(2)}</Text>
          </View>
        </View>

        {/* Weapon 3D Render */}
        <View style={[styles.imageContainer, compact && { height: 72 }]}>
          {!imgError && item.image ? (
            <Image
              source={{ uri: item.image }}
              style={compact ? styles.skinImgCompact : styles.skinImg}
              resizeMode="contain"
              onError={() => setImgError(true)}
            />
          ) : (
            <View style={[styles.fallbackIcon, { borderColor: rarityInfo.color }]}>
              <MaterialCommunityIcons
                name={item.rarity === 'gold' ? 'knife-military' : 'pistol'}
                size={24}
                color={rarityInfo.color}
              />
            </View>
          )}

          {/* Applied Stickers */}
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

        {/* Weapon & Skin Info */}
        <View style={styles.infoBottom}>
          <Text numberOfLines={1} style={styles.weaponText}>
            {item.weapon}
          </Text>
          <Text numberOfLines={1} style={styles.skinNameText}>
            {item.name}
          </Text>

          {isInstance && !item.isSticker && !compact && (
            <View style={styles.inspectHintRow}>
              <Text style={styles.floatText}>F: {item.floatValue.toFixed(4)}</Text>
              <View style={styles.inspectChip}>
                <Ionicons name="cube-outline" size={11} color="#94A3B8" />
                <Text style={styles.inspectHint}>3D</Text>
              </View>
            </View>
          )}
        </View>

        {/* Sleek Bottom Rarity Accent Line */}
        <View style={[styles.rarityBar, { backgroundColor: rarityInfo.color }]} />

        {actionLabel && onAction && (
          <TouchableOpacity style={styles.sellBtn} onPress={onAction}>
            <Ionicons name="cash-outline" size={13} color="#10B981" />
            <Text style={styles.sellBtnText}>{actionLabel}</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  glassWrapper: {
    borderRadius: 22,
    borderWidth: 1,
    overflow: 'hidden',
    backgroundColor: '#0D1220',
  },
  skinCard: {
    width: '48.2%',
    borderRadius: 18,
    borderWidth: 1,
    padding: 11,
    marginBottom: 11,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0E1424',
  },
  skinCardCompact: {
    width: 136,
    marginRight: 10,
    padding: 9,
    marginBottom: 4,
  },
  selectedBorder: {
    borderWidth: 2,
    borderColor: '#10B981',
  },
  spotlightTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  badgesLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  rarityIndicator: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  wearBadge: {
    backgroundColor: 'rgba(255,255,255,0.09)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  wearText: {
    color: '#CBD5E1',
    fontSize: 9,
    fontWeight: '800',
  },
  stBadge: {
    backgroundColor: 'rgba(249, 115, 22, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(249, 115, 22, 0.5)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  stText: {
    color: '#FB923C',
    fontSize: 9,
    fontWeight: '900',
  },
  souvBadge: {
    backgroundColor: 'rgba(234, 179, 8, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(234, 179, 8, 0.5)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  souvText: {
    color: '#FACC15',
    fontSize: 9,
    fontWeight: '900',
  },
  priceBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.14)',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  priceTag: {
    color: '#34D399',
    fontWeight: '800',
    fontSize: 11,
  },
  imageContainer: {
    height: 92,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
    position: 'relative',
  },
  skinImg: {
    width: '94%',
    height: 88,
  },
  skinImgCompact: {
    width: 114,
    height: 68,
  },
  miniStickerRow: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    gap: 2,
  },
  miniStickerImg: {
    width: 18,
    height: 18,
  },
  fallbackIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  infoBottom: {
    marginTop: 2,
  },
  weaponText: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '700',
  },
  skinNameText: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 1,
  },
  inspectHintRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  floatText: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '600',
  },
  inspectChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  inspectHint: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '800',
  },
  rarityBar: {
    height: 3,
    borderRadius: 2,
    marginTop: 8,
  },
  sellBtn: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(16, 185, 129, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.35)',
    borderRadius: 10,
    paddingVertical: 7,
  },
  sellBtnText: {
    color: '#34D399',
    fontSize: 11,
    fontWeight: '800',
  },
});
