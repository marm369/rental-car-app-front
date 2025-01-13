import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import io from 'socket.io-client';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // Stocke tous les messages reçus et envoyés
  const [socket, setSocket] = useState(null);
  const [role] = useState('client'); // Rôle par défaut : client

  useEffect(() => {
    const socketConnection = io(`http://192.168.1.1:3000`);
    setSocket(socketConnection); // Stocke la connexion socket dans l'état

    // Enregistre le rôle du client auprès du serveur
    socketConnection.emit('register', { id: `user_${Date.now()}`, role });

    // Écoute les messages reçus du serveur
    socketConnection.on('message', (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: data.from, text: data.text },
      ]);
    });

    // Déconnecte la connexion WebSocket lorsque le composant est démonté
    return () => {
      socketConnection.disconnect();
    };
  }, [role]); // Reconnecter si le rôle change

  const sendMessage = () => {
    if (socket && message.trim() !== '') {
      // Ajoute le message envoyé par l'utilisateur à la liste
      setMessages((prevMessages) => [...prevMessages, { sender: 'You', text: message }]);
      socket.emit('message', { toRole: 'loueur', text: message }); // Envoie le message avec le rôle cible
      setMessage(''); // Réinitialise le champ de saisie après envoi
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chatContainer}>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <Text style={item.sender === 'You' ? styles.youMessage : styles.serverMessage}>
              {item.sender}: {item.text}
            </Text>
          )}
          keyExtractor={(item, index) => index.toString()}
          style={styles.messagesList}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Saisir un message"
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Envoyer" onPress={sendMessage} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  messagesList: {
    flex: 1,
  },
  youMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#daf8e3',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  serverMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
});

export default ChatScreen;
