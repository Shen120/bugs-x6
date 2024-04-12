import React, {Component, useContext, useRef} from 'react';
import "./index.css";
import {IItemParams} from "../types";
import {childEdge, itemHeight, leftPortName, nodeShape, rightPortName, typeColorMap} from "../lib/model";
import {useUpdateEffect} from "ahooks";
import {createNonOverlapNode, guid} from "../utils";
import {GraphContext} from "../context";

function Item(props: IItemParams) {
  const {item, node, parentID, index, titleHeight, graph} = props;

  const ctx = useContext(GraphContext);
  const {expand, onChange: propExpandChange} = ctx.expandOption;
  const expandList = expand?.[parentID] ?? [];

  const itemNode = useRef<HTMLDivElement | null>(null);
  const rectBound = useRef<DOMRect | undefined>(undefined);

  // 连接桩Y坐标：item下标 * item行高 + 行高的一半 + node标题高度 + 每行的低边框
  const y = (index * itemHeight) + itemHeight / 2 + (titleHeight ?? 0) + 1;

  useUpdateEffect(() => {
    if (!itemNode.current) return
    rectBound.current = itemNode.current?.getBoundingClientRect?.();
    // 添加节点左边连接桩
    node.addPort({
      id: `${leftPortName}/${parentID}/${item.id}`,
      index: index,
      group: leftPortName,
      args: {
        x: 0,
        y,
      }
    })
    // 添加节点又边连接桩
    node.addPort({
      id: `${rightPortName}/${parentID}/${item.id}`,
      index: index,
      group: rightPortName,
      args: {
        x: node.getBBox().width,
        y,
      }
    })
  }, [itemNode.current])

  // 展开子表
  const openChild = () => {
    const offset = createNonOverlapNode(graph, node);
    const childID = `${parentID}/${item.id}/${guid()}`;
    const arr = [...expandList];
    if (arr.indexOf(item.id) > -1) {
      arr.splice(arr.indexOf(item.id), 1)
    } else {
      arr.push(item.id)
    }
    // 创建子表节点
    const childNode = graph.addNode({
      id: childID,
      shape: nodeShape,
      x: offset.x,
      y: offset.y,
      data: {
        data: item.children,
        title: `${item.label} - 子表`
      }
    });
    propExpandChange?.(parentID, arr);
    setTimeout(() => {
      // 创建相关连接线
      graph.addEdge({
        shape: childEdge,
        source: {
          cell: node.id,
          port: `${leftPortName}/${parentID}/${item.id}`,
          connectionPoint: "anchor",
          anchor: {
            name: "center",
          },
        },
        target: {
          cell: childID,
          connectionPoint: "boundary",
          anchor: {
            name: "center",
          },
        },
      })
    }, 100)
  }

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
        {
          Array.isArray(item.children)
            ? <div className="node_open_child" onClick={openChild}>
              {expandList.indexOf(item.id) > -1 ? "-" : "+"}
            </div>
            : null
        }
        <span className="node_item_type">{item.dataType}</span>
      </div>
    </div>
  );
}

export default Item;

// class Item extends Component<IItemParams, any> {
//   itemNode: HTMLDivElement | undefined;
//
//   // 展开子表
//   openChild = () => {
//     const {item, node, parentID, index, titleHeight, graph} = this.props;
//     const offset = createNonOverlapNode(graph, node);
//     const childID = `${parentID}/${item.id}/${guid()}`;
//     const arr = [...expandList];
//     if (arr.indexOf(item.id) > -1) {
//       arr.splice(arr.indexOf(item.id), 1)
//     } else {
//       arr.push(item.id)
//     }
//     // 创建子表节点
//     const childNode = graph.addNode({
//       id: childID,
//       shape: nodeShape,
//       x: offset.x,
//       y: offset.y,
//       data: {
//         data: item.children,
//         title: `${item.label} - 子表`
//       }
//     });
//     propExpandChange?.(parentID, arr);
//     setTimeout(() => {
//       // 创建相关连接线
//       graph.addEdge({
//         shape: childEdge,
//         source: {
//           cell: node.id,
//           port: `${leftPortName}/${parentID}/${item.id}`,
//           connectionPoint: "anchor",
//           anchor: {
//             name: "center",
//           },
//         },
//         target: {
//           cell: childID,
//           connectionPoint: "boundary",
//           anchor: {
//             name: "center",
//           },
//         },
//       })
//     }, 100)
//   }
//
//   render() {
//     const {item, node, parentID, index, titleHeight, graph} = this.props;
//     return (
//       <div className="node_item" ref={r => this.itemNode = r}>
//         <div className="node_item_left">
//           <div
//             className="node_item_icon"
//             style={{
//               backgroundColor: typeColorMap[item.dataType].color,
//             }}
//           >
//             {item.dataType.toUpperCase().substring(0, 2)}
//           </div>
//           <span className="node_item_txt">{item.label}</span>
//         </div>
//         <div className="node_item_right">
//           {
//             Array.isArray(item.children)
//               ? <div className="node_open_child" onClick={this.openChild}>
//                 {expandList.indexOf(item.id) > -1 ? "-" : "+"}
//               </div>
//               : null
//           }
//           <span className="node_item_type">{item.dataType}</span>
//         </div>
//       </div>
//     );
//   }
// }
//
// export default Item;