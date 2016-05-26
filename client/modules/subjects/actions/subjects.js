export default {
  shareSubjectToMember({ Meteor, Bert }, serviceName, subjectKey, memberKey) {
    Meteor.call('services.shareSubjectToMember', serviceName, subjectKey, memberKey, (err) => {
      if (err) {
        Bert.alert({ title: 'Error', message: err.message, type: 'danger' });
      } else {
        Bert.alert({ title: 'Success', message: 'Subject shared to member', type: 'success' });
      }
    });
  },

  unshareSubjectFromMember({ Meteor, Bert}, serviceName, subjectKey, memberKey) {
    Meteor.call('services.unshareSubjectFromMember', serviceName, subjectKey, memberKey, (err) => {
      if (err) {
        Bert.alert({ title: 'Error', message: err.message, type: 'danger' });
      } else {
        Bert.alert({ title: 'Success', message: 'Subject unshared from member', type: 'success' });
      }
    });
  },
};
