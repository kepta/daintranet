import React from 'react';
import { Modal, Button, ButtonGroup,Glyphicon, FormGroup, ControlLabel , FormControl} from 'react-bootstrap';
import Rating from 'react-rating';

export default class Mods extends React.Component {
  state= {
    rating: null,
    feedback: undefined,
  }

  changeRate = (arg) => {
    this.setState({
      rating: arg,
    });
  }

  changeFeedback = (e) => {
    this.setState({
      feedback:  e.target.value
    });
  }
  render() {
    const {showModal, hideModal} = this.props;
    return (
      <Modal
        show={showModal}
        onHide={() => {hideModal(this.state.rating, this.state.feedback)}}
        dialogClassName="custom-modal"
        >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">
            Hey tell us how daintranet is doing..
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Rating start={0} initialRate={this.state.rating} stop={5} onClick={this.changeRate} empty="glyphicon glyphicon-heart-empty" full="glyphicon glyphicon-heart"/>
            <FormGroup controlId="formControlsTextarea">
              <FormControl componentClass="textarea" value={this.state.feedback} placeholder="Suggestions" onChange={this.changeFeedback}/>
            </FormGroup>
      </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => hideModal(this.state.rating, this.state.feedback)}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
