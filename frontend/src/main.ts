import { profile } from './api/users.js';

const routes = ['/home', '/flights', '/about', '/login', '/register', '/booking'];

// Función para cargar componentes
async function loadComponent(selector: string, file: string, isView: boolean = false) {
  if (file === '/') file = '/home';
  if (isView && !routes.includes(file)) file = "/error";
  
  const path = (isView) ? `/views${file}.html` : `/components${file}.html`;
  const response = await fetch(path);
  const html = await response.text();
  
  document.querySelector(selector)!.innerHTML = html;
  //document.querySelector('#scripts')!.innerHTML = `import ('../src/scripts${file}.ts');`;
}

// Maneja los enlaces sin recargar la página
function handleNavigation(event: Event) {
  const link = (event.target as HTMLElement).closest('a[data-link]');
  if (link) {
    event.preventDefault();
    const path = link.getAttribute('href')!;
    window.history.pushState({}, '', path);
    loadComponent('#content', path, true);
  }
}

// Inicializa la app
async function init() {
  await loadComponent('#navbar', '/navbar');
  await loadComponent('#footer', '/footer');

  document.body.addEventListener('click', handleNavigation);
  await loadComponent('#content', window.location.pathname, true);

  // Reacciona a navegación con botones del navegador
  window.addEventListener('popstate', () => loadComponent('#content', window.location.pathname, true));
}


await init();

function checkUser() {
  const profilex = profile();
  //document.querySelector<HTMLAnchorElement>('#user-msg')!.innerHTML = 'Usuario no conectado';
}

checkUser();

await import('../src/scripts/register.js');
await import('../src/scripts/login.js');
await import('../src/scripts/booking.js');
await import('../src/scripts/flights.js');