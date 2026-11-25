import React, { memo, useState } from 'react';
import { Image, ImageProps, Platform, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Asset } from 'expo-asset';
import { localImages } from '../data/localImages';

function resolveImage(image: string): number | undefined {
  if (typeof image !== 'string' || image.length === 0) return undefined;
  let key = image;
  if (image.startsWith('https://')) {
    // Old inventories stored Steam URLs. Match those to the bundled copy.
    let hash = 2166136261;
    for (let i = 0; i < image.length; i++) {
      hash = Math.imul(hash ^ image.charCodeAt(i), 16777619);
    }
    key = 'cs2/' + (hash >>> 0).toString(16).padStart(8, '0') + '.webp';
  }
  return Object.prototype.hasOwnProperty.call(localImages, key) ? localImages[key]() : undefined;
}

export async function prepareCatalogImages(images: string[]) {
  const modules = [...new Set(images)].map(resolveImage);
  let cursor = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let expired = false;
  const workers = Array.from({ length: 6 }, async () => {
    while (!expired && cursor < modules.length) {
      const module = modules[cursor++];
      if (module === undefined) continue;
      try {
        const asset = Asset.fromModule(module);
        if (Platform.OS === 'web') await Image.prefetch(asset.uri);
        else await asset.downloadAsync();
      } catch {
        // The card will render a fallback if it cannot load the image.
      }
    }
  });
  try {
    await Promise.race([
      Promise.all(workers),
      new Promise<void>((resolve) => { timer = setTimeout(resolve, 700); }),
    ]);
  } finally {
    expired = true;
    if (timer !== undefined) clearTimeout(timer);
  }
}

interface CatalogImageProps extends Omit<ImageProps, 'source'> {
  image: string;
  label: string;
}

export const CatalogImage = memo(function CatalogImage({ image, label, style, onError, ...props }: CatalogImageProps) {
  const [failedImage, setFailedImage] = useState<string>();
  const source = resolveImage(image);
  if (source === undefined || failedImage === image) {
    return (
      <View style={[style as ViewStyle, styles.fallback]} accessibilityLabel={label}>
        <Text numberOfLines={2} style={styles.label}>{label}</Text>
      </View>
    );
  }
  return (
    <Image
      {...props}
      source={source}
      accessibilityLabel={label}
      style={style}
      fadeDuration={0}
      onError={(event) => {
        setFailedImage(image);
        onError?.(event);
      }}
    />
  );
});

const styles = StyleSheet.create({
  fallback: { backgroundColor: '#3b3e44', alignItems: 'center', justifyContent: 'center', borderRadius: 6 },
  label: { color: '#fff', fontSize: 10, textAlign: 'center' },
});
