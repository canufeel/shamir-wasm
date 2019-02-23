const buf2hex = (uint8Arr) => { // buffer is an ArrayBuffer
  return Array.prototype.map.call(uint8Arr, x => ('00' + x.toString(16)).slice(-2)).join('');
}

const fromHexString = hexString =>
  new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

let _module;

export const getModuleAsync = async () => {
  if (!_module) {
    const __mod = await import("../../crate/pkg");
    __mod.run();
    _module = __mod;
  }
  return _module;
};

const getModule = () => {
  if (!_module) {
    throw Error('No module initialised');
  }
  return _module;
};

export const splitSecretShamir = (
  secret,
  threshold,
  shares,
) => {
  const module = getModule();
  let result = module.split_shamir(secret, threshold, shares);
  const sharesArr = [];
  const perShare = result.length / shares;
  for (let i = 0; i < shares; i++) {
    sharesArr.push(
      buf2hex(
        result.slice(
          i*perShare,
          (i+1)*perShare
        )
      )
    );
  }
  return sharesArr;
};

export const restoreShamir = (
  hexSharesArr
) => {
  const module = getModule();
  return module.restore_shamir(
    fromHexString(
      hexSharesArr.join('')
    ),
    hexSharesArr.length
  );
};
