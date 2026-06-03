export class DesplieguePage {
  render() {
    const el = document.createElement('div');
    el.className = 'sd-page animate__animated animate__fadeIn';
    el.innerHTML = `
      <div class="sd-page__hero">
        <div class="sd-page__hero-icon"><i class="fa-solid fa-rocket"></i></div>
        <div class="sd-page__hero-content">
          <h2 class="sd-page__hero-title">Despliegue</h2>
          <p class="sd-page__hero-desc">
            Define la velocidad y la secuencia de tus movimientos estratégicos:
            qué hacer primero, qué viene después y a qué ritmo.
          </p>
        </div>
      </div>
      <div class="sd-page__coming-soon">
        <div class="sd-coming-card">
          <i class="fa-solid fa-rocket sd-coming-card__icon"></i>
          <h3 class="sd-coming-card__title">Próximamente</h3>
          <p class="sd-coming-card__text">
            Aquí planificarás la secuencia y velocidad de tu despliegue estratégico.
          </p>
        </div>
      </div>
    `;
    return el;
  }
}
