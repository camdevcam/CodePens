var turnx = true;
var play = true;

$(document).ready(function () {
    $('#restart').click(restart);
    $('.cell').click(function() {
        if (play && ($(this).text() == '')) {
            if (turnx) {
                $(this).text('X').addClass('x');
            }
            else {
                $(this).text('O ').addClass('o');
            }
            turnx = !turnx;
            won();
        }
    });
});

function check(a, b, c) {
    atext = $(a).text();
    btext = $(b).text();
    ctext = $(c).text();
    if (atext == btext && btext == ctext && (atext != '')) {
        play = false;
        $(a).addClass('win');
        $(b).addClass('win');
        $(c).addClass('win');
        alert ('Player ' + atext + ' has won the game!');
        return true;
    }
    else {
        return false;
    }
};

function won() {
    if (check('#1', '#2', '#3')) {}
    else if (check('#4', '#5', '#6')) {}
    else if (check('#7', '#8', '#9')) {}
    else if (check('#1', '#4', '#7')) {}
    else if (check('#2', '#5', '#8')) {}
    else if (check('#3', '#6', '#9')) {}
    else if (check('#1', '#5', '#9')) {}
    else if (check('#3', '#5', '#7')) {}
    else {
        if ($('.cell:empty').length == 0) {
            alert ('This game is a draw.');
            play = false;
        }
    }
}

function restart() {
    $('.cell').removeClass('x o win').text('');
    play = true;
}