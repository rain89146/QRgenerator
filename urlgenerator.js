export default function UrlGenerator({
    baseurl,
    campin,
    traffic,
    medium,
    content,
    property,
    brand
}) {

    const true_url = () => {
        const arr = [
            `utm_source=${traffic}`,
            `utm_medium=${medium}`,
            `utm_campaign=${campin}`,
            `utm_content=${content}`,
            `utm_propertycode=${property}`, 
            `utm_brand=${brand}`
        ];
        let query_param = arr.join('&');
        return `${baseurl}?${encodeURI(query_param)}`;
    }
    
    const tracking = () => {
        const arr = [
            `utm_source=${traffic}`,
            `utm_medium=${medium}`,
            `utm_campaign=${campin}`,
            `utm_content=${content}`,
            `utm_propertycode=${property}`, 
            `utm_brand=${brand}`
        ];
        let query_param = arr.join('&');
        return encodeURI(query_param);
    }

    const ogurl = () => `${baseurl}`;

    this.ogurl = ogurl;
    this.tracking = tracking;
    this.true_url = true_url;
}