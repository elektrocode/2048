$(function () {

    // saving dom objects to variables
    var container = $('#container');
    var bird = $('#bird');
    var pole = $('.pole');
    var pole_1 = $('#pole_1');
    var pole_2 = $('#pole_2');
    var score = $('#score');
    var speed_span = $('#speed');
    var restart_btn = $('#restart_btn');

    // saving some initial setup
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var pole_initial_position = parseInt(pole.css('right'));
    var pole_initial_height = parseInt(pole.css('height'));
    var bird_left = parseInt(bird.css('left'));
    var bird_height = parseInt(bird.height());
    var speed = 10; // Initial game speed 

    // initial condition declarations
    var go_up = false;
    var score_updated = false;
    var game_over = false;

    // runs every 40 miiliseconds
    var game = setInterval(function () {

        // checks if the bird has collided with either pole or the border
        if (collision(bird, pole_1) || collision(bird, pole_2) || parseInt(bird.css('top')) <= 0 || parseInt(bird.css('top')) > container_height - bird_height) {

            stop_game();

        } else {

            var pole_current_position = parseInt(pole.css('right'));

            // update the score when the poles have passed the bird successfully
            if (pole_current_position > container_width - bird_left) {
                if (score_updated === false) {
                    score.text(parseInt(score.text()) + 1); // increments the score by 1 everytime the bird passed the poles
                    score_updated = true; // checks if the score has been passed 
                }
            }

            // check whether the poles pass out of the container
            if (pole_current_position > container_width) {
                
                // changes the position of the poles when they reappear
                var new_height = parseInt(Math.random() * 100);

                // change the pole's height based on a random value
                pole_1.css('height', pole_initial_height + new_height);
                pole_2.css('height', pole_initial_height - new_height);

                // increase speed
                speed = speed + 1;
                // updates the current speed value
                speed_span.text(speed);

                // reverts the score back to its initial condition once set to true
                score_updated = false; 

                // brings the pole back onto the screen 
                pole_current_position = pole_initial_position;
            }

            // move the poles and increases the speed
            pole.css('right', pole_current_position + speed);

            if (go_up === false) {
                go_down();
            }
        }

    }, 40);

    // control the bird using the spacebar 
    $(document).on('keydown', function (e) {
        var key = e.keyCode;
        // spacebar value is 32
        // prevents the space bar from working when game over 
        if (key === 32 && go_up === false && game_over === false)  {
            go_up = setInterval(up, 50); // runs every 50 milliseconds 
        }
    });

    // brings the bird back down 
    $(document).on('keyup', function (e) {
        var key = e.keyCode;
        if (key === 32) {
            clearInterval(go_up);
            go_up = false;
        }
    });

    // moves the bird down when spacebar is not selected
    function go_down() {
        bird.css('top', parseInt(bird.css('top')) + 5);
    }

    // moves bird up when spacebar is selected
    function up() {
        bird.css('top', parseInt(bird.css('top')) - 10);
    }

    // displays the restart button if a collision has happended 
    function stop_game() {
        clearInterval(game);
        game_over = true;
        restart_btn.slideDown();
    }

    // when the restart button is selected the game is reloaded back to its initial state
    restart_btn.click(function () {
        location.reload();
    });

    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }

});
