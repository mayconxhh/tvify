/**
* Module Dependencies
*/
import $ from 'jquery';

$(function() {
  var $tvShowsContainer = $('#app-body').find('.tv-shows');

  $tvShowsContainer.on('click', 'button.like', function (ev){
    var $this = $(this);
    $this.closest('.tv-show').toggleClass('like');
    // $this.animate({
    //   'fontSize': '30px',
    //   'color': '#FF0000'
    // }, 500)
  })

  function renderShows(shows) {
    $tvShowsContainer.find('.loader').remove();
    shows.forEach(function (show) {
      var article = template
        .replace(':name:', show.name)
        .replace(':img:', show.image ? show.image.medium : '')
        .replace(':summary:', show.summary)
        .replace(':img alt:', show.name + " Logo")

      var $article = $(article)
      $article.hide();
      $tvShowsContainer.append($(article).fadeIn(1500))
    })
  }

  $('#app-body')
    .find('form')
    .submit(function (ev){
      ev.preventDefault();
      var busqueda = $(this)
        .find('input[type="text"]')
        .val();

      $tvShowsContainer.find('.tv-show').remove()
      var $loader = $('<div class="loader">');
      $loader.appendTo($tvShowsContainer);
      $.ajax({
        url: 'http://api.tvmaze.com/search/shows',
        data: { q: busqueda},
        success: function(res, textStatus, xhr){
          $loader.remove();
          var shows = res.map(function (el) {
            return el.show;
          })

          renderShows(shows);
        }
      })
    })

  var template =  '<article class="tv-show">' +
          '<div class="left img-container">' +
            '<img src=":img:" alt=":img alt:">' +
          '</div>' +
          '<div class="right info">' +
            '<h1>:name:</h1>' +
            '<p>:summary:</p>' +
            '<button class="like">💖</button>'+
          '</div>' +
        '</article>';

  if (!localStorage.shows) {
    $.ajax('http://api.tvmaze.com/shows')
      .then(function (shows) {
        $tvShowsContainer.find('.loader').remove();
        localStorage.shows = JSON.stringify(shows);
        renderShows(shows);
      })
  } else {
    renderShows(JSON.parse(localStorage.shows));
  }

})

  //crear elementos
  // var a = $('<a>', {
  // 	href: "http://www.facebook.com",
  // 	target: '_blank',
  // 	html: 'facebook'
  // })
  // $('#app-body').append(a);

  // // modificar atributo de etiqueta a creada
  // a.attr({
  // 	href: 'http://www.google.com',
  // 	html: 'Hola'
  // });

// setTimeOut(function (){
// 	$('h1').addClass('hola');
// })


// $.noConflict();
// jQuery(document).ready(function($){
// 	$ //jQuery
// })

// $(document).ready(function (){
// 	alert('ready');
// })