import './node_modules/jquery/dist/jquery.js';

export default function GenerateQr({
    name, data, size, format
}) {
    
    //
    const baseurl = `https://api.qrserver.com/v1/create-qr-code/`;

    //
    const generate = async () => {
        try {
                
            const param = to_query_param();
            const url = `${baseurl}?${param}`;
            
            let res = false;

            await parse(url).then(resp => {
                const {status} = resp;
                res = (status == 200) ? resp : false
            });
            
            return res;

        } catch (error) {

            return false;   
        }
    }

    //
    const createQr = async (ogurl, container) => {
        const param = to_query_param();
        const url = `${ogurl}?${param}`; 

        let file = "";
        await parse_promise(url, container).then(res=>{
            file = res;
        })
        return file;
    }

    const downloadQr = (file, anchor_id, container) => {
        const anchor = document.createElement('a');
        anchor.setAttribute('href', URL.createObjectURL(file));
        anchor.setAttribute('download', file.name);
        anchor.setAttribute('id', anchor_id);
        anchor.style.display = 'none';
        container.append(anchor);
        anchor.click();
    }

    const parse_promise = async (url, container) => {
        return new Promise((res, rej)=> {

            var qrcode = new QRCode(container, {
                width: 1000,
                height: 1000,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.M
            });

            qrcode.makeCode(url);
    
            setTimeout(() => {
                const con = $(`#${container}`);
                const dataurl = $(con.find('img')[0]).prop('src');
                const file = dataUrlToFile(dataurl, `${name}.png`);
                res(file);
            }, 500);
        })
    }

    //
    const parse = async (url) => {
        try {            
            return await axios.get(url);
        } catch (error) {
            return false;
        }
    }

    //
    const dataUrlToFile = (dataurl, filename) => {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], name, {type:mime});
    }

    //
    const qrUrl = () => {
        const param = to_query_param();
        const url = `${baseurl}?${param}`;
        return url;
    }

    const to_query_param = () => {
        const arr = [`data=${data}`, `size=${size}`, `format=${format}`];
        return arr.join('&');
    }
    
    this.downloadQr = downloadQr;
    this.createQr = createQr;
    this.generate = generate;
    this.qrUrl = qrUrl;
    this.dataUrlToFile = dataUrlToFile;
}