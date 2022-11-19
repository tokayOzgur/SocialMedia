import React from 'react'

const GonderiView = (props) => {
    const { gonderi } = props;
    return <div className="card p-1">{gonderi.content}</div>;
}

export default GonderiView