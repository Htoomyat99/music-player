import { colors } from "@/constants/tokens";
import { useEffect, useState } from "react";
import { getColors, ImageColorsResult } from "react-native-image-colors";

export const usePlayerBackground = (imgUrl: string) => {
  const [imageColor, setImgageColor] = useState<ImageColorsResult | null>(null);

  useEffect(() => {
    getColors(imgUrl, {
      fallback: colors.background,
      cache: true,
      key: imgUrl,
    }).then((colors) => setImgageColor(colors as ImageColorsResult));
  }, [imgUrl]);

  return imageColor;
};
