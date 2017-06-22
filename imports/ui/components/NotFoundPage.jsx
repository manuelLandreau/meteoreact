import React from 'react';

const NotFoundPage = () => {
    return (
        <div>
            <p>There's nothing here...</p>
            <button onClick={() => FlowRouter.go('/')}>Retour</button>
        </div>
    );
};

export default NotFoundPage;