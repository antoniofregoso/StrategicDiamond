export class MediosPage {
  render() {
    const el = document.createElement('div');
    el.className = 'sd-page animate__animated animate__fadeIn';
    el.innerHTML = `
      <div class="sd-page__hero">
        <div class="sd-page__hero-icon"><i class="fa-solid fa-boxes-stacked"></i></div>
        <div class="sd-page__hero-content">
          <h2 class="sd-page__hero-title">Medios</h2>
          <p class="sd-page__hero-desc">
            Establece los vehículos que utilizarás para llegar a las arenas elegidas:
            desarrollo interno, joint ventures, licencias, adquisiciones.
          </p>
        </div>
      </div>
      <div class="sd-page__coming-soon">
        <div class="sd-coming-card">
          <i class="fa-solid fa-boxes-stacked sd-coming-card__icon"></i>
          <h3 class="sd-coming-card__title">Próximamente</h3>
          <p class="sd-coming-card__text">
            Aquí definirás los medios para alcanzar tus arenas estratégicas.
          </p>
        </div>
      </div>
    `;
    return el;
  }
}
