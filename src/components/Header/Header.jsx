import './Header.css'

export default function Header() {
  return(<header id="plugnplay">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="60"
      version="1.1"
      viewBox="0 0 188.145 35.626"
    >
      <g strokeWidth="2.597" transform="translate(-11.373 -69.654)">
        <text
          xmlSpace="preserve"
          style={{
            InkscapeFontSpecification: "Sniglet",
            WebkitTextAlign: "center",
            textAlign: "center",
          }}
          x="104.417"
          y="97.942"
          fill="#fff"
          fontFamily="Sniglet"
          fontSize="30.75"
          fontStretch="normal"
          fontStyle="normal"
          fontVariant="normal"
          fontWeight="normal"
          textAnchor="middle"
        >
          <tspan
            style={{ InkscapeFontSpecification: "Sniglet" }}
            x="107.417"
            y="98.942"
            strokeWidth="2.597"
            fontFamily="Sniglet"
            fontStretch="normal"
            fontStyle="normal"
            fontVariant="normal"
            fontWeight="normal"
          >
             PLUG     PLAY
          </tspan>
        </text>
        <path
            className='plugnplaypath'
          fill="none"
          stroke="#fff"
          strokeDasharray="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="1"
          d="M12.671 103.982s81.48-.34 83.46-3.088c3.16-4.39-1.394-24.909 3.391-26.622 5.002-1.79 8.57 28.941 15.56 25.934 3.017-1.298-.632-24.226 2.27-26.698 3.444-2.934 80.867-2.537 80.867-2.537"
        ></path>
      </g>
    </svg>
    <div id="rawg-credits">powered by <span id="rawg-logo">RAWG</span></div>
    </header>);
}
