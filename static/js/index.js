 /*$(document).everyTime(200, function(){$("#target").animate({top: Math.random()*718, left: Math.random()*974}, 200)}, 150000)*/

 $(document).ready(function(){
  $("#scoresform").hide()
  $("#target").stop().animate({top: Math.random()*550, left: Math.random()*750}, 0)
  $("#target").hide()
  $("#highscores").hide()
  var score = 0
  var time = 30
  $("#start").click(function(){
    $("#start").hide(0, function(){
        $("#target").show()
        $("#target").click(function(){
          $("#target").stop().animate({top: Math.random()*550, left: Math.random()*750}, 200)
          score += 50
          $("#score").html(score)
          $("#sound").html("<audio autoplay='autoplay'><source src='static/sounds/ding.wav' type='audio/x-wav' /></audio>")})

        $(document).everyTime(1000, function(){
          $("#time").html($("#time").text() - 1) 
          time -= 1
          if (time == 0) {
            $("#target").hide()
            $("#scoreval").html("<input type='hidden' name='score' min="+score+" max="+score+" value="+score+" />")
            $("#scoresform").show()
            $("#highscores").show()
          }
        }, 30)
    })
  })
})


