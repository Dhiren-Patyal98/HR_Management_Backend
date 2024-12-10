const Candidate = require("../Models/candidates");
const path = require("path");
const fs = require("fs");

const createCandidate = async (req, res) => {
  try {
    const { name, email, phone, position, experience } = req.body;

    const resume = req.file ? req.file.path.replace(/\\/g, "/") : null;

    if (!resume) {
      return res.status(400).json({ error: "Resume file is required" });
    }

    const newCandidate = new Candidate({
      name,
      email,
      phone,
      position,
      experience,
      resume,
      status: "New",
    });

    await newCandidate.save();

    res.status(201).json({
      message: "Candidate created successfully!",
      candidate: newCandidate,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();

    if (!candidates || candidates.length === 0) {
      return res.status(404).json({ message: "No candidates found" });
    }

    const formattedCandidates = candidates.map((item) => ({
      ...item.toObject(),
      resume: item.resume.replace(/\\/g, "/"),
    }));

    res.status(200).json({
      message: "Candidates fetched successfully",
      candidates: formattedCandidates,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCandidate = await Candidate.findByIdAndDelete(id);

    if (!deletedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json({
      message: "Candidate deleted successfully",
      candidate: deletedCandidate,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCandidateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (
      !status ||
      !["New", "Scheduled", "Selected", "Rejected"].includes(status)
    ) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const updatedCandidate = await Candidate.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json({
      message: "Candidate status updated successfully",
      candidate: updatedCandidate,
    });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: error.message });
  }
};

const downloadResume = (req, res) => {
  const fileName = req.params.filename;

  const filePath = path.join(__dirname, "..", "uploads", "resumes", fileName);

  res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

  res.download(filePath, fileName, (err) => {
    if (err) {
      console.error("Error while downloading file:", err);
      res.status(500).send("Error downloading file.");
    }
  });
};

exports.downloadResume = downloadResume;
exports.updateCandidateStatus = updateCandidateStatus;
exports.deleteCandidate = deleteCandidate;
exports.getAllCandidates = getAllCandidates;
exports.createCandidate = createCandidate;
