import axios from "axios";

export default async function(config: Config){
    console.log("Busting github cdn cache");

    const urls = [
        "https://camo.githubusercontent.com/87a6cd953578ae234d42264582a108ca79662aab5224aa586d884a2d1aa41249/68747470733a2f2f66756c6c737461636b65642e6f72672f6261646765732f76657273696f6e2e737667",
        "https://camo.githubusercontent.com/8e7cbb0a8559cac9e4b56252864888ce16f8ef1175493dd42d472f75d38344c4/68747470733a2f2f66756c6c737461636b65642e6f72672f6261646765732f646570656e64656e636965732e737667",
        "https://camo.githubusercontent.com/c0d811a0c81fd1e83ed8bdcce7d0e38c981d3571ec7ec2594d14c2a275d9e49a/68747470733a2f2f66756c6c737461636b65642e6f72672f6261646765732f646570656e64656e636965732f616c6c2e737667",
        "https://camo.githubusercontent.com/6af6a290370f3557e86bfcc0ac68814db47d7b9d3d6e9ee0a5b5dc819d6d0ece/68747470733a2f2f66756c6c737461636b65642e6f72672f6261646765732f636f7665726167652e737667",
    ]
    await Promise.all(urls.map(url => axios.request({
        url: url,
        method: "PURGE"
    })));
}
