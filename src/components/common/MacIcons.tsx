import { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

/**
 * macOS Finder Icon
 * Two-tone split smiling face with authentic macOS blue tones and squircle base.
 */
export const MacFinderIcon = ({ className = 'w-12 h-12', ...props }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" {...props}>
    <defs>
      <linearGradient id="finder-bg" x1="64" y1="0" x2="64" y2="128" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#8AD2FF" />
        <stop offset="40%" stopColor="#3598F7" />
        <stop offset="100%" stopColor="#0B67DB" />
      </linearGradient>
      <linearGradient id="finder-right" x1="64" y1="0" x2="128" y2="128" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#B6E4FF" />
        <stop offset="50%" stopColor="#67B6FF" />
        <stop offset="100%" stopColor="#217BEA" />
      </linearGradient>
      <filter id="mac-shadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.35" />
      </filter>
      <clipPath id="squircle-clip">
        <rect x="4" y="4" width="120" height="120" rx="26" ry="26" />
      </clipPath>
    </defs>

    {/* Squircle Body with Shadow */}
    <rect x="4" y="4" width="120" height="120" rx="26" ry="26" fill="url(#finder-bg)" filter="url(#mac-shadow)" />

    <g clipPath="url(#squircle-clip)">
      {/* Right-half lighter face split */}
      <path d="M64 4H98C112.359 4 124 15.6406 124 30V98C124 112.359 112.359 124 98 124H64V4Z" fill="url(#finder-right)" />

      {/* Face Line Center Divider */}
      <path
        d="M64 16V66C64 74 72 78 72 84C72 90 64 92 64 112"
        stroke="#1A3B66"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Smiling Mouth */}
      <path
        d="M38 78C46 96 82 96 90 78"
        stroke="#1A3B66"
        strokeWidth="4.5"
        strokeLinecap="round"
      />

      {/* Left Eye */}
      <ellipse cx="44" cy="50" rx="4.5" ry="7" fill="#1A3B66" />

      {/* Right Eye */}
      <ellipse cx="84" cy="50" rx="4.5" ry="7" fill="#1A3B66" />

      {/* Top Gloss Highlight */}
      <rect x="4" y="4" width="120" height="120" rx="26" ry="26" stroke="rgba(255,255,255,0.45)" strokeWidth="2" fill="none" />
    </g>
  </svg>
);

/**
 * macOS Notes Icon
 * Notepad with yellow header band, ruled lines, and wooden pencil.
 */
export const MacNotesIcon = ({ className = 'w-12 h-12', ...props }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" {...props}>
    <defs>
      <linearGradient id="notes-paper" x1="0" y1="0" x2="0" y2="128" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFDF6" />
        <stop offset="100%" stopColor="#F6F1DF" />
      </linearGradient>
      <linearGradient id="notes-header" x1="0" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFA620" />
        <stop offset="100%" stopColor="#DF8100" />
      </linearGradient>
      <filter id="notes-shadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.3" />
      </filter>
      <clipPath id="notes-clip">
        <rect x="4" y="4" width="120" height="120" rx="26" ry="26" />
      </clipPath>
    </defs>

    <rect x="4" y="4" width="120" height="120" rx="26" ry="26" fill="url(#notes-paper)" filter="url(#notes-shadow)" />

    <g clipPath="url(#notes-clip)">
      {/* Yellow Leather/Stitch Top Bar */}
      <rect x="4" y="4" width="120" height="34" fill="url(#notes-header)" />
      {/* Stitch Perforations */}
      <line x1="4" y1="36" x2="124" y2="36" stroke="#C46E00" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Ruled Notebook Lines */}
      <line x1="20" y1="52" x2="108" y2="52" stroke="#E5DEC8" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="68" x2="108" y2="68" stroke="#E5DEC8" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="84" x2="108" y2="84" stroke="#E5DEC8" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="100" x2="108" y2="100" stroke="#E5DEC8" strokeWidth="2" strokeLinecap="round" />

      {/* Realistic Stylized Pencil */}
      <g transform="translate(68, 48) rotate(38)">
        {/* Shadow */}
        <rect x="-2" y="1" width="10" height="64" rx="2" fill="rgba(0,0,0,0.2)" />
        {/* Wooden Body */}
        <rect x="0" y="0" width="8" height="56" fill="#F4C430" />
        <rect x="2" y="0" width="4" height="56" fill="#FFE57F" />
        {/* Metal Ferrule */}
        <rect x="0" y="52" width="8" height="6" fill="#C0C0C0" />
        {/* Eraser */}
        <rect x="0" y="58" width="8" height="6" rx="2" fill="#FF708F" />
        {/* Wood cone tip */}
        <polygon points="0,0 8,0 4,-12" fill="#E8C99B" />
        {/* Graphite tip */}
        <polygon points="2,-6 6,-6 4,-12" fill="#2D2D2D" />
      </g>

      {/* Border Ring */}
      <rect x="4" y="4" width="120" height="120" rx="26" ry="26" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" />
    </g>
  </svg>
);

/**
 * macOS Preview Icon
 * Two overlapping photo snapshots and a 3D magnifying loupe.
 */
export const MacPreviewIcon = ({ className = 'w-12 h-12', ...props }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" {...props}>
    <defs>
      <linearGradient id="preview-bg" x1="0" y1="0" x2="0" y2="128" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#7CC0FF" />
        <stop offset="100%" stopColor="#1E75E8" />
      </linearGradient>
      <filter id="preview-shadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.3" />
      </filter>
      <clipPath id="preview-clip">
        <rect x="4" y="4" width="120" height="120" rx="26" ry="26" />
      </clipPath>
    </defs>

    <rect x="4" y="4" width="120" height="120" rx="26" ry="26" fill="url(#preview-bg)" filter="url(#preview-shadow)" />

    <g clipPath="url(#preview-clip)">
      {/* Background Document / Photo 1 */}
      <rect x="22" y="24" width="60" height="50" rx="6" fill="#F8FAFC" transform="rotate(-8 22 24)" opacity="0.9" />

      {/* Foreground Photo 2 with landscape */}
      <g transform="translate(34, 30)">
        <rect x="0" y="0" width="68" height="56" rx="6" fill="#FFFFFF" />
        {/* Photo Canvas */}
        <rect x="4" y="4" width="60" height="48" rx="3" fill="#38BDF8" />
        {/* Mountain */}
        <polygon points="4,52 30,22 46,38 64,52" fill="#0284C7" />
        <polygon points="26,52 46,28 64,52" fill="#0369A1" />
        {/* Sun */}
        <circle cx="50" cy="16" r="5" fill="#FDE047" />
      </g>

      {/* 3D Magnifying Glass Loupe */}
      <g transform="translate(68, 62) rotate(42)">
        {/* Loupe handle */}
        <rect x="-4" y="24" width="8" height="32" rx="3" fill="#1E293B" />
        <rect x="-2" y="24" width="4" height="32" rx="1.5" fill="#475569" />
        <rect x="-4" y="20" width="8" height="5" fill="#CBD5E1" />
        {/* Loupe rim */}
        <circle cx="0" cy="0" r="22" stroke="#E2E8F0" strokeWidth="5" fill="none" />
        <circle cx="0" cy="0" r="22" stroke="#64748B" strokeWidth="2" fill="none" />
        {/* Glass glare */}
        <circle cx="0" cy="0" r="19" fill="rgba(255,255,255,0.25)" />
        <path d="M-12 -12 A 17 17 0 0 1 12 -12" stroke="rgba(255,255,255,0.8)" strokeWidth="3" strokeLinecap="round" />
      </g>

      <rect x="4" y="4" width="120" height="120" rx="26" ry="26" stroke="rgba(255,255,255,0.45)" strokeWidth="2" fill="none" />
    </g>
  </svg>
);

/**
 * macOS Terminal Icon
 * Sleek dark basalt squircle with `>_` prompt.
 */
export const MacTerminalIcon = ({ className = 'w-12 h-12', ...props }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" {...props}>
    <defs>
      <linearGradient id="term-bg" x1="0" y1="0" x2="0" y2="128" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2E2E32" />
        <stop offset="60%" stopColor="#18181A" />
        <stop offset="100%" stopColor="#0B0B0C" />
      </linearGradient>
      <filter id="term-shadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.4" />
      </filter>
      <clipPath id="term-clip">
        <rect x="4" y="4" width="120" height="120" rx="26" ry="26" />
      </clipPath>
    </defs>

    <rect x="4" y="4" width="120" height="120" rx="26" ry="26" fill="url(#term-bg)" filter="url(#term-shadow)" />

    <g clipPath="url(#term-clip)">
      {/* Subtle Window Header Line */}
      <line x1="4" y1="28" x2="124" y2="28" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

      {/* Terminal prompt: > */}
      <path
        d="M28 44L52 64L28 84"
        stroke="#E6E6E6"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Terminal Cursor: _ */}
      <line
        x1="62"
        y1="84"
        x2="98"
        y2="84"
        stroke="#34D399"
        strokeWidth="9"
        strokeLinecap="round"
      />

      {/* Subtle Inner Screen Glow */}
      <radialGradient id="term-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(52, 211, 153, 0.08)" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
      <rect x="4" y="4" width="120" height="120" fill="url(#term-glow)" />

      {/* Outer Squircle Ring Highlight */}
      <rect x="4" y="4" width="120" height="120" rx="26" ry="26" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
    </g>
  </svg>
);

/**
 * macOS Mail Icon
 * Deep blue gradient with a flying white post envelope.
 */
export const MacMailIcon = ({ className = 'w-12 h-12', ...props }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" {...props}>
    <defs>
      <linearGradient id="mail-bg" x1="0" y1="0" x2="0" y2="128" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#3CA2FF" />
        <stop offset="40%" stopColor="#1C79F2" />
        <stop offset="100%" stopColor="#0A4CC2" />
      </linearGradient>
      <linearGradient id="envelope-front" x1="0" y1="0" x2="0" y2="50" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E2E8F0" />
      </linearGradient>
      <filter id="mail-shadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.35" />
      </filter>
      <clipPath id="mail-clip">
        <rect x="4" y="4" width="120" height="120" rx="26" ry="26" />
      </clipPath>
    </defs>

    <rect x="4" y="4" width="120" height="120" rx="26" ry="26" fill="url(#mail-bg)" filter="url(#mail-shadow)" />

    <g clipPath="url(#mail-clip)">
      {/* 3D Envelope */}
      <g transform="translate(18, 36)">
        {/* Envelope Base Shadow */}
        <rect x="0" y="4" width="92" height="58" rx="8" fill="rgba(0,0,0,0.2)" filter="blur(2px)" />

        {/* Envelope Back/Interior */}
        <rect x="0" y="0" width="92" height="58" rx="8" fill="url(#envelope-front)" />

        {/* Inner Flap Lines */}
        <path
          d="M0 0L46 36L92 0"
          stroke="#CBD5E1"
          strokeWidth="3.5"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Lower V-folds */}
        <path
          d="M0 58L34 26"
          stroke="#E2E8F0"
          strokeWidth="3"
        />
        <path
          d="M92 58L58 26"
          stroke="#E2E8F0"
          strokeWidth="3"
        />

        {/* Stamp in upper right of letter */}
        <rect x="66" y="8" width="16" height="20" rx="2" fill="#EF4444" opacity="0.9" />
        <circle cx="74" cy="18" r="4" fill="#FFFFFF" />
      </g>

      <rect x="4" y="4" width="120" height="120" rx="26" ry="26" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" />
    </g>
  </svg>
);

/**
 * macOS System Settings Icon
 * Metallic space-gray background with interlocking mechanical precision gears.
 */
export const MacSettingsIcon = ({ className = 'w-12 h-12', ...props }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" {...props}>
    <defs>
      <linearGradient id="gear-bg" x1="0" y1="0" x2="0" y2="128" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#7E8088" />
        <stop offset="40%" stopColor="#55575E" />
        <stop offset="100%" stopColor="#3C3D43" />
      </linearGradient>
      <linearGradient id="gear-metal" x1="0" y1="0" x2="0" y2="70" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ECEEF2" />
        <stop offset="100%" stopColor="#A1A4AC" />
      </linearGradient>
      <filter id="settings-shadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.4" />
      </filter>
      <clipPath id="settings-clip">
        <rect x="4" y="4" width="120" height="120" rx="26" ry="26" />
      </clipPath>
    </defs>

    <rect x="4" y="4" width="120" height="120" rx="26" ry="26" fill="url(#gear-bg)" filter="url(#settings-shadow)" />

    <g clipPath="url(#settings-clip)">
      {/* Big Main Center Gear */}
      <g transform="translate(64, 64)">
        {/* 8 teeth */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <rect
            key={angle}
            x="-7"
            y="-38"
            width="14"
            height="14"
            rx="3"
            fill="url(#gear-metal)"
            transform={`rotate(${angle})`}
          />
        ))}

        {/* Gear Outer Circle */}
        <circle cx="0" cy="0" r="30" fill="url(#gear-metal)" />
        {/* Recessed Ring */}
        <circle cx="0" cy="0" r="19" fill="#4B4D54" />
        {/* Center Hub */}
        <circle cx="0" cy="0" r="12" fill="url(#gear-metal)" />
        <circle cx="0" cy="0" r="7" fill="#242528" />
      </g>

      {/* Small Interlocking Gear (Top Right) */}
      <g transform="translate(102, 28) scale(0.65)">
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <rect
            key={angle}
            x="-6"
            y="-32"
            width="12"
            height="12"
            rx="2.5"
            fill="url(#gear-metal)"
            transform={`rotate(${angle})`}
          />
        ))}
        <circle cx="0" cy="0" r="26" fill="url(#gear-metal)" />
        <circle cx="0" cy="0" r="13" fill="#4B4D54" />
        <circle cx="0" cy="0" r="6" fill="#242528" />
      </g>

      <rect x="4" y="4" width="120" height="120" rx="26" ry="26" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" />
    </g>
  </svg>
);

/**
 * macOS Trash Icon
 * Translucent wireframe / frosted basket.
 */
export const MacTrashIcon = ({ className = 'w-12 h-12', ...props }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" {...props}>
    <defs>
      <linearGradient id="trash-metal" x1="0" y1="0" x2="0" y2="128" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="50%" stopColor="#94A3B8" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
      <filter id="trash-shadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.3" />
      </filter>
    </defs>

    <g filter="url(#trash-shadow)" transform="translate(20, 16)">
      {/* Top Rim Ellipse */}
      <ellipse cx="44" cy="16" rx="38" ry="10" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2.5" />
      <ellipse cx="44" cy="16" rx="34" ry="7" fill="#1E293B" />

      {/* Crumpled paper inside */}
      <circle cx="40" cy="13" r="6" fill="#F8FAFC" />
      <circle cx="48" cy="14" r="5" fill="#38BDF8" opacity="0.8" />
      <circle cx="34" cy="15" r="4" fill="#F1F5F9" />

      {/* Basket Body (Mesh Grid Ribs) */}
      <path
        d="M10 18L20 84C21 91 30 96 44 96C58 96 67 91 68 84L78 18"
        fill="rgba(255, 255, 255, 0.15)"
        stroke="#CBD5E1"
        strokeWidth="2.5"
      />

      {/* Vertical Ribs */}
      <line x1="26" y1="22" x2="32" y2="86" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <line x1="38" y1="24" x2="40" y2="92" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="24" x2="48" y2="92" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <line x1="62" y1="22" x2="56" y2="86" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />

      {/* Horizontal Reinforcing Rings */}
      <path d="M14 42C22 47 66 47 74 42" stroke="#94A3B8" strokeWidth="1.5" fill="none" />
      <path d="M17 64C24 69 64 69 71 64" stroke="#94A3B8" strokeWidth="1.5" fill="none" />

      {/* Bottom Rim */}
      <ellipse cx="44" cy="88" rx="24" ry="6" stroke="#64748B" strokeWidth="2" fill="none" />
    </g>
  </svg>
);

/**
 * Macintosh HD Icon
 * Classic Apple silver internal drive.
 */
export const MacHardDriveIcon = ({ className = 'w-12 h-12', ...props }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" {...props}>
    <defs>
      <linearGradient id="hd-metal" x1="0" y1="0" x2="0" y2="128" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ECEEF2" />
        <stop offset="50%" stopColor="#C4C7D0" />
        <stop offset="100%" stopColor="#8A8E9B" />
      </linearGradient>
      <filter id="hd-shadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.35" />
      </filter>
    </defs>

    <g filter="url(#hd-shadow)" transform="translate(14, 20)">
      {/* Drive Base Enclosure */}
      <rect x="6" y="8" width="88" height="72" rx="12" fill="url(#hd-metal)" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />

      {/* Dark Bezel / Platter View */}
      <rect x="14" y="16" width="72" height="42" rx="6" fill="#18191D" />

      {/* Silver Circular Disc Platter */}
      <circle cx="50" cy="37" r="16" fill="#94A3B8" />
      <circle cx="50" cy="37" r="6" fill="#334155" />
      <circle cx="50" cy="37" r="2" fill="#E2E8F0" />

      {/* Bottom Section Plate */}
      <rect x="14" y="64" width="72" height="10" rx="3" fill="#3C3F48" />

      {/* Green LED Status Light */}
      <circle cx="78" cy="69" r="2.5" fill="#22C55E" />
      <circle cx="78" cy="69" r="4" fill="#22C55E" opacity="0.4" />
    </g>
  </svg>
);

/**
 * macOS Photos Icon
 * Signature multi-colored flower petals on clean white squircle.
 */
export const MacPhotosIcon = ({ className = 'w-12 h-12', ...props }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} fill="none" {...props}>
    <defs>
      <linearGradient id="photos-bg" x1="0" y1="0" x2="0" y2="128" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#ECEEF3" />
      </linearGradient>
      <filter id="photos-shadow" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.3" />
      </filter>
      <clipPath id="photos-clip">
        <rect x="4" y="4" width="120" height="120" rx="26" ry="26" />
      </clipPath>
    </defs>

    {/* Squircle Base */}
    <rect x="4" y="4" width="120" height="120" rx="26" ry="26" fill="url(#photos-bg)" filter="url(#photos-shadow)" />

    <g clipPath="url(#photos-clip)">
      {/* 8 Flower Petals radiating from center (64, 64) */}
      <g transform="translate(64, 64)">
        {/* Top: Cyan / Blue */}
        <g transform="rotate(0)">
          <path d="M-11 -38 C-11 -45 11 -45 11 -38 L11 -12 C11 -4 -11 -4 -11 -12 Z" fill="#00C7FF" opacity="0.9" />
        </g>
        {/* Top-Right: Sky Blue */}
        <g transform="rotate(45)">
          <path d="M-11 -38 C-11 -45 11 -45 11 -38 L11 -12 C11 -4 -11 -4 -11 -12 Z" fill="#007AFF" opacity="0.9" />
        </g>
        {/* Right: Purple */}
        <g transform="rotate(90)">
          <path d="M-11 -38 C-11 -45 11 -45 11 -38 L11 -12 C11 -4 -11 -4 -11 -12 Z" fill="#5856D6" opacity="0.9" />
        </g>
        {/* Bottom-Right: Magenta */}
        <g transform="rotate(135)">
          <path d="M-11 -38 C-11 -45 11 -45 11 -38 L11 -12 C11 -4 -11 -4 -11 -12 Z" fill="#AF52DE" opacity="0.9" />
        </g>
        {/* Bottom: Pink / Red */}
        <g transform="rotate(180)">
          <path d="M-11 -38 C-11 -45 11 -45 11 -38 L11 -12 C11 -4 -11 -4 -11 -12 Z" fill="#FF2D55" opacity="0.9" />
        </g>
        {/* Bottom-Left: Orange */}
        <g transform="rotate(225)">
          <path d="M-11 -38 C-11 -45 11 -45 11 -38 L11 -12 C11 -4 -11 -4 -11 -12 Z" fill="#FF9500" opacity="0.9" />
        </g>
        {/* Left: Yellow */}
        <g transform="rotate(270)">
          <path d="M-11 -38 C-11 -45 11 -45 11 -38 L11 -12 C11 -4 -11 -4 -11 -12 Z" fill="#FFCC00" opacity="0.9" />
        </g>
        {/* Top-Left: Green */}
        <g transform="rotate(315)">
          <path d="M-11 -38 C-11 -45 11 -45 11 -38 L11 -12 C11 -4 -11 -4 -11 -12 Z" fill="#34C759" opacity="0.9" />
        </g>
        {/* Center Blend Core */}
        <circle cx="0" cy="0" r="13" fill="#FFFFFF" opacity="0.95" />
      </g>

      {/* Gloss border */}
      <rect x="4" y="4" width="120" height="120" rx="26" ry="26" stroke="rgba(255,255,255,0.7)" strokeWidth="2" fill="none" />
    </g>
  </svg>
);
