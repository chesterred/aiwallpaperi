import axios from "axios";


const options = {
    method: 'POST',
    url: 'https://faceswap-image-transformation-api.p.rapidapi.com/faceswap',
    params: {
      TargetImageUrl: 'https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcT2xYTv3ig7zGLvs0ABliV1ZMWG-0waOX_P6nd03SJnDLVoTiSnvuCMJ-dNpQhhYXTC',
      SourceImageUrl: 'https://m.media-amazon.com/images/M/MV5BMTQzMjkwNTQ2OF5BMl5BanBnXkFtZTgwNTQ4MTQ4MTE@._V1_.jpg'
    },
    headers: {
      'x-rapidapi-key': '31e0c749dbmshd501849feed0cb8p180d5bjsn8a9b63a3f824',
      'x-rapidapi-host': 'faceswap-image-transformation-api.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      TargetImageUrl: 'https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcT2xYTv3ig7zGLvs0ABliV1ZMWG-0waOX_P6nd03SJnDLVoTiSnvuCMJ-dNpQhhYXTC',
      SourceImageUrl: 'https://m.media-amazon.com/images/M/MV5BMTQzMjkwNTQ2OF5BMl5BanBnXkFtZTgwNTQ4MTQ4MTE@._V1_.jpg'
    }
  };

export async function rapidSwap(
  TargetImageUrl: string,
  SourceImageUrl: string
) {
  try {
    const response = await axios(
      {
        method: 'POST',
        url: 'https://faceswap-image-transformation-api.p.rapidapi.com/faceswap',
        params: {
          TargetImageUrl: TargetImageUrl,
          SourceImageUrl: SourceImageUrl
        },
        headers: {
          'x-rapidapi-key': '31e0c749dbmshd501849feed0cb8p180d5bjsn8a9b63a3f824',
          'x-rapidapi-host': 'faceswap-image-transformation-api.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          TargetImageUrl: TargetImageUrl,
          SourceImageUrl: SourceImageUrl
        }
      }
    );
    return response.data;
  } catch (e) {
    console.log("upload failed:", e);
    throw e;
  }
}

