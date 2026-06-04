/* =====================================================
   script.js — Interactividad completa con jQuery
   Funcionalidades integradas:
   - Hover avanzado de la carta
   - Cambio de avatar
   - Estadísticas a 100 en hover
   - Cambio Front-end -> Full Stack
   - Contador de habilidad
   - Hobby aleatorio con fade y doble clic
   - Modo noche / día
   - Flip 3D frontal / reverso
   - Poder secreto aleatorio con brillo temporal
   ===================================================== */

$(document).ready(function () {
  /* ===================================================
     DATOS BASE DE LA CARTA
     =================================================== */
  let veces = 0;

  // Avatar normal de la carta
  const avatarBase =
    "https://api.dicebear.com/7.x/bottts/svg?seed=Zakkdruzer&backgroundColor=1a1a2e";

  // Avatar alternativo para el hover
  const avatarHover =
    "https://api.dicebear.com/9.x/bottts/svg?seed=Zakkdruzer-X&backgroundType=gradientLinear&backgroundColor=1e88e5,5e35b1&eyes=robocop,glow&face=square02,square04&mouth=grill01,diagram&sides=round,square&top=glowingBulb01,radar&texture=circuits,grunge01&scale=95&radius=20";

  // Se guardan los valores originales para restaurarlos al salir del hover
  const statsOriginales = [];

  $(".stat-item").each(function () {
    const valorTexto = $(this).find(".stat-valor").text();
    const valorNumero = parseInt(valorTexto, 10) || 0;

    statsOriginales.push({
      item: $(this),
      valor: valorNumero,
    });
  });

  /* ===================================================
     MISIÓN 11 — HOBBIES DINÁMICOS
     =================================================== */
  const hobbies = [
    { nombre: "Gaming", descripcion: "Indie y estrategia", horas: 6 },
    { nombre: "Leer", descripcion: "Ciencia ficción", horas: 3 },
    { nombre: "Dibujar", descripcion: "Sketches a lápiz", horas: 2 },
    { nombre: "Música", descripcion: "Playlists para programar", horas: 5 },
  ];

  let hobbyIndex = Math.floor(Math.random() * hobbies.length);

  function pintarHobby() {
    $("#hobby-nombre").text(hobbies[hobbyIndex].nombre);
    $("#hobby-desc").text(hobbies[hobbyIndex].descripcion);
    $("#hobby-horas").text("");
  }

  pintarHobby();

  $("#btn-hobby").on("click", function () {
    $("#hobby-box").fadeOut(200, function () {
      hobbyIndex = (hobbyIndex + 1) % hobbies.length;
      pintarHobby();
      $(this).fadeIn(200);
    });
  });

  $("#hobby-box").on("dblclick", function () {
    $("#hobby-horas").text("~" + hobbies[hobbyIndex].horas + " hrs/semana");
  });

  /* ===================================================
     MISIÓN 12 — MODO NOCHE / DÍA
     =================================================== */
  $("#btn-modo").on("click", function () {
    $("body").toggleClass("modo-noche");

    if ($("body").hasClass("modo-noche")) {
      $(this).text("Modo día");
    } else {
      $(this).text("Modo noche");
    }
  });

  /* ===================================================
     MISIÓN 13 — FLIP 3D DE LA CARTA
     Cualquier botón con clase .btn-flip alterna la cara
     =================================================== */
  $(".btn-flip").on("click", function () {
    $(".carta-inner").toggleClass("volteada");
  });

  /* ===================================================
     MISIÓN 14 — RULETA DE PODERES SECRETOS
     =================================================== */
  const poderes = [
    "Inmunidad al lunes",
    "Doble café gratis",
    "Visión de bug instantánea",
    "Compilar sin errores al primer intento",
    "Wi‑Fi infinito",
    "Stack Overflow telepático",
  ];

  let ultimoPoder = -1;

  $("#btn-poder").on("click", function () {
    let i = Math.floor(Math.random() * poderes.length);

    while (i === ultimoPoder) {
      i = Math.floor(Math.random() * poderes.length);
    }

    ultimoPoder = i;

    $("#poder").fadeOut(200, function () {
      $(this).text(poderes[i]).fadeIn(200);
    });

    $(".carta-inner")
      .addClass("brillo")
      .delay(500)
      .queue(function (next) {
        $(this).removeClass("brillo");
        next();
      });
  });

  /* ===================================================
     BOTÓN PRINCIPAL — ACTIVAR HABILIDAD
     =================================================== */
  $("#btn-activar").on("click", function () {
    veces++;

    $("#contador").text(
      "Activada " + veces + (veces === 1 ? " vez" : " veces"),
    );

    alert("⚡ ¡Debug Dimensional activado! (×" + veces + ")");

    $(".frente").removeClass("activa");

    setTimeout(function () {
      $(".frente").addClass("activa");
    }, 10);
  });

  /* ===================================================
     HOVER SOBRE LA CARTA FRONTAL
     - Cambia rareza visual
     - Cambia clase de Front-end a Full Stack
     - Cambia avatar
     - Lleva stats a 100
     =================================================== */
  $(".frente")
    .on("mouseenter", function () {
      $("#rareza-texto").text("⚡ NIVEL MÁXIMO ⚡");
      $("#clase-dev").text("Full Stack");
      $("#avatar-dev").attr("src", avatarHover);

      $(".stat-item").each(function () {
        $(this).find(".stat-barra").css("--valor", "100%");
        $(this).find(".stat-valor").text("100");
        $(this)
          .find(".stat-barra-wrap")
          .attr("aria-valuenow", "100")
          .attr("aria-label", $(this).find(".stat-nombre").text() + " 100");
      });
    })
    .on("mouseleave", function () {
      $("#rareza-texto").text("✦ Épica ✦");
      $("#clase-dev").text("Front-end");
      $("#avatar-dev").attr("src", avatarBase);

      $(".stat-item").each(function (index) {
        const valorOriginal = statsOriginales[index].valor;
        $(this)
          .find(".stat-barra")
          .css("--valor", valorOriginal + "%");
        $(this).find(".stat-valor").text(valorOriginal);
        $(this)
          .find(".stat-barra-wrap")
          .attr("aria-valuenow", valorOriginal)
          .attr(
            "aria-label",
            $(this).find(".stat-nombre").text() + " " + valorOriginal,
          );
      });
    });
});