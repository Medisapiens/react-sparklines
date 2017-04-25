import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Sparklines, SparklinesBars } from '../src/Sparklines';
import './demostyles.css'


const stepData = [100, 80, 50, 40, 40, 30, 20, 10, 3, 1];
const toolTips= ['eka', 'toka', 'kolmas', 'neljäs', 'viides', 'kuudes', 'seiska', 'kasi', 'ysi', 'kymppi'];



class Demo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toolTip : null
        }
    }

    renderToolTip() {
        const { toolTips } = this.props;
        const { toolTip } = this.state;
        const { top, left} = toolTip.pos;

        const transformLeft = -toolTips[toolTip.index].length;

        return (
            <div style={{
                position: 'fixed',
                pointerEvents: 'none',
                backgroundColor: '#badcff',
                fontSize: '10px',
                borderRadius : '5px',
                top: top - 15,
                left,
                transform: `translate(${transformLeft}px, 0)`
            }}>{toolTips[toolTip.index]}</div>
        )
    }

    render() {
        return (
            <div style={{position: 'relative', width: '150px', height: '50px'}}>
                {this.state.toolTip && this.renderToolTip()}
                <Sparklines limit={10}
                            margin={7}
                            data={stepData}
                            onMouseMove={(toolTip) => {this.setState({toolTip})}}>
                    <SparklinesBars barWidth={20} />

                </Sparklines>
            </div>
        )
    }
}

Demo.prototypes = {
    toolTips: React.PropTypes.arrayOf(React.PropTypes.string)
};

ReactDOM.render(

    <div style={{width: '100%', height: '100%', padding: '25% 25%'}}>
        <Demo toolTips={toolTips}/>
    </div>

    , document.getElementById('app'));