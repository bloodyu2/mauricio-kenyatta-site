interface Props {
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: { box: 36, fontSize: 14, ring: 1 },
  md: { box: 48, fontSize: 18, ring: 2 },
  lg: { box: 72, fontSize: 28, ring: 2 },
}

export default function Logo({ size = 'sm' }: Props) {
  const { box, fontSize, ring } = sizes[size]

  return (
    <svg
      width={box}
      height={box}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Maurício Kenyatta"
      style={{ flexShrink: 0 }}
    >
      {/* Outer ring */}
      <circle cx="36" cy="36" r="34" stroke="#3b82f6" strokeWidth={ring * 2} fill="#0f172a" />

      {/* Inner subtle gradient circle */}
      <circle cx="36" cy="36" r="26" fill="url(#mk-grad)" fillOpacity="0.2" />

      {/* MK letters */}
      <text
        x="36"
        y="44"
        textAnchor="middle"
        fill="#60a5fa"
        fontSize={fontSize}
        fontWeight="800"
        fontFamily="Inter, Arial, sans-serif"
        letterSpacing="-1"
      >
        MK
      </text>

      <defs>
        <radialGradient id="mk-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
      </defs>
    </svg>
  )
}
