export class LogicaPage {
  render() {
    const el = document.createElement('div');
    el.className = 'sd-page animate__animated animate__fadeIn';
    el.innerHTML = `
      <div class="sd-page__hero">
        <div class="sd-page__hero-icon"><i class="fa-solid fa-chart-line"></i></div>
        <div class="sd-page__hero-content">
          <h2 class="sd-page__hero-title">Lógica Económica</h2>
          <p class="sd-page__hero-desc">
            Especifica cómo generarás beneficios: estructura de costos, mecanismos de ingresos,
            economías de escala o diferenciación que sustentan la rentabilidad.
          </p>
        </div>
      </div>
      <div class="sd-page__coming-soon">
        <div class="sd-coming-card">
          <i class="fa-solid fa-chart-line sd-coming-card__icon"></i>
          <h3 class="sd-coming-card__title">Próximamente</h3>
          <p class="sd-coming-card__text">
            Aquí modelarás la lógica económica que sustenta tu estrategia.
          </p>
        </div>
      </div>
    `;
    return el;
  }
}
