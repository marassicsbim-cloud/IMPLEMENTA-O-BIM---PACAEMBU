# Diagnóstico BIM – Fase 01 · Pacaembu

Formulário dinâmico da Fase 01 (Maturidade BIM, Tecnologia, Processos e Projetistas), publicado no GitHub Pages, com respostas salvas, e-mail com PDF a cada envio e área de admin.

- **`index.html`** – o questionário, com as cores e a logo da Pacaembu.
- **`admin.html`** – área de admin com e-mail e senha: gráficos, pré-plano de ação, respostas completas, exclusão de respostas e download em Excel/CSV.
- **`config.js`** – endereço do App da Web do Apps Script (o mesmo endereço também está dentro do `index.html` e do `admin.html`).
- **`apps-script/Codigo.gs`** – o “servidor”: salva cada resposta numa Planilha Google e manda e-mail com o formulário em PDF para marassi.gabriel@csbim.eng.br.
- **`docs/`** – as perguntas em PDF.

O GitHub Pages só hospeda páginas; ele não guarda dados. Por isso as respostas vão para uma Planilha Google (gratuita), através do script.

## 1. Publicar no GitHub

1. No repositório: **Add file › Upload files** e envie esta pasta.
2. **Settings › Pages** › Branch `main`, pasta `/ (root)` › **Save**.
3. O formulário fica em `https://<usuario>.github.io/<repositorio>/diagnostico-fase01/` e a admin em `…/diagnostico-fase01/admin.html`.

## 2. Ligar o armazenamento e o e-mail (uma vez)

1. Entre na conta Google e crie uma **Planilha** nova (ex.: “Respostas Diagnóstico BIM”).
2. Na planilha: **Extensões › Apps Script**. Apague o conteúdo e cole o arquivo `apps-script/Codigo.gs`. Salve.
3. **Configurações do projeto** (engrenagem) › **Propriedades do script** › adicione:
   - `ADMIN_EMAIL` = o e-mail que entra na área de admin
   - `ADMIN_KEY` = a senha da área de admin
4. Selecione a função **testarEmail** e clique em **Executar**. Autorize o acesso (planilha e Gmail). Deve chegar um e-mail de teste com PDF anexo.
5. **Implantar › Nova implantação** › tipo **App da Web**:
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
6. Copie o **URL do app da Web** (termina em `/exec`). Se for um URL novo, troque o endereço antigo pelo novo no `config.js`, no `index.html` e no `admin.html` (busque por `script.google.com`) e faça **Commit**.

Pronto: cada envio cria uma linha na aba **Respostas** da planilha e um e-mail para o Gabriel com o título “Nome – Diagnóstico BIM Fase 01 (questionário)” e o formulário em PDF.

## 3. Usar

- Divulgue o link do `index.html` (pode ir numa guia **Site** do Teams).
- Acompanhe pelo botão **Admin** (canto superior direito do formulário), com e-mail e senha, ou direto na planilha.
- Respostas repetidas da mesma pessoa podem ser excluídas pelo ícone de lixeira na área de admin.
- Para o relatório final: **Baixar respostas (Excel/CSV)** no admin.

## Observações

- Alterou o `Codigo.gs`? **Implantar › Gerenciar implantações › Editar › Versão: Nova versão › Implantar**. Assim o URL continua o mesmo.
- O e-mail e a senha do admin ficam só nas Propriedades do script, nunca no GitHub.
- O e-mail sai da conta Google usada na planilha (limite gratuito de 100 e-mails por dia).
