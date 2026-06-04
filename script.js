/* =====================================================
   script.js — Interactividad jQuery
   ===================================================== */

$(document).ready(function () {
  let veces = 0;

  const avatarBase =
    "https://api.dicebear.com/7.x/bottts/svg?seed=Zakkdruzer&backgroundColor=1a1a2e";

  const avatarHover =
    "https://api.dicebear.com/9.x/bottts/svg?seed=Zakkdruzer-X&backgroundType=gradientLinear&backgroundColor=1e88e5,5e35b1&eyes=robocop,glow&face=square02,square04&mouth=grill01,diagram&sides=round,square&top=glowingBulb01,radar&texture=circuits,grunge01&scale=95&radius=20";

  // Guarda el texto original de cada estadística para restaurarlo luego
  const statsOriginales = [];

  $(".stat-item").each(function () {
    const valorTexto = $(this).find(".stat-valor").text();
    const valorNumero = parseInt(valorTexto, 10) || 0;

    statsOriginales.push({
      item: $(this),
      valor: valorNumero,
    });
  });

  $("#btn-activar").on("click", function () {
    veces++;

    $("#contador").text(
      "Activada " + veces + (veces === 1 ? " vez" : " veces"),
    );

    alert("⚡ ¡Debug Dimensional activado! (×" + veces + ")");

    $(".carta").removeClass("activa");

    setTimeout(function () {
      $(".carta").addClass("activa");
    }, 10);
  });

  $(".carta")
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