import { Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, FlatList, View, Modal, Alert, Pressable } from 'react-native'
import React, { useState } from 'react'


const index = () => {
  const [input,setInput] = useState('')
  const [todo,setTodo] = useState<string[]>(["Hello world"])
  const [modalVisible, setModalVisible] = useState(false);
  const [update,setUpdate] = useState('')
  const [index,setIndex] = useState(0)

  const addtodo = ()=>{
    if(input.trim() === "" || null){
      alert('Please Enter a Todo')
      return
    }
    console.log(input);
    todo.push(input)
    setTodo([...todo])
    setInput('')
  }

  const deleteTodo = (index:number)=>{
    todo.splice(index,1)
    setTodo([...todo])
  }

  const editTodo = (index:number)=>{
    todo.splice(index,1,update)
    setTodo([...todo])
    setModalVisible(false)
    setUpdate('')
  }

  return (
    <SafeAreaView style ={styles.container}>
      <Text style ={styles.text}>Todo App</Text>

      <TextInput
      placeholder='Enter your Todo'
        style={styles.input}
        onChangeText={setInput}
        value={input}
      />

      <TouchableOpacity style={styles.button} onPress={addtodo} activeOpacity={0.5}>
        <Text style = {styles.btnText}>ADD TODO</Text>
      </TouchableOpacity>
      
      {
        todo.length > 0 ? <FlatList
        style = {styles.innerText}
        data={todo}
        renderItem={({item,index})=>{
          return <View style= {styles.item}>
            <Text style ={{fontSize:20}}>{item}</Text>
            <TouchableOpacity style={styles.Listdelete} 
            onPress={()=>{deleteTodo(index)}}
              activeOpacity={0.5}
            >
              <Text style= {{color: "white"}}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.Listedit} 
              activeOpacity={0.5}
              onPress={()=>{setModalVisible(true)}}
            >
              <Text style= {{color: "white"}}>Edit</Text>
            </TouchableOpacity>
          </View>
        }}
        keyExtractor={(item, index) => index.toString()}
      />
      : <Text style= {{
        color: "black",
        marginBottom: 20,
        marginTop: 20,
      }}> Nothings Here...</Text> } 
       <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Update Todo</Text>
            <TextInput
            placeholder='Enter your update Todo here'
                style={styles.updateInput}
                onChangeText={setUpdate}
                value={update}
              />
              <Pressable
              style={[styles.buttonex, styles.buttonEdit]}
              onPress={() => editTodo(index)}>
              <Text style={styles.textStyle}>Update</Text>
            </Pressable>

            <Pressable
              style={[styles.buttonex, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'black', // Set background color to black
    flex: 1, // Ensure it covers the entire screen
  },
  text: {
    color: "white", // Change text color to white for visibility on black background
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    width: 300,
    padding: 10,
    backgroundColor: 'white', // White background for input
    color: 'black', // Black text color for input
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'gray', // Update button color for contrast
    padding: 10,
    width: 300,
  },
  btnText: {
    color: 'white',
  },
  item: {
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerText: {
    marginTop: 20,
    color: 'white', // Change inner text color to white
  },
  Listdelete: {
    backgroundColor: 'red',
    padding: 10,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 5,
  },
  updateInput: {
    margin: 20,
    width: 300,
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'white', // White background for input in update modal
    color: 'black', // Black text color for input
  },
  Listedit: {
    backgroundColor: 'green',
    padding: 10,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 5,
  },
  centeredView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonex: {
    width: 300,
    marginBottom: 10,
    padding: 10,
  },
  buttonEdit: {
    backgroundColor: 'green',
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black', // Black color inside modal for readability
  },
});


export default index