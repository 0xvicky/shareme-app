export const userQuery = userId => {
  const userInfo = `*[_type== "user" && _id=='${userId}']`;
  return userInfo;
};

export const searchQuery = searchTerm => {
  const categoryInfo = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
  image{
    asset->{url}
  },
  _id,
  destination,
  postedBy->{
_id,
username,
image
  },
save[]{
_key,
postedBy->{
  _id,
  username,
  image
   },
  },
  }`;
  return categoryInfo;
};

export const feedQuery = `*[_type == "pin"] | order(_createAt desc){
  image{
    asset->{url}
  },
  _id,
  destination,
  postedBy->{
_id,
username,
image
  },
save[]{
_key,
postedBy->{
  _id,
  username,
  image
   },
  },
}`;
