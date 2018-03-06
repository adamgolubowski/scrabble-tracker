var game = {
  moves: [],
  players: [],
  current_round: function() {
    var round = 0;
    if(this.players.length!=0){
      round = Math.floor(this.moves.length / this.players.length) + 1;
    }
    return round;
  },
  last_move: function() {
    return this.moves.length;
  },
  current_move: function() {
    return this.moves.length + 1;
  },
  add_player: function(player) {
    this.players.push(player);
  },
  clear_players: function() {
    this.players = [];
  },
  clear_moves: function() {
    this.moves = [];
  },
  current_player: function() {
    index = this.moves.length % this.players.length;
    player = this.players[index];
    return player;
  },
  update_board: function() {
    document.getElementById("move").innerHTML = this.current_move();
    document.getElementById("round").innerHTML = this.current_round();
    document.getElementById("player").innerHTML = this.current_player();
    document.getElementById("score").value = "";
  },
  clear_results: function() {
    document.getElementById("results").innerHTML = "";
  },
  start_new: function() {
    this.clear_players();
    this.clear_moves();
    this.add_player(document.getElementById("player1").value);
    this.add_player(document.getElementById("player2").value);
    document.getElementById("score-form").style.display = 'block';
    this.update_board();
    this.clear_results();
  },

  add_move: function(move_number, round_number, player_name, current_score) {
    m = {
      move: move_number,
      round: round_number,
      player: player_name,
      score: current_score
    };
    this.moves.push(m);
  },
  
  player_moves: function(player) {
    moves = this.moves.filter(function(move){
                return move.player == player;
    });
    return(moves);
  },
  
  player_total_score: function(player) {
    moves = this.player_moves(player);
    total_score = 0;
    for(var i=0;i<moves.length;i++){
      total_score += parseInt(moves[i].score);
    }
    return total_score;
  },
  player_score_till_round: function(player,round){
    moves = this.player_moves(player)
    moves_till_round = moves.filter(function(move){
      return move.round <= round;
    });
    total_score = 0;
    for(var i=0;i<moves_till_round.length;i++){
      total_score += parseInt(moves_till_round[i].score);
    }
    return total_score;
  },
  display_score: function() {
    this.clear_results();
    var results = document.getElementById("results");
    results.style.display = 'block';
    var header = document.createTextNode("Results");
    results.appendChild(header);
    for (var i = 0; i < game.moves.length; i++) {
      var move = game.moves[i];
      var row = document.createElement("P");
      var t = document.createTextNode(
        "# " + move.move +
          " | Round: " + move.round +
          " | Player: " + move.player +
          " | Score: " + move.score +
          " | Total player score: " + this.player_score_till_round(move.player,move.round)
      );
      row.appendChild(t);
      results.appendChild(row);
    }
  },
  next_move: function() {
    move = this.current_move();
    round = this.current_round();
    player = this.current_player();
    score = document.getElementById("score").value;
    this.add_move(move, round, player, score);
    this.update_board();
    this.display_score();
  }
  
  
};