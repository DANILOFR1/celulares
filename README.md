# Simulador de WhatsApp para Jogo de Investigação

Este é um Progressive Web App (PWA) que simula conversas de WhatsApp entre personagens de um jogo de investigação.

## Recursos

- Interface que simula o WhatsApp
- Visualização de conversas entre personagens
- Funciona offline (após o primeiro carregamento)
- Pode ser instalado em dispositivos móveis

## Como usar

1. Abra o aplicativo
2. Selecione o celular de um personagem
3. Veja as conversas disponíveis naquele celular

## Personagens disponíveis

- Júlia Martins
- Camila Sanches
- Henrique Torres
- Diego Carvalho
- Lucas Lima
- Beatriz Lopes

## Desenvolvimento

### Estrutura do projeto

```
/
├── index.html           # Página principal
├── css/
│   └── style.css        # Estilos do aplicativo
├── js/
│   ├── app.js           # Lógica principal do aplicativo
│   └── chat-data.js     # Dados das conversas
├── images/              # Imagens usadas no app
├── icons/               # Ícones para o PWA
├── manifest.json        # Manifesto para o PWA
└── service-worker.js    # Service Worker para funcionalidade offline
```

### Hospedagem

Este PWA está configurado para ser hospedado no GitHub Pages.

### Adicionar novas conversas

Para adicionar novas conversas:

1. Edite o arquivo `js/chat-data.js`
2. Adicione um novo objeto de conversa no formato apropriado
3. Atualize as referências no objeto `availableChats` 