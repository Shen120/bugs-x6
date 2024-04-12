import {Dom, Graph} from "@antv/x6";
import {register} from '@antv/x6-react-shape'
import ModelNode from "../element/node";
import {
  childEdge,
  fieldEdge,
  leftPortName,
  lineCfg,
  nodeShape,
  nodeWidth,
  portHighlightClassName,
  rightPortName
} from "../lib/model";

register({
  shape: nodeShape,
  component: ModelNode,
  width: nodeWidth,
  height: 80,
  effect: [],
  ports: {
    groups: {
      // 注册节点左边的连接桩
      [leftPortName]: {
        markup: {tagName: 'circle'},
        position: "absolute",
        attrs: {
          circle: {
            r: 6,
            magnet: true,
            stroke: 'transparent',
            strokeWidth: 1,
            fill: 'transparent',
          },
        },
      },
      // 注册节点右边的连接桩
      [rightPortName]: {
        markup: {tagName: 'circle'},
        position: "absolute",
        attrs: {
          circle: {
            r: 6,
            magnet: true,
            stroke: 'transparent',
            strokeWidth: 1,
            fill: 'transparent',
          },
        },
      },
    },
  }
});

// 注册子表线
Graph.registerEdge(childEdge, {
  inherit: "edge",
  // 智能路由 https://x6.antv.antgroup.com/zh/examples/edge/router/#manhattan
  router: {
    name: 'manhattan',
  },
  attrs: {
    line: {
      stroke: lineCfg.child.color,
      targetMarker: 'classic',
    }
  }
})

// 注册字段连接线
Graph.registerEdge(fieldEdge, {
  inherit: "edge",
  attrs: {
    line: {
      stroke: lineCfg.relation.color,
      // 虚线
      strokeDasharray: 5,
      targetMarker: 'classic',
    }
  }
})

Graph.registerHighlighter("opacity", {
  highlight(cellView, magnet) {
    Dom.addClass(magnet, portHighlightClassName)
  },

  unhighlight(cellView, magnetEl) {
    Dom.removeClass(magnetEl, portHighlightClassName)
  },
}, true)

export default Graph;