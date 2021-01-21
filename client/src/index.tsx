import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import generateStore from './global/store';
import InitProvider from './global/context/InitContext';
import { StyleSheetManager } from 'styled-components';
import * as serviceWorker from './serviceWorker';

import './variables.css';
import './globalStyles.css';

const store = generateStore();

const reactRoot = document.querySelector('#react-root');

export const getViewportH = () => {
	return Math.max(
		document.documentElement.clientHeight,
		window.innerHeight || 0
	);
};

function calcVH() {
	reactRoot!.setAttribute('style', 'height:' + getViewportH() + 'px;');
}

calcVH();
window.addEventListener('load', () => {
	reactRoot?.classList.add('bgColor-for-img');
});
window.addEventListener('onorientationchange', calcVH, true);
window.addEventListener('resize', calcVH, true);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<InitProvider>
				<StyleSheetManager
					disableVendorPrefixes={process.env.NODE_ENV === 'development'}
				>
					<App />
				</StyleSheetManager>
			</InitProvider>
		</Provider>
	</React.StrictMode>,
	reactRoot
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
