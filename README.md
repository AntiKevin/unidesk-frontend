# Unidesk
> Plataforma de Chamados Acadêmicos

## Sumário
- [Sobre](#sobre)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Modo de Desenvolvimento](#modo-de-desenvolvimento)
- [Build para Produção](#build-para-produção)
- [Docker](#docker)
  - [Dockerfile](#dockerfile)
  - [docker-compose](#docker-compose)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Licença](#licença)

## Sobre
O Unidesk é um aplicativo web Next.js que fornece uma plataforma para gerenciamento de tickets acadêmicos e administrativos. Possui autenticação, painel de controle, estatísticas e relatórios.

## Tecnologias
- Next.js 14
- React 18
- TypeScript
- Material UI v5
- Axios

## Pré-requisitos
- Node.js >= 18
- npm >= 9
- Docker e Docker Compose (opcional para containerização)

## Instalação e teste usando o Docker com o docker-compose
```bash
docker-compose up --build
# Acesse http://localhost:3000
```

## Instalação
```bash
git clone https://github.com/AntiKevin/unidesk-frontend.git
cd unidesk-frontend
npm ci
```

## Modo de Desenvolvimento
```bash
npm run dev
# Acesse http://localhost:3000
```

## Build para Produção
```bash
npm run build
npm start
# Acesse http://localhost:3000
```

## Docker
### Dockerfile
Este projeto inclui um `Dockerfile` para criar uma imagem otimizada em duas etapas: build e runtime.

### docker-compose
Utilize o `docker-compose.yml` para subir o serviço rapidamente:
```bash
docker-compose up --build
# Acesse http://localhost:3000
```

## Estrutura de Pastas
```
src/
├─ app/          # Rotas do Next.js
├─ components/   # Componentes React
├─ contexts/     # Contextos React
├─ hooks/        # Hooks personalizados
├─ lib/          # Configurações e helpers
├─ services/     # Serviços de API
├─ styles/       # CSS global e temas
├─ types/        # Tipagens TypeScript
```

## Licença
Este projeto está licenciado sob a licença MIT. Consulte `LICENSE.md` para mais detalhes.