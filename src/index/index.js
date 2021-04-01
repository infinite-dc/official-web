import './style.scss';

console.log('index init');

const { $ } = window;

// $(document).on('scroll', () => {
//   const pageTop = $(document).scrollTop();
//   const pageBottom = pageTop + $(window).height() / 3 * 2;
//   const tags = $('.fade-in');

//   for (let i = 0; i < tags.length; i += 1) {
//     const tag = tags[i];

//     if ($(tag).offset().top < pageBottom) {
//       $(tag).addClass('visible');
//     }
//   }
// });

// new Sticky('.sticky');
$(document).on('scroll', () => {
  const pageTop = $(document).scrollTop();
  const $bt = $('.to-top');
  if (pageTop > 200 && !$bt.hasClass('visible')) {
    $('.to-top').addClass('visible');
  } else if (pageTop < 200 && $bt.hasClass('visible')) {
    $('.to-top').removeClass('visible');
  }
});

if (window.innerWidth < 600) {
  $('#business .nav.left').click((el) => {
    const index = $('#business .icon.active').attr('data-index');
    const next = (parseInt(index) + 3) % 4;
    $('#business .icon').removeClass('active');
    $('#business .desc').removeClass('active');
    $(`#business .icon[data-index="${next}"]`).addClass('active');
    $(`#business .desc[data-index="${next}"]`).addClass('active');
  });
  $('#business .nav.right').click((el) => {
    const index = $('#business .icon.active').attr('data-index');
    const next = (parseInt(index) + 1) % 4;
    $('#business .icon').removeClass('active');
    $('#business .desc').removeClass('active');
    $(`#business .icon[data-index="${next}"]`).addClass('active');
    $(`#business .desc[data-index="${next}"]`).addClass('active');
  });
} else {
  $('#business .icon').click((el) => {
    const index = $(el.currentTarget).attr('data-index');
    $('#business .icon').removeClass('active');
    $('#business .desc').removeClass('active');
    $(`#business .icon[data-index="${index}"]`).addClass('active');
    $(`#business .desc[data-index="${index}"]`).addClass('active');
  });
}

// $('#potofolio .dot').click((el) => {
//   const index = $(el.currentTarget).attr('data-index');
//   $('#potofolio .dot').removeClass('active');
//   $(`#potofolio .dot[data-index="${index}"]`).addClass('active');
//   $('#potofolio .pages').css('transform', `translate(-${50 * parseInt(index)}%, 0)`);
// });

// setInterval(() => {
//   $('#potofolio .dot:not(.active)').click();
// }, 3000);

$('.to-top').click(() => {
  $('html,body').animate({ scrollTop: 0 }, 500);
});

$(() => {
  $('#home').css('height', `${window.innerHeight}px`);
});
