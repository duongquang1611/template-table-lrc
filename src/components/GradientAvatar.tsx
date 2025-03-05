import { useEffect, useRef } from "react";
import "./styles.css";

interface IProps {
  avatarSize?: {
    width: number;
    height: number;
  };
  borderWidth?: number;
  padding?: number;
  className?: string;
}

const defaultAvatarSize = {
  width: 140,
  height: 140,
};

const GradientAvatar = (props: IProps) => {
  const {
    avatarSize = defaultAvatarSize,
    borderWidth = 10,
    padding = 10,
    className,
  } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = avatarSize.width;
    canvas.height = avatarSize.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Xóa canvas trước khi vẽ
    ctx.clearRect(0, 0, avatarSize.width, avatarSize.height);

    // Tạo Linear Gradient từ góc trái trên đến góc phải dưới
    const gradient = ctx.createLinearGradient(
      0,
      0,
      avatarSize.width,
      avatarSize.height
    );
    gradient.addColorStop(0.0642, "#ce08c3");
    gradient.addColorStop(0.8424, "#f30066");

    // Kích thước vòng tròn tối đa
    const radius =
      Math.min(avatarSize.width, avatarSize.height) / 2 - borderWidth / 2;

    // Vẽ vòng tròn
    ctx.beginPath();
    ctx.arc(
      avatarSize.width / 2,
      avatarSize.height / 2,
      radius,
      0,
      2 * Math.PI
    );
    ctx.strokeStyle = gradient;
    ctx.lineWidth = borderWidth;
    ctx.stroke();
  }, [avatarSize]);

  return (
    <div className={`container ${className || ""}`}>
      <div
        ref={containerRef}
        style={{
          width: avatarSize.width,
          height: avatarSize.height,
          position: "relative",
        }}
      >
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvnt4b7WMOOiL1v6kiI2u8viuv7UTByHRz4A&usqp=CAU"
          alt=""
          className="avatar"
          style={{
            width: `calc(100% - ${padding * 2}px - ${borderWidth * 2}px)`,
            height: `calc(100% - ${padding * 2}px - ${borderWidth * 2}px)`,
          }}
        />
      </div>
    </div>
  );
};

export default GradientAvatar;
