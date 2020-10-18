import io from 'socket.io-client';
import Player from './game/Player';

// Object defining possible client event schemas to send to the server
const clientEvents = {
  connection: {
    name: 'connection',
    data: {
      id: String,
      playerInstance: Player
    }
  }
}

class SocketClient {
  constructor() {
    this.socket = io(`ws://${process.env.REACT_APP_SOCKET_CLIENT_HOSTNAME}:${process.env.REACT_APP_SOCKET_CLIENT_PORT}`);
    this.clientEvents = clientEvents;

    // attach a connectionSuccess listener to hear back from the server if we succeeded
    this.socket.on('connectionSuccess', () => {
      console.log('socket ' + this.socket.id + ' successfully connected to the server');
    })
  }
}

export default SocketClient;