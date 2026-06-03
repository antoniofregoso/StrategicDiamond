export class ConfiguracionPage {
  render() {
    const el = document.createElement('div');
    el.className = 'sd-page animate__animated animate__fadeIn';
    el.innerHTML = `
      <div class="sd-page__hero">
        <div class="sd-page__hero-icon"><i class="fa-solid fa-cog"></i></div>
        <div class="sd-page__hero-content">
          <h2 class="sd-page__hero-title">Configuración</h2>
          <p class="sd-page__hero-desc">
            Gestiona las preferencias del sistema, usuarios, integraciones
            y parámetros generales de la plataforma.
          </p>
        </div>
      </div>
      <div class="sd-page__coming-soon">
        <div class="sd-coming-card">
          <i class="fa-solid fa-cog sd-coming-card__icon"></i>
          <h3 class="sd-coming-card__title">Próximamente</h3>
          <p class="sd-coming-card__text">
            Aquí administrarás la configuración de tu plataforma estratégica.
          </p>
        </div>
      </div>
    `;
    return el;
  }
}
