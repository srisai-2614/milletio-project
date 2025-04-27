const MilletioLogo = ({ width = 180, height = 60 }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 500 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="milletioGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6ab04c" />
          <stop offset="100%" stopColor="#27ae60" />
        </linearGradient>
  
        <path id="logoPath" d="M 10,85 Q 250,5 490,85" fill="none" />
      </defs>
  
      <circle cx="20" cy="20" r="8" fill="#6ab04c" />
      <circle cx="40" cy="12" r="6" fill="#27ae60" />
      <circle cx="60" cy="20" r="8" fill="#6ab04c" />
  
      <text>
        <textPath
          href="#logoPath"
          startOffset="50%"
          textAnchor="middle"
          fill="url(#milletioGradient)"
          fontFamily="'Segoe UI', sans-serif"
          fontSize="72"
          fontWeight="bold"
          letterSpacing="2"
        >
          Milletio
        </textPath>
      </text>
    </svg>
  );
  
  export default MilletioLogo;