'use client'
import React, { useState, useCallback, ChangeEvent } from 'react';

const ImageUploader = () => {
    const [data, setData] = useState<{ image: string | null }>({ image: null });
    const [file, setFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [loading, setLoading] = useState(false);

    const onChangePicture = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files && event.currentTarget.files[0];
        if (file) {
            if (file.size / 1024 / 1024 > 50) {
                alert('File size too big (max 50MB)');
            } else {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setData((prev) => ({ ...prev, image: e.target?.result as string }));
                    console.log(reader.result); // 此时 reader.result 是可用的
                    if (reader.result && typeof reader.result === 'string' ) {
                        requestRepSwap(reader.result)
                    }

                };
                reader.readAsDataURL(file);
            }
        }
    }, []);

    const requestRepSwap = async (swap_image: string) => {
        try {
            const params = {
                swap_image: swap_image,
                target_image: 'https://replicate.delivery/pbxt/JoBuz3wGiVFQ1TDEcsGZbYcNh0bHpvwOi32T1fmxhRujqcu7/9X2.png'
            }

            console.log("send request");
            setLoading(true); // Set loading state to true
            const response = await fetch("/api/repswap", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(params),
            });

            if (!response.ok) {
                // Handle non-200 responses here
                console.error("Request failed", response.statusText);
            } else {
                console.log("Request successful", await response.json());
            }
        } catch (error) {
            console.error("Request error", error);
        } finally {
            setLoading(false); // Set loading state to false
        }
    };

    return (
        <div>
            <input type="file" onChange={onChangePicture} />
            {data.image && <img src={data.image} alt="Uploaded Preview" style={{ maxWidth: '100%', maxHeight: '400px' }} />}
        </div>
    );
};

export default ImageUploader;
