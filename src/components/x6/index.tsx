import React, {useEffect, useRef, useState} from 'react';
import style from "./index.module.less"
import Graph from "./register/index";
import {DataType, IItem, X6ReactProps} from "./types";
import {GraphContext} from "./context";
import {fieldEdge, lineLegend} from "./lib/model";
import {Portal} from "@antv/x6-react-shape";

const data: IItem[] = [
  {id: "1", dataType: DataType.int, label: "字段1"},
  {id: "2", dataType: DataType.int, label: "字段2"},
  {id: "3", dataType: DataType.char, label: "字段3"},
  {id: "4", dataType: DataType.varchar, label: "字段4"},
  {
    id: "5",
    dataType: DataType.float,
    label: "字段5",
    children: [
      {id: "5-1", dataType: DataType.int, label: "字段5-主键"},
      {id: "5-2", dataType: DataType.char, label: "字段5-模板ID"},
      {id: "5-3", dataType: DataType.char, label: "字段5-实例ID"},
    ]
  },
  {id: "6", dataType: DataType.bigint, label: "字段6"},
  {id: "7", dataType: DataType.char, label: "字段7"},
  {
    id: "8",
    dataType: DataType.char,
    label: "明细",
    children: [
      {id: "8-1", dataType: DataType.int, label: "主键"},
      {id: "8-2", dataType: DataType.char, label: "模板ID"},
      {id: "8-3", dataType: DataType.char, label: "实例ID"},
      {id: "8-4", dataType: DataType.int, label: "状态"},
      {id: "8-5", dataType: DataType.char, label: "时间"},
      {id: "8-6", dataType: DataType.text, label: "备注"},
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

function Index(props: X6ReactProps) {
  const {
    onEdgeChanged, onNodeChanged,
    onEdgeAdded,
    onEdgeRemoved, onNodeRemoved, onNodeAdded,
    onRenderDone,
  } = props;

  const X6ReactPortalProvider = Portal.getProvider() // 注意，一个 graph 只能申明一个 portal provider

  const container = useRef<HTMLDivElement | null>(null);
  const graph = useRef<Graph | undefined>(undefined);
  const renderCount = useRef(0);

  const [expand, setExpand] = useState({});

  useEffect(() => {
    if (!container.current || renderCount.current > 0) return;
    console.log(container.current)
    graph.current = new Graph({
      container: container.current,
      autoResize: true,
      panning: true,
      mousewheel: true,
      virtual: false,
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
      highlighting: {
        // 当连接桩可以被链接时，在连接桩外围渲染一个 2px 宽的红色矩形框
        magnetAvailable: {
          name: 'opacity',
        },
      },
      connecting: {
        snap: true,
        // 不允许连接到空白处
        allowBlank: false,
        allowLoop: false,
        // 拖动边时,显示所有可用的连接桩
        highlight: true,
        connectionPoint: "anchor",
        // 连接桩校验
        validateConnection(data) {
          const {sourcePort, targetPort} = data;
          const source = sourcePort?.split?.("/"), target = targetPort?.split?.("/");
          // 相同节点的左右两边锚点不能互联
          if (source?.[1] === target?.[1]) {
            return false
          }
          return true
        },
        createEdge() {
          return this.createEdge({
            shape: fieldEdge,
          })
        },
      },
    });

    if (graph.current) {
      renderCount.current += 1;
    }

    // 加载完成后fromJSON完成后触发
    graph.current?.on('render:done', () => {
      onRenderDone?.();
    })

    graph.current?.on('node:mouseenter', (e) => {

    });

    graph.current?.on("node:added", e => {
      onNodeAdded?.(e);
    })
    graph.current?.on("node:removed", e => {
      onNodeRemoved?.(e)
    })
    graph.current?.on("node:changed", e => {
      onNodeChanged?.(e)
    })

    graph.current?.on("edge:added", e => {
      onEdgeAdded?.(e)
    })

    graph.current?.on("edge:removed", e => {
      onEdgeRemoved?.(e)
    })
    graph.current?.on("edge:changed", e => {
      onEdgeChanged?.(e)
    })

    graph.current?.fromJSON(jsonData);
    window.graph = graph.current;
    return () => {

    }
  }, [container.current])

  const onExpandChange = (nodeId: string, value: any[]) => {
    setExpand(prev => ({
      ...prev,
      [nodeId]: [...value],
    }))
  }

  return (
    <GraphContext.Provider
      value={{
        graph: graph.current,
        expandOption: {
          expand,
          onChange: onExpandChange
        },
      }}
    >
      <X6ReactPortalProvider />
      <div className={style.x6_container}>
        <div className={style.legend}>
          {
            lineLegend.map((item, idx) => (
              <div key={idx} className={style.legend_item}>
                <div
                  className={style.legend_item_color}
                  style={{
                    borderColor: item.color,
                    borderStyle: item.type,
                  }}
                />
                <div>{item.name}连接线</div>
              </div>
            ))
          }
        </div>
        <div className={style.container} ref={container} autoFocus={true}/>
      </div>
    </GraphContext.Provider>
  );
}

export default Index;