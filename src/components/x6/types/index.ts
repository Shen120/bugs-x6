import {Graph, Node} from "@antv/x6";

export interface IItem {
  dataType: DataType;
  label: string;
  id: string,
  children?: IItem[],
}

export interface INode {
  title: string;
  data: IItem[],
  id: string;
}

export enum DataType {
  int = "int",
  bigint = "bigint",
  float = 'float',
  double = "double",
  char = "char",
  varchar = 'varchar',
  text = "text",
  time = "time",
  datetime = "datetime",
  timestamp = "timestamp",
  bool = "boolean",
  blob = "blob",
  arr = 'array',
  json = 'json',
  enum = "enum",
}

export type TypeColor = {
  [key in DataType]: {
    color: string;
  };
};

export interface IItemParams {
  item: IItem,
  node: Node,
  graph: Graph,
  parentID: string,
  index?: number,
}

export interface GraphCtx {
  graph?: Graph
}