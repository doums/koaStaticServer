"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _koa = _interopRequireDefault(require("koa"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var app = new _koa.default();

var dist = _path.default.join(__dirname, 'dist');

var validRoutes;

_fs.default.readdir(dist, function (err, files) {
  if (err) return console.log('Unable to scan directory: ' + err);
  validRoutes = files;
});

function isRouteValid(url) {
  if (!validRoutes || !url) return false;
  return validRoutes.find(function (route) {
    return url.slice(1) === route;
  });
}

app.use(
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(ctx, next) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!isRouteValid(ctx.url)) ctx.path = 'index.html';
            _context.next = 3;
            return next();

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.use((0, _koaStatic.default)(dist));
app.listen(3010);
