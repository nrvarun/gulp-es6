$(document).ready(function () {
    $(".input-field input").focusout(function() {
        if ($(this).val() != "") {
                $(this).addClass("has-content");
        } else {
                $(this).removeClass("has-content");
        }
    })
    $(".input-field textarea").focusout(function() {
            if ($(this).val() != "") {
                    $(this).addClass("has-content");
            } else {
                    $(this).removeClass("has-content");
            }
    })
});