$('.header').click(function (e) {
  e.preventDefault();

  window.location = '/staffs';
});

$('input[name=staff]').keydown(function (key) {
  if (key.keyCode === 13) {
    //키가 13이면 실행 (엔터는 13)
    $('button#search').click();
  }
});

$('button#search').click(function (e) {
  e.preventDefault();

  const name = $('input[name=staff]')[0].value;
  if (name.length === 0) {
    return alert('1글자 이상 입력해주세요.');
  } else {
    // $.ajax({
    //   method: 'GET',
    //   url: `/staffs/?name=${name}`,
    //   success: function (res) {
    //     console.log('검색 결과');
    //     console.log(res);
    //   },
    //   error: function (err) {
    //     console.err(err);
    //   },
    // });
  }

  const location = window.location;
  const href = `${location.origin}${location.pathname}?name=${name}`;

  window.location.href = href;

  return false;
});
