import {DataType, TypeColor} from "../types";

// 连接桩名称
export const leftPortName = 'leftFieldPort';
export const rightPortName = 'rightFieldPort';

export const typeColorMap: TypeColor = {
  [DataType.int]: {color: "#41C9E2"},
  [DataType.bigint]: {color: "#ACE2E1"},
  [DataType.float]: {color: "#FFF455"},
  [DataType.double]: {color: "#C5FF95"},
  [DataType.char]: {color: "#A3FFD6"},
  [DataType.varchar]: {color: "#FB9AD1"},
  [DataType.text]: {color: "#C4E4FF"},
  [DataType.time]: {color: "#97E7E1"},
  [DataType.datetime]: {color: "#D20062"},
  [DataType.timestamp]: {color: "#15F5BA"},
  [DataType.bool]: {color: "#FF9800"},
  [DataType.blob]: {color: "#FF7ED4"},
  [DataType.arr]: {color: "#F9F07A"},
  [DataType.json]: {color: "#FEC7B4"},
  [DataType.enum]: {color: "#FDAF7B"},
}