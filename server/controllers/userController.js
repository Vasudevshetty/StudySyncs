const User = require("../models/user");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Add Bookmark
exports.addBookmark = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from authenticated user
    const { resource } = req.body; // Extract resource details from the request body

    // Ensure the resource has the required fields
    if (!resource.title || !resource.url || !resource.type) {
      return res.status(400).json({
        status: "fail",
        message: "Resource must have title, url, and type",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    // Check if resource is already bookmarked
    const isAlreadyBookmarked = user.bookmarks.some(
      (item) => item.url === resource.url && item.type === resource.type
    );

    if (isAlreadyBookmarked) {
      return res.status(400).json({
        status: "fail",
        message: "Resource already bookmarked",
      });
    }

    user.bookmarks.push(resource);
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: "Resource added to bookmarks",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Remove Bookmark
exports.removeBookmark = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from authenticated user
    const { resource } = req.body; // Extract resource details from the request body

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    // Check if resource is bookmarked
    const isBookmarked = user.bookmarks.some(
      (item) => item.url === resource.url && item.type === resource.type
    );

    if (!isBookmarked) {
      return res.status(400).json({
        status: "fail",
        message: "Resource not found in bookmarks",
      });
    }

    user.bookmarks = user.bookmarks.filter(
      (item) => !(item.url === resource.url && item.type === resource.type)
    );
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: "Resource removed from bookmarks",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Add Download
exports.addDownload = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from authenticated user
    const { resource } = req.body; // Extract resource details from the request body

    // Ensure the resource has the required fields
    if (!resource.title || !resource.url || !resource.type) {
      return res.status(400).json({
        status: "fail",
        message: "Resource must have title, url, and type",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    // Check if resource is already downloaded
    const isAlreadyDownloaded = user.downloads.some(
      (item) => item.url === resource.url && item.type === resource.type
    );

    if (isAlreadyDownloaded) {
      return res.status(400).json({
        status: "fail",
        message: "Resource already downloaded",
      });
    }

    user.downloads.push(resource);
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: "Resource added to downloads",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Remove Download
exports.removeDownload = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from authenticated user
    const { resource } = req.body; // Extract resource details from the request body

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    // Check if resource is downloaded
    const isDownloaded = user.downloads.some(
      (item) => item.url === resource.url && item.type === resource.type
    );

    if (!isDownloaded) {
      return res.status(400).json({
        status: "fail",
        message: "Resource not found in downloads",
      });
    }

    user.downloads = user.downloads.filter(
      (item) => !(item.url === resource.url && item.type === resource.type)
    );
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: "Resource removed from downloads",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
