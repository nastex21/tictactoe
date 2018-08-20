$(document).ready(function () {
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
  var drawBoard = function () {
    $("body").append(
      "<div id='tictac'><div id='one' class='squares' data-value='1'></div><div id='two' class='squares' data-value='2'></div><div id='three' class='squares' data-value='3'></div><div id='four' class='squares' data-value='4'></div><div id='five' class='squares' data-value='5'></div><div id='six' class='squares' data-value='6'></div><div id='seven' class='squares' data-value='7'></div> <div id='eight' class='squares' data-value='8'></div> <div id='nine' class='squares' data-value='9'></div></div>"
    );

    $("body").append(
      "<div id='clear'><div><a title='NEW GAME' id='reset'></a></div></div>"
    );

    //computer's AI
    comp = function () {
      console.log("comp func is running")
      player = "computer";

      //check to see if there's a winner
      var checkWinner = function () {
        console.log("checkWinner func is running")
        if (arr.length >= 5 && arr.length < 9) {
          winner();
        } else if (arr.length == 9) {
          winner();
          if (win == undefined) {
            end();
          }
        }
      }

      //if answer isn't in arr (array used to keep track of numbers used), then push it to arr else if it is found, randomize the number
      var continueRun = function () {
        console.log("continueRun func is running")
        if (jQuery.inArray(answer, arr) == -1) {
          arr.push(answer);
          compsArr.push(answer);
          $("#tictac > div").each(function () {
            var x = this.getAttribute("data-value");
            if (answer == x) {
              $(this).html("<span>" + compIcon + "</span>");
              $("#tictac").eventPause("active");
            }
          });
          //if arr.length (moves #) is greater than 4, check winner
          if (arr.length > 4) {
            checkWinner();
          }
        } else {
          randomizer();
        }
      }

      //gets a number between 1 - 9 then runs it through ContinueRun function to see if it meets a criteria.
      function randomizer() {
        console.log("randomizer func is running")
        getRandomIntInclusive(1, 9); //answer is used as number for computer
        continueRun();
      }

      var endPlayer = 0; //at end of array;

      var playerFunc = function () {
        console.log("playerFunc is running")
        for (var i = 0; i < winArr.length; i++) {
          //possible winning combinations for PLAYER
          var trackPlayer = [];
          for (var j = 0; j < playersArr.length; j++) {
            if (winArr[i].includes(playersArr[j])) {
              trackPlayer.push(playersArr[j]);
            }
            console.log("trackPlayer: " + trackPlayer)
            console.log("trackPlayer.length: " + trackPlayer.length);
            if (trackPlayer.length == 2) {
              var numAnsw = winArr[i].filter(x => !trackPlayer.includes(x));
              answer = numAnsw[0];
              console.log("answer from playerFunc: " + answer);
              console.log("continueRun from playerFunc");
              return continueRun();
            }

            if (i == winArr.length - 1 && j == playersArr.length - 1) {
              console.log("Last possible combination, last move in playersArr, so run continueRun");
              return continueRun();
            }
          }
        }
      }

      var computerFunc = function () {
        for (var i = 0; i < winArr.length; i++) {
          //possible winnig combinations for COMPUTER
          var trackComp = [];
          for (var j = 0; j < compsArr.length; j++) {
            //if the winning combination (winArr) has numbers from the computer's move
            if (winArr[i].includes(compsArr[j])) {
              trackComp.push(compsArr[j]);
            }
            console.log("trackComp: " + trackComp)
            console.log("trackComp.length: " + trackComp.length);
            //if computer has made two moves that satisfy winning combinations
            if (trackComp.length == 2) {
              //get winning move from combination list
              var numAnsw = winArr[i].filter(x => !trackComp.includes(x));
              numAnsw = numAnsw[0];
              console.log("arr: " + arr);
              //if numAnsw is not in the arr moves list
              if (!arr.includes(numAnsw)) {
                console.log("line: 132: " + numAnsw);
                answer = numAnsw;
                console.log("continueRun from computerFunc")
                return continueRun();
                console.log("answer: " + answer);
              } else {
                //number is in array, check playerFunc first before selecting new number 
                console.log("if trackComp == 2 and answer is in array moves list")
                return playerFunc();
              }
            }
            if (i == winArr.length - 1 && j == compsArr.length - 1 && !arr.includes(numAnsw)) {
              console.log("Last possible combination, last move in compsArr");
              return playerFunc();
            }
          }
        }
      }

      //if less than or equal to three moves, run the randomizer

      if (arr.length < 3) {
        randomizer();
      } else {
        computerFunc();
      }
    };

    //if randomizer got 0, then computer goes first. 
    getRandomIntInclusive(0, 1);
    if (answer == 0) {
      comp();
    }
  };



  //click function for X or O selection
  $("a").click(function () {
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
  var end = function () {
    $("#tictac").eventPause();

    if (win == "computer") {
      setTimeout(function () {
        $("#tictac").remove();
        $("#clear").remove();
        $("body").append("<div id='msg'><p> Sorry, you lost! </p></div>");
      }, 500);
      setTimeout(function () {
        window.location.href = window.location.href;
      }, 2000);
    } else if (win == "user") {
      setTimeout(function () {
        $("#tictac").remove();
        $("#clear").remove();
        $("body").append("<div id='msg'><p> You win! </p></div>");
      }, 500);
      setTimeout(function () {
        window.location.href = window.location.href;
      }, 2000);
    } else {
      setTimeout(function () {
        $("#tictac").remove();
        $("#clear").remove();
        $("body").append("<div id='msg'><p> Draw! </p></div>");
      }, 500);
      setTimeout(function () {
        window.location.href = window.location.href;
      }, 2000);
    }
  };

  //function to see if there's a winner, which can be called after fifth move and before last possible move
  var winner = function () {
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
  $(document.body).on("click", ".squares", function () {
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
          setTimeout(function () {
            comp();
          }, 500);
        } else {
          $("#tictac").eventPause();
          return false;
        }
      } else if (arr.length < 5) {
        setTimeout(function () {
          comp();
        }, 500);
      }
    }
  });

  $(document.body).on("click", "#reset", function () {
    window.location.href = window.location.href;
  });
});

 /*     console.log("playerFunc is running");
            for (var i = 0; i < winArr.length; i++) {
              var counter = 0;
              var keepTrackPlayer = [];
              for (var j = 0; j < playersArr.length; j++) {
                if (winArr[i].includes(playersArr[j])) {
                  keepTrackPlayer.push(playersArr[j]);
                }
    
                if (keepTrackPlayer.length == 2) {
                  let intersection = winArr[i].filter(x => !keepTrackPlayer.includes(x));
    
                  //see if the intersection number is in the arr array (array to keep track of all numbers use)
                  if (arr.includes(intersection) == -1) {
                    answer = intersection;
                    return continueRun()
                  }
                } else if (j == playersArr.length - 1 && counter !== 2) {
                  endPlayer++;
                  if (endPlayer == 8) {
                  } else {
                    randomizer();
                  }
                }
              }
            } */