const express = require("express");
const multer = require("multer");
const upload = multer();

const {
  analyzeImageWithGemini,
  analyzeFaceAttributes,
  verifyFaceLock,
  readDocument,
  generateCaption,
  analyzeThumbnail,
  cropSuggestion,
  renameFile,
  generateProductListing
} = require("../controllers/giminiAiphotoController");

const router = express.Router();

router.post("/analyze", upload.single("image"), analyzeImageWithGemini);
router.post("/face-attributes", upload.single("image"), analyzeFaceAttributes);
router.post("/verify-face-lock", upload.single("unlockImage"), verifyFaceLock );
router.post("/read-document", upload.single("document"), readDocument);
router.post("/caption-generator", upload.single("image"), generateCaption);
router.post("/thumbnail-analyze", upload.single("image"), analyzeThumbnail);
router.post("/crop-suggestion", upload.single("image"), cropSuggestion);
router.post("/rename-file", upload.single("file"), renameFile);
router.post("/generate-product-listing", upload.single("image"), generateProductListing);

module.exports = router;
