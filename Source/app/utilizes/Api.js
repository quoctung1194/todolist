import * as Route from '../constants/route';
import Setting from './Setting';

class Api
{
  static headers()
  {
    if (Setting.user == null) {
      return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'dataType': 'json'
      }
    } else {
      return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'dataType': 'json',
        'Authorization': 'Bearer ' + Setting.user.api_token
      }
    }
  }

  static get(route)
  {
    return this.xhr(route + '?api_token=123', null, 'GET')
  }

  static put(route, params)
  {
    return this.xhr(route, params, 'PUT')
  }

  static post(route, params)
  {
    return this.xhr(route, params, 'POST')
  }

  static delete(route, params)
  {
    return this.xhr(route, params, 'DELETE')
  }

  static xhr(route, params, verb)
  {
    const host = Route.HOST;
    const url = `${host}${route}`;

    let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null )
    options.headers = Api.headers()

    return fetch(url, options)
      .then( resp => {
        if (resp.ok) {
          let json = resp.json();
          return json;
        }

        throw new Error(resp.status);
      })
  }
}

export default Api;
