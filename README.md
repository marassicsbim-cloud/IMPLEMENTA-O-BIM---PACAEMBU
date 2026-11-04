# IPM26 – Formulário de confirmação

Site do formulário de confirmação de presença do IPM26 (13 e 14/11/2026), com painel administrativo.

| Arquivo | Para que serve |
|---|---|
| `index.html` | O site: boas-vindas, formulário, painel administrativo |
| `config.js` | Onde fica a URL do servidor (Google Apps Script) |
| `apps-script/Code.gs` | O servidor: grava as respostas na planilha, envia o e-mail com PDF e alimenta o painel |

---

## Parte 1 – Criar o servidor no Google (cerca de 10 min)

O servidor roda de graça no Google, dentro de uma planilha. Use a conta Google que vai **enviar** os e-mails.

1. Acesse [sheets.new](https://sheets.new) e crie uma planilha chamada **IPM26 Respostas**.
2. No menu, clique em **Extensões → Apps Script**.
3. Apague o conteúdo do arquivo `Código.gs` e cole todo o conteúdo de `apps-script/Code.gs`.
4. Confira no topo do código o login, a senha, o destinatário (PARA) e a cópia (COPIA) dos e-mails. Clique em **Salvar** (ícone de disquete).
5. No seletor de funções (ao lado de **Depurar**), escolha `testarEmail` e clique em **Executar**.
   - O Google vai pedir autorização: **Revisar permissões → escolha a conta → Avançado → Acessar IPM26 (não seguro) → Permitir**.
   - O destinatário e a cópia devem receber um e-mail de teste com o PDF anexado. Rode também `testarChecklist`.
6. Clique em **Implantar → Nova implantação**.
   - Em **Selecionar tipo** (engrenagem), escolha **App da Web**.
   - **Executar como:** Eu.
   - **Quem pode acessar:** Qualquer pessoa.
   - Clique em **Implantar** e copie a **URL do app da Web** (termina em `/exec`).

## Parte 2 – Colocar o site no ar com o GitHub Pages

1. Crie uma conta em [github.com](https://github.com) (ou entre na conta da CSBIM).
2. Clique em **+ → New repository**.
   - **Repository name:** `ipm26`
   - Marque **Public** (o GitHub Pages gratuito exige repositório público).
   - Clique em **Create repository**.
3. Na página do repositório, clique em **uploading an existing file**.
4. Arraste `index.html`, `config.js` e `README.md`. Não envie a pasta `apps-script` (ela já está no Google).
5. Clique em **Commit changes**.
6. Vá em **Settings → Pages**.
   - Em **Source**, escolha **Deploy from a branch**.
   - Em **Branch**, escolha **main** e a pasta **/ (root)**. Clique em **Save**.
7. Aguarde 1 a 2 minutos e atualize a página. O endereço aparece no topo:
   `https://SEU-USUARIO.github.io/ipm26/`

## Parte 3 – Ligar o site ao servidor

1. No repositório, abra `config.js` e clique no lápis (**Edit this file**).
2. Cole a URL copiada na Parte 1 entre as aspas:

   ```js
   window.IPM_CONFIG = {
     API_URL: "https://script.google.com/macros/s/AKfycb.../exec"
   };
   ```

3. Clique em **Commit changes**. Em cerca de 1 minuto o site já usa o servidor.

## Parte 4 – Testar

1. Abra o site, clique em **Vamos juntos descobrir o propósito** e envie uma resposta de teste.
2. Confira se a linha apareceu na planilha **IPM26 Respostas**, aba **Respostas**.
3. Confira se o destinatário e a cópia receberam a ficha em PDF.
4. Abra `https://SEU-USUARIO.github.io/ipm26/#admin` (ou clique em **Área administrativa**), entre com o login e a senha e veja o painel. Teste **Exportar Excel completo**.
5. Apague a linha de teste da planilha antes de divulgar o link.

---

## Endereço próprio (opcional)

Para usar algo como `ipm26.csbim.eng.br`:

1. No provedor do domínio, crie um registro **CNAME** `ipm26` apontando para `SEU-USUARIO.github.io`.
2. No GitHub, em **Settings → Pages → Custom domain**, digite `ipm26.csbim.eng.br`, salve e marque **Enforce HTTPS** quando ficar disponível.

## Alterar o servidor depois

Se mudar algo no `Code.gs` (destinatários, senha), salve e faça **Implantar → Gerenciar implantações → lápis → Versão: Nova versão → Implantar**. Assim a URL continua a mesma e não é preciso mexer no `config.js`.

## Bom saber

- **Senha:** o login do painel é conferido no Google, não no site. O código do site é público no GitHub, mas a senha e as respostas não aparecem nele.
- **Limite de e-mails do Google:** cada e-mail vai para 2 pessoas (destinatário + cópia) e conta como 2 envios. Conta Gmail gratuita: até 100 destinatários por dia, ou seja, cerca de **50 e-mails por dia** (respostas + conferências). Conta Google Workspace: até 1.500 por dia. Acima do limite, a resposta continua sendo gravada na planilha; só o e-mail daquele dia deixa de sair.
- **LGPD:** as respostas ficam na planilha do Google Drive da conta usada na Parte 1. Compartilhe essa planilha só com quem precisa.
- **Painel:** atualiza sozinho a cada minuto enquanto estiver aberto, e também pelo botão **Atualizar**.
