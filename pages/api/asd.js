import sharp from "sharp";
import busboy from "busboy";

export default (req,res)=>{
    // console.log(req.headers)
    const bb = busboy({headers: req.headers});
    bb.on('file', (name, file, info) => {
        const { filename, encoding, mimeType } = info;
        console.log(
          `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
          filename,
          encoding,
          mimeType
        );
        file.on('data', (data) => {
          console.log(`File [${name}] got ${data.length} bytes`);
        }).on('close', () => {
          console.log(`File [${name}] done`);
        });
      });
      bb.on('field', (name, val, info) => {
        console.log(`Field [${name}]: value: %j`, val);
      });
      bb.on('close', () => {
        console.log('Done parsing form!');
        res.writeHead(303, { Connection: 'close', Location: '/' });
        res.end();
      });
    req.pipe(bb);
    // const myForm = new FormData(req.body);
    // console.log(myForm);
    // console.log(typeof req.body)
    // const a = req.body;
    // console.log(a);
    // sharp(a.imageblobs[0]).composite([{input: a.imageblobs[1]}]).toFile('asd.png')
    res.send({message : "hi"});
    console.log('end');
}