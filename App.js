import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native'



class App extends Component {
  state = {
    size: 10,
    view: "MENU",
    board: null,

  }

  constructor(props) {
    super(props);
    this.state.board = [...Array(this.state.size)].map(x=>Array(this.state.size).fill(0));
    console.log(this.state.board);
  }

  onStart = () => {
    this.setState({view: "GAME"});
  }

  onHighscore = () => {
    this.setState({view: "HIGHSCORE"})
  }

  renderMenu()
  {
    if (this.state.view == "MENU")
    {
      return (
        <View style={styles.container}>
          <View style={styles.menu_title}>
            <Text style={styles.menu_title_text}>Snake</Text>
          </View>
          <Image
            style={styles.menu_logo}
            source={require('./images/snakes.png')}
          />
          <View style={styles.buttons_container}>
            <TouchableOpacity onPress={this.onStart} style={[styles.menu_button, styles.menu_button_start]}>
              <Text style={styles.menu_button_text}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onHighscore} style={[styles.menu_button, styles.menu_button_highscore]}>
              <Text style={styles.menu_button_text}>Highscore</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  renderGame()
  {
    if (this.state.view == "GAME")
    {
      return (
        <View>
          <Text>Game</Text>
        </View>
      )
    }
  }

  renderHighscore()
  {
    if (this.state.view == "HIGHSCORE")
    {
      return (
        <View>
          <Text>Highscore</Text>
        </View>
      )
    }
  }

 render() {
    return (
      <View style={styles.container}>
        {this.renderMenu()}
        {this.renderGame()}
        {this.renderHighscore()}
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  container:
  {
    justifyContent: 'center',
    alignItems: 'center',
  },

  menu_title: {
    marginTop: 50,
    marginBottom: 50,
  },

  menu_title_text: {
    fontSize: 64,
    fontWeight: "800",
  },

  menu_logo: {
    width: 170,
    height: 170,
    marginBottom: 80,
  },
  menu_button: {
    padding: 20,
    textAlign: "center",
    borderRadius: 10,
    marginBottom: 20,
  },

  menu_button_text: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "600",
    color: "white",
    
  },

  menu_button_start: {
    backgroundColor: "green",
  },

  menu_button_highscore: {
    backgroundColor: "blue",
  }
})

export default App;
