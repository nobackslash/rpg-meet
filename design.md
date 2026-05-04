# Design do RPG Meet - Aplicativo de Videoconferência para RPG

## Visão Geral
O RPG Meet é um aplicativo de videoconferência especializado para sessões de RPG de mesa, integrando o Jitsi Meet com um sistema interativo de rolagem de dados. O app permite que mestres e jogadores se conectem em videochamadas enquanto compartilham resultados de rolagens de dados em tempo real.

## Orientação de Design
- **Orientação**: Portrait (9:16)
- **Uso**: Uma mão
- **Estilo**: iOS-first, design limpo e intuitivo
- **Foco**: Facilitar comunicação de RPG com ferramentas de dados integradas

---

## Lista de Telas

1. **Home (Tela Principal)**
   - Ponto de entrada do app
   - Opções para criar ou entrar em uma sala

2. **Criar Sala**
   - Formulário para configurar uma nova sessão de RPG
   - Campo para nome da sala
   - Seleção de tipo de RPG (D&D, Pathfinder, etc.)
   - Botão para gerar sala no Jitsi Meet

3. **Entrar em Sala**
   - Campo para código/URL da sala
   - Campo para nome do participante
   - Botão para conectar

4. **Sala de Videoconferência**
   - Integração com Jitsi Meet (WebView)
   - Painel de rolagem de dados sobreposto
   - Histórico de rolagens
   - Controles de áudio/vídeo

5. **Painel de Dados**
   - Seletor de tipo de dado (d4, d6, d8, d10, d12, d20)
   - Quantidade de dados a rolar
   - Botão para rolar
   - Exibição do resultado
   - Histórico de rolagens recentes

---

## Conteúdo Principal e Funcionalidade

### Tela Home
**Conteúdo:**
- Logo/título do app (RPG Meet)
- Dois botões principais: "Criar Sala" e "Entrar em Sala"
- Histórico de salas recentes (opcional)

**Funcionalidade:**
- Navegação para criar nova sala
- Navegação para entrar em sala existente
- Quick access para salas recentes

### Tela Criar Sala
**Conteúdo:**
- Campo de entrada: Nome da Sala
- Dropdown: Tipo de RPG (D&D 5e, Pathfinder, Call of Cthulhu, etc.)
- Checkbox: Permitir entrada de novos participantes
- Botão: "Criar Sala"

**Funcionalidade:**
- Validar nome da sala
- Criar sala no Jitsi Meet
- Armazenar configurações localmente
- Redirecionar para tela de videoconferência

### Tela Entrar em Sala
**Conteúdo:**
- Campo de entrada: Código/URL da sala
- Campo de entrada: Nome do participante
- Botão: "Conectar"
- Link: "Escanear QR Code" (opcional)

**Funcionalidade:**
- Validar código da sala
- Conectar ao Jitsi Meet
- Armazenar nome do participante

### Tela de Videoconferência
**Conteúdo:**
- WebView do Jitsi Meet (80% da tela)
- Painel de rolagem de dados (20% da tela, bottom sheet)
- Indicadores de status da conexão

**Funcionalidade:**
- Exibir vídeo/áudio dos participantes
- Permitir rolagem de dados
- Compartilhar resultados com todos
- Manter histórico de rolagens

### Painel de Dados
**Conteúdo:**
- Seletor de tipo de dado (d4, d6, d8, d10, d12, d20, d100)
- Spinner: Quantidade de dados (1-10)
- Botão grande: "Rolar Dados"
- Resultado da última rolagem (grande e destacado)
- Lista de últimas 5 rolagens

**Funcionalidade:**
- Rolar dados com animação
- Exibir resultado imediatamente
- Enviar resultado para chat do Jitsi (se disponível)
- Manter histórico local

---

## Fluxos de Usuário Principais

### Fluxo 1: Criar e Entrar em uma Sessão
1. Usuário abre o app → Tela Home
2. Clica em "Criar Sala"
3. Preenche nome da sala e tipo de RPG
4. Clica em "Criar Sala"
5. App cria sala no Jitsi Meet
6. Redireciona para Tela de Videoconferência
7. Usuário compartilha código/link com outros
8. Outros usuários usam "Entrar em Sala" para conectar

### Fluxo 2: Rolar Dados Durante a Sessão
1. Usuário está na Tela de Videoconferência
2. Seleciona tipo de dado (ex: d20)
3. Define quantidade (ex: 2)
4. Clica em "Rolar Dados"
5. Dados são rolados com animação
6. Resultado é exibido (ex: "2d20 = 18")
7. Resultado aparece no histórico
8. Resultado é enviado para o chat do Jitsi (se possível)

### Fluxo 3: Entrar em Sala Existente
1. Usuário abre o app → Tela Home
2. Clica em "Entrar em Sala"
3. Insere código da sala (ou escaneia QR)
4. Insere seu nome
5. Clica em "Conectar"
6. App conecta ao Jitsi Meet
7. Redireciona para Tela de Videoconferência

---

## Escolhas de Cor

| Elemento | Cor | Uso |
|----------|-----|-----|
| **Primary** | #6D28D9 (Roxo Profundo) | Botões principais, destaques |
| **Secondary** | #0891B2 (Ciano) | Elementos secundários, links |
| **Success** | #10B981 (Verde) | Resultados positivos, conexão estabelecida |
| **Warning** | #F59E0B (Âmbar) | Avisos, status de conexão fraca |
| **Error** | #EF4444 (Vermelho) | Erros, desconexão |
| **Background** | #FFFFFF (Branco) | Fundo principal |
| **Surface** | #F3F4F6 (Cinza Claro) | Cards, superfícies elevadas |
| **Foreground** | #111827 (Cinza Escuro) | Texto principal |
| **Muted** | #6B7280 (Cinza) | Texto secundário |
| **Border** | #E5E7EB (Cinza Claro) | Bordas, divisores |

### Tema Escuro
- **Background**: #0F172A (Azul Muito Escuro)
- **Surface**: #1E293B (Azul Escuro)
- **Foreground**: #F1F5F9 (Branco Quase)
- **Muted**: #94A3B8 (Cinza Claro)

---

## Componentes Principais

1. **DiceRoller** - Componente para rolar dados
2. **RoomForm** - Formulário para criar/entrar em sala
3. **JitsiMeetView** - WebView integrando Jitsi Meet
4. **DiceHistory** - Histórico de rolagens
5. **ConnectionStatus** - Indicador de status da conexão

---

## Considerações Técnicas

- **Jitsi Meet Integration**: Usar WebView para renderizar Jitsi Meet
- **Local Storage**: AsyncStorage para armazenar salas recentes e configurações
- **Animações**: Reanimated para animações de rolagem de dados
- **Responsividade**: Adaptar layout para diferentes tamanhos de tela
- **Permissões**: Câmera, microfone (solicitadas pelo Jitsi)

---

## Próximas Etapas

1. Implementar tela Home com navegação
2. Criar tela de Criar Sala com validação
3. Criar tela de Entrar em Sala
4. Integrar Jitsi Meet via WebView
5. Implementar sistema de rolagem de dados
6. Adicionar histórico e compartilhamento de resultados
7. Testes e otimizações
