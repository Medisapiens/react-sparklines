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
        const { x, y } = toolTip.pos;

        const transformLeft = -toolTips[toolTip.index].length;

        return (
            <div style={{
                position: 'absolute',
                pointerEvents: 'none',
                backgroundColor: '#badcff',
                fontSize: '10px',
                borderRadius : '5px',
                top: y - 15,
                left: x,
                transform: `translate(${transformLeft}px, 0)`
            }}>{toolTips[toolTip.index]}</div>
        )
    }

    render() {
        return (
            <div style={{position: 'relative'}}>
                {this.state.toolTip && this.renderToolTip()}
                <Sparklines limit={10}
                            margin={7}
                            data={stepData}
                            svgHeight={100}
                            svgWidth={300}
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