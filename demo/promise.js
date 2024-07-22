let p1 = Promise.resolve();
let p2 = Promise.reject().then(
  (data) => data,
  (error) => error
);

Promise.all([p1, p2]).then(
  (data) => console.log('成功'),
  (error) => console.log('失败')
);
