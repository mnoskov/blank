(function() {
    var formatMessage = function(object) {
        var result = '';

        for (var key in object) {
            result += object[key] + '<br>';
        }

        return result;
    };

    $(document).on('submit', 'form.ajax', function(e) {
        e.preventDefault();
        var $form = $(this),
            params = {
                squery:   escape(window.location.search),
                sreferer: escape(document.referrer)
            },
            data;

        if (window.FormData) {
            data = new FormData($form.get(0));
            for (var key in params) {
                data.append(key, params[key]);
            }
        } else {
            data = $form.serialize();
            for (var key in params) {
                data += '&' + key + '=' + params[key];
            }
        }

        (function($form) {
            $.ajax({
                url: '/ajax.json',
                type: 'POST',
                data: data,
                dataType: 'json',
                processData: false,
                contentType: window.FormData ? false : 'application/x-www-form-urlencoded; charset=UTF-8',
                beforeSend: function(xhr, settings) {
                    if ($form.hasClass('processing')) {
                        return false;
                    }
                    $form.addClass('processing');
                },
                complete: function(xhr, status) {
                    var $response = $('.modal#response');

                    $form.find('.notice').remove();
                    $form.removeClass('processing');

                    if (status == 'success') {
                        var response = xhr.responseJSON;

                        if (response.response == 'fail') {
                            $form.trigger('failed-submit', response);

                            var msg = '';

                            if (response.fields) {
                                var tn = 0;

                                for (var i in response.fields) {
                                    if ($form[0][i].type != 'hidden') {
                                        var $notice = $('<div/>').html(formatMessage(response.fields[i])).wrap('<div/>').parent().addClass('notice').hide();

                                        (function(form, $notice) {
                                            $(form[i])
                                                .addClass('error')
                                                .on('focus click change input', function() {
                                                    $(this).closest('.form-group').find('[name="' + this.name + '"]').removeClass('error');

                                                    $notice.stop().fadeOut(100, function() {
                                                        $(this).remove();
                                                    });
                                                })
                                                .closest('.form-group')
                                                .append($notice);

                                            if (window.innerWidth < 544 || $notice.parent().hasClass('horz')) {
                                                $notice.addClass('from-top');
                                                $notice.css('margin-top', -($notice.outerHeight() + 8));
                                            } else {
                                                $notice.children('div').css('position', 'relative').css('top', -($notice.outerHeight() * 0.5))
                                            }
                                            $notice.css('transition-delay', (tn * 0.001) + 's').show().addClass('animated');
                                        })($form[0], $notice);

                                        tn += 100;
                                    } else {
                                        msg += '<div>' + response.fields[i] + ' (' + i + ')</div>';
                                    }
                                }
                            }

                            if (response.messages && response.messages.length) {
                                msg += response.messages.join('<br>');
                            }

                            if (msg != '') {
                                $response.find('.modal-body > .response').html(msg);
                                $response.modal();
                            }
                        } else if (response.response == 'success') {
                            $form.trigger('success-submit', response);
                            $form.get(0).reset();
                            $form.closest('.modal').modal('hide');
                            $response.find('.modal-body > .response').html(response.messages.join('<br>'));
                            $response.modal();
                        }
                    }
                }
            });
        })($form);
    });

    $('.modal').on('hidden.bs.modal', function(e) {
        if (this.id != 'response' && $('.modal#response').is(':visible')) {
            var div = $('<div class="modal-scrollbar-measure"/>').appendTo(document.body).get(0),
                scrollBar = div.offsetWidth - div.clientWidth;

            $(div).remove();
            $(document.body).addClass('modal-open').css('padding-right', scrollBar);
        } else {
            $(document.body).removeClass('modal-open').css('padding-right', 0);
        }
    });

    $('.modal').on('show.bs.modal', function(e) {
        if (e.relatedTarget) {
            var $modal = $(this);

            $.each(e.relatedTarget.attributes, function(i, attr) {
                var match = attr.name.match(/^data-set-([a-zA-Z-_0-9]+)/);

                if (match) {
                    var name = match[1],
                        val  = attr.value;

                    $modal.find('[name="' + name + '"]').val(val);
                    $modal.find('[data-get="' + name + '"]').each(function() {
                        if (this.tagName == 'IMG') {
                            $(this).prop('src', val);
                        } else if (this.tagName == 'INPUT' || this.tagName == 'TEXTAREA') {
                            $(this).val(val);
                        } else {
                            this.innerHTML = val;
                        }
                    });
                }
            });
        }
    });

    $(function() {
        if (window.location.hash != '' && window.location.hash.match(/^#[a-z\d_]+$/)) {
            var $modal = $('.modal' + window.location.hash);

            if ($modal.length) {
                $modal.modal('show');
            }
        }
    });
})();

(function() {
    var layouts = [
        {width: 1449, breakpoint: 'xxl'},
        {width: 1200, breakpoint: 'xl'},
        {width: 991,  breakpoint: 'lg'},
        {width: 767,  breakpoint: 'md'},
        {width: 575,  breakpoint: 'sm'},
        {width: 0,    breakpoint: 'xs'}
    ];

    $(window).on('resize', function() {
        for (var i = 0; i < layouts.length; i++) {
            if (window.innerWidth > layouts[i].width) {
                if (layouts[i].breakpoint != $.currentBreakpoint) {
                    $.currentBreakpoint = layouts[i].breakpoint;
                    $(window).trigger('custombreakpoint', $.currentBreakpoint);
                }
                break;
            }
        }
    });

    $(function() {
        $(window).resize();
    })
})();

$(function() {
    var $tapablePhones = $('.tapable-phone');

    $tapablePhones.each(function() {
        var href = $(this).attr('data-phone');

        if (!href) {
            href = this.innerText.replace(/[^\d]+/g, '');
        }

        $(this).data('href', 'tel:' + href);
        $(this).data('originalMarkup', this.innerHTML);
    });

    $(window).on('custombreakpoint', function(e, breakpoint) {
        $tapablePhones.each(function() {
            var $self = $(this);

            if (breakpoint == 'xs' || breakpoint == 'sm') {
                this.innerHTML = '<a href="' + $self.data('href') + '">' + $self.data('originalMarkup') + '</a>';
            } else {
                this.innerHTML = $self.data('originalMarkup');
            }
        });
    });
});

(function() {
    var injectMapOverlay = function() {
        $('div > ymaps').each(function() {
            var $overlay = $(this).children('.touch-overlay');

            if (!$overlay.length) {
                $overlay = $('<div class="touch-overlay">Для взаимодействия с картой нажмите сюда</div>').appendTo(this);

                (function($overlay) {
                    var overlay = $overlay.get(0);

                    overlay.addEventListener('touchstart', function() {
                        $overlay.addClass('touched');
                    }, false);

                    overlay.addEventListener('touchend', function() {
                        $overlay.removeClass('touched');
                    }, false);

                    $overlay.on('click dragstart', function() {
                        $overlay.remove();
                    });
                })($overlay);
            }
        });
    };

    var interval = setInterval(function() {
        injectMapOverlay();
    }, 200);

    $(window).load(function() {
        var ym = window.ymaps || window.ymaps_ctor__ru_RU____;

        if (typeof ym == 'object') {
            ym.ready(injectMapOverlay);
        }

        clearInterval(interval);
    });

    $(function() {
        $(document.body).append('<style>.touch-overlay{position:absolute;left:0;top:0;right:0;bottom:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:rgba(80,80,80,0.7);color:#fff;font-size:1rem;cursor:pointer;z-index:1;opacity:0;transition:all 0.3s ease;padding:2rem;text-align:center;}@media(min-width: 576px){.touch-overlay {display:none!important;}}.touch-overlay.touched{opacity:1;}</style>');
    });
})();
