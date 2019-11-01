module.exports = {
  input: `
    <form action="/create" method="get">
        <label for="">name</label>
        <input type="text" name="name" id="" />
        <input type="submit" value="create" />
      </form>
    `
  //   ,
  // input: () => {
  //   return `<form action="/create" method="get">
  //     <label for="">name</label>
  //     <input type="text" name="name" id="" />
  //     <input type="submit" value="create" />
  //   </form>`;
  // }
};
