$(document).ready(function() {
  var arr = []; //keep track of how many moves are left when arr.length = array.length
  var playersArr = []; //keep track of numbers used by player
  var compsArr = []; //keep track of numbers used by computer
  var winArr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ]; //one of these arrays need to show up to declare a winner otherwise draw
  var answer, player, comp, matches, testArr, win, playerIcon, compIcon;

  //number generator
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (answer = Math.floor(Math.random() * (max - min + 1)) + min); //The maximum is inclusive and the minimum is inclusive
  }

  //draw the board after player chose X or O
  var drawBoard = function() {
    $("body").append(
      "<div id='tictac'><div id='one' class='squares' data-value='1'></div><div id='two' class='squares' data-value='2'></div><div id='three' class='squares' data-value='3'></div><div id='four' class='squares' data-value='4'></div><div id='five' class='squares' data-value='5'></div><div id='six' class='squares' data-value='6'></div><div id='seven' class='squares' data-value='7'></div> <div id='eight' class='squares' data-value='8'></div> <div id='nine' class='squares' data-value='9'></div></div>"
    );

    $("body").append(
      "<div id='clear'><div><a title='NEW GAME' id='reset'></a></div></div>"
    );

    comp = function() {
      player = "computer";
      getRandomIntInclusive(1, 9);

      if (jQuery.inArray(answer, arr) != -1) {
        comp();
      } else {
        arr.push(answer);
        compsArr.push(answer);
        $("#tictac > div").each(function() {
          var x = this.getAttribute("data-value");
          if (answer == x) {
            $(this).html("<span>" + compIcon + "</span>");
            $("#tictac").eventPause("active");
          }
        });
        if (arr.length >= 5 && arr.length < 9) {
          winner();
        } else if (arr.length == 9) {
          winner();
          if (win == undefined) {
            end();
          }
        }
      }
    };

    getRandomIntInclusive(0, 1);
    if (answer == 0) {
      comp();
    }
  };

  //click function for X or O selection
  $("a").click(function() {
    var val = this.getAttribute("id");

    if (val == "buttonX") {
      playerIcon = "X";
      compIcon = "O";
      $(".main").remove();
      drawBoard();
      answer = getRandomIntInclusive(0, 1);
    } else {
      playerIcon = "O";
      compIcon = "X";
      $(".main").remove();
      drawBoard();
      answer = getRandomIntInclusive(0, 1);
    }
  });

  //function used in last possible move to see if there's a winner/loser/draw and to stop all activity
  var end = function() {
    $("#tictac").eventPause();

    if (win == "computer") {
      setTimeout(function() {
        $("#tictac").remove();
        $("#clear").remove();
        $("body").append("<div id='msg'><p> Sorry, you lost! </p></div>");
      }, 500);
      setTimeout(function() {
        window.location.href = window.location.href;
      }, 2000);
    } else if (win == "user") {
      setTimeout(function() {
        $("#tictac").remove();
        $("#clear").remove();
        $("body").append("<div id='msg'><p> You win! </p></div>");
      }, 500);
      setTimeout(function() {
        window.location.href = window.location.href;
      }, 2000);
    } else {
      setTimeout(function() {
        $("#tictac").remove();
        $("#clear").remove();
        $("body").append("<div id='msg'><p> Draw! </p></div>");
      }, 500);
      setTimeout(function() {
        window.location.href = window.location.href;
      }, 2000);
    }
  };

  //function to see if there's a winner, which can be called after fifth move and before last possible move
  var winner = function() {
    $("#tictac").eventPause("active");
    if (player == "computer") {
      testArr = compsArr;
    } else if (player == "user") {
      testArr = playersArr;
    }

    for (var j = 0; j < winArr.length; j++) {
      matches = 0;
      for (var i = 0; i < testArr.length; i++) {
        if (winArr[j].indexOf(testArr[i]) != -1) {
          matches++;

          if (matches == 3) {
            win = player;
            end();
          }
        }
      }
    }
  };

  //player's input
  $(document.body).on("click", ".squares", function() {
    player = "user";
    var val = Number(this.getAttribute("data-value"));
    var getText = $(this).text();
    if (getText == "") {
      $(this).html("<span>" + playerIcon + "</span>");
      $("#tictac").eventPause();
    }

    //check to see if val is in arr so there won't be any repeats
    if (jQuery.inArray(val, arr) != -1) {
    } else {
      arr.push(val);
      playersArr.push(val);
      if (arr.length == 9) {
        $("#tictac").eventPause();
        winner();
        if (win == undefined) {
          end();
        }
      } else if (arr.length >= 5 && arr.length < 9) {
        winner();
        if (win == undefined) {
          setTimeout(function() {
            comp();
          }, 500);
        } else {
          $("#tictac").eventPause();
          return false;
        }
      } else if (arr.length < 5) {
        setTimeout(function() {
          comp();
        }, 500);
      }
    }
  });

  $(document.body).on("click", "#reset", function() {
    window.location.href = window.location.href;
  });
});
