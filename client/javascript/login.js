// selection option 가져오기
$(document).ready(function () {
  $.ajax({
    method: 'GET',
    url: `api/departments`,
    success: function (res) {
      // console.log('검색 결과');
      // console.log(res);

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

$('#first input#password').keydown(function (key) {
  if (key.keyCode === 13) {
    $('#first button[type="submit"]').click();
  }
});

// 주민번호 앞자리 제한
$('#second .first-social-number').keypress(function (event) {
  if ($('#second .first-social-number').val().length > 5) {
    return false;
  }

  if (
    event.which &&
    ((event.which > 47 && event.which < 58) || event.which == 8)
  ) {
    // $('#second .first-social-number').val(String.fromCharCode(event.which));
    // console.log(String.fromCharCode(event.which));
  } else {
    return false;
  }
});

// 주민번호 뒤자리 제한
$('#second .second-social-number').keypress(function (event) {
  if ($('#second .second-social-number').val().length > 6) {
    return false;
  }

  if (
    event.which &&
    ((event.which > 47 && event.which < 58) || event.which == 8)
  ) {
  } else {
    return false;
  }
});

// 로그인
$('#first button[type="submit"]').click(function () {
  let inputEmail = $('#first #email').val();
  let inputPassword = $('#first #password').val();
  // console.log(inputEmail, inputPassword);
  $.ajax({
    method: 'POST',
    url: '/api/staffs/login',
    data: { email: inputEmail, password: inputPassword },
    success: function (data) {
      // console.log(data);
      window.location.href = '/';
    },
    error: function (error) {
      console.log(error);
      alert('로그인에 실패했습니다.');
    },
  });
});

// 회원가입
$('#second button[type="submit"]').click(function () {
  let inputName = $('#second #form-name').val();
  let inputFirstSocialNumber = $('#second .first-social-number').val();
  let inputSecondSocialNumber = $('#second .second-social-number').val();
  let inputSocialNumber =
    inputFirstSocialNumber + '-' + inputSecondSocialNumber;
  let inputEmail = $('#second #email').val();
  let inputPassword = $('#second #password').val();
  let inputConfirmPassword = $('#second #password_confirm').val();
  let inputEducation = $('#second #education').val();
  let inputDepartment = $(
    '#second #department-selection option:selected',
  ).val();

  // console.log(inputName);
  // console.log(inputSocialNumber);
  // console.log(inputEmail);
  // console.log(inputPassword);
  // console.log(inputConfirmPassword);
  // console.log(inputEducation);
  // console.log(inputDepartment);

  // validation
  if (inputName.trim() === '') {
    alert('이름을 입력해주세요.');
    return false;
  }
  if (inputFirstSocialNumber === '' || inputFirstSocialNumber.length !== 6) {
    alert('주민번호 앞자리를 제대로 입력해주세요');
    return false;
  }
  if (inputSecondSocialNumber === '' || inputSecondSocialNumber.length !== 7) {
    alert('주민번호 뒷자리를 제대로 입력해주세요');
    return false;
  }
  if (inputEmail === '') {
    // TODO: 이메일 정규식으로 확인 필요
    alert('이메일을 제대로 입력해주세요.');
    return false;
  }
  if (inputPassword === '') {
    alert('비밀번호를 제대로 입력해주세요.');
    return false;
  }
  if (inputConfirmPassword === '') {
    alert('비밀번호를 제대로 입력해주세요.');
    return false;
  }
  if (inputPassword !== inputConfirmPassword) {
    alert('동일한 비밀번호를 입력해주세요.');
    return false;
  }

  if (Number.isNaN(Number(inputDepartment))) {
    alert('부서를 제대로 입력해주세요.');
    return false;
  }

  $.ajax({
    url: '/api/staffs/signup',
    method: 'POST',
    data: {
      name: inputName,
      email: inputEmail,
      password: inputPassword,
      socialNumber: inputSocialNumber,
      education: inputEducation,
      Department: inputDepartment,
    },
    success: function (res) {
      // console.log(res);
      window.location.href = '/login';
      alert('회원 가입 성공하셨습니다!');
    },
    error: function (error) {
      alert('회원 가입 실패!');
      // console.log(error);
    },
  });
});

//
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
