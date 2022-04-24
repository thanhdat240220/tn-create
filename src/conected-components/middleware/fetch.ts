import ky, { HTTPError } from "ky";

const API_ACTION = "apiActionFull";
interface IActionType {
  type: string;
  payload: any;
}

interface IActionTypeApi {
  apiActionFull: {
    type: string;
    endpoint: string;
    apiVersion: string;
    verb: string;
    payload: any;
    cache: string;
    cacheTTL: any;
    headers: string;
    requestData: object;
    [key: string]: any;
  };
}

function instanceOfActionType(data: any): data is IActionType {
  return "type" in data && "payload" in data;
}

const LAST_CALL = { url: "", ts: 0 };
const ApiMiddleware =
  () => (next: any) => async (action: IActionType | IActionTypeApi) => {
    // Ignore if not an API_ACTION.
    if (instanceOfActionType(action)) {
      if (action && action.type) return next(action);
      else return null;
    }
    const {
      endpoint,
      type,
      verb,
      headers,
      payload,
      cache,
      requestData,
      shouldRetry = true,
    } = action[API_ACTION];
    const fetchOptions = {
      method: verb || "GET",
      headers: headers,
      ...(payload ? { body: payload } : {}),
      cache,
    };
    const path = "";
    const url = path + endpoint;

    next({
      type: type + "_REQUESTED",
      requestData,
    });

    const getParams = () => {
      return "";
    };

    const checkLastCall = ({ url }: { url: any }) => {
      // If the same call was made within the last second, ignore.
      if (LAST_CALL.url === url && Date.now() - LAST_CALL.ts < 1000) {
        return;
      }

      LAST_CALL.url = url;
      LAST_CALL.ts = Date.now();
    };

    const checkCache = () => {};

    const cacheResponse = async () => {};

    const handleResponse = async () => {
      next({
        type: type + "_RECEIVED",
        payload: {},
      });
    };

    // ky.stop is a symbol not a function and should only be used for stopping retry
    const handleAuth = async ({}: {}) => {};

    const handleError = () => {
      next({
        type: type + "_FAILED",
        payload: {},
      });
    };

    try {
      // ky ignores the search params string in the url, but only read the searchParams
      await ky(url, {
        timeout: false,
        searchParams: getParams(),
        retry: {
          limit: shouldRetry ? 2 : 0,
          statusCodes: [403, 401], // Only retry on auth errors.
        },
        hooks: {
          beforeRequest: [checkLastCall, checkCache],
          afterResponse: [handleResponse, cacheResponse],
          beforeRetry: [handleAuth], // Only a 401 and 403 will attempt retry. However, if error is not HTTPError, it will also attempt retry, so we need to bypass the error in handleAuth
        },
        // ...fetchOptions,
      });
    } catch (error) {
      if (error instanceof HTTPError) {
        handleError();
      } else {
        // we have to specify a status in order to set err.hasOccurred to true,
        // detail see processError function in src/connected-components/src/helpers/error/index.jsx
        // generic error message example src/common/components/Favourites/Favourites.js
        const errorObj = {
          status: 500,
          message: error,
        };
        next({
          type: type + "_FAILED",
          payload: errorObj,
          requestData,
        });
      }
    }
  };

export default ApiMiddleware;
