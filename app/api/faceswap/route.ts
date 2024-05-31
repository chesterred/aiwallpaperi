import { rapidSwap } from "@/lib/rapidapi";
import { respData, respErr } from "@/lib/resp";

export async function POST(req: Request) {
  try {
    const {TargetImageUrl, SourceImageUrl  } = await req.json();
    console.log('req',req)
    if (!TargetImageUrl || !SourceImageUrl) {
      return respErr("invalid params");
    }

    const swapped = await rapidSwap(
      TargetImageUrl,
      SourceImageUrl
    );
    let img_url = swapped.ResultImageUrl;
    console.log('img_url', img_url)
    return respData(img_url);

    // console.log('TargetImageUrl', TargetImageUrl)
    // console.log('SourceImageUrl', SourceImageUrl)
    // return respData({ TargetImageUrl, SourceImageUrl }) 

  } catch (e) {
    console.log("swap failed: ", e);
    return respErr("swap failed");
  }
}
