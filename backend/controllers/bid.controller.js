import Bid from "../models/bid.model.js";
import { Project } from "../models/project.model.js";
import User from "../models/user.model.js";

export const createBid = async (req, res) => {
  const { projectId, userId, freelancerId, bidAmount, proposal } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found!" });
    }

    if (String(project.userId) !== userId) {
      return res.status(400).json({ error: "Client ID mismatch!" });
    }

    const freelancer = await User.findById(freelancerId);
    if (!freelancer) {
      return res.status(404).json({ error: "Freelancer not found!" });
    }
    if (freelancer.isClient) {
      return res
        .status(400)
        .json({ error: "Only freelancers can place bids!" });
    }

    const newBid = new Bid({
      projectId,
      userId,
      freelancerId,
      bidAmount,
      proposal,
    });

    await newBid.save();
    return res.status(201).json(newBid);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

export const getBidsByProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    const bids = await Bid.find({ projectId }).populate(
      "freelancerId",
      "name email img"
    );
    return res.status(200).json(bids);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

export const getBidById = async (req, res) => {
  const { id } = req.params;

  try {
    const bid = await Bid.findById(id).populate(
      "freelancerId",
      "name email img"
    );
    if (!bid) {
      return res.status(404).json({ error: "Bid not found!" });
    }
    return res.status(200).json(bid);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

export const updateBid = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedBid = await Bid.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBid) {
      return res.status(404).json({ error: "Bid not found!" });
    }
    return res.status(200).json(updatedBid);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

export const deleteBid = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBid = await Bid.findByIdAndDelete(id);
    if (!deletedBid) {
      return res.status(404).json({ error: "Bid not found!" });
    }
    return res.status(200).json({ message: "Bid deleted successfully!" });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

export const approveBid = async (req, res) => {
  const { id } = req.params;

  try {
    const bid = await Bid.findById(id);
    if (!bid) {
      return res.status(404).json({ error: "Bid not found!" });
    }

    const project = await Project.findById(bid.projectId);
    if (!project) {
      return res
        .status(400)
        .json({
          error: "Cannot approve bid for a closed or non-existent project!",
        });
    }

    bid.isApproved = true;
    await bid.save();

    project.status = "closed";
    await project.save();

    return res.status(200).json({ message: "Bid approved successfully!", bid });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
