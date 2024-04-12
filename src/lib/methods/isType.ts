export function isRoomGame(room: Room): room is RoomGame;
export function isRoomGame(room: Room): room is RoomGame {
  if( room === undefined ) throw new Error('isRoomGame() requires 1 parameter');
  
  return /^game#[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(room);
}
