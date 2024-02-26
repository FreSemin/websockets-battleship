import { WebSocket } from 'ws';
import {
  AddUserToRoomReq,
  EMessageTypes,
  Game,
  GameAddShipsReq,
  GameDataRes,
  MessageRes,
  PlayerData,
  RegDataReq,
  RegDataRes,
  Room,
  RoomsDataRes,
  StartGameRes,
  GameTurnRes,
  UpdateWinnersRes,
  User,
  Winner,
} from '../models';
import { AppDB, AppDataBase } from '.';
import { WinnersList } from './entities';
import { isAllPlayersSetShips } from '../utils';

class AppDataBaseService {
  private static instance: AppDataBaseService;

  private appDB: AppDataBase;

  // TODO: private or public?
  public clients: Map<string, WebSocket> = new Map();

  private winnersList: WinnersList;

  constructor() {
    this.appDB = AppDB;
    this.winnersList = new WinnersList();
  }

  static getInstance(): AppDataBaseService {
    if (!this.instance) {
      this.instance = new AppDataBaseService();
    }
    return this.instance;
  }

  regUser(data: string, ws: WebSocket): void {
    const parsedData: RegDataReq = JSON.parse(data);

    const user: User = this.appDB.userRepository.create(parsedData);

    this.regClient(ws, user);

    this.sendRegRes(ws, user);

    const winner: Winner = new Winner({ name: user.name });

    this.winnersList.addWinner(winner);

    this.sendUpdatedWinners();

    this.getRooms(ws);
  }

  regClient(ws: WebSocket, user: User): void {
    this.clients.set(user.index, ws);
  }

  sendRegRes(ws: WebSocket, user: User): void {
    const regResponse: MessageRes<RegDataRes> = new MessageRes<RegDataRes>(
      EMessageTypes.reg,
      {
        index: user.index,
        name: user.name,
        error: false,
        errorText: '',
      },
    );

    ws.send(regResponse.toJSON());
  }

  sendUpdatedWinners(): void {
    const winners: Winner[] = this.winnersList.getAllWinners();

    const updateWinnersResponse: MessageRes<UpdateWinnersRes> =
      new MessageRes<UpdateWinnersRes>(EMessageTypes.updateWinners, winners);

    const winnersResJSON: string = updateWinnersResponse.toJSON();

    this.clients.forEach((ws: WebSocket) => {
      ws.send(winnersResJSON);
    });
  }

  createRoom(): void {
    this.appDB.roomRepository.create();

    this.sendUpdatedRooms();
  }

  getRooms(ws: WebSocket): void {
    const rooms: Room[] = this.appDB.roomRepository.findAll();

    const roomsResponse: MessageRes<RoomsDataRes> =
      new MessageRes<RoomsDataRes>(EMessageTypes.updateRoom, rooms);

    ws.send(roomsResponse.toJSON());
  }

  sendUpdatedRooms(): void {
    const rooms: Room[] = this.appDB.roomRepository.findAll();

    const roomsResponse: MessageRes<RoomsDataRes> =
      new MessageRes<RoomsDataRes>(EMessageTypes.updateRoom, rooms);

    const roomsResJSON: string = roomsResponse.toJSON();

    this.clients.forEach((ws: WebSocket) => {
      ws.send(roomsResJSON);
    });
  }

  addUserToRoom(data: string, ws: WebSocket): void {
    const parsedData: AddUserToRoomReq = JSON.parse(data);

    const clientsArr: [string, WebSocket][] = Array.from(
      this.clients.entries(),
    );

    const clientInfo: [string, WebSocket] | undefined = clientsArr.find(
      (el) => el[1] === ws,
    );

    if (clientInfo) {
      const user: User | null = this.appDB.userRepository.findOneById(
        clientInfo[0],
      );

      if (user) {
        const room: Room | null = this.appDB.roomRepository.addUserToRoom(
          parsedData.indexRoom,
          user,
        );

        if (room?.roomUsers.length === 2) {
          this.createGameForRoom(room);
        }
      }

      this.sendUpdatedRooms();
    } else {
      // TODO: throw error!
    }
  }

  createGameForRoom(room: Room): void {
    const game: Game = this.appDB.gameRepository.create(room);

    game.playersData.forEach((player: PlayerData) => {
      const client: WebSocket | undefined = this.clients.get(player.playerId);

      const gameResponse: MessageRes<GameDataRes> = new MessageRes<GameDataRes>(
        EMessageTypes.createGame,
        {
          idGame: game.gameId,
          idPlayer: player.playerId,
        },
      );

      if (client) {
        client.send(gameResponse.toJSON());
      }
    });
  }

  addShipsToGame(data: string): void {
    const parsedData: GameAddShipsReq = JSON.parse(data);

    const gameData: Game | null =
      this.appDB.gameRepository.addPlayersShips(parsedData);

    if (gameData) {
      const isGameReadyForStart: boolean = isAllPlayersSetShips(gameData);

      if (isGameReadyForStart) {
        gameData.playersData.forEach((playerData) => {
          const client: WebSocket | undefined = this.clients.get(
            playerData.playerId,
          );

          const startGameResponse: MessageRes<StartGameRes> =
            new MessageRes<StartGameRes>(EMessageTypes.startGame, {
              currentPlayerIndex: playerData.playerId,
              ships: playerData.ships,
            });

          if (client) {
            client.send(startGameResponse.toJSON());
          }

          this.sendPlayerTurn(gameData);
        });
      }
    }
  }

  sendPlayerTurn(game: Game): void {
    game.playersData.forEach((playerData) => {
      const client: WebSocket | undefined = this.clients.get(
        playerData.playerId,
      );

      const turnResponse: MessageRes<GameTurnRes> = new MessageRes<GameTurnRes>(
        EMessageTypes.turn,
        {
          currentPlayer: game.playersData[game.playerTurn].playerId,
        },
      );

      if (client) {
        client.send(turnResponse.toJSON());
      }
    });
  }
}

export const AppDBService: AppDataBaseService =
  AppDataBaseService.getInstance();
