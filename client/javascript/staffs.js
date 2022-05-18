$('button#search').click(function (e) {
  e.preventDefault();

  const query = $('input[name=staff]')[0].value;
  if (query == '') {
    return alert('1글자 이상 입력해주세요.');
  }

  const location = document.location;
  const href = `${location.origin}${location.pathname}?query=${query}`;

  document.location.href = href;

  return false;
});
