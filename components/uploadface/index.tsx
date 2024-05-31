"use client";

import { ChangeEvent, KeyboardEvent, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Wallpaper } from "@/types/wallpaper";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { fromByteArray} from "@/node_modules/base64-js"
export default function UploadFace() {
  const { user, fetchUserInfo } = useContext(AppContext);
  const [imageFile, setImageFile] = useState<File | null>(null); // 1. 新增状态以接受图片文件
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [wallpaper, setWallpaper] = useState<Wallpaper | null>(null);
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  }

  const requestGenWallpaper = async () => {
    try {
      const uri = "/api/testreqfile";
      const formData = new FormData(); // 2. 创建FormData对象用于发送图片文件
      formData.append("image", imageFile!); // 2. 添加图片文件到FormData

      setLoading(true);
      const resp = await fetch(uri, {
        method: "POST",
        body: formData, // 2. 发送FormData而不是JSON字符串
      });
      setLoading(false);

      setImageFile(null); // 3. 清空图片文件状态
      inputRef.current!.value = ""; // 3. 清空输入框的值

    } catch (e) {
      console.log("search failed: ", e);
      toast.error("gen wallpaper failed");
    }
  };

  const handleSubmit = () => {
    if (!imageFile) { // 3. 检查是否选择了图片文件
      toast.error("Please select an image");
      return;
    }


    requestGenWallpaper();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <form
        className="flex w-full flex-col gap-3 sm:flex-row"
        onSubmit={() => {
          return false;
        }}
      >
        
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange} // 1. 添加onChange事件处理函数
          disabled={loading}
          ref={inputRef}
        />

        <Button type="button" disabled={loading} onClick={handleSubmit}>
          {loading ? "Generating..." : "Generate"}
        </Button>
      </form>
    </div>
  )
}
