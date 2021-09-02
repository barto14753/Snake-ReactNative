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
    snake: Array(0),
    food: Array(0),
    snake_color: "green",
    running: false,
    direction: "UP",
    highscore: []

  }
  
  
  BOARD_SIZE = 360;
  MIN_SIZE = 10;
  MAX_SIZE = 20;
  FOOD_GENERATE_TIME = 4000;
  MOVE_TIME = 500;
  MAX_RECORDS = 10;

  constructor(props) {
    super(props);
  }

  addToHighscore = (score) => {
    const highscore = [...this.state.highscore];
    highscore.push({score: score, date: new Date()});

    highscore.sort((a,b) => { return a.score < b.score });
    this.setState({highscore: highscore});
  }


  score = () => {
    let l = this.state.snake.length;
    return (l > 0) ? l-1 : 0;
  }

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
        this.setState({direction: "LEFT"});
        break;
      case "DOWN":
        this.setState({direction: "LEFT"});
        break;
      case "LEFT":
        this.setState({direction: "DOWN"});
        break;
      case "RIGHT":
        this.setState({direction: "UP"});
        break;
    }
  }

  onRightClick = () => {
    switch (this.state.direction)
    {
      case "UP":
        this.setState({direction: "RIGHT"});
        break;
      case "DOWN":
        this.setState({direction: "RIGHT"});
        break;
      case "LEFT":
        this.setState({direction: "UP"});
        break;
      case "RIGHT":
        this.setState({direction: "DOWN"});
        break;
    }
  }

  nextPos = () => {
    let actualPos = this.state.snake[0];
    let size = this.state.size;
    switch (this.state.direction)
    {
      case "UP":
        if (actualPos < size) return -1;
        else return actualPos - size;
        break;
      case "DOWN":
        if (actualPos + size >= size*size) return -1;
        else return actualPos + size;
        break;
      case "LEFT":
        if (actualPos % size == 0) return -1;
        else return actualPos - 1;
        break;
      case "RIGHT":
        if (actualPos % size == (size - 1)) return -1;
        else return actualPos + 1;
        break;
    }

    return -1;
  }

  isTakenBySnake = (pos) => {
    return this.state.snake.includes(pos);
  }

  isTakenByFood = (pos) => {
    return this.state.food.includes(pos);
  }

  eatFood = (pos) => {
    const snake = [...this.state.snake];
    const food = [...this.state.food];
    const score = this.state.score;


    snake.unshift(pos);
    const index = food.indexOf(pos);
    if (index > -1) {
      food.splice(index, 1);
    }

    this.setState({score: score+1, snake: snake, food: food});

  }

  normalMove = (pos) => {
    const snake = [...this.state.snake];


    for(let i=snake.length-1; i>0; i--)
    {
      snake[i] = snake[i-1];
    }
    snake[0] = pos;
    this.setState({snake: snake});
  }

  endGame = () => {
    this.addToHighscore(this.state.score);
    this.setState({running: false});
  }

  generateFood = () => {
    const food = [...this.state.food];
    if (this.state.running && (this.state.snake.length + food.length < (this.state.size*this.state.size)*0.75))
    {
      let randomPos = Math.floor(Math.random() * this.state.size * this.state.size);
      while (this.isTakenByFood(randomPos) || this.isTakenBySnake(randomPos))
      {
        randomPos = Math.floor(Math.random() * this.state.size * this.state.size);
      }
      food.push(randomPos);
      this.setState({food: food});
      setTimeout(()=>{this.generateFood()}, this.FOOD_GENERATE_TIME);
    }
  }

  move = () => {
    const size = this.state.size;

    if (!this.state.running) return; 

    let nextPos = this.nextPos();

    if (nextPos > 0 && nextPos < size*size && !this.isTakenBySnake(nextPos))
    {
      if (this.isTakenByFood(nextPos))
      {
        this.eatFood(nextPos);
      }
      else
      {
        this.normalMove(nextPos);
      }
      setTimeout(()=>{this.move()}, this.MOVE_TIME);
    }
    else
    {
      this.endGame();
    }
  }

  onReset = () => {
    this.setState({
      board: null,
      snake: Array(0),
      food: Array(0),
      direction: "UP"
  
    })

  }

  onPlay = () => {
    this.setState({
      board: null,
      snake: Array(0),
      food: Array(0),
      direction: "UP",
      score: 0,
  
    }, () => {
      let midPos = Math.floor(this.state.size*this.state.size/2 - this.state.size/2);
      const snake = this.state.snake;
      snake.push(midPos);

      let randomPos = Math.floor(Math.random()*this.state.size*this.state.size);
      while (randomPos == midPos) randomPos = Math.floor(Math.random()*this.state.size*this.state.size);
      const food = this.state.food;
      food.push(randomPos);

      this.setState({running: true, snake: snake, food: food}, () => {
        setTimeout(()=>{this.generateFood()}, this.FOOD_GENERATE_TIME);
        setTimeout(()=>{this.move()}, this.MOVE_TIME);
      })
    });
  }

  onCredits = () =>
  {
    this.setState({view: "CREDITS"});
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
            <TouchableOpacity onPress={this.onCredits} style={[styles.menu_button, styles.menu_button_highscore]}>
              <Text style={styles.menu_button_text}>Credits</Text>
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
    for (let i=0; i<this.state.size*this.state.size; i++)
    {
        boxes.push(
          <View key={i} style={[styles.box, {width: box_size, height: box_size},
          (this.isTakenBySnake(i)) ? styles.box_snake : null,
          (this.isTakenByFood(i)) ? styles.box_food : null]} 
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
       <TouchableOpacity style={styles.steering_button} onPress={this.onLeftClick}>
         <Image
            style={styles.steering_button_img}
            source={require('./images/left-arrow.png')}
         ></Image>
       </TouchableOpacity>

       <TouchableOpacity style={styles.steering_button}  onPress={this.onRightClick}>
        <Image
            style={styles.steering_button_img}
            source={require('./images/right-arrow.png')}
        ></Image>
       </TouchableOpacity>
     </View>
   )
 }

 renderPlayButton()
 {
   return (
     <View>
       <TouchableOpacity style={styles.play_button} onPress={this.onPlay}>
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

  renderHighscoreText()
  {
    return (
      <View style={styles.score}>
        <Text style={styles.score_text}>Highscore</Text>
      </View>
    )
  }

  renderHighscoreTable()
  {
    const highscore = [...this.state.highscore];
    let records = [];
    records.push(
      <Text style={styles.record}>Lp | Score | Date</Text>
    )
    for (let i=0; i<this.MAX_RECORDS && i<highscore.length; i++)
    {
      const obj = highscore[i];
      records.push(
        <Text style={styles.record}>{i+1}    | {obj["score"]}        | {obj["date"].toDateString()}</Text>
      )
    }

    return (
      <View style={styles.highscore_table}>
        {records}
      </View>
    )
  }

  renderHighscore()
  {
    if (this.state.view == "HIGHSCORE")
    {
      return (
        <View>
          {this.renderHighscoreText()}
          {this.renderReturn()}
          {this.renderHighscoreTable()}
          
        </View>
      )
    }
  }

  renderCredits()
  {
    if (this.state.view == "CREDITS")
    {
      return (
        <View>
          <Text>Icons made by "https://www.freepik.com" Freepik from "https://www.flaticon.com/" Flaticon</Text>
          <Text>Icons made by "https://www.flaticon.com/authors/pixel-perfect" Pixel perfect from "https://www.flaticon.com/" Flaticon</Text>
          <Text>Icons made by "https://www.flaticon.com/authors/smashicons" Smashicons from "https://www.flaticon.com/" Flaticon</Text>
          {this.renderReturn()}
        </View>
      )
    }
  }

  

 render() {
    return (
      <View style={null}>
        {this.renderMenu()}
        {this.renderGame()}
        {this.renderHighscore()}
        {this.renderCredits()}
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

  box_food: {
    backgroundColor: "purple",
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

  },


  highscore_table: {
    marginTop: 50,
    borderWidth: 1,
    padding: 10,
    borderColor: "black",
    textAlign: "center",
    alignSelf: "center",
  },

  record: {
    fontSize: 25,
    fontWeight: "500",
  }

})

export default App;
