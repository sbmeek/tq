import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import generateStore from './global/store';
import InitProvider from './global/context/InitContext';
import * as serviceWorker from './serviceWorker';

const store = generateStore();

const reactRoot = document.querySelector('#react-root');
function calcVH() {
	var vH = Math.max(
		document.documentElement.clientHeight,
		window.innerHeight || 0
	);
	reactRoot!.setAttribute('style', 'height:' + vH + 'px;');
}

calcVH();
window.addEventListener('onorientationchange', calcVH, true);
window.addEventListener('resize', calcVH, true);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<InitProvider>
				<App />
			</InitProvider>
		</Provider>
	</React.StrictMode>,
	reactRoot
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
