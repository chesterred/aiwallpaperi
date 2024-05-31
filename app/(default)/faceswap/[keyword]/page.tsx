import { findAllWallpapersByCat, findWallpaperByCat } from "@/models/wallpaper";
import { Metadata } from "next";

import Wallpapers from "@/components/wallpapers";

export async function generateMetadata({
    params,
  }: {
    params: { keyword: string };
  }): Promise<Metadata> {
    let description = "";
  
    if (params.keyword) {
      const wallpaper = await findWallpaperByCat(params.keyword);
      if (wallpaper) {
        description = wallpaper.img_description;
      }
    }
  
    return {
      title: `AI Wallpaper - ${description}`,
      description: `AI Wallpaper about ${description}, generated by AI Wallpaper Generator | AI Wallpaper Shop.`,
      alternates: {
        canonical: `${process.env.WEB_BASE_URI}/faceswap/${params.keyword}`,
      },
    };
  }

export default async function ({ params }: { params: { keyword: string } }) {
  const wallpapers = await findAllWallpapersByCat(params.keyword);

  return (
    <Wallpapers wallpapers={wallpapers} />
  );
}
