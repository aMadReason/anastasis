import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";
import "./css/theme/index.css";
import "./css/theme/helpers.css";
import "./css/theme/themes/tea.css";
import "./css/style.css"

import App from "./App.vue";
import NotFoundPage from './pages/NotFoundPage';
import IntroPage from './pages/IntroPage';
import CreditsPage from './pages/CreditsPage';
import MenuPage from './pages/MenuPage';
import GamePage from './pages/GamePage';
import ComputerPage from './pages/ComputerPage'

// import UIGame from "./components/UIGame.vue";
// import UICredits from "./components/UICredits.vue";
// import UINotFound from "./components/UINotFound.vue";
// import UIMenu from "./components/UIMenu.vue";
// import UIIntro from "./components/UIIntro.vue";

// const routes = [
//   { path: '/:pathMatch(.*)*', name: 'NotFound', component: UINotFound },
//   { path: '', name: 'home', component: UIIntro },
//   { path: '/game', name: 'game', component: UIGame },
//   { path: '/credits', name: 'credits', component: UICredits },
//   { path: '/menu', name: 'menu', component: UIMenu }
// ];





const routes = [
  { path: '/:pathMatch(.*)*', name: 'NotFoundPage', component: NotFoundPage },
  { path: '', name: 'home', component: IntroPage },
  { path: '/credits', name: 'credits', component: CreditsPage },
  { path: '/menu', name: 'menu', component: MenuPage },
  { path: '/game', name: 'game', component: GamePage },
  { path: '/computer', name: 'computer', component: ComputerPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


createApp(App).use(router).mount("#app");
