import {BSON} from 'realm';

function createEnum(arr) {
  arr.forEach((p, i) => (arr[p] = i));
  return arr;
}
// Priority.High === 1
// Priority[Priority.High] === "High"
export const Priority = createEnum(['%0', '%25', '%50', '%100']);

export class Item {
  constructor({
    _id = new BSON.ObjectId(),
    isComplete = false,
    owner_id,
    priority = null, // Default to High priority if none is specified : Priority.High
  }) {
    this.isComplete = isComplete;
    this._id = _id;
    this.owner_id = owner_id;
    this.priority = priority;
  }
  static schema = {
    name: 'Item',
    properties: {
      _id: 'objectId',
      isComplete: {type: 'bool', default: false},
      summary: 'string',
      owner_id: 'string',
      priority: {
        // Store the index value of the Priority enum rather than the name
        type: 'int',
        default: Priority.High,
      },
    },
    primaryKey: '_id',
  };
}
