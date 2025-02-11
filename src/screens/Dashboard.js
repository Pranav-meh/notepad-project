import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, Button, StyleSheet, Image, ImageBackground, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { openDatabase } from "react-native-sqlite-storage";
import AsyncStorage from '@react-native-async-storage/async-storage';

const db = openDatabase(
  { name: "Notes.db" },
  () => console.log("Database opened successfully"),
  (error) => console.log("Database open error:", error)
);

const Dashboard = () => {
  const navigation = useNavigation();
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS table_user (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, uuid TEXT)",
        [],
        () => console.log("Table created successfully"),
        (error) => console.log("Error creating table:", error)
      );
    });

    FetchNotes();
  }, []);

  const FetchNotes = () => {
    AsyncStorage.getItem('userUUID')
      .then((userUUID) => {
        if (userUUID) {
          db.transaction((txn) => {
            txn.executeSql(
              "SELECT * FROM table_user WHERE uuid = ?",
              [userUUID],
              (_, results) => {
                let rows = results.rows.raw();
                setNotes(rows);
              },
              (error) => console.log("Error fetching notes:", error)
            );
          });
        } else {
          console.log("No user UUID found in AsyncStorage");
        }
      })
      .catch((error) => console.log("Error retrieving UUID from AsyncStorage:", error));
  };

  const insertNote = () => {
    AsyncStorage.getItem('userUUID')
      .then((userUUID) => {
        if (userUUID) {
          db.transaction((txn) => {
            txn.executeSql(
              "INSERT INTO table_user (title, content, uuid) VALUES (?, ?, ?)",
              [title, content, userUUID],
              () => {
                FetchNotes();
              },
              (error) => console.log("Error inserting note:", error)
            );
          });
        } else {
          console.log("No user UUID found in AsyncStorage");
        }
      })
      .catch((error) => console.log("Error retrieving UUID from AsyncStorage:", error));
  };

  const updateNote = () => {
    if (selectedNote) {
      AsyncStorage.getItem('userUUID')
        .then((userUUID) => {
          if (userUUID) {
            db.transaction((txn) => {
              txn.executeSql(
                "UPDATE table_user SET title=?, content=?, uuid=? WHERE id=?",
                [title, content, userUUID, selectedNote.id],
                () => {
                  FetchNotes();
                  setSelectedNote(null);
                },
                (error) => console.log("Error updating note:", error)
              );
            });
          } else {
            console.log("No user UUID found in AsyncStorage");
          }
        })
        .catch((error) => console.log("Error retrieving UUID from AsyncStorage:", error));
    }
  };

  const HandleDeleteNote = (note) => {
    db.transaction((txn) => {
      txn.executeSql(
        "DELETE FROM table_user WHERE id=?",
        [note.id],
        () => {
          FetchNotes();
          setSelectedNote(null);
        },
        (error) => console.log("Error deleting note:", error)
      );
    });
  };

  const HandleEditNote = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setModalVisible(true);
  };

  const HandleSaveNote = () => {
    if (!title.trim()) {
      Alert.alert("Validation Error", "Title cannot be empty.");
      return;
    }
    if (!content.trim()) {
      Alert.alert("Validation Error", "Content cannot be empty.");
      return;
    }

    if (selectedNote) {
      updateNote();
    } else {
      insertNote();
    }
    setModalVisible(false);
  };


  const renderNoteItem = ({ item }) => (
    <View style={styles.noteItemContainer}>
      <TouchableOpacity onPress={() => HandleEditNote(item)}>
        <Text style={styles.noteTitle}>{item.title}</Text>
        <Text style={styles.noteContent}>{item.content}</Text>
      </TouchableOpacity>

      <View style={styles.noteActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => HandleEditNote(item)}
        >
          <Image style={styles.actionIcon} source={require('../../assets/images/edit.png')} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => HandleDeleteNote(item)}
        >
          <Image style={styles.actionIcon} source={require('../../assets/images/delete.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const clearUUID = async () => {
    try {
      await AsyncStorage.removeItem('userUUID');
      Alert.alert('Logged Out');
    } catch (error) {
      console.error('Error clearing UUID:', error);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/paw.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => { navigation.navigate("Login"), clearUUID() }}
        >
          <Image
            resizeMode="contain"
            style={styles.logoutIcon}
            source={require("../../assets/images/logout.png")}
          />
        </TouchableOpacity>

        <Text style={styles.title}>My Notes</Text>

        <FlatList
          data={notes}
          renderItem={renderNoteItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.noteList}
          numColumns={2}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setSelectedNote(null);
            setTitle("");
            setContent("");
            setModalVisible(true);
          }}
        >
          <Image
            resizeMode="contain"
            style={styles.addnote}
            source={require("../../assets/images/add_note.png")}
          />
        </TouchableOpacity>

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <ImageBackground
            source={require("../../assets/images/2.jpg")}
            style={styles.modalBackground}
          >
            <View style={styles.modalContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter note title"
                placeholderTextColor="white"
                value={title}
                onChangeText={setTitle}
              />

              <TextInput
                style={styles.contentInput}
                multiline
                placeholder="Enter note content"
                placeholderTextColor="white"
                value={content}
                onChangeText={setContent}
              />

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 50,
                    paddingVertical:15,
                    backgroundColor: "#007BFF",
                    borderRadius: 7,
                  }}
                  onPress={HandleSaveNote}
                >
                  <Text style={{ color: 'white', textAlign: 'center' }}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    paddingHorizontal: 50,
                    paddingVertical:15,
                    backgroundColor: "#FF3B30",
                    borderRadius: 7,
                  }}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={{ color: 'white', textAlign: 'center' }}>Cancel</Text>
                </TouchableOpacity>
              </View>

            </View>
          </ImageBackground>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    textAlign: "center",
    marginTop: 40,
  },
  noteList: {
    flexGrow: 1,
  },
  noteItemContainer: {
    flex: 1,
    margin: 10,
    width: "45%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  noteContent: {
    fontSize: 14,
    color: "#666",
  },
  noteActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionButton: {
    borderRadius: 5,
  },
  actionIcon: {
    width: 30,
    height: 30,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007BFF",
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  addnote: {
    height: 30,
    width: 30,
    tintColor: "white",
  },
  logoutIcon: {
    height: 30,
    width: 30,
  },
  logoutButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  contentInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    height: 150,
    textAlignVertical: "top",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent:'space-between'
  },
  modalBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
});

export default Dashboard;