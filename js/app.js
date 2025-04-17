document.addEventListener('DOMContentLoaded', () => {
    const phoneElements = document.querySelectorAll('.phone');
    const chatModal = document.getElementById('chatModal');
    const chatMessages = document.getElementById('chatMessages');
    const backButton = document.querySelector('.back-button');
    const contactName = document.getElementById('contactName');
    const contactImage = document.getElementById('contactImage');
    
    // Adicionar tratamento de erro para imagens
    contactImage.addEventListener('error', handleImageError);
    
    // Função para tratar erros de carregamento de imagem
    function handleImageError(e) {
        const img = e.target;
        img.src = createInitialsImage(img.alt);
        img.classList.add('error-img');
    }
    
    // Função para criar imagem com iniciais
    function createInitialsImage(name) {
        // Fallback para quando a imagem não carrega
        return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
                <rect width="100" height="100" rx="50" fill="#128C7E"/>
                <text x="50" y="50" font-family="Arial, sans-serif" font-size="40" 
                      text-anchor="middle" dominant-baseline="central" fill="white">
                    ${name.charAt(0)}
                </text>
            </svg>
        `);
    }
    
    let currentPhone = '';
    
    // Mapeamento de nomes alternativos
    const nameMapping = {
        'Bia': 'Beatriz',
        'Beatriz': 'Beatriz',
        'Julia': 'Júlia',
        'Júlia': 'Júlia',
        'Henrique': 'Henrique',
        'Lucas': 'Lucas',
        'Diego': 'Diego',
        'Camila': 'Camila',
        'Grupo': 'Grupo'
    };
    
    // Adiciona evento de clique para cada telefone
    phoneElements.forEach(phone => {
        phone.addEventListener('click', () => {
            currentPhone = phone.dataset.owner;
            const availableChatsForPhone = availableChats[currentPhone];
            
            if (availableChatsForPhone.length > 0) {
                // Se houver mais de uma conversa disponível, mostra uma lista
                if (availableChatsForPhone.length > 1) {
                    showChatList(availableChatsForPhone);
                } else {
                    // Se houver apenas uma conversa, abre diretamente
                    const chatId = availableChatsForPhone[0].id;
                    const chatWith = availableChatsForPhone[0].with;
                    showChat(chatId, chatWith);
                }
            } else {
                // Se não houver conversas, mostra uma mensagem
                alert(`Não há conversas disponíveis no celular de ${currentPhone}`);
            }
        });
    });

    // Função para mostrar a lista de conversas disponíveis
    function showChatList(availableChats) {
        // Limpa mensagens anteriores
        chatMessages.innerHTML = '';
        
        // Adiciona título
        contactName.textContent = `Conversas de ${currentPhone}`;
        contactImage.src = getImageSrc(currentPhone);
        contactImage.alt = currentPhone;
        
        // Cria lista de conversas
        const chatListElement = document.createElement('div');
        chatListElement.classList.add('chat-list');
        
        availableChats.forEach(chat => {
            const chatOption = document.createElement('div');
            chatOption.classList.add('chat-option');
            
            // Decide qual imagem usar
            let imgSrc = '';
            if (chat.with === 'Grupo') {
                imgSrc = 'Grupo.png';
            } else {
                // Encontra o nome correto para a imagem
                const mappedName = nameMapping[chat.with] || chat.with;
                imgSrc = `${mappedName}.png`;
            }
            
            // Cria o elemento de conversas
            const chatOptionEl = document.createElement('div');
            chatOptionEl.className = 'chat-option';
            
            // Cria a div de contato
            const contactDiv = document.createElement('div');
            contactDiv.className = 'chat-option-contact';
            
            // Cria e configura a imagem
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = chat.with;
            
            // Adiciona o tratamento de erro para a imagem
            img.onerror = function() {
                this.onerror = null;
                this.src = createInitialsImage(this.alt);
                this.classList.add('error-img');
            };
            
            // Cria a div com info do contato
            const infoDiv = document.createElement('div');
            infoDiv.className = 'contact-info';
            
            // Cria o nome do contato
            const nameDiv = document.createElement('div');
            nameDiv.className = 'contact-name';
            nameDiv.textContent = chats[chat.id].name;
            
            // Monta a estrutura
            infoDiv.appendChild(nameDiv);
            contactDiv.appendChild(img);
            contactDiv.appendChild(infoDiv);
            chatOption.appendChild(contactDiv);
            
            // Adiciona o evento de clique
            chatOption.addEventListener('click', () => {
                showChat(chat.id, chat.with);
            });
            
            chatListElement.appendChild(chatOption);
        });
        
        chatMessages.appendChild(chatListElement);
        
        // Mostra o modal
        chatModal.style.display = 'block';
    }
    
    // Função para obter a URL da imagem com base no nome
    function getImageSrc(name) {
        const mappedName = nameMapping[name] || name;
        
        if (name === 'Grupo') {
            return 'Grupo.png';
        }
        
        return `${mappedName}.png`;
    }
    
    // Função para mostrar o chat
    function showChat(chatId, chatWith) {
        const chat = chats[chatId];
        
        if (!chat) {
            alert('Conversa não encontrada!');
            return;
        }
        
        // Limpa mensagens anteriores
        chatMessages.innerHTML = '';
        
        // Adiciona informações do cabeçalho
        contactName.textContent = chat.name;
        
        // Define a imagem do contato
        if (chatWith === 'Grupo') {
            contactImage.src = 'Grupo.png';
        } else {
            contactImage.src = getImageSrc(chatWith);
        }
        contactImage.alt = chatWith;
        
        // Adiciona o tratamento de erro para a imagem
        contactImage.onerror = function() {
            this.onerror = null;
            this.src = createInitialsImage(this.alt);
            this.classList.add('error-img');
        };
        
        // Adiciona informações do chat
        const chatInfo = document.createElement('div');
        chatInfo.classList.add('chat-info');
        chatInfo.innerHTML = `
            <p>${chat.info}</p>
            <p>Início: ${chat.start}</p>
            <p>Fim: ${chat.end}</p>
        `;
        chatMessages.appendChild(chatInfo);
        
        // Adiciona as mensagens
        chat.messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            
            // Define a classe para estilizar a mensagem (enviada ou recebida)
            if (message.sender === currentPhone) {
                messageElement.classList.add('sent');
            } else {
                messageElement.classList.add('received');
            }
            
            // Mostrar o nome completo do remetente em vez do identificador
            let senderDisplay = message.sender;
            if (nameMapping[message.sender]) {
                senderDisplay = nameMapping[message.sender];
            }
            
            messageElement.innerHTML = `
                <div class="message-sender">${senderDisplay}</div>
                <div class="message-content">${message.text}</div>
                <div class="message-time">${message.time}</div>
            `;
            
            chatMessages.appendChild(messageElement);
        });
        
        // Rola para a última mensagem
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Mostra o modal
        chatModal.style.display = 'block';
    }
    
    // Botão de voltar para fechar o modal ou voltar para a lista de conversas
    backButton.addEventListener('click', () => {
        // Se estiver mostrando uma conversa e houver mais de uma disponível
        if (availableChats[currentPhone].length > 1 && chatMessages.querySelector('.message')) {
            showChatList(availableChats[currentPhone]);
        } else {
            // Senão fecha o modal
            chatModal.style.display = 'none';
        }
    });
    
    // Fechar o modal clicando fora dele
    window.addEventListener('click', (event) => {
        if (event.target === chatModal) {
            chatModal.style.display = 'none';
        }
    });
}); 