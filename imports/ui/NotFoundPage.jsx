import React from 'react';

const NotFoundPage = () => {
    return (
        <div className="container">
            <p>Il n'y a rien ici</p>
            <button onClick={() => FlowRouter.go('/')}>Retour</button>
        </div>
    );
};

export default NotFoundPage;