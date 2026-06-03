import { ArenasPage } from '../pages/ArenasPage.js';
import { MediosPage } from '../pages/MediosPage.js';
import { PropuestaPage } from '../pages/PropuestaPage.js';
import { DesplieguePage } from '../pages/DesplieguePage.js';
import { LogicaPage } from '../pages/LogicaPage.js';
import { ConfiguracionPage } from '../pages/ConfiguracionPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { RegisterPage } from '../pages/RegisterPage.js';

const PAGES = {
  arenas: ArenasPage,
  medios: MediosPage,
  propuesta: PropuestaPage,
  despliegue: DesplieguePage,
  logica: LogicaPage,
  configuracion: ConfiguracionPage,
  login: LoginPage,
  registro: RegisterPage,
};

export class PageRouter {
  constructor({ currentPage, onNavigate }) {
    this.currentPage = currentPage;
    this.onNavigate = onNavigate;
  }

  render() {
    const PageClass = PAGES[this.currentPage] || ArenasPage;
    const page = new PageClass({ onNavigate: this.onNavigate });
    return page.render();
  }
}
