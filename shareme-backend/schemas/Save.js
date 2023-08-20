export default {
  name: 'save',
  title: 'Save',
  type: 'document',
  liveEdit: true,
  fields: [
    {
      name: 'userId',
      title: 'UserId',
      type: 'string',
    },
    {
      name: 'postedBy',
      title: 'PostedBy',
      type: 'postedBy',
    },
  ],
}
