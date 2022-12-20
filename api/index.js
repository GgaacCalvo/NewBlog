//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// ASD
// Syncing all the models at once.
// conn.sync({ force: false }).then(() => {
//   server.listen(process.env.PORT, () => {
//     console.log('%s listening at 3001'); // eslint-disable-line no-console
//   });
// });
/*
.then(() => {
  dietTypes.map(e => DietType.create({ name: e }));
});
const dietTypes = ['gluten free', 'ketogenic', 'vegetarian', 'lacto vegetarian','ovo vegetarian', 'lacto ovo vegetarian', 'vegan', 'pescetarian', 'paleolithic', 'primal', 'low fodmap', 'whole 30', 'dairy free'];
*/
conn.sync({ force: false }).then(() => {
    server.listen(process.env.PORT || 3001, () => {
      console.log("%s listening at 3001"); // eslint-disable-line no-console
    });
  });