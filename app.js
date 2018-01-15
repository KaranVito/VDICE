/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

function init (){
    scores=[0,0];
    roundScore=0;
    activePlayer=0;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent=0;
    document.getElementById('score-1').textContent=0;
    document.getElementById('current-0').textContent=0;
    document.getElementById('current-1').textContent=0;
    var playerName1=window.prompt('Player 1 Name: ');
    var playerName2=window.prompt('Player 2 Name: ');
    document.getElementById('name-0').textContent= playerName1;
    document.getElementById('name-1').textContent= playerName2;
    document.querySelector('.player-0-panel').classList.remove('active','winner');
    document.querySelector('.player-1-panel').classList.remove('active' ,'winner');
    document.querySelector('.player-0-panel').classList.add('active');
    gamePlaying=true;
}


init();
// queryselector helps selecting stuff from the DOM
//document.querySelector('#current-'+activePlayer).textContent = dice; //textContent can only be used for plain text
//document.querySelector('#current-'+activePlayer).innerHTML='<em>' + dice + '</em>'; //innerHTML for HTML as well





document.querySelector('.btn-roll').addEventListener('click', function(){
                      
    if (gamePlaying){
     
        //1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        //2. Display the result
        var diceDOM= document.querySelector('.dice');
        diceDOM.style.display= 'block';
        diceDOM.src='dice-'+dice+'.png';
        //3. Update the roundScore if rolled number != 1
        if (dice!==1){
            roundScore=roundScore+dice;
            document.querySelector('#current-'+activePlayer).textContent = roundScore;
        }else{
            nextPlayer();
        }
        
    }
});

    
document.querySelector('.btn-hold').addEventListener('click', function(){
    
    if(gamePlaying){
     
        //1. Add current score to global score
    scores[activePlayer]+= roundScore;
    //2. Update to UI
    document.querySelector('#score-' + activePlayer).textContent= scores[activePlayer];
    //3. Check if the player won the game
    if (scores[activePlayer]>=100){
        document.querySelector('#name-'+activePlayer).textContent= 'Winner!';
        document.querySelector('.dice').style.display='none';
        document.querySelector('.player-' +activePlayer+ '-panel').classList.add('winner');
        document.querySelector('.player-' +activePlayer+ '-panel').classList.remove('active');
        gamePlaying=false;
        
    } else {
    //4. Next Player
    nextPlayer(); }
        
    }
});


function nextPlayer(){
        activePlayer ===0 ? activePlayer =1 : activePlayer=0;
        roundScore=0;
        document.getElementById('current-0').textContent=0;
        document.getElementById('current-1').textContent=0;
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        //document.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelector('.player-1-panel').classList.add('active');
        
        document.querySelector('.dice').style.display='none';
}


document.querySelector('.btn-new').addEventListener('click', init);
document.querySelector('.btn-rules').addEventListener('click', function(){
    window.alert('VDICE GAME RULES:\n \n1. The game has 2 players playing in rounds. In each turn, a player rolls a dice as many times as he wishes. \n2. Each result gets added to his Current score but if the player rolls a 1, all his Current score gets lost. After that, it\'s the next player\'s turn. \n3. The player can choose to \'Hold\', which means that his Current score gets added to his Main score. \n4. The first player to reach 100 points on Main score wins the game \n\n Vito\n karanb@gmx.com');
});


