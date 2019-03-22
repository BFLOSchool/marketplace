var url = "http://localhost:5000/";

if (window.location.hostname === "localhost") {
  url = "http://localhost:5000/";
}

if (window.location.hostname === "marketplace.bfloschool.com") {
  url = "https://api-marketplace.bfloschool.com/";
}

export default url;
