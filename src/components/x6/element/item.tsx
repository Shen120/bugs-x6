import React, {useContext, useEffect, useRef} from 'react';
import "./index.css";
import {IItemParams} from "../types";
import {leftPortName, typeColorMap} from "../lib/model";
import {GraphContext} from "../context";

function Item(props: IItemParams) {
  const {item, node, parentID, index, graph,} = props;

  const itemNode = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!itemNode.current) return
    console.log(2222, itemNode.current)
    const rect = itemNode.current!.getBoundingClientRect();
    const point = graph.clientToLocal(rect.x, rect.y);
    console.log(rect, point)
    node.addPort({
      id: `${parentID}/${item.id}`,
      index: index,
      group: leftPortName,
      args: {
        x: point.x,
        y: point.y
      }
    })
  }, [itemNode.current])

  return (
    <div className="node_item" ref={itemNode}>
      <div className="node_item_left">
        <div
          className="node_item_icon"
          style={{
            backgroundColor: typeColorMap[item.dataType].color,
          }}
        >
          {item.dataType.toUpperCase().substring(0, 2)}
        </div>
        <span className="node_item_txt">{item.label}</span>
      </div>
      <div className="node_item_right">
        <span className="node_item_type">{item.dataType}</span>
      </div>
    </div>
  );
}

export default Item;