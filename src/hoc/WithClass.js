import React from 'react';

const withClass = (WrappedComponent, className) => {
    return props => (
        <div className={className}>
            {/* passing unknown props */}
            <WrappedComponent {...props} /> 
        </div>
    );
};

export default withClass;