
var map = L.map(document.getElementById('map'), {center: [41.2092156,-8.6669465],zoom: 12, zoomControl: false});
    
    
    //Coordenadas Mouse - 1º Passo
    var coordDIV = document.createElement('div');
    coordDIV.id = 'mapCoordDIV';
    coordDIV.style.position = 'absolute';
    coordDIV.style.bottom = '1px';
    coordDIV.style.left = '150px';
    coordDIV.style.zIndex = '900';
    coordDIV.style.color = '#404040';
    coordDIV.style.fontFamily = 'Arial';
    coordDIV.style.fontSize = '10pt';
    coordDIV.style.backgroundColor = '#FFFFFF';
    coordDIV.style.opacity='0.6';


    document.getElementById('map').appendChild(coordDIV);

    // Coordenadas Mouse - 2º Passo
    map.on('mousemove', function(e){
        var lat = e.latlng.lat.toFixed(5);
        var lon = e.latlng.lng.toFixed(5);
        document.getElementById('mapCoordDIV').innerHTML = 'Coordinates: ' + lat + ' , ' + lon;
        });



    // Base Map
    var Imaginary= L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{ attribution:'<a href="https://www.esri.com/en-us/home">©ESRI</a> Imaginary' }
        ).addTo(map);
    var openstreetmap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution:'<a href="https://www.openstreetmap.org/#map=17/-21.00148/-44.99806">©OpenStreetMap</a> Contributors'});

    //Marcador
    //CMM
    var myDataPoint = L.marker([41.18352209127619, -8.682948346516875]).addTo(map);
    myDataPoint.bindPopup("<h3>Câmara Municipal de Matosinhos</h3><img src='./img/CMM.png'width='230'height='50' <br> <p>Av. Dom Afonso Henriques, 4454-510 Matosinhos - Porto, Portugal</p> 41.18350594, -8.682862515");

    //Geojson

    //Município de Matosinhos
    var municipio = L.geoJSON(CMM,{
        color:'#F6E3CE',
        weight: 1.5,
    onEachFeature: function (feature, layer) { 
        let freg = feature.properties.Freguesia;
        console.log(feature);
        let type = feature.geometry.type
        let coord = feature.geometry.coordinates
        layer.bindPopup('<h2>União de Freguesias: <h3>'+ freg + '</h3><h4>Município: Matosínhos</h4>')
    }})
    .addTo(map);

    //Alojamentos Locais
    var stylePoint = {
        radius: 5,
        fillColor: "#0489B1",
        color: "#FFFFFF",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    var Alojamento = L.geoJSON(AlojamentoL,{
        onEachFeature: function (feature, layer) { 
            let dom = feature.properties.Denominaca;
            let mod = feature.properties.Modalidade;
            let utent = feature.properties.NrUtentes;
            let end = feature.properties.Endereco;
            let post = feature.properties.CodigoPost;
            let type = feature.geometry.type
            let coord = feature.geometry.coordinates
            layer.bindPopup('<h2><img src="./img/AL.png"width="40"height="40"> &nbsp;ALOJAMENTO LOCAL </h2><p><strong>Denominação</strong>: ' + dom + '</p> <p><strong>Modalidade</strong>: ' + mod + '</p> <p><strong>Nº Utentes</strong>: ' + utent + '</p><p><strong>Endereço</strong>:  ' + end + ' </p> <p><strong>CTT</strong>: ' + post + '</p> <p><strong>Lat/Long</strong>: &nbsp;'+ coord +'</p> <p><strong>Fonte</strong>: Sistema de Informação Geográfica do Turismo - SIGTUR 2020</p>');
        },
        pointToLayer: function (feature, latlng){
            return L.circleMarker(latlng, stylePoint);
        },
    })
    .addTo(map);

    //Mapa de Calor - Alojamento Local

    var mcalorAL = L.esri.Heat.featureLayer({
        url: 'https://services5.arcgis.com/AMh9EzyFGgthLT1q/ArcGIS/rest/services/Estabelecimentos_de_AL_MATOSI/FeatureServer/0',
        radius: 50
    });
    mcalorAL.addTo(map);

    //Agências de Turísmo e Viagem
    var redpoint = {
        radius: 5,
        fillColor: "red",
        color: "#FFFFFF",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    var Agencia = L.geoJSON(Agencias,{
        onEachFeature: function (feature, layer) { 
            let dom = feature.properties.Denominaca;
            let end = feature.properties.Endereco;
            let post = feature.properties.CodigoPost;
            let selo = feature.properties.SeloCleanS;
            let type = feature.geometry.type
            let coord = feature.geometry.coordinates
            layer.bindPopup('<h2>Agências de Turismo e Viagem</h2><p><strong>Denominação</strong>: ' + dom + '</p> <p><strong>Endereço</strong>: ' + end + '</p> <p><strong>CTT</strong>: ' + post + '</p><p><strong>Selo <i>Clean & Safe</i></strong>:  ' + selo + ' </p> <p><strong>Lat/Long</strong>: &nbsp;'+ coord +'</p> <p><strong>Fonte</strong>: Sistema de Informação Geográfica do Turismo - SIGTUR 2020</p>');
        },
        pointToLayer: function (feature, latlng){
            return L.circleMarker(latlng, redpoint);
        },
    })
    .addTo(map);

    //Hoteis
    var yellowpoint = {
        radius: 5,
        fillColor: "#FFFF00",
        color: "#FFFFFF",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    var ET = L.geoJSON(hoteis,{
        onEachFeature: function (feature, layer) { 
            let tip = feature.properties.TipologiaE;
            let nome = feature.properties.Denominaca;
            let morad = feature.properties.Endereco;
            let cod = feature.properties.CodigoPost;
            let quarto = feature.properties.NrQuartos;
            let sclean = feature.properties.SeloCleanS;
            let xy = feature.properties.LatLong;
            let type = feature.geometry.type;
            let coord = feature.geometry.coordinates;
            layer.bindPopup('<h1>' + tip + ' <i class="fas fa-concierge-bell"></i></h1><p><strong>Denominação:</strong> ' + nome + '</p><p><strong>Endereço:</strong> ' + morad + '</p><p><strong>CTT</strong>: ' + cod + '</p><p><strong>Nr Quartos</strong>: ' + quarto + '</p><p><strong>Selo Clean&Safe</strong>: ' + sclean + '</p><p><strong>Lat/Long</strong>: ' + xy + '</p><p><strong>Fonte</strong>: Sistema de Informação Geográfica do Turismo - SIGTUR 2020</p>');
        },
        pointToLayer: function (feature, latlng){
            return L.circleMarker(latlng, yellowpoint);
        },
    });

    var PIP_ET = L.geoJSON(PIP,{
        onEachFeature: function (feature, layer) { 
            let tip = feature.properties.TipologiaE;
            let nome = feature.properties.Denominaca;
            let morad = feature.properties.Endereco;
            let quarto = feature.properties.NrQuartos;
            let xy = feature.properties.LatLong;
            let type = feature.geometry.type;
            let coord = feature.geometry.coordinates;
            layer.bindPopup('<h1>' + tip + ' <i class="fas fa-concierge-bell"></i></h1><p><strong>Denominação:</strong> ' + nome + '</p><i>PIP de ET com parecer favorável do TdP</i><p><strong>Endereço:</strong> ' + morad + '</p><p><strong>Nr Quartos</strong>: ' + quarto + '</p><p><strong>Lat/Long</strong>: ' + xy + '</p><p><strong>Fonte</strong>: Sistema de Informação Geográfica do Turismo - SIGTUR 2020</p>');
        },
        pointToLayer: function (feature, latlng){
            return L.circleMarker(latlng, yellowpoint);
        },
    });

    var Proj_ET_TdP = L.geoJSON(Proj,{
        onEachFeature: function (feature, layer) { 
            let tip = feature.properties.TipologiaE;
            let nome = feature.properties.Denominaca;
            let morad = feature.properties.Endereco;
            let quarto = feature.properties.NrQuartos;
            let xy = feature.properties.LatLong;
            let type = feature.geometry.type;
            let coord = feature.geometry.coordinates;
            layer.bindPopup('<h1>' + tip + ' <i class="fas fa-concierge-bell"></i></h1><p><strong>Denominação:</strong> ' + nome + '</p><i>Projeto de ET com parecer favorável do TdP</i><p><strong>Endereço:</strong> ' + morad + '</p><p><strong>Nr Quartos</strong>: ' + quarto + '</p><p><strong>Lat/Long</strong>: ' + xy + '</p><p><strong>Fonte</strong>: Sistema de Informação Geográfica do Turismo - SIGTUR 2020</p>');
        },
        pointToLayer: function (feature, latlng){
            return L.circleMarker(latlng, yellowpoint);
        },
    });

    var hotelaria = L.layerGroup ([ET,PIP_ET,Proj_ET_TdP]).addTo(map);

    // Controle de Layers - Criando Variável
    var baselayers = {
        'Imaginary': Imaginary,
        'OpenStreetMap':openstreetmap,
    };
    var layers = {
        '<strong>AL</strong> - Alojamento Local': Alojamento,
        '<strong>AL</strong> - Mapa de Calor': mcalorAL,
        '<strong>ET</strong> - Empreendimentos Turísticos':hotelaria,
        '<strong>ATV</strong> - Agências de Turismo e Viagem': Agencia,
        'Área Administrativa': municipio,
    };
    // Adicionando Controle
    L.control.layers(baselayers, layers).addTo(map);

    
    // Scale
    L.control.scale().addTo(map);

    // ADICIONANDO ZOOM BAR
    var zoom_bar = new L.Control.ZoomBar({position: 'topleft'}).addTo(map);