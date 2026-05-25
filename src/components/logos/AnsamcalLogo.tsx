export default function AnsamcalLogo({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 230 74" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ANSA McAL Group of Companies">
      {/* Yellow circle */}
      <circle cx="37" cy="37" r="36" fill="#F5C800" />
      {/* Inner ring detail */}
      <circle cx="37" cy="37" r="32" fill="none" stroke="#E8B800" strokeWidth="1" />
      {/* AM monogram */}
      <text x="37" y="50" textAnchor="middle"
        fontFamily="'Arial Black', 'Arial', sans-serif"
        fontWeight="900" fontSize="26" fill="#1B3A8C">AM</text>
      {/* ansa */}
      <text x="83" y="36"
        fontFamily="'Arial', 'Helvetica Neue', sans-serif"
        fontWeight="800" fontSize="25" fontStyle="italic" fill="#1B3A8C">ansa</text>
      {/* McAL — slightly larger, same line */}
      <text x="141" y="36"
        fontFamily="'Arial', 'Helvetica Neue', sans-serif"
        fontWeight="800" fontSize="25" fontStyle="italic" fill="#1B3A8C"> McAL</text>
      {/* GROUP OF COMPANIES */}
      <text x="84" y="55"
        fontFamily="'Arial', 'Helvetica Neue', sans-serif"
        fontSize="10.5" fill="#1B3A8C" letterSpacing="2.2">GROUP OF COMPANIES</text>
    </svg>
  );
}
