let io
exports.socketConnection = (server) => {
  io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })
  io.on('connection', (socket) => {
    console.log('A user connected')
    socket.on('joinItemRoom', (itemId) => {
      socket.join(itemId)
    })
    socket.on('leaveItemRoom', (itemId) => {
      socket.leave(itemId)
    })
    socket.on('disconnect', () => {
      console.log('A user disconnected')
    })
  })
}

exports.sendMessage = (roomId, key) => io.to(roomId).emit(key)
