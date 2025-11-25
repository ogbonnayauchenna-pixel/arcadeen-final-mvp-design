import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const isApiKeyMissing = (): boolean => {
  return !process.env.API_KEY;
};

export const generateGameCode = async (prompt: string): Promise<string> => {
  if (isApiKeyMissing()) {
    console.warn("No API Key found. Returning mock game.");
    return mockGameCode(prompt);
  }

  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `
      You are an expert game developer. 
      Create a single-file HTML5 game based on the user's prompt. 
      The game must be contained entirely within a single HTML string.
      Use HTML Canvas for rendering.
      Make the game playable with arrow keys, mouse, or spacebar.
      Include a "Game Over" state with a restart button.
      The visual style should be neon, arcade-like, and dark mode.
      Return only the raw HTML code. No markdown.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    let code = response.text || "";
    code = code.replace(/```html/g, '').replace(/```/g, '');
    return code;

  } catch (error) {
    console.error("Gemini generation error:", error);
    throw new Error("Failed to generate game. Please try again.");
  }
};

export const generateGameMetadata = async (prompt: string): Promise<{ title: string, description: string, tags: string[] }> => {
  if (isApiKeyMissing()) {
    return {
      title: "Neon " + prompt.split(' ').slice(0, 2).join(' '),
      description: "A generated arcade game based on: " + prompt,
      tags: ["#AI", "#Arcade", "#Demo"]
    };
  }

  try {
    const model = 'gemini-2.5-flash';
    const response = await ai.models.generateContent({
      model,
      contents: `Generate a catchy arcade game title (max 5 words), a short description (max 15 words), and 3 hashtags for a game about: "${prompt}".`,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text || "{}";
    const json = JSON.parse(text);
    
    return {
      title: json.title || "Untitled Arcade",
      description: json.description || "A fun arcade experience.",
      tags: json.tags || ["#Indie", "#Arcade", "#Fun"]
    };

  } catch (error) {
    console.error("Metadata generation error:", error);
    return {
      title: "New Game",
      description: "A procedurally generated challenge.",
      tags: ["#New", "#Arcade"]
    };
  }
};

const mockGameCode = (prompt: string) => `
<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; background: #020617; overflow: hidden; font-family: 'Courier New', monospace; }
  canvas { display: block; width: 100%; height: 100%; }
  #ui { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: #22d3ee; display: none; }
  button { background: #22d3ee; color: #000; border: none; padding: 15px 30px; font-size: 20px; cursor: pointer; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; box-shadow: 0 0 15px #22d3ee; }
  h1 { font-size: 40px; text-shadow: 0 0 20px #22d3ee; margin-bottom: 30px; }
</style>
</head>
<body>
<div id="ui">
  <h1>GAME OVER</h1>
  <button onclick="resetGame()">PLAY AGAIN</button>
</div>
<canvas id="game"></canvas>
<script>
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
let player = { x: 50, y: height/2, dy: 0, size: 20 };
let obstacles = [];
let frame = 0;
let score = 0;
let running = true;
let gravity = 0.5;

function resetGame() {
  player.y = height/2;
  player.dy = 0;
  obstacles = [];
  score = 0;
  frame = 0;
  running = true;
  document.getElementById('ui').style.display = 'none';
  loop();
}

window.addEventListener('resize', () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; });
window.addEventListener('keydown', () => player.dy = -8);
window.addEventListener('touchstart', () => player.dy = -8);
window.addEventListener('mousedown', () => player.dy = -8);

function loop() {
  if (!running) return;
  requestAnimationFrame(loop);
  
  // Background
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#020617');
  gradient.addColorStop(1, '#0f172a');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Player
  player.dy += gravity;
  player.y += player.dy;
  ctx.fillStyle = '#22d3ee';
  ctx.shadowBlur = 20;
  ctx.shadowColor = '#22d3ee';
  ctx.fillRect(player.x, player.y, player.size, player.size);
  ctx.shadowBlur = 0;

  // Obstacles
  if (frame % 100 === 0) {
    let gap = 200;
    let topH = Math.random() * (height - gap - 100) + 50;
    obstacles.push({ x: width, w: 60, topH: topH, gap: gap });
  }

  ctx.fillStyle = '#ef4444';
  ctx.shadowBlur = 10;
  ctx.shadowColor = '#ef4444';
  
  obstacles.forEach((obs, i) => {
    obs.x -= 5;
    ctx.fillRect(obs.x, 0, obs.w, obs.topH);
    ctx.fillRect(obs.x, obs.topH + obs.gap, obs.w, height - obs.topH - obs.gap);

    if (
      player.x < obs.x + obs.w &&
      player.x + player.size > obs.x &&
      (player.y < obs.topH || player.y + player.size > obs.topH + obs.gap) || player.y > height
    ) {
      running = false;
      document.getElementById('ui').style.display = 'block';
    }

    if (obs.x + obs.w < 0) obstacles.splice(i, 1);
    if (obs.x + obs.w === player.x) score++;
  });
  ctx.shadowBlur = 0;

  // Score
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 40px Arial';
  ctx.textAlign = 'left';
  ctx.fillText(score, 30, 60);

  frame++;
}
resetGame();
</script>
</body>
</html>
`;