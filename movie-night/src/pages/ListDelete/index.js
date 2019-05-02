import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchList, deleteList } from '../../actions';
import history from '../../history';
import Modal from '../../components/Modal'

export class ListDelete extends React.Component {
  componentDidMount() {
    this.props.fetchList(this.props.match.params.id)
  }

  renderContent() {
    if (!this.props.list) {
      return 'Are you sure you want to delete this list?'
    }

    return `Are you sure you want to delete this list: ${this.props.list.title}?`
  }

  renderActions() {
    const { id } = this.props.match.params

    return(
      <div>
        <button onClick={() => this.props.deleteList(id)} className="ui button negative">
          Delete
        </button>
        <Link to="/" className="ui button">Cancel</Link>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Modal
          title="Delete List"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push('/')}
        />
      </div>
    );
  };
};

const mapStateToProps = (state, ownProps) => {
  return { list: state.list[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchList, deleteList })(ListDelete);
