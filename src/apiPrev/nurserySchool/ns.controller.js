const xlsx = require('xlsx');
const multiparty = require('multiparty');
const { store } = require('./ns.repository');

exports.post = async ( req, res ) => {

    console.log("요청 옴!!");

    const excel = {};
    let result = false;
    const form = new multiparty.Form({
        autoFiles: true,
    });

    form.on('file', (name, file) => {
        const contentType = file.headers['content-type'];
        console.log(contentType);

        if(contentType === "text/xml" || contentType === "application/vnd.ms-excel"){
            const workbook = xlsx.readFile(file.path);
            const sheetnames = Object.keys(workbook.Sheets);
            let i = sheetnames.length;
            while (i--) {
                const sheetname = sheetnames[i];
                console.log(sheetname);
                excel.data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetname]);
            }
            result = true;
        }else {
            result = false;
        }
        
    });
    
    form.on('close', async ( ) => {
        console.log(result);
        if(!result) return res.status(200).json({ 
            message : "xml 파일형식이 아닙니다." , 
            data : []
        });
        const { success, message, data, error } = await store( excel.data );
        success === true ? 
        res.status(200).json({ message , data }) : 
        res.status(500).json({ message , error });
    });

    form.parse(req);
}