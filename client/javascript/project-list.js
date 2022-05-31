// $(document).ready(function () {});

$('#ongoing-proj-switch').click(function () {
  let checked = $('#ongoing-proj-switch:checkbox').is(':checked');
  // console.log(checked);

  if (checked) {
    $('tr.table_row')
      .filter(function (i, sel) {
        return (
          $(sel).find('.is-completed').text() === 'true' ||
          new Date($(sel).find('.proj-start-date').text()) > Date.now()
        );
      })
      .each(function (i, sel) {
        $(sel).addClass('hidden');
      });
  } else {
    $('tr.table_row')
      .filter(function (i, sel) {
        return (
          $(sel).find('.is-completed').text() === 'true' ||
          new Date($(sel).find('.proj-start-date').text()) > Date.now()
        );
      })
      .each(function (i, sel) {
        $(sel).removeClass('hidden');
      });
  }
});

$('.table_row').each((_, item) => {
  item.addEventListener('click', function () {
    const sId = this.querySelector('td#s_id').textContent;

    const location = window.location;
    const href = `${location.origin}/project/${sId}`;

    window.location.href = href;
  });
});

$('input[name=projectName]').keydown(function (key) {
  if (key.keyCode === 13) {
    //키가 13이면 실행 (엔터는 13)
    $('button#search').click();
  }
});

$('button#search').click(function (e) {
  e.preventDefault();

  const name = $('input[name=projectName]')[0].value;
  if (name.length === 0) {
    return alert('1글자 이상 입력해주세요.');
  }

  const location = window.location;
  const href = `${location.origin}${location.pathname}?projectName=${name}`;

  window.location.href = href;

  return false;
});
