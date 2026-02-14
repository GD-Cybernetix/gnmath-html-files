const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Enable CORS for all routes
app.use(cors());

// Serve static files from the package folder (this project root for deployment)
app.use(express.static(path.join(__dirname)));

// Add specific headers for SWF files to avoid CORS issues
app.use((req, res, next) => {
  if (req.path.endsWith(".swf")) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    // Recommended cross origin headers for embedder/opener if needed
    res.header("Cross-Origin-Embedder-Policy", "credentialless");
    res.header("Cross-Origin-Opener-Policy", "same-origin");
  }
  next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✓ Ruffle server running at http://localhost:${PORT}`);
  console.log(`✓ Open http://localhost:${PORT}/index.html to test`);
});
