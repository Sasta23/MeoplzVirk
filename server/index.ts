import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from 'resend';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Middleware til at læse JSON fra kontaktformularen
  app.use(express.json());

  // Initialisér Resend med din API-nøgle
  const resend = new Resend('re_bZxHujBd_7Qiq2J3GcCt4thoue25hbDLo');

  // Definer stien til de statiske filer (frontend)
  const distPath = path.resolve(__dirname, "..", "dist", "public");

  // ✅ FIXED ROUTE
  app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;

    console.log("Modtaget data:", req.body);

    try {
      await resend.emails.send({
        from: 'Meo Studio <onboarding@resend.dev>',
        to: 'meostudiodk@gmail.com',
        subject: `Ny besked: ${subject}`,
        html: `
          <h2>Ny besked fra din hjemmeside 🚀</h2>

          <p><strong>Navn:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Emne:</strong> ${subject}</p>

          <hr/>

          <p><strong>Besked:</strong></p>
          <p>${message}</p>
        `
      });

      console.log("Mail er sendt succesfuldt via Resend!");
      res.status(200).json({ success: true, message: "Mail sendt korrekt!" });

    } catch (error) {
      console.error("Fejl ved afsendelse af mail:", error);
      res.status(500).json({ success: false, error: "Kunne ikke sende mail" });
    }
  });

  // Håndtering af statiske filer og routing
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    app.get("/", (_req, res) => {
      res.send("Backend kører! Brug din frontend på http://localhost:5173");
    });

    app.get("*", (req, res) => {
      if (req.url.startsWith('/api/')) {
        res.status(404).json({ error: "API route findes ikke" });
      } else {
        res.status(404).send("Siden findes ikke. Husk at køre din frontend (pnpm dev) i en separat terminal.");
      }
    });
  }

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`-----------------------------------------------`);
    console.log(`SERVER KØRER: http://localhost:${port}/`);
    console.log(`Husk at køre frontenden separat på port 5173`);
    console.log(`-----------------------------------------------`);
  });
}

startServer().catch(console.error);