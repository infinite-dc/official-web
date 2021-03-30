import './style.scss';

const { $ } = window;

function initMobileMenu() {
  if (window.innerWidth < 600) {
    const $header = $('header');

    $('.m-btn', $header).click(() => {
      $header.toggleClass('show-menu');
    });

    $(document).scroll(() => {
      if (window.scrollY > 40 && !$header.hasClass('not-top')) {
        $header.addClass('not-top');
      } else if (window.scrollY <= 40 && $header.hasClass('not-top')) {
        $header.removeClass('not-top');
      }
    });
  }
}

function initScroll() {
  $(document).on('scroll', () => {
    const pageTop = $(document).scrollTop();
    const $bt = $('header');
    if (pageTop > 200 && !$bt.hasClass('not-top')) {
      $('header').addClass('not-top');
    } else if (pageTop < 200 && $bt.hasClass('not-top')) {
      $('header').removeClass('not-top');
    }
  });
}


$(initMobileMenu);
$(initScroll);
