import { Injectable, EventEmitter } from '@angular/core';
import { Node, Link, ForceDirectedGraph } from './models';
import * as d3 from 'd3';
import {selectAll as d3SelectAll} from 'd3-selection';

@Injectable()
export class D3Service {
  /** This service will provide methods to enable user interaction with elements
    * while maintaining the d3 simulations physics
    */
  constructor() { }

  /** A method to bind a pan and zoom behaviour to an svg element */
  applyZoomableBehaviour(svgElement) {
    let svg, container, zoom;

    svg = d3.select(svgElement);
    
   

    zoom = d3.zoom()
    svg.call(zoom);
  }

  /** A method to bind a draggable behaviour to an svg element */
    /** A method to bind a draggable behaviour to an svg element */
    applyDraggableBehaviour(element) {
      const d3element = d3.select(element);
  
  
      d3element.call(d3.drag())
    }

  /** The interactable graph we will simulate in this article
  * This method does not interact with the document, purely physical calculations with d3
  */
  getForceDirectedGraph(nodes: Node[], links: Link[], options: { width, height }) {
    const sg = new ForceDirectedGraph(nodes, links, options);
    return sg;
  }


getNodes(){
  
}

createNodeLabels(nodes: Node[]){

  let node = d3SelectAll(".nodeG").data(nodes)
  console.log("node : ",node)
  let textes = node.append("text")
    .attr("dx", 12)
    .attr("dy", ".35em")
    .attr("y", "30px")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "central")
    .text(function(d:Node,i) {return d.label })
  

  textes.each(function(d,i){
      nodes[i].box.x = this.getBBox().x ;
      nodes[i].box.width = this.getBBox().width  ;
      nodes[i].box.y = this.getBBox().y ;
      nodes[i].box.height = this.getBBox().height  ;
      })

  node.insert("rect",":first-child")
    .attr("opacity", 0.9)
    .attr("rx", 5)
    .attr("ry", 5)
    .attr("x", function(d:Node){return d.box.x})
    .attr("width", function(d:Node){return d.box.width})
    .attr("y", function(d:Node){return d.box.y})
    .attr("height", function(d:Node){return d.box.height})
    .attr("fill", "white")
    .attr("alignment-baseline", "central")
    .text(function(d:Node,i) { return d.label })
  }

}
