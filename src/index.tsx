import './index.css';
import * as serviceWorker from './serviceWorker';
import AppComponent from './virtualDom/appComponent';
import {diffAndReRender, renderNode} from './virtualDom/createComponent';

const virtualDOMTree = AppComponent({ subject: 'ABA GANUV' });
const rootEl = document.getElementById('root');
rootEl?.appendChild(renderNode(virtualDOMTree));

const newVirtualDOMTree = AppComponent({ subject: 'STOLEN DAD' });

diffAndReRender(virtualDOMTree, newVirtualDOMTree);

//
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
