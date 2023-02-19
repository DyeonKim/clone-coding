import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./components/App";

import { createStore } from "redux";
import reducers from "./reducers";
import { Provider } from "react-redux";


const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer>
      <App/>
    </AppContainer>
  </Provider>,
  document.getElementById('root')
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    ReactDOM.render(
        <AppContainer>
          <NextApp/>
        </AppContainer>,
      document.getElementById('root')
    );
  });
}
