const http = require('http'), fs = require('fs'), path = require('path'), os = require('os');
const root = __dirname, port = process.env.PORT || 8123;
const mime = {'.html':'text/html; charset=utf-8', '.js':'text/javascript', '.json':'application/manifest+json', '.webmanifest':'application/manifest+json', '.png':'image/png', '.svg':'image/svg+xml', '.css':'text/css'};
http.createServer(function (req, res) {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const f = path.join(root, p);
  if (!f.startsWith(root + path.sep)) { res.writeHead(403); res.end(); return; }
  fs.readFile(f, function (e, d) {
    if (e) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, {'Content-Type': mime[path.extname(f).toLowerCase()] || 'application/octet-stream'});
    res.end(d);
  });
}).listen(port, function () {
  console.log('========================================');
  console.log('  FuncLab 服务已启动');
  console.log('  本机访问:  http://localhost:' + port);
  const ni = os.networkInterfaces();
  Object.keys(ni).forEach(function (k) { ni[k].forEach(function (a) { if (a.family === 'IPv4' && !a.internal) console.log('  手机访问:  http://' + a.address + ':' + port); }); });
  console.log('  按 Ctrl+C 停止');
  console.log('========================================');
});
