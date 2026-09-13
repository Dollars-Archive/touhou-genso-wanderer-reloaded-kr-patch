const WORKLOG_URL = 'https://raw.githubusercontent.com/Dollars-Archive/touhou-genso-wanderer-reloaded-kr-patch/main/WORKLOG.md';

async function renderWorklog() {
  const status = document.getElementById('status');
  const reader = document.getElementById('reader');

  try {
    const response = await fetch(`${WORKLOG_URL}?t=${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    if (!window.marked) throw new Error('Markdown renderer unavailable');

    const markdown = await response.text();
    marked.setOptions({ gfm: true, breaks: false });
    reader.innerHTML = marked.parse(markdown);
    status.hidden = true;
    reader.hidden = false;
  } catch (error) {
    console.error(error);
    status.textContent = '작업일지를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.';
  }
}

renderWorklog();
