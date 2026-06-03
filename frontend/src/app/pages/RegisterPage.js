import { AuthApi } from '../services/authApi.js';

export class RegisterPage {
  constructor({ onNavigate } = {}) {
    this.onNavigate = onNavigate;
  }

  render() {
    const el = document.createElement('div');
    el.className = 'sd-auth-page animate__animated animate__fadeIn';
    el.innerHTML = `
      <section class="sd-auth-panel sd-auth-panel--wide">
        <div class="sd-auth-panel__brand">
          <div class="sd-auth-panel__icon"><i class="fa-solid fa-user-plus"></i></div>
          <h2 class="sd-auth-panel__title">Registro</h2>
          <p class="sd-auth-panel__text">
            Crea tu empresa y el usuario administrador.
          </p>
        </div>

        <form class="sd-auth-form" novalidate>
          <div class="sd-auth-grid">
            <div class="field">
              <label class="label" for="register-name">Nombre</label>
              <p class="control has-icons-left">
                <input class="input" id="register-name" name="name" type="text" autocomplete="name" placeholder="Nombre completo" minlength="2" required>
                <span class="icon is-small is-left"><i class="fa-solid fa-user"></i></span>
              </p>
            </div>

            <div class="field">
              <label class="label" for="register-company">Empresa</label>
              <p class="control has-icons-left">
                <input class="input" id="register-company" name="companyName" type="text" autocomplete="organization" placeholder="Nombre de empresa" required>
                <span class="icon is-small is-left"><i class="fa-solid fa-building"></i></span>
              </p>
            </div>
          </div>

          <div class="field">
            <label class="label" for="register-email">Correo</label>
            <p class="control has-icons-left">
              <input class="input" id="register-email" name="email" type="email" autocomplete="email" placeholder="correo@empresa.com" required>
              <span class="icon is-small is-left"><i class="fa-solid fa-envelope"></i></span>
            </p>
          </div>

          <div class="field">
            <label class="label" for="register-password">Contraseña</label>
            <p class="control has-icons-left">
              <input class="input" id="register-password" name="password" type="password" autocomplete="new-password" placeholder="Mínimo 8 caracteres" minlength="8" required>
              <span class="icon is-small is-left"><i class="fa-solid fa-lock"></i></span>
            </p>
          </div>

          <p class="help sd-auth-message" aria-live="polite"></p>

          <button class="button is-primary is-fullwidth sd-auth-submit" type="submit">
            <span class="sd-auth-submit-text">Crear cuenta</span>
            <span class="sd-auth-submit-icon"><i class="fa-solid fa-arrow-right"></i></span>
          </button>
        </form>

        <div class="sd-auth-alt">
          <span>¿Ya tienes cuenta?</span>
          <button type="button" class="sd-auth-link">Ir a login</button>
        </div>
      </section>
    `;

    const form = el.querySelector('.sd-auth-form');
    const message = el.querySelector('.sd-auth-message');
    const submit = el.querySelector('.sd-auth-submit');
    const loginBtn = el.querySelector('.sd-auth-link');

    loginBtn.addEventListener('click', () => this.onNavigate?.('login'));

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
        await AuthApi.register({
          name: String(formData.get('name')).trim(),
          companyName: String(formData.get('companyName')).trim(),
          email: String(formData.get('email')).trim(),
          password: String(formData.get('password')),
        });

        this.setMessage(message, 'Registro creado. Ya puedes iniciar sesión.', 'success');
        window.setTimeout(() => this.onNavigate?.('login'), 700);
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
    button.querySelector('.sd-auth-submit-text').textContent = isLoading ? 'Creando...' : 'Crear cuenta';
    button.querySelector('.sd-auth-submit-icon').innerHTML = isLoading
      ? '<i class="fa-solid fa-circle-notch"></i>'
      : '<i class="fa-solid fa-arrow-right"></i>';
  }

  setMessage(message, text, type = '') {
    message.textContent = text;
    message.className = `sd-auth-message${type ? ` is-${type}` : ''}`;
  }

  validateForm(form) {
    const name = form.elements.name;
    const companyName = form.elements.companyName;
    const email = form.elements.email;
    const password = form.elements.password;

    if (!name.value.trim()) {
      return 'Escribe tu nombre.';
    }

    if (name.value.trim().length < 2) {
      return 'El nombre debe tener al menos 2 caracteres.';
    }

    if (!companyName.value.trim()) {
      return 'Escribe el nombre de tu empresa.';
    }

    if (!email.value.trim()) {
      return 'Escribe tu correo.';
    }

    if (!email.validity.valid) {
      return 'Escribe un correo válido.';
    }

    if (!password.value) {
      return 'Escribe una contraseña.';
    }

    if (password.value.length < 8) {
      return 'La contraseña debe tener al menos 8 caracteres.';
    }

    return '';
  }
}
