import Task from '../models/Task.js';

export const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join user's personal room
    socket.on('join-room', (userId) => {
      socket.join(`user-${userId}`);
      console.log(`User ${userId} joined their room`);
    });

    // Handle task updates
    socket.on('task-updated', async (taskData) => {
      try {
        const task = await Task.findById(taskData.id)
          .populate('createdBy', 'name email')
          .populate('assignedTo', 'name email');

        if (task) {
          // Notify creator
          if (task.createdBy) {
            io.to(`user-${task.createdBy._id}`).emit('task-changed', task);
          }
          // Notify assignee if different from creator
          if (task.assignedTo && task.assignedTo._id.toString() !== task.createdBy._id.toString()) {
            io.to(`user-${task.assignedTo._id}`).emit('task-changed', task);
          }
        }
      } catch (error) {
        console.error('Socket error:', error);
      }
    });

    // Handle task creation
    socket.on('task-created', async (taskData) => {
      try {
        const task = await Task.findById(taskData.id)
          .populate('createdBy', 'name email')
          .populate('assignedTo', 'name email');

        if (task && task.assignedTo) {
          io.to(`user-${task.assignedTo._id}`).emit('new-task', task);
        }
      } catch (error) {
        console.error('Socket error:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

