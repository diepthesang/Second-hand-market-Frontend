// // var NodeGeocoder = require('node-geocoder');

// // var options = {
// //     provider: 'google',
// //     httpAdapter: 'https', // Default
// //     apiKey: 'AIzaSyAO-MwD8CBsNKWMgNpfwQeJCo-qLJkjGuc', // for Mapquest, OpenCage, Google Premier
// //     formatter: 'json' // 'gpx', 'string', ...
// // };

// // var geocoder = NodeGeocoder(options);

// // geocoder.reverse({ lat: 28.5967439, lon: 77.3285038 }, function (err, res) {
// //     console.log('geocoder :::: ');
// //     console.log(res);
// // });



// function getAddress (latitude, longitude) {
//     return new Promise(function (resolve, reject) {
//         var request = new XMLHttpRequest();

//         var method = 'GET';
//         var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';
//         var async = true;

//         request.open(method, url, async);
//         request.onreadystatechange = function () {
//             if (request.readyState == 4) {
//                 if (request.status == 200) {
//                     var data = JSON.parse(request.responseText);
//                     var address = data.results[0];
//                     resolve(address);
//                 }
//                 else {
//                     reject(request.status);
//                 }
//             }
//         };
//         request.send();
//     });
// };

// getAddress(16.0001951,108.2192487)

import Cookies from 'js-cookie';



console.log(Cookies.get('access_token'))