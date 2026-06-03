import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {
  faLayerGroup,
  faRoute,
  faGem,
  faRocket,
  faChartLine,
  faCog,
  faChevronLeft,
  faChevronRight,
  faSun,
  faMoon,
  faDesktop,
  faBars,
  faCircleHalfStroke,
  faBullseye,
  faBoxesStacked,
  faCubes,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faLayerGroup,
  faRoute,
  faGem,
  faRocket,
  faChartLine,
  faCog,
  faChevronLeft,
  faChevronRight,
  faSun,
  faMoon,
  faDesktop,
  faBars,
  faCircleHalfStroke,
  faBullseye,
  faBoxesStacked,
  faCubes
);

// Auto-replace <i> tags with SVG
dom.watch();
