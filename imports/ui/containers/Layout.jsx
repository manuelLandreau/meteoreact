import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Segment, Container, Header} from 'semantic-ui-react';
import Navbar from './Navbar';

export default class Layout extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Segment clearing size="mini" vertical>
                    <Navbar/>
                </Segment>
                <Container text>
                    <Header as='h2'>Menu</Header>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                        Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
                        ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</p>
                    <hr/>
                    {this.props.page.main}
                </Container>
            </div>
        );
    }
}
