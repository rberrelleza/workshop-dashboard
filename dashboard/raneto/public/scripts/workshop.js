function handle_execute(event, terminal) {
    var element = event.target.parentElement;
    var value = element.innerText.trim();
    parent.send_to_terminal(value, terminal);
}

function handle_copy(event) {
    var element = event.target.parentElement;
    var value = element.innerText.trim();
    var input = document.createElement('input');
    input.setAttribute('value', value);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input)
}

function handle_console_link(event) {
    event.preventDefault();
    parent.open_link_in_console(event.target.href);
}

function handle_slides_link(event) {
    event.preventDefault();
    parent.open_link_in_slides(event.target.href);
}

function handle_terminal_link(event) {
    event.preventDefault();
    parent.bring_terminal_to_front();
}

$(document).ready(function() {
    $.each([$('code.execute'), $('code.execute-1')], function() {
        if (window.location !== window.parent.location) {
            this.parent().prepend('<span class="execute-glyph glyphicon glyphicon-play-circle" aria-hidden="true"></span>');
            this.parent().click(function(event) {
                $(this).find('.execute-glyph').addClass('text-danger');
                handle_execute(event, 1);
            });
        } else {
            this.parent().prepend('<span class="copy-glyph glyphicon glyphicon-scissors" aria-hidden="true"></span>');
            this.parent().click(function(event) {
                $(this).find('.copy-glyph').addClass('text-danger');
                handle_copy(event);
            });
        }
    });

    $.each([$('code.execute-2')], function() {
        if (window.location !== window.parent.location) {
            this.parent().prepend('<span class="execute-glyph glyphicon glyphicon-play-circle" aria-hidden="true"></span>');
            this.parent().click(function(event) {
                $(this).find('.execute-glyph').addClass('text-danger');
                handle_execute(event, 2);
            });
        } else {
            this.parent().prepend('<span class="copy-glyph glyphicon glyphicon-scissors" aria-hidden="true"></span>');
            this.parent().click(function(event) {
                $(this).find('.copy-glyph').addClass('text-danger');
                handle_copy(event);
            });
        }
    });

    $.each([$('code.copy')], function() {
        this.parent().prepend('<span class="copy-glyph glyphicon glyphicon-scissors" aria-hidden="true"></span>');
        this.parent().click(function(event) {
            $(this).find('.copy-glyph').addClass('text-danger');
            handle_copy(event);
        });
    });

    $('section.content a').each(function() {
        if (location.hostname === this.hostname || !this.hostname.length) {
            if (this.pathname.startsWith('/console')) {
                $(this).click(function(event) {
                    handle_console_link(event);
                });
            }
            else if (this.pathname.startsWith('/slides')) {
                $(this).click(function(event) {
                    handle_slides_link(event);
                });
            }
            else if (this.pathname.startsWith('/terminal')) {
                if (this.pathname == '/terminal') {
                    $(this).click(function(event) {
                        handle_terminal_link(event);
                    });
                }
                else {
                    $(this).attr('target','_blank');
                }
            }
        }
        else {
            $(this).attr('target','_blank');
        }
    });
});
