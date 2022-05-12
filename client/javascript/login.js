$('button').click(function (e) {
  e.preventDefault();
  console.log('button click');

  // let emailInput = $('#email').val();
  // let passwordInput = $('#password').val();

  // console.log('------입력한 값------');
  // console.log(emailInput);
  // console.log(passwordInput);

  //  TODO: post 요청 보내기
  // 참고 : https://api.jquery.com/jquery.post/
  // https://araikuma.tistory.com/640
  // $.post('/api/login', function () {});

  $.get('/hi', function (result) {
    console.log(result);
  });

  return false;
});
