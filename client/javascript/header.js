$('#login-signup-btn').click(function () {
  window.location = '/login';
});

$('#logout-btn').click(function () {
  $.ajax({
    method: 'POST',
    url: `/api/staffs/logout`,
    success: function (res) {
      document.location = '/';
    },
    error: function (err) {
      console.err(err);
    },
  });
});
