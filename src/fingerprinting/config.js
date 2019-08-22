import fp from "fingerprintjs2";
import objectHash from "object-hash";

export const getFingerprint = () =>
  new Promise(resolve => {
    fp.get(components => {
      resolve(objectHash(components));
    });
  });
