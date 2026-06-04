/* =====================================================
   script.js — Interactividad jQuery
   Aquí vive el comportamiento dinámico de la carta.
   ===================================================== */

$(document).ready(function () {
  /*
    Espera a que el DOM esté cargado antes de ejecutar
    cualquier interacción.
  */

  // ====================================================
  // 1. CONTADOR DE ACTIVACIONES
  // Variable que guarda cuántas veces se ha activado
  // la habilidad.
  // ====================================================
  let veces = 0;

  // ====================================================
  // 2. CLICK EN EL BOTÓN "ACTIVAR HABILIDAD"
  // Cuando el usuario hace click:
  // - aumenta el contador
  // - actualiza el texto en pantalla
  // - muestra un alert
  // - aplica animación a la carta
  // ====================================================
  $("#btn-activar").on("click", function () {
    // Suma una activación
    veces++;

    // Muestra el contador en pantalla
    // Si es 1, dice "vez"; si son más, dice "veces"
    $("#contador").text(
      "Activada " + veces + (veces === 1 ? " vez" : " veces"),
    );

    // Muestra una alerta con el nombre de la habilidad
    alert("⚡ ¡Debug Dimensional activado! (×" + veces + ")");

    // Reinicia la clase activa para que la animación
    // se repita cada vez que haces click
    $(".carta").removeClass("activa");

    // Un pequeño delay permite volver a agregar la clase
    // y re-disparar la animación CSS
    setTimeout(function () {
      $(".carta").addClass("activa");
    }, 10);
  });

  // ====================================================
  // 3. HOVER SOBRE LA CARTA
  // Cuando entra el mouse, cambia el texto de la rareza.
  // Cuando sale, vuelve al original.
  // ====================================================
  $(".carta")
    .on("mouseenter", function () {
      $("#rareza-texto").text("⚡ NIVEL MÁXIMO ⚡");
    })
    .on("mouseleave", function () {
      $("#rareza-texto").text("✦ Épica ✦");
    });
});