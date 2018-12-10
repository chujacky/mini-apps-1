//setup board - view
 
for (var i = 0; i < 3; i++) {
  var div = document.createElement('div');
  div.id = ('row' + i);
  div.classList.add('row');
  document.getElementById('container').appendChild(div);
  for (var j = 0; j < 3; j++) {
    var box = document.createElement('button');
    box.classList.add("button", "col" + j);
    box.style.width = '100px';
    box.style.height = '100px';
    box.style.verticalAlign= 'top';
    document.getElementById('row' + i).appendChild(box);
  }
};

document.getElementById('restartButton').onclick = function() {
  for (var i = 0; i < buttons.length; i++){
    buttons[i].disabled = false; 
    buttons[i].innerHTML = "";
  }
};

//controller
var buttons = document.getElementsByClassName('button');

for (var i = 0; i < buttons.length; i++){
  buttons[i].onclick = function() {
    this.disabled = true;
    makeMove.call(this, next);
    checkBoard();
   
  }
};

//model

var next = 'X';
var makeMove = function(button, nextMove) {
  console.log(this);
  this.innerHTML = next;
  if (next === 'X') {
    next = 'O';
  } else {
    next = 'X';
  }
};

var checkBoard = function() {
    checkRows();
    checkCols();
};

var checkRows = function() {
  for (var i = 0; i < 3; i++){
    var rows = document.querySelectorAll('#row' + i + ' button');
    if (rows[0].innerHTML!== "" && (rows[0].innerHTML === rows[1].innerHTML) && (rows[0].innerHTML === rows[2].innerHTML)) {
      document.getElementById('result').innerHTML = rows[0].innerHTML + " Wins!";
    }
  }
};

var checkCols = function() {
  for (var i = 0; i < 3; i++){
    var cols = document.querySelectorAll(".col" + i);
    if (cols[0].innerHTML!== "" && (cols[0].innerHTML === cols[1].innerHTML) && (cols[0].innerHTML === cols[2].innerHTML)) {
      document.getElementById('result').innerHTML = cols[0].innerHTML + " Wins!";
    }
  }
}

var checkDiagonals = function() {
  
}

