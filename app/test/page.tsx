export async function Swap() {
    const url = 'https://faceswap-image-transformation-api.p.rapidapi.com/faceswap';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '31e0c749dbmshd501849feed0cb8p180d5bjsn8a9b63a3f824',
            'x-rapidapi-host': 'faceswap-image-transformation-api.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            TargetImageUrl: 'https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcT2xYTv3ig7zGLvs0ABliV1ZMWG-0waOX_P6nd03SJnDLVoTiSnvuCMJ-dNpQhhYXTC',
            SourceImageUrl: 'https://m.media-amazon.com/images/M/MV5BMTQzMjkwNTQ2OF5BMl5BanBnXkFtZTgwNTQ4MTQ4MTE@._V1_.jpg'
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

export default async function () {
    await Swap();

    return (
        <div>test</div>
    );
}
