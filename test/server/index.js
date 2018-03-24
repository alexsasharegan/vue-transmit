const http = require("http");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const express = require("express");
const crypto = require("crypto");

const pkg_assets = {
  vue: path.join(__dirname, "../node_modules/vue/dist/"),
  bootstrap: path.join(__dirname, "../node_modules/bootstrap/dist/css/"),
  bootstrap_vue: path.join(__dirname, "../node_modules/bootstrap-vue/dist/"),
  vue_transmit: path.join(__dirname, "../../dist/"),
  vue_flex: path.join(__dirname, "../node_modules/vue-flex/dist/"),
};
const tmp_dir = path.join(__dirname, "../tmp/");

const app = express();
const server = http.createServer(app);

const storage_engine = multer.diskStorage({
  destination: tmp_dir,
});

const uploader = multer({ storage: storage_engine });
const upload_single = uploader.single("file");
const upload_multiple = uploader.array("file");

app.post("/api/upload/single", upload_single, async (req, res) => {
  const file = req.file;
  file.extension = file.originalname.slice(file.originalname.lastIndexOf("."));
  const shasum = crypto.createHash("sha1");
  const rx = fs.createReadStream(req.file.path);

  rx.on("data", bytes => shasum.update(bytes));
  const hash = await new Promise(resolve =>
    rx.on("end", () => {
      resolve(shasum.digest("hex"));
    })
  );

  const ok = await new Promise(resolve =>
    fs.rename(req.file.path, path.join(tmp_dir, hash + file.extension), err =>
      resolve(!err)
    )
  );

  if (!ok) {
    res.status(400);
    res.end();
    return;
  }

  file.filename = hash + file.extension;

  res.json({ file });
});

app.post("/api/upload/multiple", upload_multiple, async (req, res) => {
  const ps = req.files.map(async file => {
    file.extension = file.originalname.slice(
      file.originalname.lastIndexOf(".")
    );

    const shasum = crypto.createHash("sha1");
    const rx = fs.createReadStream(file.path);

    rx.on("data", bytes => shasum.update(bytes));
    const hash = await new Promise(resolve =>
      rx.on("end", () => {
        resolve(shasum.digest("hex"));
      })
    );

    file.success = await new Promise(resolve =>
      fs.rename(file.path, path.join(tmp_dir, hash + file.extension), err =>
        resolve(!err)
      )
    );

    if (file.success) {
      file.filename = hash + file.extension;
    }

    return file;
  });

  const files = await Promise.all(ps);

  if (!files.every(f => f.success)) {
    res.status(400);
    res.json({ files });
    res.end();
    return;
  }

  res.json({ files });
});

app.use("/", express.static(path.join(__dirname, "../public/")));
app.use(
  "/assets",
  express.static(pkg_assets.vue),
  express.static(pkg_assets.bootstrap),
  express.static(pkg_assets.bootstrap_vue),
  express.static(pkg_assets.vue_flex),
  express.static(pkg_assets.vue_transmit)
);

server.listen(
  {
    host: "127.0.0.1",
    port: 3124,
  },
  () => {
    let { address, family, port } = server.address();
    console.info(`Listening on http://${address}:${port} [${family}]`);
  }
);
