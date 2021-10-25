import CardioModal from './cardio-modal.component';

const MoreInfoModal = props => (
<div className="modal fade" id="moreInfoModal" tabIndex="-1" aria-labelledby="moreInfoModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="moreInfoModalLabel">Additional Information</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <CardioModal exercise={props.exercise}/>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
);

export default MoreInfoModal;