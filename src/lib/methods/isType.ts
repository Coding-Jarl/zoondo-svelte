export function isRoomGame(room: Room): room is RoomGame {
  return room.startsWith('game#');
}