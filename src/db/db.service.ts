import { WebSocket } from 'ws';
import { EMessageTypes, MessageRes, RegDataReq, RegDataRes } from '../models';
import { AppDB, AppDataBase } from '.';
import { User, Winner, WinnersList } from '../entities';

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
}

export const AppDBService: AppDataBaseService =
  AppDataBaseService.getInstance();
