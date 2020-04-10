const generateComment = () => {
  return {
    commentText: [`Interesting setting and a good cast`, `Booooooooooring`, `Very very old. Meh`, `Almost two hours? Seriously?`],
    commentAuthor: [`Tim Macoveev`, `John Doe`, `John Doe`, `John Doe`],
    commentEmoji: [`smile`, `sleeping`, `puke`, `angry`],
    commentDay: [`2019/12/31 23:59`, `2 days ago`, `2 days ago`, `Today`]
  };
};

// const generateComment = () => {
//   return [{
//     commentText: `Interesting setting and a good cast`,
//     commentAuthor: `Tim Macoveev`,
//     commentEmoji: `smile`,
//     commentDay: `2019/12/31 23:59`
//   }, {
//     commentText: `Booooooooooring`,
//     commentAuthor: `John Doe`,
//     commentEmoji: `sleeping`,
//     commentDay: `2 days ago`
//   }];
// };

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComment, generateComments};
