"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function RequestRepSwapButton() {
  // State to manage loading status
  const [loading, setLoading] = useState(false);

  // Function to send the request to the API
  const requestRepSwap = async () => {
    try {
      const params = {
        swap_image: 'https://i.pinimg.com/736x/ec/58/19/ec58198c3f652de85e735d918ef85dd8.jpg',
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

  // Event handler for button click
  const handleRep = () => {
    requestRepSwap();
  };

  return (
    <Button type="button" onClick={handleRep} disabled={loading}>
      {loading ? "Loading..." : "Repswap"}
    </Button>
  );
}
