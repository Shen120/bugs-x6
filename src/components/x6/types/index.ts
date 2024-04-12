import {Cell, Graph, Node, Edge} from "@antv/x6";

interface NodeEventCommonArgs {
  node: Node;
}
interface EdgeEventCommonArgs {
  edge: Edge;
}

export type ShapeType = "circle" | 'rect';
export type Position = "up" | "left" | "down" | "right";

export interface RectPoint {
  x: number;
  y: number;
  width: number;
  height: number;
  shapeType: ShapeType;
}

export type PointOffset = Omit<RectPoint, "width" | "height" | "shapeType">;

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
  index: number,
  titleHeight?: number,
}

export interface GraphCtx {
  graph?: Graph;
  expandOption: {
    expand: {[key: string]: any[]},
    onChange?: (nodeId: string, expandValue: any[]) => void,
  }
}

export type NodeAddEvent = NodeEventCommonArgs & {
  cell: Cell<Cell.Properties>
  index: number
  options: Cell.SetOptions
};

export type NodeRemoveEvent = NodeEventCommonArgs & {
  cell: Cell<Cell.Properties>;
  index: number;
  options: Cell.RemoveOptions
}
export type NodeChangeEvent = NodeEventCommonArgs & { cell: Cell<Cell.Properties>; options: Cell.MutateOptions }

export type EdgeAddEvent = EdgeEventCommonArgs & {
  cell: Cell<Cell.Properties>;
  index: number;
  options: Cell.SetOptions
}
export type EdgeRemoveEvent = EdgeEventCommonArgs & {
  cell: Cell<Cell.Properties>;
  index: number;
  options: Cell.RemoveOptions
}
export type EdgeChangeEvent = EdgeEventCommonArgs & { cell: Cell<Cell.Properties>; options: Cell.MutateOptions }

export interface X6ReactProps {
  onNodeAdded?: (e: NodeAddEvent) => void;
  onNodeRemoved?: (e: NodeRemoveEvent) => void;
  onNodeChanged?: (e: NodeChangeEvent) => void;

  onEdgeAdded?: (e: EdgeAddEvent) => void;
  onEdgeRemoved?: (e: EdgeRemoveEvent) => void;
  onEdgeChanged?: (e: EdgeChangeEvent) => void;
  onRenderDone?: () => void;
}