$(document).ready(function(){

    let counter = 0;

    let plus = 0;
    let minus = 0;

    // HIỂN THỊ
    function updateCounter(){

        $("#counter").text(counter);

        // Đổi màu theo giá trị
        if(counter > 0){

            $(".circle").css({
                "background":"linear-gradient(135deg,#00c853,#64dd17)"
            });

            $("#statusText").text("Số dương");

        }

        else if(counter < 0){

            $(".circle").css({
                "background":"linear-gradient(135deg,#ff1744,#ff5252)"
            });

            $("#statusText").text("Số âm");

        }

        else{

            $(".circle").css({
                "background":"linear-gradient(135deg,#00c6ff,#0072ff)"
            });

            $("#statusText").text("Giá trị hiện tại");

        }

    }

    // TĂNG
    $("#increase").click(function(){

        counter++;
        plus++;

        $("#plusCount").text(plus);

        updateCounter();

    });

    // GIẢM
    $("#decrease").click(function(){

        counter--;
        minus++;

        $("#minusCount").text(minus);

        updateCounter();

    });

    // RESET
    $("#reset").click(function(){

        counter = 0;

        updateCounter();

    });

});