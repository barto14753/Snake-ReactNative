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
    view: "GAME",
    board: null,
    snake: Array(0),
    food: Array(0),
    snake_color: "green",
    running: false,
    direction: "UP"

  }
  
  BOARD_SIZE = 360;
  MIN_SIZE = 10;
  MAX_SIZE = 20;

  constructor(props) {
    super(props);
    this.state.board = [...Array(this.state.size)].map(x=>Array(this.state.size).fill(0));
  }

  score = () => {return this.state.snake.length;}

  onStart = () => {
    this.setState({view: "GAME"});
  }

  onHighscore = () => {
    this.setState({view: "HIGHSCORE"});
  }

  onReturn = () => {
    this.setState({view: "MENU"});
  }

  onLeftClick = () => {
    switch (this.state.direction)
    {
      case "UP":
        this.setState("direction", "LEFT");
        break;
      case "DOWN":
        this.setState("direction", "LEFT");
        break;
      case "LEFT":
        this.setState("direction", "DOWN");
        break;
      case "RIGHT":
        this.setState("direction", "UP");
        break;
    }
  }

  onRightClick = () => {
    switch (this.state.direction)
    {
      case "UP":
        this.setState("direction", "RIGHT");
        break;
      case "DOWN":
        this.setState("direction", "RIGHT");
        break;
      case "LEFT":
        this.setState("direction", "UP");
        break;
      case "RIGHT":
        this.setState("direction", "DOWN");
        break;
    }
  }

  onPlay = () => {
    this.setState({running: true, })
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
            source={require('./images/snakes-2.png')}
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

  renderScore()
  {
    return (
      <View style={styles.score}>
        <Text style={styles.score_text}>Score: {this.score()}</Text>
      </View>
    )
  }

  renderBoard(){
    let boxes = []
    let box_size = (this.BOARD_SIZE / this.state.size) - 1;
    console.log(box_size);
    for (let i=0; i<this.state.size*this.state.size; i++)
    {
        boxes.push(
          <View style={[styles.box, {width: box_size, height: box_size},
          (this.state.board[i] == 1) ? styles.box_snake : null]} 
          >
            <Image></Image>
          </View>
        )
      
      
    }
    return <View style={styles.board}>{boxes}</View>
 }

 renderSteeringButtons()
 {
   return (
     <View style={styles.steering_buttons}>
       <TouchableOpacity style={styles.steering_button}>
         <Image
            style={styles.steering_button_img}
            source={require('./images/left-arrow.png')}
            onPress={this.onLeftClick}
         ></Image>
       </TouchableOpacity>

       <TouchableOpacity style={styles.steering_button}>
        <Image
            style={styles.steering_button_img}
            source={require('./images/right-arrow.png')}
            onPress={this.onRightClick}
        ></Image>
       </TouchableOpacity>
     </View>
   )
 }

 renderPlayButton()
 {
   return (
     <View>
       <TouchableOpacity style={styles.play_button}>
         <Text style={styles.play_button_img}>Play</Text>
       </TouchableOpacity>
     </View>
   )
 }



 renderButtons()
 {
   if (this.state.running)
   return (
    <View style={styles.buttons}>
      {this.renderSteeringButtons()}
    </View>
  )
  else
  return (
    <View style={styles.buttons}>
      {this.renderPlayButton()}
    </View>
  )
   
 }

  renderGame()
  {
    if (this.state.view == "GAME")
    {
      return (
        <View>
          {this.renderScore()}
          {this.renderReturn()}
          {this.renderBoard()}
          {this.renderButtons()}
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

  renderReturn()
  {
    return (
      <View>
        <TouchableOpacity onPress={this.onReturn} style={styles.return}>
        <Image
            style={styles.return_image}
            source={require('./images/return.png')}
          />
        </TouchableOpacity>
      </View>
    )
  }

  

 render() {
    return (
      <View style={null}>
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
  },

  return: {
    alignSelf: "flex-start",
    marginLeft: 15,
    marginTop: -55,
    borderWidth: 1,
    borderColor: "dodgerblue",
    borderRadius: 40,
  },

  return_image: {
    width: 40,
    height: 40,
    margin: 10,
    
  },

  score: {
    marginTop: 50,
    textAlign: "center",
    alignItems: "center",
  },

  score_text: {
    fontSize: 50,
    fontWeight: "500",
  },

  board: {
    alignSelf: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: "aliceblue",
    maxHeight: 350,
    maxWidth: 350,
    marginTop: 40,
    marginBottom: 10,
    borderRadius: 10,
    
  },
  box: {
    backgroundColor: "deepskyblue",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
  },

  box_snake: {
    backgroundColor: "green",
  },

  steering_buttons: {
    flexDirection: "row",
    alignContent: "center",
    alignSelf: "center",
  },

  steering_button: {
    margin: 20
  },

  steering_button_img: {
    width: 100,
    height: 100,
  },

  play_button: {
    marginTop: 30,
    backgroundColor: "red",
    width: 200,
    height: 80,
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
  },

  play_button_img: {
    fontSize: 74,
    fontWeight: "500",
    color: "white",

  }

})

export default App;
