import api from '../api';

export const fetchRooms = () =>
  dispatch => api.fetch('/rooms')
    .then(res => dispatch({ type: 'FETCH_ROOMS_SUCCESS', res }));

export const fetchUserRooms = userId =>
  dispatch => api.fetch(`/users/${userId}/rooms`)
    .then(res => dispatch({ type: 'FETCH_USER_ROOMS_SUCCESS', res }));

export const createRoom = (data, router) =>
  dispatch => api.post('/rooms', data)
    .then((response) => {
      dispatch({ type: 'CREATE_ROOM_SUCCESS', response });
      router.transitionTo(`/r/${response.data.id}`);
    });

export const joinRoom = (roomId, router) =>
  dispatch => api.post(`/rooms/${roomId}/join`)
    .then((response) => {
      dispatch({ type: 'ROOM_JOINED', response });
      router.transitionTo(`/r/${response.data.id}`);
    });
