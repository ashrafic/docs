export const CHECKOUT_URL =
  'https://buy.polar.sh/polar_cl_RhLqFbMMOlPJIIBfUrwQy954YFTJ9hTDuPU1G3JHuaS';

export const PRODUCT_IDS = {
  solo: '14c189b5-a78b-4f11-aa9d-eeb6e5960354',
  agency: '40c68068-f0f4-469d-85fa-5f6296ec8e43',
};

export const checkoutLink = (productId?: string) =>
  productId ? `${CHECKOUT_URL}?product_id=${productId}` : CHECKOUT_URL;
