# Guia de Release

Este documento descreve como publicar uma nova versão do pacote no GitHub Packages.

## Pré-requisitos

- Acesso ao repositório com permissão de criar releases
- As alterações devem estar na branch `main`
- O código deve passar nos testes de CI (lint e build)

## Processo de Release

### 1. Atualize a versão no package.json

Edite o arquivo `package.json` e atualize o campo `version`:

```json
{
  "name": "@gsbenevides2/n8n-nodes-wake-commerce",
  "version": "0.2.0",  // Atualize aqui
  ...
}
```

Siga o [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0): Mudanças incompatíveis com versões anteriores
- **MINOR** (0.2.0): Nova funcionalidade compatível com versões anteriores
- **PATCH** (0.1.1): Correções de bugs compatíveis com versões anteriores

### 2. Atualize o CHANGELOG.md

Adicione as mudanças da nova versão no `CHANGELOG.md`:

```markdown
## [0.2.0] - 2026-02-15

### Added

- Nova funcionalidade X
- Suporte para Y

### Changed

- Melhorias na funcionalidade Z

### Fixed

- Correção do bug ABC
```

### 3. Commit e Push

```bash
git add package.json CHANGELOG.md
git commit -m "chore: release v0.2.0"
git push origin main
```

### 4. Crie uma Release no GitHub

#### Via Interface Web:

1. Acesse https://github.com/gsbenevides2/n8n-nodes-wake-commerce/releases
2. Clique em **"Draft a new release"**
3. Clique em **"Choose a tag"** e digite `v0.2.0` (a mesma versão do package.json com prefixo `v`)
4. Selecione **"Create new tag on publish"**
5. Preencha:
   - **Release title**: `v0.2.0`
   - **Description**: Copie as mudanças do CHANGELOG.md
6. Clique em **"Publish release"**

#### Via GitHub CLI (gh):

```bash
gh release create v0.2.0 \
  --title "v0.2.0" \
  --notes "Descrição das mudanças"
```

### 5. Aguarde o CI/CD

Após criar a release:

1. O GitHub Actions automaticamente iniciará o workflow de publicação
2. Você pode acompanhar o progresso em: https://github.com/gsbenevides2/n8n-nodes-wake-commerce/actions
3. O workflow irá:
   - Instalar dependências
   - Executar lint
   - Fazer build
   - Publicar no GitHub Packages

### 6. Verifique a Publicação

Após o workflow concluir com sucesso:

1. Acesse https://github.com/gsbenevides2/n8n-nodes-wake-commerce/packages
2. Verifique se a nova versão foi publicada
3. Teste a instalação:

```bash
npm install @gsbenevides2/n8n-nodes-wake-commerce@0.2.0
```

## Troubleshooting

### O workflow falhou

1. Acesse a aba Actions no GitHub
2. Clique no workflow que falhou
3. Verifique os logs de erro
4. Corrija os problemas e faça um novo commit
5. Delete a release e tag anterior (se necessário)
6. Crie uma nova release

### Versão duplicada

Se você tentar publicar uma versão que já existe:

1. Incremente a versão no package.json
2. Delete a release e tag anterior
3. Crie uma nova release com a nova versão

### Permissões

O workflow usa `GITHUB_TOKEN` automático. Se houver problemas de permissão:

1. Verifique as configurações do repositório em Settings > Actions > General
2. Certifique-se de que "Read and write permissions" está habilitado para workflows

## Verificação Final

Antes de publicar, certifique-se de que:

- [ ] A versão no package.json foi atualizada
- [ ] O CHANGELOG.md foi atualizado
- [ ] Os testes passam localmente (`npm run lint` e `npm run build`)
- [ ] As mudanças estão na branch main
- [ ] A tag segue o formato `vX.Y.Z`
