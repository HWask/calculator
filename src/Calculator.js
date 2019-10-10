import React from 'react';
import './Calculator.css';

function Button(props) {
	return <button onClick={props.onClick}  id={props.id} className={props.class}
		type="button">{props.name}</button>;
}

function Display(props) {
	return (
		<div id="display">
			{props.value}
		</div>
	);
}

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			operation: null,
			operand: "_",
			acc: "0",
			state:1, //1,2,3
		}

		this.calculate=this.calculate.bind(this);
		this.btnClicked=this.btnClicked.bind(this);
		this.showDisplay=this.showDisplay.bind(this);
	}

	calculate() {
		const {operation,operand,acc} = this.state;
		const iOp=parseInt(operand);
		const iacc=parseInt(acc);
		let result;
		switch (operation) {
			case 1://divide
				result=iacc*iOp;
				break;
			case 2://multiply
				result=iacc/iOp; //todo division by zero
				break;
			case 3://subtract
				result=iacc-iOp;
				break;
			case 4://add
				result=iacc+iOp;
				break;
			default:
				console.log("you should never see me");
		}

		return result.toString();
	}

	btnClicked(e) {
		let btnName=e.target.textContent;

		if(btnName === "\u00D7" || btnName === "\u00F7" || btnName === "\u2212" ||
			btnName === "\u002B") {
				if(this.state.state === 1 || this.state.state === 2) {
					this.setState({state:3});
				}
		}

		switch (btnName) {
			case "clear":
				this.setState({acc:"0",operand:"_",operation:null,state:1});
				break;
			case "\u00D7"://divide
				this.setState({operation:1});
				break;
			case "\u00F7"://multiply
				this.setState({operation:2});
				break;
			case "\u2212"://subtract
				this.setState({operation:3});
				break;
			case "\u002B"://add
				this.setState({operation:4});
				break;
			case "=":
				if(this.state.state === 3 && this.state.operand !== "") {
					let res=this.calculate();
					this.setState({acc:res,operand:"_",operation:null,state:2});
				}
				break;
			default: //number
				if(this.state.state === 1) {
					if(this.state.acc === "0") {
						this.setState({acc:btnName});
					} else {
						this.setState({acc:this.state.acc+btnName});
					}
				}
				if(this.state.state === 3) {
					if(this.state.operand === "0" || this.state.operand === "_") {
						this.setState({operand:btnName});
					} else {
						this.setState({operand:this.state.operand+btnName});
					}
				}
		}
	}

	showDisplay() {
		let state=this.state.state;
		if(state === 1 || state === 2) {
			return this.state.acc;
		}
		if(state === 3) {
			return this.state.operand;
		}

		return "you should never see me";
	}
	render() {
	  return (
			<div id="Calculator">
				<Display value={this.showDisplay()} />
				<Button onClick={this.btnClicked} id="clear" name="clear" />
				<Button onClick={this.btnClicked} class="op" name={"\u00D7"} />
				<Button onClick={this.btnClicked} class="btn" name="7" />
				<Button onClick={this.btnClicked} class="btn" name="8" />
				<Button onClick={this.btnClicked} class="btn" name="9" />
				<Button onClick={this.btnClicked} class="op" name={"\u00F7"} />
				<Button onClick={this.btnClicked} class="btn" name="4" />
				<Button onClick={this.btnClicked} class="btn" name="5" />
				<Button onClick={this.btnClicked} class="btn" name="6" />
				<Button onClick={this.btnClicked} class="op" name={"\u2212"} />
				<Button onClick={this.btnClicked} class="btn" name="1" />
				<Button onClick={this.btnClicked} class="btn" name="2" />
				<Button onClick={this.btnClicked} class="btn" name="3" />
				<Button onClick={this.btnClicked} class="op" name={"\u002B"} />
				<Button onClick={this.btnClicked} id="null" name="0" />
				<Button onClick={this.btnClicked} class="op" name="=" />
			</div>
	  );
	}
}

export default Calculator;
