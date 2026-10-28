/**
 * Diagnóstico BIM – Fase 01 · Pacaembu (CSBIM)
 * Recebe as respostas do formulário do GitHub, salva na planilha e envia e-mail.
 * Cole este código em: Planilha Google > Extensões > Apps Script.
 */
const EMAIL_DESTINO = 'marassi.gabriel@csbim.eng.br';
const ABA = 'Respostas';

function aba_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(ABA);
  if (!sh) {
    sh = ss.insertSheet(ABA);
    sh.appendRow(['Data', 'Questionário', 'Título', 'Nome', 'Área', 'Empresa', 'Respostas (JSON)']);
    sh.setFrozenRows(1);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Recebe uma resposta enviada pelo index.html */
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    aba_().appendRow([new Date(), d.form || '', d.titulo || '', d.nome || '', d.area || '', d.empresa || '',
      JSON.stringify(d.respostas || {})]);
  } finally {
    lock.releaseLock();
  }
  try { enviarEmail_(d); } catch (err) { console.error(err); }
  return json_({ ok: true });
}

/** Entrega as respostas para o admin.html (exige ADMIN_EMAIL e ADMIN_KEY das Propriedades do script) */
function doGet(e) {
  const props = PropertiesService.getScriptProperties();
  const email = String(props.getProperty('ADMIN_EMAIL') || '').trim().toLowerCase();
  const senha = props.getProperty('ADMIN_KEY');
  const p = e.parameter || {};
  if (!email || !senha || String(p.email || '').trim().toLowerCase() !== email || p.key !== senha) {
    Utilities.sleep(800);
    return json_({ ok: false });
  }
  const valores = aba_().getDataRange().getValues();
  valores.shift();
  const rows = valores.filter(r => r[1]).map(r => ({
    enviadoEm: new Date(r[0]).toISOString(), form: r[1], titulo: r[2], nome: r[3], area: r[4], empresa: r[5],
    respostas: JSON.parse(r[6] || '{}')
  }));
  return json_({ ok: true, rows: rows });
}

function enviarEmail_(d) {
  const esc = s => String(s == null ? '' : s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  const perguntas = d.perguntas || {};
  const linhas = Object.keys(d.respostas || {}).map(id => {
    let v = d.respostas[id];
    if (Array.isArray(v)) v = v.join(', ');
    if (v === null || v === '') return '';
    return '<tr><td style="padding:6px 10px;border-bottom:1px solid #D3DEE1;color:#56707A;vertical-align:top">' +
      esc(perguntas[id] || id) + '</td><td style="padding:6px 10px;border-bottom:1px solid #D3DEE1">' + esc(v) + '</td></tr>';
  }).join('');
  const html =
    '<div style="font-family:Arial,sans-serif;color:#14262B">' +
    '<div style="height:6px;background:linear-gradient(90deg,#003D4C 70%,#FFB81C 70%,#FFB81C 72.5%,#E4002B 72.5%)"></div>' +
    '<h2 style="color:#003D4C;margin:16px 0 4px">Nova resposta · ' + esc(d.titulo) + '</h2>' +
    '<p style="margin:0 0 12px;color:#56707A">' + esc(d.nome) + (d.area ? ' · ' + esc(d.area) : '') +
    (d.empresa ? ' · ' + esc(d.empresa) : '') + ' · ' + new Date().toLocaleString('pt-BR') + '</p>' +
    '<table style="border-collapse:collapse;width:100%;font-size:14px">' + linhas + '</table>' +
    '<p style="color:#56707A;font-size:12px">Diagnóstico BIM – Fase 01 · Pacaembu · CSBIM</p></div>';
  MailApp.sendEmail({
    to: EMAIL_DESTINO,
    subject: '[Diagnóstico BIM] ' + (d.titulo || d.form) + ' – ' + (d.nome || d.empresa || 'sem nome'),
    htmlBody: html
  });
}
