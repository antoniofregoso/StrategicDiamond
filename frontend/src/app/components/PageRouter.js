import { ArenasPage } from '../pages/ArenasPage.js';
import { MediosPage } from '../pages/MediosPage.js';
import { PropuestaPage } from '../pages/PropuestaPage.js';
import { DesplieguePage } from '../pages/DesplieguePage.js';
import { LogicaPage } from '../pages/LogicaPage.js';
import { ConfiguracionPage } from '../pages/ConfiguracionPage.js';

const PAGES = {
  arenas: ArenasPage,
  medios: MediosPage,
  propuesta: PropuestaPage,
  despliegue: DesplieguePage,
  logica: LogicaPage,
  configuracion: ConfiguracionPage,
};

export class PageRouter {
  constructor({ currentPage }) {
    this.currentPage = currentPage;
  }

  render() {
    const PageClass = PAGES[this.currentPage] || ArenasPage;
    const page = new PageClass();
    return page.render();
  }
}
