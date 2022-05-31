let departments;
// let allStaffs;

let month = new Date().getMonth() + 1;
let day = new Date().getDate();

let today = `${new Date().getFullYear()}-${
  String(month).length == 1 ? '0' + month : month
}-${String(day).length == 1 ? '0' + day : day}`;

$(document).ready(function () {
  /**
   * 오늘 날짜
   */
  // let month = new Date().getMonth() + 1;
  // let day = new Date().getDate();

  // let today = `${new Date().getFullYear()}-${
  //   String(month).length == 1 ? '0' + month : month
  // }-${String(day).length == 1 ? '0' + day : day}`;

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

$('input#project-start-date-input').change(function (data) {
  let startDate = $('input#project-start-date-input').val();
  let endDate = $('input#project-end-date-input').val();

  if (new Date(startDate) > new Date(endDate)) {
    alert('종료일자가 시작일자보다 앞설수 없습니다.');
    $('input#project-start-date-input').val(endDate);
  }
});
$('input#project-end-date-input').change(function (data) {
  let startDate = $('input#project-start-date-input').val();
  let endDate = $('input#project-end-date-input').val();

  if (new Date(startDate) > new Date(endDate)) {
    alert('종료일자가 시작일자보다 앞설수 없습니다.');
    $('input#project-end-date-input').val(startDate);
  }
});

/**
 * 등록 버튼 콜백
 */
$('#project-registration-btn').click(function () {
  let projectName = $('input#project-name-input').val();
  let projectStartDate = $('input#project-start-date-input').val();
  let projectEndDate = $('input#project-end-date-input').val();
  let projectBudget = $('#budget-input').val(); // todo:
  let participationsNumber = $('#number-staff-input').val();
  let participationsInfo = [];
  for (let i = 0; i < participationsNumber; i++) {
    let tmpStaffId = $(`select#staff-selection-${i} option:selected`).val();
    let tmpStaffStartDate = $(`input#start-date-${i}`).val();
    let tmpStaffEndDate = $(`input#end-date-${i}`).val();

    participationsInfo.push({
      staffId: tmpStaffId,
      startDate: tmpStaffStartDate,
      endDate: tmpStaffEndDate,
    });
  }
  let clientId = $('#target-client-selection option:selected').val();

  console.log(projectName);
  console.log(projectStartDate);
  console.log(projectEndDate);
  console.log(projectBudget);
  console.log(participationsNumber);
  console.log(participationsInfo);
  console.log(clientId);

  // TODO: 예외 처리
  if (projectName.trim() === '') {
    alert('프로젝트 이름을 넣어주세요');
    return false;
  }

  $.ajax({
    url: '/api/projects/set',
    method: 'POST',
    data: {
      projectName,
      projectStartDate,
      projectEndDate,
      participationsNumber,
      participationsInfo,
      clientId,
      projectBudget,
    },
    success: function () {
      alert('프로젝트 등록 성공!');
      window.location = '/project/list';
    },
  });
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
        `<select style="width: 120px;" aria-label="Default select example" id="department-selection-${i}">
          <option selected="selected">부서</option></select> 
        <select style="width: 130px;" id="staff-selection-${i}"/> 
        <input id="start-date-${i}" type="date"></input>
        <input id="end-date-${i}" type="date"></input>
        <button type="button" class="btn btn-light">확인</button>
        <span id="tmp-span-${i}" style="margin-left: 15px;"></span>`,
      ),
    );

    // 초기값 설정
    let projectStartDate = $('input#project-start-date-input').val();
    let projectEndDate = $('input#project-end-date-input').val();
    $(`#staff-plus-tr td .tmp-class-${i} #start-date-${i}`).val(
      projectStartDate,
    );
    $(`#staff-plus-tr td .tmp-class-${i} #end-date-${i}`).val(projectEndDate);

    $(`#staff-plus-tr td .tmp-class-${i} input#start-date-${i}`).change(
      function () {
        let staffStartDate = $(
          `#staff-plus-tr td .tmp-class-${i} input#start-date-${i}`,
        ).val();
        let staffEndDate = $(
          `#staff-plus-tr td .tmp-class-${i} input#end-date-${i}`,
        ).val();

        let projectStartDate = $('input#project-start-date-input').val();
        let projectEndDate = $('input#project-end-date-input').val();

        // console.log(projectStartDate, projectEndDate);
        if (staffStartDate > staffEndDate) {
          console.log(1);
          alert('참여 일자가 종료 일자보다 이전이여야 합니다.');
          $(`#staff-plus-tr td .tmp-class-${i} input#start-date-${i}`).val(
            projectStartDate,
          );
          return false;
        }

        // 직원 참여 일자 검증
        if (projectStartDate > staffStartDate) {
          console.log(2);
          alert('프로젝트 시작 이후로 참여 가능합니다.');
          $(`#staff-plus-tr td .tmp-class-${i} input#start-date-${i}`).val(
            projectStartDate,
          );
          return false;
        }

        // 직원 참여 '종료' 일자
        if (projectEndDate < staffStartDate) {
          console.log(3);
          alert('프로젝트 종료 이전에 참여 가능합니다.');
          $(`#staff-plus-tr td .tmp-class-${i} input#start-date-${i}`).val(
            projectStartDate,
          );
          return false;
        }
      },
    );

    $(`#staff-plus-tr td .tmp-class-${i} input#end-date-${i}`).change(
      function () {
        let staffStartDate = $(
          `#staff-plus-tr td .tmp-class-${i} input#start-date-${i}`,
        ).val();
        let staffEndDate = $(
          `#staff-plus-tr td .tmp-class-${i} input#end-date-${i}`,
        ).val();

        let projectStartDate = $('input#project-start-date-input').val();
        let projectEndDate = $('input#project-end-date-input').val();

        if (staffStartDate > staffEndDate) {
          console.log(4);
          alert('참여 일자가 종료 일자보다 이전이여야 합니다.');
          $(`#staff-plus-tr td .tmp-class-${i} input#end-date-${i}`).val(
            projectEndDate,
          );
          return false;
        }

        // 직원 참여 일자 검증
        if (projectStartDate > staffEndDate) {
          console.log(5);
          alert('프로젝트 시작 이후에 참여 가능합니다.');
          $(`#staff-plus-tr td .tmp-class-${i} input#end-date-${i}`).val(
            projectEndDate,
          );
          return false;
        }
        if (staffEndDate > projectEndDate) {
          console.log(6);
          alert('프로젝트 종료 이전에 참여 가능합니다.');
          $(`#staff-plus-tr td .tmp-class-${i} input#end-date-${i}`).val(
            projectEndDate,
          );
          return false;
        }
      },
    );

    // 버튼 콜백
    $(`#staff-plus-tr td .tmp-class-${i} button`).click(function () {
      let staffId = $(
        `#staff-plus-tr td .tmp-class-${i} #staff-selection-${i} option:selected`,
      ).val();

      let startDate = $(
        `#staff-plus-tr td .tmp-class-${i} #start-date-${i}`,
      ).val();
      let endDate = $(`#staff-plus-tr td .tmp-class-${i} #end-date-${i}`).val();

      $.ajax({
        url: `/api/participations/staff/${staffId}/ispossible?start=${startDate}&end=${endDate}`,
        method: 'GET',
        success: function (isPossible) {
          console.log(isPossible);
          if (isPossible === 'true') {
            $(`span#tmp-span-${i}`).html('O');
          } else {
            $(`span#tmp-span-${i}`).html('X');
          }
        },
      });
    });

    if (departments) {
      departments.forEach((v) => {
        $(
          `#staff-plus-tr td .tmp-class-${i} select#department-selection-${i}`,
        ).append($(`<option value=${v.id}>${v.depName}</option>`));
      });

      $(`.tmp-class-${i} select#department-selection-${i}`).change(function (
        event,
      ) {
        // console.log('부서 선택');
        // console.log(event);
        let depId = $(`.tmp-class-${i} select#department-selection-${i}`).val();
        // console.log(depId);

        $.ajax({
          method: 'GET',
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
