var players=[
            {
            "name": "Furiosa",
            "healthPoints":120,
            "attackPower":14,
            "counterAttackPower": 30
            },
            {
            "name": "Bourne",
            "healthPoints":100,
            "attackPower":20,
            "counterAttackPower":28
            },
           {
            "name": "Katniss",
            "healthPoints":150,
            "attackPower":18,
            "counterAttackPower":16
            },
           {
            "name": "Sid",
            "healthPoints":180,
            "attackPower":20,
            "counterAttackPower":12
            }
           
    ];

var youSelected=false; //set to true when user selects their charater
var defenderSelected=false; //set to true when user selects defender charater
var yourName="";
var yourHealthPoints=0; //keep track of your score
var yourAttackPower=0; //set to your character's attack point
var defenderName="";
var defenderhealthPoints=0; //keep track of defenders score
var defenderAttackPower=0; //set to defender  character's counter attack point
var attackCounter=1; // Keep tract of the no:of times 'attack' button is presses. Uses to increase your attack points.

$(document).ready(function() {
$("#restart").prop("disabled",true);
 });

$(".select").on("click",function() //<div> element clicked
{
    if(youSelected)
    {
        if(!defenderSelected)
        {
            defenderSelected=true;
            defenderName=this.id;
            //$("#defender").append(this);
            $("#defender").append(this).find("div").css('background-color', 'grey');
            $("#attack").prop("disabled",false);
            getDefenderValues();
        }
    }
    else
    {
        youSelected=true;
        yourName=this.id;
        $("#you").append(this);
        $("#defend").append($("#selector").find("div").css('background-color', 'red'));
        $("#selector").hide();
        $("#defend").show();
        getPlayerValues();
    }

});

$("#attack").on("click",function() //'attack' button clicked
{
    if(youSelected && defenderSelected)
    {
        youAttackDefender();
        defenderAttackYou();
        setValues()
    if(yourHealthPoints<=0 || defenderHealthPoints<=0)
    {
        if(yourHealthPoints>defenderHealthPoints)
        {
            youWon();
        }
        else
        {
            defenderWon();
        }
        $(this).prop("disabled",true);
    }
    attackCounter+=1;
    }
});

$("#restart").on("click",function(){
    location.reload();
});

//function to get the details of the selected defender
function getDefenderValues()
{
    for (var i = 0; i < players.length; i++) 
    {
	    if (players[i].name === defenderName) 
        {
            defenderName=players[i].name;
            defenderHealthPoints=players[i].healthPoints;
            defenderAttackPower=players[i].counterAttackPower;
        }
	}
}
//function to get the details of the selected player
function getPlayerValues()
{
    for (var i = 0; i < players.length; i++) 
    {
	    if (players[i].name === yourName) 
        {
            yourHealthPoints=players[i].healthPoints;
            yourAttackPower=players[i].attackPower;
        }
	}
}

function youAttackDefender()
{
    defenderHealthPoints = defenderHealthPoints - (yourAttackPower*attackCounter);
}

function defenderAttackYou()
{
    yourHealthPoints = yourHealthPoints - defenderAttackPower;
}

//function to show attack values and display players points.
function setValues()
{
    var str="You attacked "+ defenderName + " for " +yourAttackPower*attackCounter + " damage<br>";
    str=str + defenderName + " attacked you for " +defenderAttackPower + " damage";
    $("#attacknotes").html(str);
    $("#you").find(".points").html(yourHealthPoints);
    $("#defender").find(".points").html(defenderHealthPoints);
}

function youWon()
{
    if($('#defend').children().length > 1)
    {
        //if there is more enemy
        $("#attacknotes").html("You have defeated "+ defenderName +", you can choose to fight another enemy.");
    }
    else
    {
        //if there is no more enemy
        $("#attacknotes").html("You have defeated all your enemies !");
        $("#restart").prop("disabled",false);
    }
    //remove defender from defender area.
    $("#defender").empty();
    defenderSelected=false;
    //enable attack button.
    $("#attack").prop("disabled",false);
}

function defenderWon()
{
    $("#attacknotes").html("You been defeated... GAME OVER!!!");
    //show restart button
    $("#restart").prop("disabled",false);
}

