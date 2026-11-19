import { DEFAULT_PREFERENCES, FONT_STEPS, STORAGE_KEY, ZOOM_STEPS } from '@/domain/a11yPreferences';

/**
 * Script inline executado antes da pintura: aplica as preferências salvas
 * para não haver "piscada" de tamanho ou contraste ao carregar a página.
 * Gerado a partir das mesmas constantes do domínio.
 */
export const A11Y_HEAD_SCRIPT = `(function(){try{
var F=${JSON.stringify(FONT_STEPS)},Z=${JSON.stringify(ZOOM_STEPS)},r=document.documentElement;
var p=JSON.parse(localStorage.getItem(${JSON.stringify(STORAGE_KEY)})||'null')||{};
var f=F[p.font]||100,z=Z[p.zoom]||100;
r.style.setProperty('--a11y-font',f+'%');r.style.setProperty('--a11y-zoom',String(z/100));
if(p.contrast===true)r.setAttribute('data-contrast','high');
var v=typeof p.vlibras==='boolean'?p.vlibras:${DEFAULT_PREFERENCES.vlibras};
r.setAttribute('data-vlibras',v?'on':'off');
}catch(e){}})();`;
