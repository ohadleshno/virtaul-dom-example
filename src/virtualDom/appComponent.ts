import { div, h1, p } from './createComponent';

const AppComponent = (state:any) => {
  return div({id: 'main'}, [
    div({id: 'header'}, [
      h1({id: 'title'}, `Hello, ${state.subject}!`)
    ]),
    div({id: 'content'}, [
      p({id: 'static1'}, 'This is a static component'),
      p({id: 'static2'}, 'It should never have to be re-created'),
    ]),
  ]);
};



export default AppComponent;
