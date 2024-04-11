import React, {useEffect, useRef} from 'react';
import style from "./index.module.less"
import {useUpdateEffect} from "ahooks";
import Graph from "./register/index";
import {DataType, IItem} from "./types";
import {leftPortName} from "./lib/model";
import {GraphContext} from "./context";

const data: IItem[] = [
  {id: "1", dataType: DataType.int, label: "字段1"},
  {id: "2", dataType: DataType.int, label: "字段2"},
  {id: "3", dataType: DataType.char, label: "字段3"},
  {id: "4", dataType: DataType.varchar, label: "字段4"},
  {id: "5", dataType: DataType.float, label: "字段5"},
  {id: "6", dataType: DataType.bigint, label: "字段6"},
  {id: "7", dataType: DataType.char, label: "字段7"},
  {
    id: "8",
    dataType: DataType.char,
    label: "明细",
    children: [
      {id: "8-1",dataType: DataType.int, label: "主键"},
      {id: "8-2",dataType: DataType.char, label: "模板ID"},
      {id: "8-3",dataType: DataType.char, label: "实例ID"},
      {id: "8-4",dataType: DataType.int, label: "状态"},
      {id: "8-5",dataType: DataType.char, label: "时间"},
      {id: "8-6",dataType: DataType.text, label: "备注"},
    ]
  },
]

const jsonData = {
  nodes: [
    {id: "node1", shape: "model-node", x: 100, y: 100, data: {data, title: "xxxx", id: "inModel"}},
    {id: "node2", shape: "model-node", x: 700, y: 100, data: {data, title: "xxxx输出模型", id: "outModel"}},
  ],
  edges: []
}

function Index(props: any) {

  const container = useRef<HTMLDivElement | null>(null);
  const graph = useRef<Graph | undefined>(undefined);

  useEffect(() => {
    if (!container.current) return;
    console.log(container.current)
    graph.current = new Graph({
      container: container.current,
      autoResize: true,
      panning: true,
      mousewheel: true,
      virtual: true,
      grid: {
        visible: true,
        size: 20,
        type: 'doubleMesh',
        args: [
          {
            color: '#e6e6e6', // 主网格线颜色
            thickness: 1, // 主网格线宽度
          },
          {
            color: '#dbdbdb', // 次网格线颜色
            thickness: 1, // 次网格线宽度
            factor: 4, // 主次网格线间隔
          },
        ],
      },
      connecting: {
        snap: true,
        // 不允许连接到空白处
        allowBlank: false,
        // connectionPoint: leftPortName,
      },
    });

    graph.current?.on('render:done', () => {

    })

    graph.current?.fromJSON(jsonData)
    return () => {

    }
  }, [container.current])

  return (
    <GraphContext.Provider
      value={{
        graph: graph.current,
      }}
    >
      <div className={style.x6_container}>
        <div className={style.container} ref={container} autoFocus={true}/>
      </div>
    </GraphContext.Provider>
  );
}

export default Index;