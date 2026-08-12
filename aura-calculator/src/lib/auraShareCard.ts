// ===== CANVAS SHARE-CARD IMAGE GENERATOR =====
// Draws an ink-sketch style share card entirely on a <canvas> and
// returns it as a PNG data URL (100% client-side).

const INK = "#14110c";
const INK_SOFT = "#3d382f";
const PAPER = "#fbfaf6";

export type ShareCardData = {
  score: number;
  tierName: string;
  emoji: string;
  color: string;
  mode: "full" | "quick" | "scan";
  label?: string;
};

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawStamp(ctx: CanvasRenderingContext2D, text: string, cx: number, y: number) {
  ctx.save();
  ctx.translate(cx, y);
  ctx.rotate(-0.03);
  ctx.strokeStyle = INK;
  ctx.lineWidth = 5;
  roundRect(ctx, -170, -30, 340, 60, 4);
  ctx.stroke();
  ctx.font = "bold 30px 'Courier New', monospace";
  ctx.fillStyle = INK;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 0, 4);
  ctx.restore();
}

function drawCrosshatch(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.1;
  for (let x = -500; x < 1600; x += 24) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 700, 1500);
    ctx.stroke();
  }
  ctx.restore();
}

function drawRadar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  fill: string
) {
  const axes = 5;
  ctx.save();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  // Grid rings
  for (let level = 0.25; level <= 1.0; level += 0.25) {
    ctx.beginPath();
    for (let i = 0; i <= axes; i++) {
      const angle = (i / axes) * Math.PI * 2 - Math.PI / 2;
      const x = cx + Math.cos(angle) * radius * level;
      const y = cy + Math.sin(angle) * radius * level;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }
  // Axis spokes
  for (let i = 0; i < axes; i++) {
    const angle = (i / axes) * Math.PI * 2 - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
    ctx.stroke();
  }
  // Data blob
  ctx.beginPath();
  for (let i = 0; i <= axes; i++) {
    const angle = (i / axes) * Math.PI * 2 - Math.PI / 2;
    const r = radius * (0.45 + Math.random() * 0.4);
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.globalAlpha = 0.35;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.lineWidth = 3;
  ctx.strokeStyle = INK;
  ctx.stroke();
  ctx.restore();
}

export async function generateAuraShareCard(data: ShareCardData): Promise<string> {
  const W = 1080;
  const H = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");

  // Paper background
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);

  // Subtle grain dots
  ctx.fillStyle = INK;
  for (let i = 0; i < 900; i++) {
    ctx.globalAlpha = Math.random() * 0.05;
    ctx.fillRect(Math.random() * W, Math.random() * H, 2, 2);
  }
  ctx.globalAlpha = 1;

  drawCrosshatch(ctx);

  // Outer sketch frame
  ctx.strokeStyle = INK;
  ctx.lineWidth = 8;
  roundRect(ctx, 44, 44, W - 88, H - 88, 4);
  ctx.stroke();
  ctx.lineWidth = 3;
  ctx.globalAlpha = 0.5;
  ctx.setLineDash([18, 14]);
  roundRect(ctx, 70, 70, W - 140, H - 140, 4);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;

  drawStamp(ctx, data.mode === "full" ? "AURA EVALUATION" : data.mode === "scan" ? "AURA SCAN" : "QUICK AURA CHECK", W / 2, 150);

  // Emoji emblem
  ctx.font = "200px 'Arial Black', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = INK;
  ctx.fillText(data.emoji, W / 2, 400);

  // Radial aura glow behind emblem
  const glow = ctx.createRadialGradient(W / 2, 400, 20, W / 2, 400, 240);
  glow.addColorStop(0, `${data.color}55`);
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(W / 2, 400, 240, 0, Math.PI * 2);
  ctx.fill();

  // Tier name
  ctx.font = "bold 64px 'Arial Black', sans-serif";
  ctx.fillStyle = INK;
  ctx.textAlign = "center";
  ctx.fillText(data.tierName, W / 2, 590);

  // Label (anime name for quick check)
  if (data.label && data.label !== data.tierName) {
    ctx.font = "bold 36px 'Courier New', monospace";
    ctx.fillStyle = INK_SOFT;
    ctx.fillText(`— ${data.label} —`, W / 2, 655);
  }

  // Divider line
  ctx.strokeStyle = INK;
  ctx.lineWidth = 4;
  ctx.globalAlpha = 0.6;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 260, 700);
  ctx.lineTo(W / 2 + 260, 700);
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Radar
  drawRadar(ctx, W / 2, 890, 210, data.color);

  // Score
  ctx.font = "bold 110px 'Courier New', monospace";
  ctx.fillStyle = INK;
  ctx.fillText(data.score.toLocaleString(), W / 2, 1140);

  ctx.font = "bold 26px 'Courier New', monospace";
  ctx.fillStyle = INK_SOFT;
  ctx.fillText("FINAL AURA SCORE", W / 2, 1195);

  // Footer
  ctx.font = "bold 30px 'Courier New', monospace";
  ctx.fillStyle = INK;
  ctx.globalAlpha = 0.85;
  ctx.fillText("AURA·CALCULATOR", W / 2, 1270);
  ctx.globalAlpha = 1;

  return canvas.toDataURL("image/png");
}

export async function downloadAuraShareCard(data: ShareCardData): Promise<void> {
  const url = await generateAuraShareCard(data);
  const a = document.createElement("a");
  a.href = url;
  a.download = data.mode === "full" ? "aura-share-card.png" : data.mode === "scan" ? "aura-scan-card.png" : "aura-quick-card.png";
  document.body.appendChild(a);
  a.click();
  a.remove();
}
