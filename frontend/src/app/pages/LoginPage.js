import { AuthApi } from '../services/authApi.js';

export class LoginPage {
  constructor({ onNavigate } = {}) {
    this.onNavigate = onNavigate;
  }

  render() {
    const el = document.createElement('div');
    el.className = 'sd-auth-page animate__animated animate__fadeIn';
    el.innerHTML = `
      <section class="sd-auth-panel">
        <div class="sd-auth-panel__brand">
          <div class="sd-auth-panel__icon"><i class="fa-solid fa-right-to-bracket"></i></div>
          <h2 class="sd-auth-panel__title">Login</h2>
          <p class="sd-auth-panel__text">
            Accede a tu espacio de planeación estratégica.
          </p>
        </div>

        <form class="sd-auth-form" novalidate>
          <div class="field">
            <label class="label" for="login-email">Correo</label>
            <p class="control has-icons-left">
              <input class="input" id="login-email" name="email" type="email" autocomplete="email" placeholder="correo@empresa.com" required>
              <span class="icon is-small is-left"><i class="fa-solid fa-envelope"></i></span>
            </p>
          </div>

          <div class="field">
            <label class="label" for="login-password">Contraseña</label>
            <p class="control has-icons-left">
              <input class="input" id="login-password" name="password" type="password" autocomplete="current-password" placeholder="Contraseña" required>
              <span class="icon is-small is-left"><i class="fa-solid fa-lock"></i></span>
            </p>
          </div>

          <p class="help sd-auth-message" aria-live="polite"></p>

          <button class="button is-primary is-fullwidth sd-auth-submit" type="submit">
            <span class="sd-auth-submit-text">Entrar</span>
            <span class="sd-auth-submit-icon"><i class="fa-solid fa-arrow-right"></i></span>
          </button>
        </form>

        <div class="sd-auth-alt">
          <span>¿Aún no tienes cuenta?</span>
          <button type="button" class="sd-auth-link">Crear registro</button>
        </div>
      </section>
    `;

    const form = el.querySelector('.sd-auth-form');
    const message = el.querySelector('.sd-auth-message');
    const submit = el.querySelector('.sd-auth-submit');
    const registerBtn = el.querySelector('.sd-auth-link');

    registerBtn.addEventListener('click', () => this.onNavigate?.('registro'));

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(form);

      const validationMessage = this.validateForm(form);
      if (validationMessage) {
        this.setMessage(message, validationMessage, 'error');
        return;
      }

      this.setLoading(submit, true);
      this.setMessage(message, '');

      try {
        const login = await AuthApi.login({
          email: String(formData.get('email')).trim(),
          password: String(formData.get('password')),
        });

        this.setMessage(message, `Sesión iniciada como ${login.email}`, 'success');
        this.onNavigate?.('arenas');
      } catch (error) {
        this.setMessage(message, error.message, 'error');
      } finally {
        this.setLoading(submit, false);
      }
    });

    return el;
  }

  setLoading(button, isLoading) {
    button.disabled = isLoading;
    button.classList.toggle('is-loading', isLoading);
    button.querySelector('.sd-auth-submit-text').textContent = isLoading ? 'Entrando...' : 'Entrar';
    button.querySelector('.sd-auth-submit-icon').innerHTML = isLoading
      ? '<i class="fa-solid fa-circle-notch"></i>'
      : '<i class="fa-solid fa-arrow-right"></i>';
  }

  setMessage(message, text, type = '') {
    message.textContent = text;
    message.className = `sd-auth-message${type ? ` is-${type}` : ''}`;
  }

  validateForm(form) {
    const email = form.elements.email;
    const password = form.elements.password;

    if (!email.value.trim()) {
      return 'Escribe tu correo.';
    }

    if (!email.validity.valid) {
      return 'Escribe un correo válido.';
    }

    if (!password.value) {
      return 'Escribe tu contraseña.';
    }

    return '';
  }
}
