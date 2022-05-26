// $(document).ready(function () {});

$('#complete-proj-switch').click(function () {
  let checked = $('#complete-proj-switch:checkbox').is(':checked');
  // console.log(checked);

  if (checked) {
    $('tr.table_row')
      .filter(function (i, sel) {
        return $(sel).find('.is-completed').text() !== 'true';
      })
      .each(function (i, sel) {
        $(sel).addClass('hidden');
      });
  } else {
    $('tr.table_row')
      .filter(function (i, sel) {
        return $(sel).find('.is-completed').text() !== 'true';
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
