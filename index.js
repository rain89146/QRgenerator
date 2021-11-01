import GenerateQr from './qrgenerator.js';
import UrlGenerator from './urlgenerator.js';

const group1 = [
    {
        base: 'https://www.aliantegaming.com/gather',
        code: 'AL',
        campin: 'AL_5109'
    },
    // {
    //     base: 'https://www.ameristarkansascity.com/gather',
    //     code: 'AK',
    //     campin: 'AK_5110'
    // },
    // {
    //     base: 'https://www.ameristarstcharles.com/gather',
    //     code: 'AS',
    //     campin: 'AS_5111'
    // },
    // {
    //     base: 'https://www.belterracasino.com/gather',
    //     code: 'BR',
    //     campin: 'BR_5112'
    // },
    // {
    //     base: 'https://www.belterrapark.com/gather',
    //     code: 'BP',
    //     campin: 'BP_5113'
    // },
    // {
    //     base: 'https://www.bluechipcasino.com/meet',
    //     code: 'BC',
    //     campin: 'BC_5114'
    // },
    // {
    //     base: 'https://www.boydgaming.com/meet',
    //     code: 'BYD',
    //     campin: 'BYD_5115'
    // },
    // {
    //     base: 'https://www.thecal.com/meet',
    //     code: 'CA',
    //     campin: 'CA_5116'
    // },
    // {
    //     base: 'https://www.cannerycasino.com/banquets',
    //     code: 'CN',
    //     campin: 'CN_5117'
    // },
    // {
    //     base: 'https://www.diamondjodubuque.com/meet',
    //     code: 'DL',
    //     campin: 'DL_5118'
    // },
    // {
    //     base: 'https://www.diamondjoworth.com/meet',
    //     code: 'DW',
    //     campin: 'DW_5119'
    // },
    // {
    //     base: 'https://www.evangelinedowns.com/meet',
    //     code: 'ED',
    //     campin: 'ED_5120'
    // },
    // {
    //     base: 'https://www.fremontcasino.com/meet',
    //     code: 'FR',
    //     campin: 'FR_5121'
    // },
    // {
    //     base: 'https://www.goldcoastcasino.com/meet',
    //     code: 'GC',
    //     campin: 'GC_5122'
    // },
    // {
    //     base: 'https://www.ipbiloxi.com/meet',
    //     code: 'IP',
    //     campin: 'IP_5123'
    // },
    // {
    //     base: 'https://www.kansasstarcasino.com/meet',
    //     code: 'KS',
    //     campin: 'KS_5124'
    // },
    // {
    //     base: 'https://www.mainstreetcasino.com/meet',
    //     code: 'MS',
    //     campin: 'MS_5125'
    // },
    // {
    //     base: 'https://www.paradicecasino.com/meet',
    //     code: 'PD',
    //     campin: 'PD_5126'
    // },
    // {
    //     base: 'https://www.samstownlv.com/meet',
    //     code: 'ST',
    //     campin: 'ST_5127'
    // },
    // {
    //     base: 'https://www.samstowntunica.com/meet',
    //     code: 'TU',
    //     campin: 'TU_5128'
    // },
    // {
    //     base: 'https://www.samstownshreveport.com/meet',
    //     code: 'SH',
    //     campin: 'SH_5129'
    // },
    // {
    //     base: 'https://www.suncoastcasino.com/meet',
    //     code: 'SC',
    //     campin: 'SC_5130'
    // },
    // {
    //     base: 'https://www.orleanscasino.com/meet',
    //     code: 'TO',
    //     campin: 'TO_5131'
    // },
    // {
    //     base: 'https://www.vfcasino.com/gather',
    //     code: 'VF',
    //     campin: 'VF_5132'
    // },
]

//
const container = $("#qr_holder");

// await promise_async().then(res=>{
//     console.log(res);
// })

function promise_async () {

    return new Promise((res, rej) =>{

        var qrcode = new QRCode("qr_holder", {
            width: 1000,
            height: 1000,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
        
        qrcode.clear(); // clear the code.
        qrcode.makeCode("https://www.aliantegaming.com/gather?utm_source=Print%20Collateral&utm_medium=QR%20Code&utm_campaign=AL_5109&utm_content=gather&utm_propertycode=AL"); // make another code.
        
        setTimeout(() => {
           let src = $(container.find('img')[0]).prop('src');
           res(src);
        }, 500);
    })
}

group1.forEach(async (el,i) => {
    await download_qr({ base: el.base, code: el.code, campin: el.campin, i});
})

//  download qr
async function download_qr({
    base, 
    code, 
    campin, 
    i
}) {

    let timeout = 1000 + (i * 500);

    setTimeout(async () => {

        const id = `qr${i}`;
        const div = $(`<div id="${id}" style="display:none"></div>`);
        container.append(div);

        const url = new UrlGenerator({
            baseurl: base,
            campin: campin,
            property: code,
            traffic: 'Print Collateral',
            medium: 'QR Code',
            keyword: "",
            content: "gather",
            brand: "MSR"
        });
        
        let campain_id = campin.split('_')[1];

        const gq = new GenerateQr({
            name: `${code.toUpperCase()}_QR_${campain_id}_SalesCatering`,
            data: url.true_url(), 
            size: "1000x1000", 
            format:"png"
        });

        const file = await gq.createQr(base,id);

        const anchor_id = `qr${i}_tag`;
        gq.downloadQr(file, anchor_id, container);

        $(`#${id}`).remove();
        $(`#${anchor_id}`).remove();
        
        container.append(`<div>${url.ogurl()}</div>`);
        container.append(`<div>${url.tracking()}</div>`);

    }, timeout);
}