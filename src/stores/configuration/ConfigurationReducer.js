const initialState = {
  locale: 'pl',
  currency: {
    type: 'PLN',
    sign: 'zł',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  },
  years: [(new Date()).getFullYear()],
};

export default (state = initialState, action) => {
  switch(action.type){
    default:
      return state;
  }
};
