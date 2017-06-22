import React from 'react';
import {Icon, Button} from 'semantic-ui-react';

const UserMenu = ({username, logout}) => (
    <Button onClick={() => logout()}>
        {username}&nbsp;<Icon name="sign out"/>
    </Button>
);

export default UserMenu;
