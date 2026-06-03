export class ArenasPage {
  render() {
    const el = document.createElement('div');
    el.className = 'sd-page animate__animated animate__fadeIn';
    el.innerHTML = `
      <div class="sd-page__hero">
        <div class="sd-page__hero-icon"><i class="fa-solid fa-layer-group"></i></div>
        <div class="sd-page__hero-content">
          <h2 class="sd-page__hero-title">Arenas</h2>
          <p class="sd-page__hero-desc">
            Define los mercados, categorías de productos, segmentos de clientes, áreas geográficas
            y etapas de la cadena de valor en los que competirás.
          </p>
        </div>
      </div>
      <div class="sd-page__coming-soon">
        <div class="sd-coming-card">
          <i class="fa-solid fa-layer-group sd-coming-card__icon"></i>
          <h3 class="sd-coming-card__title">Próximamente</h3>
          <p class="sd-coming-card__text">
            Aquí configurarás las arenas estratégicas de tu Diamante.
          </p>
        </div>
      </div>
    `;
    return el;
  }
}
