export const actionTypes = (action) => ({
    ORIGIN: action,
    HANDLER: `${action}_REQUEST`,
    PENDING: `${action}_PENDING`,
    START: `${action}_START`,
    MORE: `${action}_MORE`,
    SUCCESS: `${action}_SUCCESS`,
    FAILURE: `${action}_FAILED`,
    ERROR: `${action}_ERROR`,
    CLEAR: `${action}_CLEAR`,
    END: `${action}_END`,
    GET: `${action}_GET`,
    ADD: `${action}_ADD`,
    EDIT: `${action}_EDIT`,
    REMOVE: `${action}_REMOVE`,
  });
  