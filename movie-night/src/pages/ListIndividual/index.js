import React from 'react';
import { connect } from 'react-redux';
import { fetchList } from '../../actions';

export class ListIndividual extends React.Component {
  componentDidMount() {
    this.props.fetchList(this.props.match.params.id);
  }

  render() {
    if (!this.props.list) {
      return <div>Loading...</div>
    }

    const { title } = this.props.list;

    return (
      <div>
        <h2>{title}</h2>
      </div>
    );
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    list: state.list[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps, { fetchList })(ListIndividual);
