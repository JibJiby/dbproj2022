let departments;
// let allStaffs;

$(document).ready(function () {
  /**
   * 오늘 날짜
   */
  let month = new Date().getMonth() + 1;
  let day = new Date().getDate();

  let today = `${new Date().getFullYear()}-${
    String(month).length == 1 ? '0' + month : month
  }-${String(day).length == 1 ? '0' + day : day}`;

  $('input#project-start-date-input').val(today);
  $('input#project-end-date-input').val(today);

  /**
   * 클라이언트 목록 가져오기
   */
  $.ajax({
    url: '/api/clients/no-project',
    method: 'GET',
    success: function (clients) {
      console.log(clients);

      clients.forEach((v) => {
        $('select#target-client-selection').append(
          $(
            `<option value=${v.id}>${v.id}  /  ${v.clientName}  /  ${v.companyName}</option>`,
          ),
        );
      });
    },
  });

  /**
   * 부서 데이터와 고객 데이터 가져오기
   */
  $.ajax({
    method: 'GET',
    url: `/api/departments`,
    success: function (res) {
      departments = res;
      // console.log('departments');
      // console.log(departments);
    },
    error: function (err) {
      console.log('[부서 데이터 fetching 중 에러');
      console.log(err);
    },
  });
});

$('input#project-end-date-input').change(function (data) {
  let startDate = $('input#project-start-date-input').val();
  let endDate = $('input#project-end-date-input').val();

  if (new Date(startDate) > new Date(endDate)) {
    alert('종료일자가 시작일자보다 앞설수 없습니다.');
    $('input#project-end-date-input').val(startDate);
  }
});

$('#project-registration-btn').click(function () {
  let projectName = $('input#project-name-input').val();
  let projectStartDate = $('input#project-start-date-input').val();
  let projectEndDate = $('input#project-end-date-input').val();

  // console.log(projectName);
  // console.log(projectStartDate);
  // console.log(projectEndDate);

  // TODO: 예외 처리
  if (projectName.trim() === '') {
    alert('프로젝트 이름을 넣어주세요');
    return false;
  }
});

$('#number-staff-input').keypress(function (event) {
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

$('#plus-staff-icon-wrapper').click(function () {
  let inputStaffNumber = $('#number-staff-input').val();
  console.log(inputStaffNumber);
  if (inputStaffNumber === '') {
    alert('참여 인원 수를 입력해주세요!');
    return false;
  }
  if (inputStaffNumber > 10) {
    alert('참여 인원 수가 초과했습니다.');
    $('#number-staff-input').val('');
    return false;
  }
  if (inputStaffNumber) {
    // 이전 입력값 남아 있으면
    $('#staff-plus-tr td div').remove();
  }

  $('#staff-plus-tr').removeClass('hidden');

  // 생성
  for (let i = 0; i < inputStaffNumber; i++) {
    // $('.form-group > select').append(el);
    $('#staff-plus-tr td').append(
      $(`<div class="tmp-class-${i}" style="margin: 10px auto;"></div>`).html(
        `<select style="width: 120px;" aria-label="Default select example" id="department-selection-${i}"><option selected="selected">부서</option></select> <select style="width: 130px;" id="staff-selection-${i}"/> <button type="button" class="btn btn-light">확인</button>`,
      ),
    );

    if (departments) {
      departments.forEach((v) => {
        $(
          `#staff-plus-tr td .tmp-class-${i} select#department-selection-${i}`,
        ).append($(`<option value=${v.id}>${v.depName}</option>`));
      });

      $(`.tmp-class-${i} select#department-selection-${i}`).change(function (
        event,
      ) {
        console.log('부서 선택');
        // console.log(event);
        let depId = $(`.tmp-class-${i} select#department-selection-${i}`).val();
        console.log(depId);

        $.ajax({
          ethod: 'GET',
          url: `/api/staffs/all`,
          success: function (res) {
            let targetList = res.filter((v) => v.Department?.id == depId);

            $(`.tmp-class-${i} select#staff-selection-${i} option`).remove();

            for (let staff of targetList) {
              $(`.tmp-class-${i} select#staff-selection-${i}`).append(
                `<option value=${staff.id}>${staff.name}</option>`,
              );
            }
          },
          error: function (err) {
            console.log('[직원 데이터 fetching 중 에러');
            console.log(err);
          },
        });
      });
    }
  }
});
