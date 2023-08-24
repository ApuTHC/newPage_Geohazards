$(document).ready(function () {
  CargarCarruselImagenes();
  CargarAboutUs();
  
  $('#modal_carousel').on('show.bs.modal', function (e) {
    // Se obtiene el botón que abrió el modal
    const button = $(e.relatedTarget) 
    // Se obtiene el id de la subestación mediante el atributo "data-whatever" del botón
    const id = button.data('whatever');
    var datosModal = datos["carrusel"]["modals"][id];
    console.log(datosModal);
    $("#tituloModalCarousel").html(datosModal["titulo"]);
    $("#ref_pdf").attr("data", datosModal["url_pdf"]);
    $("#ref_alt").attr("href", datosModal["url_pdf"]);
  });

  $(".menu li a").click(function (e) { 
    e.preventDefault();
    $(".menu li a").removeClass("active_menu");
    $("#"+e.target.id).addClass("active_menu");
  });

  // Selecciona los elementos que deseas observar
  const $slides = $('.kenBurns');

  // Crear un objeto para realizar seguimiento de los estados de los slides
  const slideStates = {};

  // Inicializar los estados de los slides
  $slides.each(function() {
      const slideId = $(this).attr('id');
      slideStates[slideId] = $(this).hasClass('active');
  });

  // Crea una instancia de MutationObserver utilizando jQuery
  const observer = new MutationObserver(function(mutationsList, observer) {
      for (let mutation of mutationsList) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
              const $target = $(mutation.target);
              const slideId = $target.attr('data-name');
              const currentState = $target.hasClass('active');
              if (currentState !== slideStates[slideId]) {
                  slideStates[slideId] = currentState;
                  if (currentState) {
                      // Ejecuta tu función aquí pasando slideId
                      $(".menu li a").removeClass("active_menu");
                      $("#menu_"+slideId).addClass("active_menu");
                  }
              }
          }
      }
  });

  // Configura el observador para observar cambios en atributos
  $slides.each(function() {
      observer.observe(this, { attributes: true });
  });





});


function CargarCarruselImagenes() {
  var datosCarousel = datos["carrusel"];
  var content_carousel = "";
  var content_indicators = "";
  content_carousel += '<div class="carousel-personalizado">';
  for (let ind = 0; ind < datosCarousel["items"].length; ind++) {
      content_indicators += '<li data-target="#carouselImagesGeohazards" data-slide-to="'+ind+'"'+(ind === 0 ? "class='active'" : "")+'></li>';
      
      item = datosCarousel["items"][ind];
      content_carousel += '<div class="carousel-item '+(ind === 0 ? "active" : "")+'">';
      content_carousel += '<img src="'+item["img"]+'" class="img-slider d-block" alt="'+item["img_alt"]+'">';
      content_carousel += '<div  class="carousel-caption">';
      content_carousel += '<p class="m-0">';
      content_carousel += '<span class="titulo-slider m-0"><b>'+item["titulo"]+'</b></span>';
      content_carousel += '<h5 class="mb-4">'+item["fecha"]+'</h5>';
      content_carousel += '<span class="desc-slider">'+item["texto"]+'</span>'; 
      content_carousel += '</p>';
      content_carousel += '<ul class="btns-slider d-flex align-items-center list-unstyled justify-content-around">';
      for (let index = 0; index < item["btn"].length; index++) {
          const element = item["btn"][index];
          if (element["modal"]) {
              content_carousel += '<li><button type="button" data-toggle="modal" data-target="#modal_carousel" data-whatever="'+element["modal_info"]+'" class="btn btn-comun" target="_blank" style="font-size: 16px;">'+element["texto"]+'</i></button></li>';
          }
          else{
              content_carousel += '<li><a href="'+element["link"]+'" target="_blank" class="btn btn-comun"  style="font-size: 16px;">'+element["texto"]+'</a></li>';
          }
      }
      content_carousel += '</ul>';
      content_carousel += '</div></div>';
  }
  content_carousel += '</div>';
  $("#indicators").append(content_indicators);
  $("#carouselContent").append(content_carousel);
}

function CargarAboutUs() {
  const about = datos["aboutus"];
  var content = "";
  var content1 = "";
  content += '<h1 class="ae-2 fromLeft trans">'+about["title"]+'</h1>';
  content += '<h1 class="ae-2 fromLeft trans d-none">'+about["title_eng"]+'</h1>';
  content += '<p class="ae-3 fromLeft trans">'+about["text"]+'</p>';
  content += '<p class="ae-3 fromLeft trans d-none">'+about["text_eng"]+'</p>';

  content1 += '<div class="d-inline-block mr-4 text-center"><img src="'+about["img_ed"]+'" class="foto_profe"/>';
  content1 += '<p class="title_profe"><b>Edier V. Aristizábal G.</b> <br> Director</p></div>';
  content1 += '<div class="d-inline-block ml-4 redes_profe">';
  content1 += '<p class="datos_profe m-0">'+about["datos_profe"]+'</p>';
  content1 += '<a href="mailto:'+about["mail"]+'"><i class="fa-solid fa-envelope"></i></a>';
  content1 += '<a target="_blank" href="'+about["web"]+'"><i class="fa-solid fa-globe"></i></a>';
  content1 += '<a target="_blank" href="'+about["cvlac"]+'">CvLAC</i></a>';
  content1 += '<a target="_blank" href="'+about["linkedin"]+'"><i class="fa-brands fa-linkedin"></i></a>';
  content1 += '<a target="_blank" href="'+about["scholar"]+'"><i class="fa-solid fa-graduation-cap"></i></a>';
  content1 += '<a target="_blank" href="'+about["research"]+'"><i class="fa-brands fa-researchgate"></i></a>';
  content1 += '<a target="_blank" href="'+about["github"]+'"><i class="fa-brands fa-github"></i></a>';
  content1 += '</div>';

  $("#aboutus_content").append(content);
  $("#aboutus_img").append(content1);
}


