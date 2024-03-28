declare global {
  namespace Chat {
    type Message = {
      id: string;
      room: Room;
      user_id: string;
      content: string;
      created_at: number;
    };
  }
}
export {};
