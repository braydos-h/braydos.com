import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const publicDir = join(root, "public");
const appDir = join(root, "app");

mkdirSync(publicDir, { recursive: true });

const iconSvg = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="116" fill="#07090C"/>
  <rect x="1.5" y="1.5" width="509" height="509" rx="114.5" fill="none" stroke="#252B36"/>
  <path d="M142 116h74v103c16-17 39-27 67-27 60 0 101 43 101 102 0 65-46 110-112 110-40 0-72-14-96-35v28h-74V116zm70 195c0 26 21 44 48 44 30 0 52-19 52-47 0-27-22-46-52-46-28 0-48 19-48 49z" fill="#F1F4F7"/>
  <circle cx="382" cy="374" r="25" fill="#6FA8FF"/>
</svg>`;

const markSvg = `
<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" rx="15" fill="#07090C"/>
  <rect x=".5" y=".5" width="63" height="63" rx="14.5" fill="none" stroke="#2A303B"/>
  <path d="M18 14h9.2v13.1c2-2.1 4.9-3.4 8.4-3.4 7.5 0 12.7 5.4 12.7 12.8 0 8.1-5.8 13.8-14.1 13.8-5 0-9-1.8-12-4.4v3.5H18V14zm8.7 24.5c0 3.2 2.7 5.5 6 5.5 3.8 0 6.5-2.4 6.5-5.9 0-3.4-2.7-5.7-6.5-5.7-3.5 0-6 2.3-6 6.1z" fill="#F1F4F7"/>
  <circle cx="48" cy="47" r="3.1" fill="#6FA8FF"/>
</svg>`;

const ogSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="80%" cy="30%" r="65%">
      <stop offset="0" stop-color="#6FA8FF" stop-opacity=".22"/>
      <stop offset=".55" stop-color="#6FA8FF" stop-opacity=".05"/>
      <stop offset="1" stop-color="#07090C" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
      <stop stop-color="#68E2D3" stop-opacity=".65"/>
      <stop offset="1" stop-color="#6FA8FF" stop-opacity=".05"/>
    </linearGradient>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" fill="#8EA9D4" fill-opacity=".13"/>
    </pattern>
    <clipPath id="frame">
      <rect width="1200" height="630" rx="0"/>
    </clipPath>
  </defs>

  <rect width="1200" height="630" fill="#07090C"/>
  <g clip-path="url(#frame)">
    <rect width="1200" height="630" fill="url(#glow)"/>
    <rect x="70" y="54" width="1060" height="522" fill="url(#dots)" opacity=".5"/>
    <path d="M70 54v522m1060-522v522M70 54h1060M70 576h1060" stroke="#F1F4F7" stroke-opacity=".08"/>

    <g font-family="Segoe UI, Arial, sans-serif">
      <text x="70" y="100" fill="#F1F4F7" font-size="27" font-weight="700" letter-spacing="-1.5">braydos<tspan fill="#6FA8FF">.</tspan></text>
      <text x="1102" y="98" fill="#A0A9B8" font-size="13" font-family="Consolas, monospace" text-anchor="end" letter-spacing="1.5">PUBLIC WORK / @BRAYDOS-H</text>

      <text x="70" y="238" fill="#F1F4F7" font-size="84" font-weight="650" letter-spacing="-5">Security.</text>
      <text x="70" y="326" fill="#F1F4F7" font-size="84" font-weight="650" letter-spacing="-5">Networks.</text>
      <text x="70" y="414" fill="#F1F4F7" font-size="84" font-weight="650" letter-spacing="-5">Systems.<tspan fill="#6FA8FF">_</tspan></text>

      <text x="70" y="500" fill="#A0A9B8" font-size="21" letter-spacing="-.2">I build things for security, networking, and the internet.</text>
      <text x="70" y="546" fill="#6D7685" font-size="14" font-family="Consolas, monospace" letter-spacing="1.2">BRAYDEN HABETS / SOFTWARE &amp; SECURITY ENGINEERING</text>
    </g>

    <g transform="translate(914 315)" fill="none">
      <circle r="162" stroke="#F1F4F7" stroke-opacity=".1"/>
      <circle r="112" stroke="#F1F4F7" stroke-opacity=".12"/>
      <circle r="62" stroke="#F1F4F7" stroke-opacity=".17"/>
      <path d="M-190 0H190M0-190V190" stroke="#F1F4F7" stroke-opacity=".08" stroke-dasharray="3 7"/>
      <path d="M-138 -84C-80 -63 -34 -122 13 -83S88 -28 134 -53" stroke="url(#line)" stroke-width="1.6" stroke-dasharray="5 8"/>
      <path d="M-158 100C-75 74 -20 126 35 66S115 27 167 45" stroke="#F1F4F7" stroke-opacity=".14"/>

      <circle cx="-80" cy="-53" r="5" fill="#68E2D3"/>
      <circle cx="99" cy="-90" r="4" fill="#6FA8FF"/>
      <circle cx="132" cy="55" r="4" fill="#A192FF"/>
      <circle cx="-88" cy="98" r="3" fill="#F1F4F7" fill-opacity=".6"/>

      <rect x="-41" y="-41" width="82" height="82" rx="18" fill="#0C1016" stroke="#343D4C"/>
      <text x="0" y="13" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="40" font-weight="650" fill="#F1F4F7" letter-spacing="-2">b<tspan fill="#6FA8FF">.</tspan></text>
      <text x="0" y="72" text-anchor="middle" font-family="Consolas, monospace" font-size="9" fill="#8893A5" letter-spacing="1.2">FIELD / 01</text>
    </g>

    <text x="1130" y="528" fill="#F1F4F7" fill-opacity=".25" font-family="Consolas, monospace" font-size="11" text-anchor="end" letter-spacing="1.6">BRAYDOS.COM</text>
  </g>
</svg>`;

writeFileSync(join(publicDir, "favicon.svg"), markSvg.trim());
writeFileSync(join(appDir, "icon.svg"), markSvg.trim());
writeFileSync(join(publicDir, "og-source.svg"), ogSvg.trim());

await Promise.all([
  sharp(Buffer.from(iconSvg)).resize(192, 192).png().toFile(join(publicDir, "icon-192.png")),
  sharp(Buffer.from(iconSvg)).resize(512, 512).png().toFile(join(publicDir, "icon-512.png")),
  sharp(Buffer.from(iconSvg)).resize(180, 180).png().toFile(join(publicDir, "apple-icon.png")),
  sharp(Buffer.from(ogSvg)).png().toFile(join(publicDir, "og.png")),
]);

console.log("Generated favicon, app icon, Apple icon, and Open Graph image.");
