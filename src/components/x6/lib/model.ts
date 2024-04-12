import {DataType, TypeColor} from "../types";

// 节点shape名
export const nodeShape = "model-node";
// 子表连接线shape名
export const childEdge = 'child-edge';
// 字段连接线shape名
export const fieldEdge = "field-edge";
// 每条字段行高，与渲染有关，改css就得改这个值
export const itemHeight = 40;
// 节点宽度
export const nodeWidth = 200;

// 连接桩默认样式
export const portAttr = {
  show: {
    fill: '#fff',
    stroke: '#85A5FF',
  },
  hide: {
    fill: 'transparent',
    stroke: 'transparent',
  }
}

// 连接桩名称
export const leftPortName = 'leftFieldPort';
export const rightPortName = 'rightFieldPort';

// 高亮器名称
export const portHighlightName = "highlight-only-port";
export const portHighlightClassName = "class_highlight_only_port";

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

export const lineCfg = {
  child: {name: "子表", color: "#2B2A4C"},
  relation: {name: "关系", color: "#5FBDFF"},
}

export const lineLegend = [
  {name: lineCfg.child.name, color: lineCfg.child.color, type: "solid"},
  {name: lineCfg.relation.name, color: lineCfg.relation.color, type: "dashed"},
]