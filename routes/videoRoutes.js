const express = require("express");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

ffmpeg.setFfmpegPath(ffmpegPath);

router.post("/merge", upload.array("videos"), async (req, res) => {
  const files = req.files;

  if (!files.length) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  const normalizedFiles = [];

  // STEP 1: Normalize timestamps for each video
  for (let f of files) {
    const normalizedPath = `uploads/normalized_${f.filename}.mp4`;

    await new Promise((resolve, reject) => {
      ffmpeg(f.path)
        .outputOptions([
  "-vf", "scale=1280:720,fps=30,setpts=PTS-STARTPTS",
  "-af", "aresample=async=1,asetpts=PTS-STARTPTS"
])
        .on("end", resolve)
        .on("error", reject)
        .save(normalizedPath);
    });

    normalizedFiles.push(normalizedPath);
  }

  // Create concat list
  const listFile = "uploads/list.txt";
  let txt = "";
  normalizedFiles.forEach(f => {
    txt += `file '${path.resolve(f)}'\n`;
  });
  fs.writeFileSync(listFile, txt);

  const output = "uploads/final.mp4";

  // STEP 2: Merge normalized videos
  ffmpeg()
    .input(listFile)
    .inputOptions(["-f concat", "-safe 0"])
    .outputOptions([
      "-c:v libx264",
      "-preset veryfast",
      "-crf 23",
      "-c:a aac",
      "-b:a 192k"
    ])
    .save(output)
    .on("end", () => {
      res.download(output, "final.mp4", () => {
        // Cleanup
        files.forEach(f => fs.unlinkSync(f.path));
        normalizedFiles.forEach(f => fs.unlinkSync(f));
        fs.unlinkSync(listFile);
        fs.unlinkSync(output);
      });
    })
    .on("error", err => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
