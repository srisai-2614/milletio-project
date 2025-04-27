const NavIcon = ({ label }) => (
    <svg
      width="60"
      height="60"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: "0 10px" }}
    >
      
      <text
        x="50%"
        y="55%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="16"
        fill="#2d3436"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
      >
        {label}
      </text>
    </svg>
  );
  
  export default NavIcon;