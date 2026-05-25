export default function AnsamcalLogo({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 480 148" xmlns="http://www.w3.org/2000/svg" aria-label="ANSA McAL Group of Companies">
      {/* Yellow circle */}
      <circle cx="74" cy="74" r="72" fill="#F5C200" />
      {/* AM monogram — drawn as paths for reliability */}
      {/* Left leg of A / left upstroke of M */}
      <polyline points="30,108 55,36 74,82 93,36 118,108"
        fill="none" stroke="#1B3A8C" strokeWidth="10"
        strokeLinejoin="round" strokeLinecap="round" />
      {/* Crossbar */}
      <line x1="44" y1="84" x2="104" y2="84"
        stroke="#1B3A8C" strokeWidth="10" strokeLinecap="round" />

      {/* ansa McAL */}
      <text x="162" y="83"
        fontFamily="Arial, Helvetica Neue, sans-serif"
        fontWeight="800" fontStyle="italic" fontSize="68" fill="#1B3A8C">
        ansa M<tspan fontSize="60">c</tspan>AL
      </text>
      {/* GROUP OF COMPANIES */}
      <text x="165" y="120"
        fontFamily="Arial, Helvetica Neue, sans-serif"
        fontWeight="400" fontSize="21" fill="#1B3A8C" letterSpacing="4">
        GROUP OF COMPANIES
      </text>
    </svg>
  );
}
