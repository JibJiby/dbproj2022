// selection option 가져오기
$(document).ready(function () {
  $.ajax({
    method: 'GET',
    url: `api/departments`,
    success: function (res) {
      // console.log('검색 결과');
      console.log(res);

      const options = res.map(
        (v) => `<option value=${v.id}>${v.depName}</option>`,
      );

      //select에 추가하기
      for (let el of options) {
        $('.form-group > select').append(el);
      }
    },
    error: function (err) {
      console.log(err);
    },
  });
});

/*
 *  EventListener
 */
$('#signup').click(function () {
  $('#first').fadeOut('fast', function () {
    $('#second').fadeIn('fast');
  });
});

$('#signin').click(function () {
  $('#second').fadeOut('fast', function () {
    $('#first').fadeIn('fast');
  });
});

$("form[name='login']").validate({
  rules: {
    email: {
      required: true,
      email: true,
    },
    password: {
      required: true,
    },
  },
  messages: {
    email: '이메일을 입력해주세요.',

    password: {
      required: '비밀번호를 입력해주세요.',
    },
  },
  submitHandler: function (form) {
    form.submit();
  },
});

$(function () {
  $("form[name='registration']").validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 5,
      },
      password_confirm: {
        required: true,
        minlength: 5,
      },
      education: {
        required: true,
        minlength: 1,
      },
    },

    messages: {
      password: {
        required: '비밀번호를 입력해주세요.',
        minlength: '최소 5글자이상으로 입력해주세요.',
      },
      password_confirm: {
        required: '비밀번호를 입력해주세요.',
        minlength: '최소 5글자이상으로 입력해주세요.',
        equalTo: '동일한 비밀번호를 입력해주세요.',
      },
      email: '이메일을 입력해주세요.',
    },

    submitHandler: function (form) {
      form.submit();
    },
  });
});
