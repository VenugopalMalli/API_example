const weatherApiKey = "90fa420c69fe44c9c33a128df4eb0f85";
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`;

const products = [
    {
      title: "AstroFiction",
      author: "John Doe",
      price: 49.9,
      image: "./assets/products/img6.png"
    },
    {
      title: "Space Odissey",
      author: "Marie Anne",
      price: 35,
      image: "./assets/products/img1.png"
    },
    {
      title: "Doomed City",
      author: "Jason Cobert",
      price: 0,
      image: "./assets/products/img2.png"
    },
    {
      title: "Black Dog",
      author: "John Doe",
      price: 85.35,
      image: "./assets/products/img3.png"
    },
    {
      title: "My Little Robot",
      author: "Pedro Paulo",
      price: 0,
      image: "./assets/products/img5.png"
    },
    {
      title: "Garden Girl",
      author: "Ankit Patel",
      price: 45,
      image: "./assets/products/img4.png"
    }
  ];
const imageArr = [
    {
        src: "./assets/gallery/image1.jpg",
        alt: "Thumbnail Image 1"
    },
    {
        src: "./assets/gallery/image2.jpg",
        alt: "Thumbnail Image 2"
    },
    {
        src: "./assets/gallery/image3.jpg",
        alt: "Thumbnail Image 3"
    }
];
function menuHnadler(){
    document.querySelector("#open-nav-menu").addEventListener("click",function(){
        document.querySelector("header nav .wrapper").classList.add("nav-open");
    });
    
    document.querySelector("#close-nav-menu").addEventListener("click",function(){
        document.querySelector("header nav .wrapper").classList.remove("nav-open");
    });
};
function changeCtoF(temperature){
    let f = (temperature*(9/5))+32;
    return f.toFixed(1);
};
function greetingHandler(){
    let currHr = new Date().getHours();
if(currHr >=0 && currHr<12 ){
    const greetingText = "Good morning";
    document.querySelector("#greeting").innerHTML = greetingText;
}
else if(currHr >=12 && currHr<4){
    const greetingText = "Good AfterNoon";
    document.querySelector("#greeting").innerHTML = greetingText;
}else if(currHr >=4 && currHr<7){
    const greetingText = "Good Evening";
    document.querySelector("#greeting").innerHTML = greetingText;
}else{
    const greetingText = "Good night";
    document.querySelector("#greeting").innerHTML = greetingText;
}
};
function timeHandler(){
    setInterval(function(){
        let dateTime = new Date();
        document.querySelector("span[data-time=hours]").innerHTML = dateTime.getHours().toString().padStart(2,"0");
        document.querySelector("span[data-time=minutes]").innerHTML = dateTime.getMinutes().toString().padStart(2,"0");
        document.querySelector("span[data-time=seconds]").innerHTML = dateTime.getSeconds().toString().padStart(2,"0");
    },1000);
};
function thumbnailHandler(){
    let imgSel = document.querySelector("#gallery > img");
    imgSel.src = imageArr[0].src;
    imgSel.alt = imageArr[0].alt;
    
    let imageChose =document.querySelector("#gallery .thumbnails");
    
    imageArr.forEach(function(image,index){
        let thumb = document.createElement("img");
        thumb.src = imageArr[index].src;
        thumb.alt = imageArr[index].alt;
        thumb.dataset.arrayIndex = index;
        thumb.dataset.selected = (index===0 ? true: false);
    
        thumb.addEventListener("click",function(e){
            let clickImg = e.target.dataset.arrayIndex;
            imgSel.src = imageArr[clickImg].src;
            imgSel.alt = imageArr[clickImg].alt;
            imageChose.querySelectorAll("img").forEach(function(imag){
                imag.dataset.selected = false;
            });
            e.target.dataset.selected =true;
        });
        imageChose.appendChild(thumb);
    });
};
function popluteProd(prodList){
    let productSection = document.querySelector(".products-area");
    productSection.textContent="";
    prodList.forEach(function(product,index){
        let proElem = document.createElement("div");
        proElem.classList.add("product-item");

        let imgelem = document.createElement("img");
        imgelem.src = product.image;
        imgelem.alt =  "Image for " + product.title;

        let proDet = document.createElement("div");
        proDet.classList.add("product-details");

        let proTitle = document.createElement("h3");
        proTitle.classList.add("product-title");
        proTitle.textContent = product.title;
        

        let proAuthor = document.createElement("p");
        proAuthor.classList.add("product-author");
        proAuthor.textContent = product.author;


        let priceTitle = document.createElement("p");
        priceTitle.classList.add("price-title");
        priceTitle.textContent = "Price"
        
        
        let proPrice = document.createElement("p");
        proPrice.classList.add("product-price");
        proPrice.textContent = product.price>0 ? "$" + product.price.toFixed(2) : "Free";
        
        proDet.append(proTitle);
        proDet.append(priceTitle);
        proDet.append(proAuthor);
        proDet.append(priceTitle);
        proDet.append(proPrice);
        
        proElem.append(imgelem);
        proElem.append(proDet);
        productSection.append(proElem);

        
    })
};
function productHandler(){
    
    let freePro = products.filter(function(item){
        return !item.price || item.price<=0;
    })
    let paidPro = products.filter(function(item){
        return item.price>0;
    })
    popluteProd(products);

    let proLen = products.length;
    document.querySelector(".products-filter label[for=all] span.product-amount").textContent = proLen;
    document.querySelector(".products-filter label[for=paid] span.product-amount").textContent = paidPro.length;
    document.querySelector(".products-filter label[for=free] span.product-amount").textContent = freePro.length;

    let filterPro = document.querySelector(".products-filter");
    filterPro.addEventListener("click",function(e){
        let targetEle = e.target.id;
        if(targetEle==="all"){
            popluteProd(products);
        }
        else if(targetEle==="paid"){
            popluteProd(paidPro);
        }
        else if(targetEle==="free"){
            popluteProd(freePro);
        }
    });    

};
function footerHandler(){
    let curr = new Date().getFullYear();
    document.querySelector("footer").textContent = `c ${curr} - All rights reserved`;
};
function weatherHandler(){
    navigator.geolocation.getCurrentPosition(function(p){
        let posLat = p.coords.latitude;
        let poslon = p.coords.longitude;
        let url = weatherURL
            .replace("{lat}",posLat)
            .replace("{lon}",poslon)
            .replace("{API key}",weatherApiKey);
        fetch(url)
        .then(response => response.json())
        .then(data =>{
            const weatherCondition = data.weather[0].description;
            const userLocation = data.name;
            const temperature = data.main.temp;
            const FText = `The weather is ${weatherCondition} in ${userLocation}  and it's ${changeCtoF(temperature)}°F outside.`;
            const CText = `The weather is ${weatherCondition} in ${userLocation}  and it's ${temperature.toString()}°C outside.`;
            document.querySelector("p#weather").innerHTML = CText;
            document.querySelector(".weather-group").addEventListener("click",function(e){
                    let scale = e.target.id;
                    if(scale =="fahr"){
                        document.querySelector("p#weather").innerHTML = FText;
                    }
                    else{
                        document.querySelector("p#weather").innerHTML = CText;
                    }
    
                });
            }).catch(err =>{
                document.querySelector("p#weather").innerHTML = "Error has occured : Unable to retrive the info";
            })
        });
}


menuHnadler();
greetingHandler();
weatherHandler();
thumbnailHandler();
timeHandler();
productHandler();
footerHandler();