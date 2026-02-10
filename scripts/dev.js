import { spawn } from "node:child_process";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const processes = [];
let isShuttingDown = false;
const __filename = fileURLToPath(import.meta.url);
const projectDir = path.resolve(path.dirname(__filename), "..");
const viteBin = path.join(projectDir, "node_modules", "vite", "bin", "vite.js");

function findAvailablePort(startPort) {
  return new Promise((resolve, reject) => {
    const tryPort = (port) => {
      const server = net.createServer();
      server.unref();

      server.on("error", (error) => {
        if (error.code === "EADDRINUSE") {
          tryPort(port + 1);
        } else {
          reject(error);
        }
      });

      server.listen(port, () => {
        const { port: availablePort } = server.address();
        server.close(() => resolve(availablePort));
      });
    };

    tryPort(startPort);
  });
}

function run(name, command, args, env = process.env, cwd = projectDir) {
  const child = spawn(command, args, {
    stdio: "inherit",
    env,
    cwd,
  });

  processes.push(child);

  child.on("exit", (code) => {
    if (!isShuttingDown && code !== 0) {
      console.error(`${name} exited with code ${code}`);
      shutdown(1);
    }
  });

  child.on("error", (error) => {
    console.error(`${name} failed to start:`, error);
    shutdown(1);
  });
}

function shutdown(exitCode = 0) {
  if (isShuttingDown) return;
  isShuttingDown = true;

  for (const child of processes) {
    if (!child.killed) {
      child.kill();
    }
  }

  process.exit(exitCode);
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

async function start() {
  const apiPort = await findAvailablePort(5000);
  const apiBaseUrl = `http://localhost:${apiPort}`;

  console.log(`[dev] API base URL: ${apiBaseUrl}`);

  run("API", process.execPath, ["server.js"], {
    ...process.env,
    PORT: String(apiPort),
  });

  run("Client", process.execPath, [viteBin], {
    ...process.env,
    VITE_VERIFY_API_BASE_URL: apiBaseUrl,
    VITE_API_BASE_URL: apiBaseUrl,
    BROWSERSLIST_IGNORE_OLD_DATA: "true",
  });
}

start().catch((error) => {
  console.error("Failed to start dev environment:", error);
  shutdown(1);
});