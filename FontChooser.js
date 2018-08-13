class FontChooser extends React.Component {

    constructor(props) {
    		super(props);
    		
    		var minSize = Number(this.props.min);
    		var maxSize = Number(this.props.max);
    		var initialSize = Number(this.props.size);
    		var isChecked;
    		
    		if (minSize <= 0) {
    			minSize = 1;
    		}
    		
    		if (minSize > maxSize) {
    			maxSize = minSize;
    		}
    		
    		if (initialSize < minSize) {
    			initialSize = minSize;
    		}
    		
    		if (initialSize > maxSize) {
    			initialSize = maxSize;
    		}
    		
    		if (this.props.bold == 'true') {
    			isChecked = true;
    		} else {
    			isChecked = false;
    		}
    		
		this.state = { bold : isChecked,  
					  isHidden: true, 
					  fontSize: initialSize,
					  fontColor: 'black',
					  minSize: minSize,
					  maxSize: maxSize,
					  initialSize: initialSize };
    }
    
	handleClick() {
    			this.setState({ isHidden: this.state.isHidden ? false : true });
    	 }
    
   	 handleBold() {
    			this.setState({ bold: !this.state.bold  });
    		}
    
		increaseSize() {
    			var newSize = Number(this.state.fontSize) + 1;
    			if (newSize >= this.state.maxSize) {
    				this.setState({fontColor: 'red', fontSize: this.state.maxSize });
    			} else {
    				this.setState({fontColor: 'black', fontSize: newSize});
    			}
    		}
    
   		decreaseSize() {
    			var newSize = Number(this.state.fontSize) - 1;
    			if (newSize <= this.state.minSize) {
    				this.setState({fontColor: 'red', fontSize: this.state.minSize });
    			} else {
    				this.setState({fontColor: 'black', fontSize: newSize});
    			}
    		}
    
    		setDefaultSize() {
    			var mySize = Number(this.state.initialSize);
    			this.setState({ fontColor: 'black', fontSize: mySize });
    		}
    

    		render() {
    			var bold = this.state.bold ? 'bold' : 'normal' ;
    			var color = this.state.fontColor;
    			var mySize = this.state.fontSize;
			return(
	       	<div>
	       		<input type="checkbox" id="boldCheckbox" hidden={this.state.isHidden} onChange={this.handleBold.bind(this)} checked={this.state.bold} />
	       		<button id="decreaseButton" hidden={this.state.isHidden} onClick={this.decreaseSize.bind(this)}>-</button>
	       		<span id="fontSizeSpan" hidden={this.state.isHidden} onDoubleClick={this.setDefaultSize.bind(this)} style={{ color: color }}>{mySize}</span>
	       		<button id="increaseButton" hidden={this.state.isHidden} onClick={this.increaseSize.bind(this)}>+</button>
	       		<span id="textSpan" onClick={this.handleClick.bind(this)} style={{fontWeight:bold, fontSize: mySize}}>{this.props.text}</span>
	       	</div>
			);
    		}
	}