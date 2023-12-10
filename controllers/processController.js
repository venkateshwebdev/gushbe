const Process = require("../models/ProcessModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getProcesses = catchAsync(async (req, res, next) => {
  // step 1: Grab all Processes.
  const processes = await Process.find({ user: req.user });
  res.status(200).json({
    message: "All Processes loaded successfully",
    data: processes,
  });
});

exports.getProcess = catchAsync(async (req, res, next) => {
  const process = await Process.findById(req.params.id);
  if (!process) return next(new AppError("No Process found with that ID", 404));
  return res.status(200).json({
    message: "Process fetched successfully",
    data: process,
  });
});

exports.createProcess = catchAsync(async (req, res, next) => {
  if (!req.body)
    res.status(400).json({ message: "Bad options passed! check them" });
  req.body.user = req.user;
  const newProcess = new Process(req.body);
  await newProcess.save();
  res.status(202).json({
    message: "New Process created successfully",
    data: newProcess,
  });
});

exports.deleteProcess = catchAsync(async (req, res, next) => {
  const deletingProcess = await Process.findByIdAndDelete(req.params.id);
  if (!deletingProcess)
    return next(new AppError("Process failed to delete", 401));
  res.status(200).json({
    message: "Process deleted successfully",
    data: deletingProcess,
  });
});

exports.updateProcess = catchAsync(async (req, res, next) => {
  if (!req.body)
    res.status(400).json({ message: "Bad options passed! check them" });
  const process = await Process.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!process) {
    return next(new AppError("No Process found with that ID", 404));
  }
  res.status(200).json({
    message: "Process updated successfully",
    data: process,
  });
});
