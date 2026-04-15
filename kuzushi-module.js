/**
 * Kuzushi module wrapper for randori-plugin.
 * Exposes PASTA threat modeling commands as ModuleTools.
 */

import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadCommand(name) {
  try {
    return readFileSync(join(__dirname, "commands", `${name}.md`), "utf-8");
  } catch {
    return "";
  }
}

function createAgentTool(name, toolName, description, inputSchema) {
  const commandPrompt = loadCommand(name);
  return {
    name: toolName,
    description,
    inputSchema,
    headless: true,
    async execute(input, ctx) {
      const params = input ?? {};
      const target = params.target ?? ctx.target ?? ".";
      const prompt = `${commandPrompt}\n\nTarget: ${target}\n${
        params.stages ? `Stages: ${params.stages}` : ""
      }${params.format ? `\nFormat: ${params.format}` : ""}`.trim();

      try {
        let text = "";
        for await (const msg of ctx.runtime.query(prompt, {
          systemPrompt: "You are a security threat modeling expert using the PASTA methodology.",
          tools: ["Read", "Glob", "Grep", "Bash"],
        })) {
          if (msg.type === "result") text = msg.text ?? text;
          else if (msg.type === "assistant" && msg.content) {
            for (const block of msg.content) {
              if (block.type === "text") text += block.text;
            }
          }
        }
        return { ok: true, output: text || "Analysis complete." };
      } catch (err) {
        return { ok: false, output: `Randori error: ${err.message ?? err}` };
      }
    },
  };
}

export default {
  id: "randori",
  displayName: "Randori PASTA Threat Modeling",
  category: "intel",
  version: "1.0.0",
  description:
    "7-stage PASTA threat modeling with STRIDE classification, " +
    "ATT&CK mapping, DFD generation, and evidence-anchored risk assessment.",
  tools: [
    createAgentTool("pasta", "randori:pasta",
      "Run full PASTA threat modeling analysis (stages S1-S7) on a target repository.",
      {
        type: "object",
        properties: {
          target: { type: "string", description: "Path to the repository." },
          stages: { type: "string", description: "Comma-separated stages to run (e.g. s1,s2,s3,s4)." },
          format: { type: "string", enum: ["json", "md", "mermaid"], description: "Output format." },
        },
        required: ["target"],
      }),
    createAgentTool("s4-threats", "randori:threats",
      "Run STRIDE threat analysis (PASTA Stage 4) — identify threats with evidence anchors.",
      {
        type: "object",
        properties: {
          target: { type: "string", description: "Path to the repository." },
        },
        required: ["target"],
      }),
    createAgentTool("s6-attacks", "randori:attack-tree",
      "Generate attack trees from identified threats (PASTA Stage 6).",
      {
        type: "object",
        properties: {
          target: { type: "string", description: "Path to the repository." },
        },
        required: ["target"],
      }),
    createAgentTool("s7-risk", "randori:risk-score",
      "Calculate risk scores using VerSprite probabilistic model (PASTA Stage 7).",
      {
        type: "object",
        properties: {
          target: { type: "string", description: "Path to the repository." },
        },
        required: ["target"],
      }),
    createAgentTool("threat-report", "randori:report",
      "Generate a comprehensive threat model report.",
      {
        type: "object",
        properties: {
          target: { type: "string", description: "Path to the repository." },
          format: { type: "string", enum: ["json", "md"], description: "Report format." },
        },
        required: ["target"],
      }),
  ],
};
