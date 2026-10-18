import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// SVG 01: Top half - Forehead, wet curls, amber shield glasses, eyes
const svg1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%">
  <defs>
    <linearGradient id="skinGrad1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f2dfd5"/>
      <stop offset="60%" stop-color="#dfc5b8"/>
      <stop offset="100%" stop-color="#cfb0a2"/>
    </linearGradient>
    <radialGradient id="eyeglassGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f97316" stop-opacity="0.85"/>
      <stop offset="85%" stop-color="#ea580c" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#c2410c" stop-opacity="0.98"/>
    </radialGradient>
    <linearGradient id="hairGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#080808"/>
      <stop offset="50%" stop-color="#141414"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient>
  </defs>

  <!-- High-Key Studio Backdrop -->
  <rect width="100%" height="100%" fill="#ffffff"/>

  <!-- Subtle Studio Shadow Grid -->
  <line x1="160" y1="120" x2="1760" y2="120" stroke="#f0f0f0" stroke-width="1"/>
  <line x1="160" y1="960" x2="1760" y2="960" stroke="#f0f0f0" stroke-width="1"/>

  <!-- Head Base / Skin -->
  <path d="M 660 1080 L 660 700 Q 670 420 960 410 Q 1250 420 1260 700 L 1260 1080 Z" fill="url(#skinGrad1)"/>

  <!-- Nose Bridge Top -->
  <path d="M 935 900 Q 960 920 985 900 L 980 1080 L 940 1080 Z" fill="#c4a597"/>

  <!-- Eyes and Brows -->
  <!-- Left Eyebrow -->
  <path d="M 770 780 Q 840 760 915 785 Q 850 780 770 780 Z" fill="#141414"/>
  <!-- Right Eyebrow -->
  <path d="M 1005 785 Q 1080 760 1150 780 Q 1070 780 1005 785 Z" fill="#141414"/>
  
  <!-- Left Eye -->
  <ellipse cx="850" cy="820" rx="42" ry="16" fill="#f8fafc"/>
  <circle cx="850" cy="820" r="14" fill="#38241b"/>
  <circle cx="850" cy="820" r="6" fill="#050505"/>
  <circle cx="854" cy="816" r="3" fill="#ffffff"/>
  
  <!-- Right Eye -->
  <ellipse cx="1070" cy="820" rx="42" ry="16" fill="#f8fafc"/>
  <circle cx="1070" cy="820" r="14" fill="#38241b"/>
  <circle cx="1070" cy="820" r="6" fill="#050505"/>
  <circle cx="1074" cy="816" r="3" fill="#ffffff"/>

  <!-- Translucent Amber / Orange Shield Sunglasses -->
  <g id="sunglasses" opacity="0.92">
    <!-- Left Lens -->
    <path d="M 720 810 Q 850 770 945 810 Q 940 920 860 930 Q 730 920 720 810 Z" fill="url(#eyeglassGrad)"/>
    <!-- Right Lens -->
    <path d="M 975 810 Q 1070 770 1200 810 Q 1190 920 1060 930 Q 980 920 975 810 Z" fill="url(#eyeglassGrad)"/>
    <!-- Center Nose Bridge Glass Connector -->
    <path d="M 940 810 L 980 810 L 970 850 L 950 850 Z" fill="#ea580c"/>
    <!-- Clear Crystal Frame & Temples -->
    <path d="M 710 805 Q 840 765 960 800 Q 1080 765 1210 805" fill="none" stroke="#ffffff" stroke-width="6" opacity="0.8"/>
    <!-- Lens Highlight Reflections -->
    <path d="M 750 810 L 890 800" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
    <path d="M 1030 800 L 1170 810" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
  </g>

  <!-- Wet Curly Dark Hair -->
  <g fill="url(#hairGrad)">
    <!-- Main Hair Mass -->
    <path d="M 640 680 Q 650 340 960 320 Q 1270 340 1280 680 Q 1250 560 1180 500 Q 1080 440 960 450 Q 840 440 740 500 Q 670 560 640 680 Z"/>
    
    <!-- Organic Wet Curl Strands Falling on Forehead -->
    <path d="M 720 480 Q 740 580 760 690 Q 750 630 735 550 Z"/>
    <path d="M 780 460 Q 810 560 820 680 Q 800 620 790 530 Z"/>
    <path d="M 850 450 Q 870 570 890 710 Q 870 640 860 520 Z"/>
    <path d="M 920 440 Q 940 560 950 720 Q 930 630 925 510 Z"/>
    <path d="M 980 445 Q 990 580 970 710 Q 975 620 985 520 Z"/>
    <path d="M 1030 450 Q 1060 560 1080 690 Q 1050 620 1040 510 Z"/>
    <path d="M 1110 470 Q 1140 570 1150 670 Q 1130 610 1120 530 Z"/>
    <path d="M 1180 510 Q 1210 600 1220 680 Q 1200 620 1190 560 Z"/>

    <!-- Subtle Hair Sheen -->
    <path d="M 820 380 Q 960 360 1100 380 Q 960 400 820 380 Z" fill="#333333" opacity="0.5"/>
  </g>

  <!-- Editorial Watermark / Caption Overlay -->
  <g font-family="-apple-system, sans-serif" font-size="11" letter-spacing="0.1em" fill="#666666">
    <text x="160" y="80">WORKS, THOM BROWNE S25</text>
    <text x="1760" y="80" text-anchor="end">IMAGE 01 // SPLIT TOP (100VW x 100VH)</text>
  </g>
</svg>`;

// SVG 02: Bottom half - Philtrum, mustache, lips, jawline, tailored black jacket with pleats
const svg2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%">
  <defs>
    <linearGradient id="skinGrad2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#cfb0a2"/>
      <stop offset="40%" stop-color="#dfc5b8"/>
      <stop offset="100%" stop-color="#c5a698"/>
    </linearGradient>
    <linearGradient id="jacketFabric" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1c1c1f"/>
      <stop offset="50%" stop-color="#141416"/>
      <stop offset="100%" stop-color="#0d0d0f"/>
    </linearGradient>
    <linearGradient id="collarInner" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#242428"/>
      <stop offset="100%" stop-color="#141416"/>
    </linearGradient>
  </defs>

  <!-- High-Key Studio Backdrop -->
  <rect width="100%" height="100%" fill="#ffffff"/>

  <!-- Subtle Studio Shadow Grid -->
  <line x1="160" y1="120" x2="1760" y2="120" stroke="#f0f0f0" stroke-width="1"/>
  <line x1="160" y1="960" x2="1760" y2="960" stroke="#f0f0f0" stroke-width="1"/>

  <!-- Face / Jawline Base (Aligns seamlessly with top frame) -->
  <path d="M 680 0 L 1240 0 L 1220 220 Q 1160 360 960 380 Q 760 360 700 220 Z" fill="url(#skinGrad2)"/>

  <!-- Nose Tip & Nostrils -->
  <path d="M 940 0 Q 960 40 980 0 Z" fill="#b38f80"/>
  <ellipse cx="935" cy="18" rx="8" ry="4" fill="#3a2822"/>
  <ellipse cx="985" cy="18" rx="8" ry="4" fill="#3a2822"/>
  <path d="M 945 15 Q 960 22 975 15" stroke="#b38f80" stroke-width="2" fill="none"/>

  <!-- Philtrum -->
  <path d="M 952 24 L 950 65" stroke="#c09e91" stroke-width="2"/>
  <path d="M 968 24 L 970 65" stroke="#c09e91" stroke-width="2"/>

  <!-- Mustache -->
  <path d="M 880 75 Q 960 55 1040 75 Q 960 95 880 75 Z" fill="#181818"/>
  <path d="M 870 70 Q 960 50 1050 70" stroke="#252525" stroke-width="4"/>

  <!-- Lips -->
  <path d="M 915 95 Q 960 88 1005 95 Q 960 115 915 95 Z" fill="#b07d72"/>
  <line x1="910" y1="95" x2="1010" y2="95" stroke="#683d37" stroke-width="2.5"/>
  <path d="M 920 96 Q 960 120 1000 96 Z" fill="#c98a7f"/>

  <!-- Chin Stubble / Beard -->
  <path d="M 860 150 Q 960 140 1060 150 Q 960 340 860 150 Z" fill="#1f1f1f" opacity="0.85"/>
  
  <!-- Neck Shadow -->
  <path d="M 780 280 L 1140 280 L 1120 480 L 800 480 Z" fill="#9d7e72"/>

  <!-- Tailored Black Thom Browne Pleated Overshirt / Jacket -->
  <g id="jacket">
    <!-- Main Jacket Body -->
    <path d="M 360 1080 L 520 420 L 760 340 L 960 440 L 1160 340 L 1400 420 L 1560 1080 Z" fill="url(#jacketFabric)"/>

    <!-- High Standing Mandarin / Funnel Collar -->
    <!-- Left Collar Wing -->
    <path d="M 760 340 L 840 220 L 960 250 L 960 440 Z" fill="url(#collarInner)" stroke="#38383c" stroke-width="1.5"/>
    <!-- Right Collar Wing -->
    <path d="M 1160 340 L 1080 220 L 960 250 L 960 440 Z" fill="url(#collarInner)" stroke="#38383c" stroke-width="1.5"/>

    <!-- Center Placket Front Closure -->
    <rect x="940" y="440" width="40" height="640" fill="#161618" stroke="#2f2f35" stroke-width="1"/>
    <!-- Hidden Placket Stitch Lines -->
    <line x1="945" y1="440" x2="945" y2="1080" stroke="#252528" stroke-width="2"/>
    <line x1="975" y1="440" x2="975" y2="1080" stroke="#252528" stroke-width="2"/>

    <!-- Left Chest Tailored Stitched Pleats (Tucks) -->
    <g stroke="#3a3a42" stroke-width="2">
      <!-- Pleat 1 -->
      <line x1="840" y1="400" x2="840" y2="1080"/>
      <line x1="846" y1="400" x2="846" y2="1080" stroke="#0f0f10" stroke-width="1"/>
      <!-- Pleat 2 -->
      <line x1="865" y1="400" x2="865" y2="1080"/>
      <line x1="871" y1="400" x2="871" y2="1080" stroke="#0f0f10" stroke-width="1"/>
      <!-- Pleat 3 -->
      <line x1="890" y1="410" x2="890" y2="1080"/>
      <line x1="896" y1="410" x2="896" y2="1080" stroke="#0f0f10" stroke-width="1"/>
    </g>

    <!-- Right Chest Tailored Stitched Pleats (Tucks) -->
    <g stroke="#3a3a42" stroke-width="2">
      <!-- Pleat 1 -->
      <line x1="1080" y1="400" x2="1080" y2="1080"/>
      <line x1="1074" y1="400" x2="1074" y2="1080" stroke="#0f0f10" stroke-width="1"/>
      <!-- Pleat 2 -->
      <line x1="1055" y1="400" x2="1055" y2="1080"/>
      <line x1="1049" y1="400" x2="1049" y2="1080" stroke="#0f0f10" stroke-width="1"/>
      <!-- Pleat 3 -->
      <line x1="1030" y1="410" x2="1030" y2="1080"/>
      <line x1="1024" y1="410" x2="1024" y2="1080" stroke="#0f0f10" stroke-width="1"/>
    </g>

    <!-- Shoulder Yoke & Armhole Seams -->
    <path d="M 520 420 Q 640 460 760 340" stroke="#2c2c30" stroke-width="2" fill="none"/>
    <path d="M 1400 420 Q 1280 460 1160 340" stroke="#2c2c30" stroke-width="2" fill="none"/>
  </g>

  <!-- Editorial Watermark / Caption Overlay -->
  <g font-family="-apple-system, sans-serif" font-size="11" letter-spacing="0.1em" fill="#666666">
    <text x="160" y="80">WORKS, THOM BROWNE S25</text>
    <text x="1760" y="80" text-anchor="end">IMAGE 02 // SPLIT BOTTOM (100VW x 100VH)</text>
  </g>
</svg>`;

// Write primary files
fs.writeFileSync(path.join(publicDir, 'Man_wearing_jacket_and_sunglasses_2K_20261018054146-split.jpg'), svg1);
fs.writeFileSync(path.join(publicDir, 'Man_wearing_jacket_and_sunglasses_2K_20261018054146-split (1).jpg'), svg2);

// Also write clean alias files for standard asset paths
fs.writeFileSync(path.join(publicDir, 'slide-01.svg'), svg1);
fs.writeFileSync(path.join(publicDir, 'slide-02.svg'), svg2);
fs.writeFileSync(path.join(publicDir, 'slide-01.jpg'), svg1);
fs.writeFileSync(path.join(publicDir, 'slide-02.jpg'), svg2);

console.log('Successfully generated public image assets!');
