export class PropuestaPage {
  render() {
    const el = document.createElement('div');
    el.className = 'sd-page animate__animated animate__fadeIn';
    el.innerHTML = `
      <div class="sd-page__hero">
        <div class="sd-page__hero-icon"><i class="fa-solid fa-gem"></i></div>
        <div class="sd-page__hero-content">
          <h2 class="sd-page__hero-title">Propuesta de Valor</h2>
          <p class="sd-page__hero-desc">
            Articula de forma clara qué ofreces, cómo te diferencias de la competencia
            y qué necesidades del cliente satisfaces de manera única.
          </p>
        </div>
      </div>
      <div class="sd-page__coming-soon">
        <div class="sd-coming-card">
          <i class="fa-solid fa-gem sd-coming-card__icon"></i>
          <h3 class="sd-coming-card__title">Próximamente</h3>
          <p class="sd-coming-card__text">
            Aquí articularás tu propuesta de valor diferenciada.
          </p>
        </div>
      </div>
    `;
    return el;
  }
}
