export default function PrecisionCyberLogo({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 480 120" xmlns="http://www.w3.org/2000/svg" aria-label="Precision Cybertechnologies and Digital Solutions Ltd">
      {/* "precision" heavy text */}
      <text x="0" y="76"
        fontFamily="Arial Black, Arial, Helvetica Neue, sans-serif"
        fontWeight="900" fontSize="82" fill="#1A1A1A">
        precision
      </text>
      {/* Blue chevron */}
      <polygon points="348,6 370,6 404,60 370,114 348,114 382,60" fill="#1255A3" />
      {/* Orange chevron overlapping */}
      <polygon points="370,6 392,6 426,60 392,114 370,114 404,60" fill="#F4821F" />
      {/* Subtitle */}
      <text x="1" y="108"
        fontFamily="Arial, Helvetica Neue, sans-serif"
        fontWeight="400" fontSize="17" fill="#666666" letterSpacing="0.8">
        CYBERTECHNOLOGIES &amp; DIGITAL SOLUTIONS, LTD
      </text>
    </svg>
  );
}
