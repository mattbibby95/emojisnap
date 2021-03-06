import React, { Component } from 'react';
import './App.css';

 class EmojiCard extends Component {

  constructor(props){
    super(props);
    this.handleSelected = this.handleSelected.bind(this);
    this.state = { 
      flip: false,
      checking: false,
      done : false
    }
  }

  handleSelected = () => {
    if (!this.state.done) {
        // If the card is not already flipped over
        if (!this.state.checking) {
        console.log(this.props.clickcount)
        this.setState({
          checking : true
        });
        // If not more than 2 cards have been clicked in a row without evaluation
        if (this.props.clickcount < 2) {
          this.setState({flip: !this.state.flip})
          this.props.onEmojiSelected(this.props.arrpos);
        }
      }
    }
  }

  componentDidUpdate() {
    if (!this.props.matched[this.props.arrpos] && this.state.flip === true && this.props.clickcount !== 0) {
      this.setState({
        flip: !this.state.flip,
        checking : false
      });
    }
    if (this.props.matched[this.props.arrpos] && !this.state.done) {
      this.setState({
        checking : false,
        done : true
      })
    }
  }

  render() {

    const flip = this.state.flip;

    return (
      <div className="card-container">
        <div onClick={this.handleSelected} 
             className={flip ? 'card flip' : 'card'}
             onAnimationEnd={() => this.setState({fade : false})}>
          <div className="side">❔</div>
          <div className="side back">{this.props.emoji}</div>
        </div>
      </div>
    );
  }
}

class EmojiRow extends Component {

  createRow = (arr, arrstart) => {

    let row = [];
  
    for (let index = 0; index < arr.length; index++) {
      row.push(<EmojiCard key={index+arrstart} emoji={arr[index]} 
        arrpos={index+arrstart} onEmojiSelected={this.props.onEmojiSelected}
        clickcount={this.props.clickcount}
        matched={this.props.matched}></EmojiCard>);
    }

    return row;
  }

  render(){
    return(
      this.createRow(this.props.emojis, this.props.arrstart)
    );
  }

}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      emojigrid : this.props.em1,
      matched : new Array(30).fill(false),
      emojicards: new Array(30),
      prevclick: 0,
      clickcount: 0
    }
    this.onEmojiSelected = this.onEmojiSelected.bind(this);
  }

  onEmojiSelected = (id) => {

    this.setState({
      clickcount : this.state.clickcount+1
    });

    if (this.state.emojigrid[this.state.prevclick] === this.state.emojigrid[id]) {
      console.log("WINNER WINNER")
      var newmatch = this.state.matched;
      newmatch[id] = true;
      newmatch[this.state.prevclick] = true;
      this.setState({
        clickcount: 0,
        matched : newmatch,
        prevclick : 0
      });
    }

    else if (this.state.clickcount > 0) {
      console.log("loser loser")
      this.setState({
        clickcount: 0
      });
    }

    else {
        this.setState({
        prevclick : id
      });
    }

    console.log(id);
  }

  componentDidMount(){
    console.log(this.props.children)
  }

  render() {
    return (
      <div className="Wrapper">
        {/* ROW 1 */}
        <EmojiRow onEmojiSelected={this.onEmojiSelected} 
        arrstart={0} 
        emojis={this.props.em1.slice(0,6)}
        clickcount={this.state.clickcount}
        matched={this.state.matched}/>
        {/* ROW 2 */}
        <EmojiRow onEmojiSelected={this.onEmojiSelected} 
        arrstart={6} 
        emojis={this.props.em1.slice(6,12)}
        clickcount={this.state.clickcount}
        matched={this.state.matched} />
        {/* ROW 3 */}
        <EmojiRow onEmojiSelected={this.onEmojiSelected} 
        arrstart={12} 
        emojis={this.props.em1.slice(12,18)}
        clickcount={this.state.clickcount}
        matched={this.state.matched} />
        {/* ROW 4 */}
        <EmojiRow onEmojiSelected={this.onEmojiSelected} 
        arrstart={18} 
        emojis={this.props.em1.slice(18,24)}
        clickcount={this.state.clickcount}
        matched={this.state.matched} />
        {/* ROW 5 */}
        <EmojiRow onEmojiSelected={this.onEmojiSelected} 
        arrstart={24} 
        emojis={this.props.em1.slice(24,30)}
        clickcount={this.state.clickcount}
        matched={this.state.matched} />  
      </div>
    );
  }
}

export default App;
