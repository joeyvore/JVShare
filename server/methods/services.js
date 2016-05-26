import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Subjects, Members } from '/imports/collections';

export default () => {
  Meteor.methods({
    'services.syncService'(serviceName) {
      check(serviceName, String);
      let result;

      switch (serviceName) {
        case 'trello':
          result = Meteor.call('trello.getServiceData');
          break;
        default:
          break;
      }

      if (result) {
        if (result.subjects) {
          result.subjects.forEach((sub) => {
            Subjects.upsert({
              subjectKey: sub.subjectKey,
              owner: this.userId,
              service: serviceName,
            }, { $set: sub });
          });
        }
        if (result.members) {
          result.members.forEach((mem) => {
            Members.upsert({
              memberKey: mem.memberKey,
              owner: this.userId,
              service: serviceName,
            }, { $set: mem });
          });
        }
      }
    },
    'services.removeService'(serviceName) {
      check(serviceName, String);
      const unsetService = `services.${serviceName}`;
      Subjects.remove({ owner: this.userId, service: serviceName });
      Members.remove({ owner: this.userId, service: serviceName });
      Meteor.users.update(this.userId, {
        $pull: { mergedServices: serviceName },
        $unset: { [unsetService]: '' },
      });
    },
    'services.shareSubject'(serviceName, subjectKey, memberKey) {
      check(serviceName, String);
      check(subjectKey, String);
      check(memberKey, String);
      let result;

      switch (serviceName) {
        case 'trello':
          result = Meteor.call('trello.addBoardMember', subjectKey, memberKey);
          break;
        default:
          break;
      }

      if (result) {
        Subjects.update({ subjectKey, owner: this.userId, service: serviceName }, {
          $addToSet: { memberKeys: memberKey },
        });
        Members.update({ memberKey, owner: this.userId, service: serviceName }, {
          $addToSet: { subjectKeys: subjectKey },
        });
      }
    },
    'services.unshareSubject'(serviceName, subjectKey, memberKey) {
      check(serviceName, String);
      check(subjectKey, String);
      check(memberKey, String);
      let result;

      switch (serviceName) {
        case 'trello':
          result = Meteor.call('trello.removeBoardMember', subjectKey, memberKey);
          break;
        default:
          break;
      }

      if (result) {
        Subjects.update({ subjectKey, owner: this.userId, service: serviceName }, {
          $pull: { memberKeys: memberKey },
        });
        Members.update({ memberKey, owner: this.userId, service: serviceName }, {
          $pull: { subjectKeys: subjectKey },
        });
      }
    },
  });
};
