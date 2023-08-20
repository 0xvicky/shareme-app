export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  liveEdit: true,
  fields: [
    {
      name: 'comment',
      title: 'Comment',
      type: 'string',
    },
    {
      name: 'postedBy',
      title: 'PostedBy',
      type: 'postedBy',
    },
  ],
}
