import React from 'react';

export default class SparklinesBars extends React.Component {
    getAbsoluteCoordinates(matrix, p) {
        return {
            x: (matrix.a * p.x) + (matrix.c * -p.y),
            y: (matrix.b * p.x) + (matrix.d * -p.y)
        };
    }

    render() {
        const { data, points, height, style, barWidth, onMouseMove, margin } = this.props;
        const strokeWidth = 1 * ((style && style.strokeWidth) || 0);
        const marginWidth = margin ? (2 * margin) : 0;
        const width = barWidth || (points && points.length >= 2 ? Math.max(0, points[1].x - points[0].x - strokeWidth - marginWidth) : 0);

        return (
            <g transform = "scale(1,-1)">
                {points.map((p, index) =>
                        <rect
                            key={index}
                            x={p.x - (width + strokeWidth)/2}
                            y={-height}
                            width={width}
                            height={Math.max(0, height-p.y)}
                            style={style}
                            onMouseOver={(e) => {
                                e.target.setAttribute('opacity', '0.5');
                                onMouseMove({ index, pos: this.getAbsoluteCoordinates(e.target.getScreenCTM(), p) });
                            }}
                            onMouseLeave={(e) => {
                                e.target.setAttribute('opacity', '1');
                                onMouseMove(null)
                            }}
                        />
                )}
            </g>
        )
    }
}

SparklinesBars.propTypes = {
    points: React.PropTypes.arrayOf(React.PropTypes.object),
    height: React.PropTypes.number,
    style: React.PropTypes.object,
    barWidth: React.PropTypes.number,
    margin: React.PropTypes.number,
    onMouseMove: React.PropTypes.func
};

SparklinesBars.defaultProps = {
    style: { fill: 'slategray' }
};
