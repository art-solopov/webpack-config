const tmpl = require('./tmpl.pug');

const greet = 'Webpack';

window.addEventListener('load', () => {
    document.body.insertAdjacentHTML('beforeend', tmpl({greet}))
});
