(function () {
  if (!sessionStorage.getItem('naam')) {
    window.location.replace('index.html');
  }
})();
