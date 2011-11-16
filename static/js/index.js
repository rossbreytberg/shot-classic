$(document).ready(function(){
  // hide divs that shouldn't be visible
  $("#scoresform").hide()
  $("#highscores").hide()

  //initialize variables
  var score = 0
  var tempscore = 100
  var time = 30
  var mousex = 0
  var mousey = 0

  //game starts
  $("#start").click(function(){
    $("#start").hide(0, function(){

        $("#game").css('cursor', 'crosshair')
        
        //create target
        jQuery('<div/>', {
              id: 'target',
          }).appendTo('#game').css('top', Math.random()*550).css('left', Math.random()*750)

        //keep mouse position updated
        $(game).mousemove(function(m){mousex = m.pageX; mousey = m.pageY})

        //target hit
        $("#target").click(function(){
          $("#sound").html("<audio autoplay='autoplay'><source src='static/sounds/ding.wav' type='audio/x-wav' /></audio>")
          $(this).stop()
          $(document).stopTime('tempscore')
          score += tempscore
          //show points for earned for hit
          jQuery('<div/>', {
              class: 'tempscore',
              text: tempscore
          }).appendTo('#game').css('top', mousey).css('left', mousex).animate({top: '-=10'}, 200).fadeOut(200, function(){$(this).remove()})
          $("#score").html(score)
          tempscore = 100
          $(document).everyTime(30, 'tempscore', function(){if (tempscore > 1) {tempscore -= 1}})
          $(this).animate({top: Math.random()*550, left: Math.random()*750}, 200)
        })

        //game timer
        $(document).everyTime(1000, function(){
          $("#time").html($("#time").text() - 1) 
          time -= 1
          //game ends
          if (time == 0) {
            $("#target").remove()
            $("#game").css('cursor', 'auto')
            $("#scoreval").html("<input type='hidden' name='score' min="+score+" max="+score+" value="+score+" />")
            $("#scoresform").show()
            $("#highscores").show()
          }
        }, 30)
    })
  })
})


