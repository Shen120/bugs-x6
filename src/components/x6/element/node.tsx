import React from 'react';
import "./index.css";
import {INode} from "../types";
import Item from "./item";
import {Graph, Node} from "@antv/x6";

interface NodeProp {
  node: Node,
  graph: Graph,
}

function ModelNode(props: NodeProp) {
  const {node, graph} = props;
  const {data: propData} = node.getProp();
  const {data, title, id} = propData as INode;

  return (
    <div className="rect_node">
      <div className="rect_title">{title}</div>
      <div className="main_data">
        {
          data.map((item, idx) => (
            <Item
              key={idx}
              item={item}
              parentID={id}
              index={idx}
              node={node}
              graph={graph}
            />
          ))
        }
      </div>
    </div>
  );
}

export default ModelNode;