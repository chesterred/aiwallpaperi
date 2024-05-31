import { respData, respErr } from "@/lib/resp";

export async function POST(req: Request) {
  try {
    const file = await req.json();
    console.log(file)
    return respData(file);

    // console.log('TargetImageUrl', TargetImageUrl)
    // console.log('SourceImageUrl', SourceImageUrl)
    // return respData({ TargetImageUrl, SourceImageUrl }) 

  } catch (e) {
    console.log("swap failed: ", e);
    return respErr("swap failed");
  }
}
