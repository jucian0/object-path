const { propToPath } = require("./utils");

function set(defaultObject, prop, value) {
  const paths = propToPath(prop);

  function setPropertyValue(object, index) {
    let clone = Object.assign({}, object);

    if (paths.length > index) {
      if (Array.isArray(object)) {
        paths[index] = parseInt(paths[index]);
        clone = object.slice();
      }
      clone[paths[index]] = setPropertyValue(object[paths[index]], index + 1);

      return clone;
    }
    return value;
  }

  return setPropertyValue(defaultObject, 0);
}

function del(defaultObject, prop) {
  const paths = propToPath(prop);

  function deletePropertyValue(object, index) {
    let clone = Object.assign({}, object);

    if (paths.length > index) {
      if (Array.isArray(object)) {
        paths[index] = parseInt(paths[index]);
        clone = object.slice();
      }

      if (Array.isArray(object)) {
        clone.splice(paths[index], 1);
      } else {
        const result = deletePropertyValue(object[paths[index]], index + 1);

        typeof result === "undefined"
          ? delete clone[paths[index]]
          : (clone[paths[index]] = result);
      }

      return clone;
    }
    return undefined;
  }

  return deletePropertyValue(defaultObject, 0);
}

function get(defaultObject, prop) {
  const paths = propToPath(prop);

  function getPropertyValue(object, index) {
    const clone = Object.assign({}, object);
    if (paths.length === index + 1) {
      return clone[paths[index]];
    }
    return getPropertyValue(object[paths[index]], index + 1);
  }

  return getPropertyValue(defaultObject, 0);
}

module.exports = {
  set,
  del,
  get,
};
