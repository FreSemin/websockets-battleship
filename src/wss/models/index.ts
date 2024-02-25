export enum EMessageTypes {
  reg = 'reg',
}

// TODO: data only string?
export type Message<T extends MessageDataTypes> = {
  type: EMessageTypes;
  data: T;
  id: number;
};

export type MessageDataTypes = RegDataReq | RegDataRes | string;

export type RegDataReq = {
  name: string;
  password: string;
};

export type RegDataRes = {
  name: string;
  index: number | string;
  error: boolean;
  errorText: string;
};
