import React from 'react';

const Highlighted = (text, pattern) => {
    let parts = text.split(new RegExp(`(${pattern})`, 'gi'));

    return (
        <span>
            {parts.map((part, i) => (
                <span
                    key={i}
                    style={part.toLowerCase() === pattern.toLowerCase() ? { fontWeight: 'bold' } : {}}
                >
                    {part}
                </span>
            ))}
        </span>
    );
};

export default Highlighted