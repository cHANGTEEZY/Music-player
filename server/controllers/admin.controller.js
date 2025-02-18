import songModel from "../models/song.model";
import albumModel from "../models/album.model";
import cloudinary from "../lib/cloudinary";

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.log("Error in uploading file", error);
    throw new Error("Error uploading to cloudinary");
  }
};

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || req.files.audioFile || req.files.imageFile) {
      return res.status(400).json({ message: "Please upload all files" });
    }
    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = new songModel({
      title,
      artist,
      albumId: albumId || null,
      duration,
    });

    await song.save();

    if (albumId) {
      await Album.findIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }

    res.status(201).json({ song });
  } catch (error) {
    console.log("Error in creating song", error);
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {};
