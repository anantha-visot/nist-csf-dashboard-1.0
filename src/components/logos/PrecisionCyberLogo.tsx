export default function PrecisionCyberLogo({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 260 68" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Precision Cybertechnologies and Digital Solutions Ltd">
      {/* "precision" bold text */}
      <text x="0" y="40"
        fontFamily="'Arial Black', 'Arial', sans-serif"
        fontWeight="900" fontSize="33" fill="#1A1A1A">precision</text>

      {/* Arrow icon — blue left chevron + orange right chevron, overlapping */}
      {/* Blue chevron */}
      <polygon points="166,6 180,6 198,34 180,62 166,62 184,34" fill="#1565C0" />
      {/* Orange chevron (overlaps right side of blue) */}
      <polygon points="179,6 193,6 211,34 193,62 179,62 197,34" fill="#F4821F" />

      {/* CYBERTECHNOLOGIES & DIGITAL SOLUTIONS, LTD */}
      <text x="1" y="58"
        fontFamily="'Arial', 'Helvetica Neue', sans-serif"
        fontSize="9" fill="#555555" letterSpacing="0.4">CYBERTECHNOLOGIES &amp; DIGITAL SOLUTIONS, LTD</text>
    </svg>
  );
}
