import Image from "next/image";

interface Props {
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: 36,
  md: 48,
  lg: 72,
};

export default function Logo({ size = "sm" }: Props) {
  const px = sizes[size];
  return (
    <Image
      src="https://static.wixstatic.com/media/5b09da_2f0efb57b89d4f099f995098c7975b14~mv2.jpg"
      alt="Maurício Kenyatta"
      width={px}
      height={px}
      className="rounded-full object-cover flex-shrink-0"
      style={{ width: px, height: px }}
      unoptimized
    />
  );
}
