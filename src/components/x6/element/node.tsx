import React, {memo, useEffect, useRef, useState} from 'react';
import "./index.css";
import {INode} from "../types";
import Item from "./item";
import {Graph, Node} from "@antv/x6";
import {itemHeight, nodeWidth, portAttr} from "../lib/model";

interface NodeProp {
  node: Node,
  graph: Graph,
}

function ModelNode(props: NodeProp) {
  const {node, graph} = props;
  const {data: propData, id: nodeID} = node.getProp();
  const {data, title, id} = propData as INode;
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleHeight, setHeight] = useState(38);

  useEffect(() => {
    const titH = titleRef?.current?.getBoundingClientRect?.()?.height ?? 38;
    setHeight(titH);
    node.setSize({
      height: titH + itemHeight * data.length + data.length + 1,
      width: nodeWidth,
    })
  }, [titleRef.current])

  const showPort = (e: any) => {
    // @ts-ignore
    const isPort = e?.relatedTarget?.getAttribute?.("class") === "x6-port-body";
    const currentId = e?.relatedTarget?.getAttribute?.("port")?.split?.("/")?.[1];
    if (isPort && currentId === id) {
      onMouseEnter()
    } else {
      onMouseLeave(e)
    }
  }

  useEffect(() => {
    // graph.on("node:mousemove", showPort);
    document.addEventListener("mouseenter", showPort);
    return () => {
      document.removeEventListener("mouseenter", showPort);
    }
  }, []);

  // 鼠标进入时显示连接桩
  const onMouseEnter = () => {
    const ports = node.getPorts() || []
    ports.forEach((port) => {
      node.setPortProp(port.id!, 'attrs/circle', portAttr.show)
    })
  }

  // 鼠标进入时隐藏连接桩
  const onMouseLeave = (e: any) => {
    // todo 利用时间差处理显隐问题
    const isPort = e?.relatedTarget?.getAttribute?.("class") === "x6-port-body";
    const currentId = e?.relatedTarget?.getAttribute?.("port")?.split?.("/")?.[1];
    console.log(isPort, currentId === id)
    if (isPort && currentId === id) {
      return
    }
    const ports = node.getPorts() || []
    ports.forEach((port) => {
      node.setPortProp(port.id!, 'attrs/circle', portAttr.hide)
    })
  }

  return (
    <div className="rect_node">
      <div className="rect_title" ref={titleRef}>{title}</div>
      <div
        className="main_data"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {
          data.map((item, idx) => (
            <Item
              key={idx}
              item={item}
              parentID={id}
              index={idx}
              node={node}
              graph={graph}
              titleHeight={titleHeight}
            />
          ))
        }
      </div>
    </div>
  );
}

export default memo(ModelNode);