import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { animate } from 'animejs';

const minScore = -100;
const maxScore = 100;
const minAngle = -120; // degrees (leftmost)
const maxAngle = 120;  // degrees (rightmost)

function scoreToAngle(score) {
  // Clamp score
  const s = Math.max(minScore, Math.min(maxScore, score));
  // Map score to angle
  return minAngle + ((s - minScore) / (maxScore - minScore)) * (maxAngle - minAngle);
}

// Helper to create SVG arc path
function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return [
    'M', start.x, start.y,
    'A', r, r, 0, largeArcFlag, 0, end.x, end.y
  ].join(' ');
}

function polarToCartesian(cx, cy, r, angleDeg) {
  const angleRad = (angleDeg - 90) * Math.PI / 180.0;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad)
  };
}

const TICKS = [
  { value: -100, label: '-100' },
  { value: -80, label: '-80' },
  { value: -60, label: '-60' },
  { value: -40, label: '-40' },
  { value: -20, label: '-20' },
  { value: 0, label: '0' },
  { value: 20, label: '20' },
  { value: 40, label: '40' },
  { value: 60, label: '60' },
  { value: 80, label: '80' },
  { value: 100, label: '100' },
];

const Barometer = ({ score, architectType }) => {
  const needleRef = useRef(null);
  const knobRef = useRef(null);
  const prevScore = useRef(score);

  // SVG dimensions
  const size = 340;
  const center = size / 2;
  const radius = 140;
  const rimWidth = 18;
  const arcWidth = 24;
  const arcRadius = radius - arcWidth / 2;

  useEffect(() => {
    const angle = scoreToAngle(score);
    // Animate SVG transform attribute
    animate(
      needleRef.current,
      {
        transform: [
          { value: `rotate(${angle + (angle > (needleRef.current?.__lastAngle || 0) ? 8 : -8)} ${center} ${center})`, duration: 400, easing: 'easeOutCubic' },
          { value: `rotate(${angle} ${center} ${center})`, duration: 500, easing: 'spring(1, 80, 10, 0)' },
        ],
      }
    );
    // Knob wobble (subtle)
    animate(
      knobRef.current,
      {
        rotate: [
          { value: (angle > (needleRef.current?.__lastAngle || 0) ? 4 : -4), duration: 300, easing: 'easeOutCubic' },
          { value: 0, duration: 600, easing: 'spring(1, 80, 10, 0)' },
        ],
      }
    );
    needleRef.current.__lastAngle = angle;
    prevScore.current = score;
  }, [score, center]);

  // Zone angles
  const zoneAngles = [
    { start: minAngle, end: -40, color: '#ef4444', id: 'zone-red' }, // Control Freak
    { start: -40, end: 40, color: '#22c55e', id: 'zone-green' },    // Effective
    { start: 40, end: maxAngle, color: '#eab308', id: 'zone-yellow' }, // Armchair
  ];

  return (
    <div className="flex flex-col items-center" data-testid="barometer-container">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="block"
        data-testid="barometer-gauge"
      >
        <defs>
          {/* Radial gradient for dial */}
          <radialGradient id="dial-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="80%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#e5e7eb" />
          </radialGradient>
          {/* Bevel/inner shadow for rim */}
          <radialGradient id="rim-bevel" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="#fffbe6" />
            <stop offset="90%" stopColor="#bfa14a" />
            <stop offset="100%" stopColor="#7c6a2c" />
          </radialGradient>
          {/* Drop shadow filter */}
          <filter id="needle-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.25" />
          </filter>
          {/* Glass glare gradient */}
          <linearGradient id="glare-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          {/* Gold needle gradient */}
          <linearGradient id="needle-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="50%" stopColor="#daa520" />
            <stop offset="100%" stopColor="#b8860b" />
          </linearGradient>
          {/* Knob gloss gradient */}
          <radialGradient id="knob-gloss" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#bfa14a" stopOpacity="1" />
            <stop offset="100%" stopColor="#7c6a2c" stopOpacity="1" />
          </radialGradient>
          {/* Glass cover gradient */}
          <radialGradient id="glass-cover" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#fff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Glass cover (outermost layer) */}
        <circle
          cx={center}
          cy={center}
          r={radius + rimWidth}
          fill="url(#glass-cover)"
          stroke="#fff"
          strokeWidth={1}
          opacity={0.3}
        />

        {/* Gold rim with bevel */}
        <circle
          cx={center}
          cy={center}
          r={radius + rimWidth / 2}
          fill="url(#rim-bevel)"
          stroke="#bfa14a"
          strokeWidth={rimWidth}
        />

        {/* Dial background with gradient */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="url(#dial-gradient)"
          stroke="#e5e7eb"
          strokeWidth={2}
        />

        {/* Zone backgrounds */}
        {zoneAngles.map((zone) => (
          <path
            key={zone.id}
            d={describeArc(center, center, arcRadius, zone.start, zone.end)}
            stroke={zone.color}
            strokeWidth={arcWidth}
            fill="none"
            opacity={0.18}
          />
        ))}

        {/* Glass glare arc (more pronounced) */}
        <path
          d={describeArc(center, center, radius - 8, -100, 60)}
          stroke="url(#glare-gradient)"
          strokeWidth={18}
          fill="none"
          opacity={0.32}
        />

        {/* Ticks and numbers */}
        {TICKS.map((tick, i) => {
          const angle = scoreToAngle(tick.value) * (Math.PI / 180);
          const x1 = center + Math.cos((angle - Math.PI / 2)) * (radius - 10);
          const y1 = center + Math.sin((angle - Math.PI / 2)) * (radius - 10);
          const x2 = center + Math.cos((angle - Math.PI / 2)) * (radius - 2);
          const y2 = center + Math.sin((angle - Math.PI / 2)) * (radius - 2);
          const xText = center + Math.cos((angle - Math.PI / 2)) * (radius - 32);
          const yText = center + Math.sin((angle - Math.PI / 2)) * (radius - 32) + 7;
          return (
            <g key={i}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#bfa14a"
                strokeWidth={3}
              />
              <text
                x={xText}
                y={yText}
                textAnchor="middle"
                fontSize="16"
                fill="#000"
                fontWeight="500"
                fontFamily="Georgia, 'Times New Roman', serif"
                style={{ letterSpacing: '0.5px' }}
              >
                {tick.label}
              </text>
            </g>
          );
        })}

        {/* Needle with shine and shadow */}
        <g
          ref={needleRef}
          transform={`rotate(${scoreToAngle(score)} ${center} ${center})`}
          data-testid="barometer-needle"
          filter="url(#needle-shadow)"
        >
          <path
            d={`M ${center} ${center} 
                L ${center} ${center - radius + 30} 
                L ${center + 1} ${center - radius + 30} 
                L ${center + 1} ${center - radius + 35} 
                L ${center + 4} ${center - radius + 32} 
                L ${center + 1} ${center - radius + 29} 
                L ${center + 1} ${center - radius + 30} 
                L ${center - 1} ${center - radius + 30} 
                L ${center - 1} ${center - radius + 29} 
                L ${center - 4} ${center - radius + 32} 
                L ${center - 1} ${center - radius + 35} 
                L ${center - 1} ${center - radius + 30} 
                Z`}
            fill="url(#needle-gradient)"
            stroke="#daa520"
            strokeWidth={0.5}
          />
        </g>

        {/* Center knob with gloss, shadow, and highlight */}
        <g ref={knobRef} style={{ transformOrigin: `${center}px ${center}px` }}>
          <circle
            cx={center}
            cy={center}
            r={18}
            fill="url(#knob-gloss)"
            stroke="#fffbe6"
            strokeWidth={3}
            filter="url(#needle-shadow)"
          />
          {/* Knob highlight ellipse */}
          <ellipse
            cx={center - 5}
            cy={center - 7}
            rx={6}
            ry={2.5}
            fill="#fff"
            opacity={0.7}
          />
        </g>
      </svg>
      <div className="relative w-full flex flex-col items-center mt-2">
        <div className="mt-2 text-center" data-testid="barometer-info">
          <p className="text-2xl font-semibold text-gray-800" data-testid="architect-type">
            {architectType}
          </p>
          <p className="mt-2 text-sm text-gray-600" data-testid="architect-description">
            {architectType === 'Control Freak Architect' && 
              'High level of architectural control and oversight'}
            {architectType === 'Effective Architect' && 
              'Balanced approach to architectural guidance'}
            {architectType === 'Armchair Architect' && 
              'Minimal architectural intervention'}
          </p>
        </div>
      </div>
    </div>
  );
};

Barometer.propTypes = {
  score: PropTypes.number.isRequired,
  architectType: PropTypes.string.isRequired,
};

export default Barometer; 