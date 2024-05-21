import { respData, respErr } from "@/lib/resp";

import { ImageGenerateParams } from "openai/resources/images.mjs";
import { Wallpaper } from "@/types/wallpaper";
import { currentUser } from "@clerk/nextjs";
import { downloadAndUploadImage } from "@/lib/s3";
import { genUuid } from "@/lib";
import { getOpenAIClient } from "@/services/openai";
import { getUserCredits } from "@/services/order";
import { insertWallpaper } from "@/models/wallpaper";

export const maxDuration = 120;

export async function POST(req: Request) {
  const client = getOpenAIClient();

  const user = await currentUser();
  if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
    return respErr("no auth");
  }

  try {
    const { description } = await req.json();
    if (!description) {
      return respErr("invalid params");
    }

    const user_email = user.emailAddresses[0].emailAddress;

    const user_credits = await getUserCredits(user_email);
    if (!user_credits || user_credits.left_credits < 1) {
      return respErr("credits not enough");
    }

    const llm_name = "dall-e-3";
    const img_size = "1792x1024";
    const llm_params: ImageGenerateParams = {
      prompt: `generate desktop wallpaper image about ${description}`,
      model: llm_name,
      n: 1,
      quality: "hd",
      response_format: "url",
      size: img_size,
      style: "vivid",
    };
    const created_at = new Date().toISOString();

    const res = await client.images.generate(llm_params);

    const raw_img_url = res.data[0].url;
    if (!raw_img_url) {
      return respErr("generate wallpaper failed");
    }

    const img_uuid = genUuid();
    const img_name = encodeURIComponent(description);
    const s3_img = await downloadAndUploadImage(
      raw_img_url,
      process.env.AWS_BUCKET || "trysai",
      `wallpapers/${img_uuid}.png`
    );

    let img_url = s3_img.Location;
    if (process.env.AWS_CDN_DOMAIN) {
      img_url = `${process.env.AWS_CDN_DOMAIN}/${s3_img.Key}`;
    }

    const wallpaper: Wallpaper = {
      user_email: user_email,
      img_description: description,
      img_size: img_size,
      img_url: img_url,
      llm_name: llm_name,
      llm_params: JSON.stringify(llm_params),
      created_at: created_at,
      uuid: img_uuid,
    };
    await insertWallpaper(wallpaper);

    return respData(wallpaper);
  } catch (e) {
    console.log("generate wallpaper failed: ", e);
    return respErr("generate wallpaper failed");
  }
}
