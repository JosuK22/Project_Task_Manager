const Assignee = require('../model/assigneeModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// Get all assignees
exports.getAssignees = catchAsync(async (req, res, next) => {
  const assignees = await Assignee.find();

  res.status(200).json({
    status: 'success',
    results: assignees.length,
    data: assignees,
  });
});

// Create a new assignee
exports.createAssignee = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const newAssignee = new Assignee({ email });
  const savedAssignee = await newAssignee.save();

  res.status(201).json({
    status: 'success',
    data: savedAssignee,
  });
});

// Get a single assignee by ID
exports.getAssignee = catchAsync(async (req, res, next) => {
  const { assigneeId } = req.params;
  const assignee = await Assignee.findById(assigneeId);

  if (!assignee) {
    throw new AppError('Assignee not found', 404);
  }

  res.status(200).json({
    status: 'success',
    data: assignee,
  });
});

// Update an assignee by ID
exports.updateAssignee = catchAsync(async (req, res, next) => {
  const { assigneeId } = req.params;
  const { email } = req.body;

  const updatedAssignee = await Assignee.findByIdAndUpdate(
    assigneeId,
    { email },
    { new: true, runValidators: true }
  );

  if (!updatedAssignee) {
    throw new AppError('Assignee not found', 404);
  }

  res.status(200).json({
    status: 'success',
    data: updatedAssignee,
  });
});

// Delete an assignee by ID
exports.deleteAssignee = catchAsync(async (req, res, next) => {
  const { assigneeId } = req.params;

  const deletedAssignee = await Assignee.findByIdAndDelete(assigneeId);

  if (!deletedAssignee) {
    throw new AppError('Assignee not found', 404);
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
