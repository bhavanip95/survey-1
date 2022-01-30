import { Fragment } from 'react/cjs/react.production.min';
import Navigation from '../components/ui/Navigation';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Navigation></Navigation>
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp
