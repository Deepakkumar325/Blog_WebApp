const router = require('express').Router();
const dotenv = require("dotenv");
dotenv.config();
const File = require('../model/file')
const multer = require('multer')
const upload = multer({ dest: "uploads" });

const bcrypt = require("bcrypt");

router.get('/fileshare',(req,res)=>{
    res.render('filesharing',{ title: 'FileShare' })
})

router.post("/upload", upload.single("file"), async (req, res) => {
    const fileData = {
        path: req.file.path,
        originalName: req.file.originalname,
    };
    if ((req.body.password != null) && (req.body.password !== "")) {
        fileData.password = await bcrypt.hash(req.body.password, 10);
    }

    const file = await File.create(fileData);

    res.render("filesharing", { fileLink: `${req.headers.origin}/file/${file.id}` });
});



async function handleDownload(req, res) {
    const file = await File.findById(req.params.id);

    if (file.password != null) {
        if (req.body.password == null) {
            res.render("password");
            return;
        }

        if (!(await bcrypt.compare(req.body.password, file.password))) {
            res.render("password", { error: true,title:"Download File" });
            return;
        }
    }


    ++file.downloadCount;
    await file.save();

    res.download(file.path, file.originalName);
}

router.route("/file/:id").get(handleDownload).post(handleDownload);



module.exports = router;