$('#client-registration-btn').click(function () {
  let clientName = $('#client-name-input').val();
  let clientCompany = $('#client-company-name-input').val();

  if (clientName.trim() === '') {
    alert('성함을 입력해주세요.');
    return false;
  }
  if (clientCompany.trim() === '') {
    alert('회사명을 입력해주세요.');
    return false;
  }

  console.log(clientName, clientCompany);
  $.ajax({
    url: '/api/clients',
    method: 'POST',
    data: {
      clientName,
      companyName: clientCompany,
    },
    success: function (res) {
      alert('클라이언트 등록 성공');
      window.location = '/';
    },
    error: function (error) {
      console.log(error);
      alert('클라이언트 등록에 실패했습니다.');
    },
  });
});
