import { reset } from 'redux-form';

export const connectToChannel = (socket, roomId) => {
  return (dispatch) => {
    if (!socket) { return false; }
    const channel = socket.channel(`rooms:${roomId}`);

    channel.on('message_created', (message) => {
      dispatch({ type: 'MESSAGE_CREATED', message });
    });

    channel.join().receive('ok', (response) => {
      dispatch({ type: 'ROOM_CONNECTED_TO_CHANNEL', response, channel })
    });

    return false;
  };
}

export const leaveChannel = channel => {
  return (dispatch) => {
    if (channel) {
      channel.leave();
    }
    dispatch({ type: 'USER_LEFT_ROOM' });
  };
}

export const createMessage = (channel, data) =>
  (dispatch) => new Promise((resolve, reject) =>
    channel.push('new_message', data)
      .receive('ok', () => resolve(
        dispatch(reset('newMessage'))
      ))
      .receive('error', () => reject()));
