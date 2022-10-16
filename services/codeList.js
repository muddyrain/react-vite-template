export default {
  401: () => {
    window.sessionStorage.removeItem('accountInfo');
    window.location.href = '/login';
  },
  403: () => {
    window.sessionStorage.removeItem('accountInfo');
    window.location.href = '/login';
  },
};
