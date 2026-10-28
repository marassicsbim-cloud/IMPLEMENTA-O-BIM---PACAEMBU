# Diagnóstico BIM – Fase 01 · Pacaembu

Formulário dinâmico da Fase 01 (Maturidade BIM, Tecnologia, Processos e Projetistas), publicado no GitHub Pages, com respostas salvas, e-mail a cada envio e área de admin.

- **`index.html`** – o questionário, com as cores e a logo da Pacaembu.
- **`admin.html`** – área de admin com senha: gráficos, pré-plano de ação, respostas completas e download em Excel/CSV.
- **`config.js`** – onde vai o endereço do armazenamento.
- **`apps-script/Codigo.gs`** – o “servidor”: salva cada resposta numa Planilha Google e manda e-mail para marassi.gabriel@csbim.eng.br.
- **`docs/`** – as perguntas em PDF.

O GitHub Pages só hospeda páginas; ele não guarda dados. Por isso as respostas vão para uma Planilha Google (gratuita), através do script.

## 1. Publicar no GitHub (5 min)

1. No repositório: **Add file › Upload files** e envie esta pasta.
2. **Settings › Pages** › Branch `main`, pasta `/ (root)` › **Save**.
3. O formulário fica em `https://<usuario>.github.io/<repositorio>/diagnostico-fase01/` e a admin em `…/diagnostico-fase01/admin.html`.

## 2. Ligar o armazenamento e o e-mail (10 min, uma vez)

1. Entre numa conta Google e crie uma **Planilha** nova (ex.: “Respostas Diagnóstico BIM”).
2. Na planilha: **Extensões › Apps Script**. Apague o conteúdo e cole o arquivo `apps-script/Codigo.gs`. Salve.
3. **Configurações do projeto** (engrenagem) › **Propriedades do script** › adicione duas propriedades:
   - `ADMIN_EMAIL` = o e-mail que entra na área de admin
   - `ADMIN_KEY` = a senha da área de admin
4. **Implantar › Nova implantação** › tipo **App da Web**:
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
   - **Implantar** e autorize o acesso (planilha e Gmail).
5. Copie o **URL do app da Web** (termina em `/exec`).
6. No GitHub, edite `config.js` (ícone de lápis) e cole o URL entre as aspas. **Commit**.

Pronto: cada envio cria uma linha na aba **Respostas** da planilha e um e-mail para o Gabriel.

## 3. Usar

- Divulgue o link do `index.html` (pode ir numa guia **Site** do Teams).
- Acompanhe pelo botão **Admin** (canto superior direito do formulário), com e-mail e senha, ou direto na planilha.
- Para o relatório final: **Baixar respostas (Excel/CSV)** no admin.

## Observações

- Alterou o `Codigo.gs`? **Implantar › Gerenciar implantações › Editar › Nova versão**, para valer.
- O e-mail e a senha do admin ficam só nas Propriedades do script, nunca no GitHub.
- O e-mail sai da conta Google usada na planilha (limite gratuito de 100 e-mails por dia).
