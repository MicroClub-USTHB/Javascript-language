const table = document.querySelector('table');
const Clear_button = document.querySelector('.clear');
const start_button = document.querySelector('.start');
const WIDTH = 50;
const HEIGHT = 29;
var start_node = null;
var end_node = null;


// create the grid and nodes
function create_grid ( ){
   
   let tbody  = document.createElement('tbody');
   let nodes = [];
   for( let  i = 0; i<HEIGHT;i++){
      let tr = document.createElement('tr');
      let row = [];
      for (let j = 0; j < WIDTH; j++) {
         let td = document.createElement('td');
         td.classList.add('table-data');
         const node = new Node(i,j,td);
         tr.appendChild(td);
         row.push(node);
      }
      nodes.push(row);
      tbody.appendChild(tr);
   }
   table.appendChild(tbody);
   return nodes;
}

const grid = create_grid();

// constructor of the spot object
function Node (col,row,element){
   this.col = col;
   this.row = row;
   this.element = element;
   this.state = 'unvisited';
   this.g= Infinity;
   this.h = Infinity;
   this.f = this.g + this.h;
   
   this.neighbors = [];
   //updating neighbors
   this.update_neighbors = function (grid){
       if(grid[col][row + 1].row <WIDTH  && !grid[col][row + 1].is_block()){
          this.neighbors.push(grid[col][row +1]);
       }

       if( grid[col][row - 1].row >0 && !grid[col][row - 1].is_block()){
         this.neighbors.push(grid[col][row -1]);
      }

      if(grid[col +1][row].col <HEIGHT && !grid[col+1][row ].is_block()){
         this.neighbors.push(grid[col+1][row] );
      }

      if( grid[col -1][row].col >0 && !grid[col-1][row].is_block()){
         this.neighbors.push(grid[col-1][row]);
      }

      }
   
      //chack state of node
      this.is_block = function(){
         if(this.state === 'block')
         return true;
         else 
         return false;
      }

      this.is_unvisited = function (){
         if(this.state === 'unvisited')
         return true;
         else 
         return false;
      }
   

}

// function get_coords
function get_coords(el){
   for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
         if(grid[i][j].element === el)
          return grid[i][j];
      }
      
   }
}

window.addEventListener('click',(e)=>{
   if(e.target.classList.contains('table-data')){
      if(start_node === null ){
         start_node = get_coords(e.target);
         start_node.f=0;
         start_node.h=0;
         start_node.g=0;
         start_node.state = 'start';
         start_node.element.style.backgroundColor='red';
         
      }else if(end_node === null){
         end_node= get_coords(e.target);
         end_node.state = 'end';
         end_node.element.style.backgroundColor='green';
      }else {
         get_coords(e.target).state = 'block'
         e.target.style.backgroundColor='black';
      }
      
   }
});

Clear_button.addEventListener('click',()=>{
  for (let i = 0; i < grid.length; i++) {
     for (let j = 0; j< grid[i].length; j++) {      
      grid[i][j].element.style.backgroundColor = 'white';
      grid[i][j].state = 'unvisited';
      start_node = null;
      end_node = null;
     }
     
  }
});

//function that calcualtes heuristic value of distance between current node and end node
function h(pos1,pos2) {
   return Math.sqrt( Math.pow(Math.abs(pos1.col - pos2.col),2) + Math.pow(Math.abs(pos1.row - pos2.row),2));
}

start_button.addEventListener('click',astar);

// the search algorithm
function astar(){
   if(start_node === null && end_node === null){
      return false;
   }
   
   current_node = start_node;

 var unvisited_nodes = [];
 for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
       if(grid[i][j].is_unvisited()){
          unvisited_nodes.push(grid[i][j]);
       }
       
    }
    
 }
 let path = [];
while(unvisited_nodes && current_node.state !== end_node.state){
 
 
 
 current_node.update_neighbors(grid);

  if(current_node.neighbors.length === 0) return false
var open_nodes = [];
current_node.neighbors.forEach(neighbor => {
   neighbor.g = current_node.g +1;
   neighbor.h = h(neighbor,end_node);
   neighbor.f = neighbor.g + neighbor.h;
   neighbor.state = 'visited';
   open_nodes.push(neighbor);
});
unvisited_nodes = unvisited_nodes.filter((n)=> n.is_unvisited() );
open_nodes.sort((a,b)=> a.f - b.f);


current_node = open_nodes[0];
path.push(current_node);
if(current_node.state === end_node.state){
   animatepath(path);
   return true;
}

 }
}



function animatepath(path){

start_node.element.style.backgroundColor = 'red';
end_node.element.style.backgroundColor = 'green';
for (let i = 0; i < path.length-1; i++) {
   
   path[i].element.style.backgroundColor = 'purple';
    path[i].element.style.transition = `background-color 0.1s ease ${i/4}s`;
   
}

}

