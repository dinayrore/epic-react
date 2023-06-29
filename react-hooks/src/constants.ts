export enum LocalStorageKey {
  TicTacToeSquares = 'squares',
  TicTacToeHistory = 'tic-tac-toe:history',
  TicTacToeStep = 'tic-tac-toe:step',
}

export enum Status {
  idle = 'idle',
  pending = 'pending',
  resolved = 'resolved',
  rejected = 'rejected',
}
