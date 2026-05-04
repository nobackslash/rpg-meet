# RPG Meet - TODO List

## Features Principais

### Fase 1: Interface Base
- [x] Tela Home com navegação
- [x] Tela Criar Sala com formulário
- [x] Tela Entrar em Sala com validação
- [x] Navegação entre telas (Tab Bar)
- [x] Tema de cores customizado (roxo/ciano)

### Fase 2: Integração Jitsi Meet
- [x] Integrar Jitsi Meet via WebView
- [x] Criar tela de Videoconferência
- [x] Passar parâmetros para Jitsi (nome da sala, nome do usuário)
- [ ] Controles básicos de áudio/vídeo
- [ ] Indicador de status de conexão

### Fase 3: Sistema de Rolagem de Dados
- [x] Componente DiceRoller com seletor de dados (d4, d6, d8, d10, d12, d20, d100)
- [x] Seletor de quantidade de dados (1-10)
- [x] Lógica de rolagem com gerador de números aleatórios
- [ ] Animação de rolagem
- [x] Exibição de resultado

### Fase 4: Histórico e Compartilhamento
- [x] Componente DiceHistory para exibir últimas rolagens
- [ ] Armazenar histórico localmente (AsyncStorage)
- [ ] Integração com chat do Jitsi (se disponível)
- [ ] Compartilhar resultado com participantes

### Fase 5: Branding e Polimento
- [x] Gerar logo/ícone do app
- [x] Atualizar app.config.ts com branding
- [x] Adicionar splash screen
- [ ] Testar em diferentes dispositivos

### Fase 6: Entrega
- [ ] Gerar QR Code para instalação
- [ ] Criar link de pré-visualização
- [ ] Documentação de uso
- [ ] Checkpoint final

## Bugs e Correções

- [ ] Corrigir erro de TypeScript em server/_core/storageProxy.ts (erro de tipo no servidor, não afeta o app)

## Notas

- Usar Expo Router para navegação
- Usar NativeWind (Tailwind) para estilos
- Usar AsyncStorage para armazenamento local
- Integrar Jitsi Meet via WebView (react-native-webview)
- Usar Reanimated para animações
