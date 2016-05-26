import React from 'react';
import { Col, Row } from 'react-bootstrap';
import TrelloSubject from './TrelloSubjectDetail.jsx';
import MembersList from '../../members/components/MembersList.jsx';
import SubjectMemberForm from './ShareToMember.jsx';

class SubjectDetail extends React.Component {
  renderServiceSubject() {
    switch (this.props.service) {
      case 'trello':
        return <TrelloSubject {...this.props} />;
      default:
        return <h3>Not Found</h3>;
    }
  }

  render() {
    const { subject, loading, members, service,
      findMember, shareSubjectToMember, unshareSubjectFromMember } = this.props;
    if (loading) {
      return <h5>Loading ...</h5>;
    }
    if (!subject) {
      return <h3>Not Found</h3>;
    }

    return (
      <Col lg={12}>
        <div>
          <h4>{subject.name}</h4>
          <hr />
          <div>
            <h5>Subject Data</h5>
            {this.renderServiceSubject()}
          </div>
          <div>
            <h5>Members List</h5>
            <hr />
            <SubjectMemberForm
              service={service}
              findMember={findMember}
              subject={subject}
              shareSubjectToMember={shareSubjectToMember}
            />
            <MembersList
              members={members}
              service={service}
              subject={subject}
              unshareSubjectFromMember={unshareSubjectFromMember}
            />
          </div>
        </div>
      </Col>
    );
  }
}

SubjectDetail.propTypes = {
  service: React.PropTypes.string,
  subject: React.PropTypes.object,
  members: React.PropTypes.array,
  loading: React.PropTypes.bool,
  shareSubjectToMember: React.PropTypes.func,
  unshareSubjectFromMember: React.PropTypes.func,
};

export default SubjectDetail;
