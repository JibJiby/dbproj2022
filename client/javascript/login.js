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

$(function () {
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
