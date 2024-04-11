import {Graph} from "@antv/x6";
import { register } from '@antv/x6-react-shape'
import ModelNode from "../element/node";
import {leftPortName, rightPortName} from "../lib/model";

register({
  shape: 'model-node',
  component: ModelNode,
  width: 200,
  height: 80,
  effect: ["data", "title"],
  ports: {
    groups: {
      [leftPortName]: {
        markup: { tagName: 'circle'},
        position: "absolute",
        attrs: {
          circle: {
            r: 6,
            magnet: true,
            stroke: '#ff0000',
            strokeWidth: 1,
            fill: 'transparent',
          },
        },
      },
    },
  }
});

function itemPort(portsPositionArgs: any, elemBBox: any) {
  return portsPositionArgs.map((item: any, index: any) => {
    return {
      position: {
        x: item.x,
        y: item.y,
      },
    }
  })
}

Graph.registerPortLayout(leftPortName, itemPort, true)

export default Graph;