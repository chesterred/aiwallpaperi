import { respData, respErr } from "@/lib/resp";
import { currentUser } from "@clerk/nextjs";
import { getUserCredits } from "@/services/order";
import { ImageGenerateParams } from "openai/resources/images.mjs";


import Replicate from 'replicate';
import { genUuid } from "@/lib";
import { downloadAndUploadImage } from "@/lib/s3";
import { Wallpaper } from "@/types/wallpaper";
import { insertWallpaper } from "@/models/wallpaper";


export const maxDuration = 120;
//接受req=>description, user, res from openai, s3image
//in req=> desc, user, =>openai=>res, >s3=>s3img, =>wallpaper:Wallpaper
export async function POST(req: Request) {
    const replicate = new Replicate();
    const user = await currentUser();
    if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
      return respErr("no auth");
    }

    try {
        //get request input 
        const { swap_image, target_image } = await req.json();
        if (!swap_image || !target_image) {
          return respErr("invalid params");
        }
        console.log('swap_image',swap_image)
        //get user
        const user_email = user.emailAddresses[0].emailAddress;

        const user_credits = await getUserCredits(user_email);
        if (!user_credits || user_credits.left_credits < 1) {
          return respErr("credits not enough");
        }
        
        //wallpaper type fill
        const llm_name = "dall-e-3";
        const img_size = "1792x1024";
        const llm_params: ImageGenerateParams = {
          prompt: `generate desktop wallpaper image about ${target_image}`,
          model: llm_name,
          n: 1,
          quality: "hd",
          response_format: "url",
          size: img_size,
          style: "vivid",
        };
        const created_at = new Date().toISOString();
    
        // input 
        const input = {
            swap_image: swap_image,
            target_image: target_image
        };
        
        //output
        const output = await replicate.run("omniedgeio/face-swap:c2d783366e8d32e6e82c40682fab6b4c23b9c6eff2692c0cf7585fc16c238cfe", { input });
        console.log(output)
        if (!output) {
            return respErr("swap face failed");
          }
        
          const raw_img_url = String(output);
          if (!raw_img_url) {
            return respErr("generate wallpaper failed");
          }
      
        console.log("raw_img_url",raw_img_url)
        const img_uuid = genUuid();

        // upload to s3
        const s3_img = await downloadAndUploadImage(
            raw_img_url,
            process.env.AWS_BUCKET || "trysai",
            `wallpapers/${img_uuid}.png`
          );
          let img_url = s3_img.Location;
          if (process.env.AWS_CDN_DOMAIN) {
            img_url = `${process.env.AWS_CDN_DOMAIN}/${s3_img.Key}`;
          }
      
      
        // insert to supabase
        const wallpaper: Wallpaper = {
          user_email: user_email,
          img_description: "",
          img_size: img_size,
          img_url: img_url,
          llm_name: llm_name,
          llm_params: JSON.stringify(llm_params),
          created_at: created_at,
          uuid: img_uuid,
          category: "",
        };
        await insertWallpaper(wallpaper);
    
        return respData(wallpaper);
    
      
    } catch (e) {
        console.log("swap face failed: ", e);
        return respErr("swap face failed");    
    }
}