const express = require("express");
const upload = require("../Middlewares/multerConfig");
const candidateControllers = require("../Controllers/candidateController");

const router = express.Router();

router.post(
  "/create",
  upload.single("resume"),
  candidateControllers.createCandidate
);
router.get("/candidates", candidateControllers.getAllCandidates);
router.delete("/delete/:id", candidateControllers.deleteCandidate);
router.put("/update-status/:id", candidateControllers.updateCandidateStatus);
router.get("/uploads/resumes/:filename", candidateControllers.downloadResume);

module.exports = router;
