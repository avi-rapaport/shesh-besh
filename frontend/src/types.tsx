export interface ServerErrorResponse {
  success: false;
  error: {
    message: string;
  };
}

export interface GeneralSuccessResponse {
  success: true;
}

export interface createRoomResponse {
  success: true;
  roomCode: string;
}

export interface joinRoomResponse {
  result: { success: true; roomCode: string };
  roomState: {
    status: string;
    players: Array<{ name: string; color: string }>;
  };
}

export type createRoomResult = createRoomResponse | ServerErrorResponse;
export type joinRoomResult = joinRoomResponse | ServerErrorResponse;
export type GeneralCallbackResult =
  | GeneralSuccessResponse
  | ServerErrorResponse;
