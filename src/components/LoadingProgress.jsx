import React from "react";
import { useProgress } from "@react-three/drei";
import { Progress } from "antd";

export default function LoadingProgress() {
  const { progress } = useProgress();

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "300px",
        textAlign: "center",
      }}
    >
      <Progress type="circle" percent={Math.round(progress)} />
      <p style={{ marginTop: "10px" }}>Đang tải mô hình...</p>
    </div>
  );
}
