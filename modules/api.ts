import {Module} from '@nuxt/types';
import EmailCheckEndpoint from './controllers/email_validator';

const apiModule: Module = async function (this: any, _options: any) {
  if (this.options.dev || this.options._start) {
    this.addServerMiddleware({
      handler: EmailCheckEndpoint,
      path: '/api/'
    });
  }
}
export default apiModule;
