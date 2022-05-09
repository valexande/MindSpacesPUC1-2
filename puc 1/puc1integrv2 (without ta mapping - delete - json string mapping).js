var fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const axios = require('axios');
const { RDFMimeType } = require('graphdb').http;
const { RepositoryClientConfig, RDFRepositoryClient } = require('graphdb').repository;
var PROTO_PATH = __dirname + '//imageability-KB.proto';
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
const { config } = require('process');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var routeguide = protoDescriptor.unary;

function main() {
    var server = new grpc.Server();
    server.addService(routeguide.Unary.service, {

        GetServerResponse: getServerResponse,
        StoreImageabilityResponse: storeImageabilityResponse

    });
    server.bindAsync('155.207.131.42:1234', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    });

}

function getServerResponse(call, callback) {
    console.log(call.request)
    callback(null, { message: "ok", received: 0 })
}

function storeImageabilityResponse(call, callback) {
    fs.writeFileSync('integrtest.ttl', '@prefix : <http://www.semanticweb.org/estathop/ontologies/2021/9/untitled-ontology-17#> . \n@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix owl: <http://www.w3.org/2002/07/owl#> . \n@prefix geo: <http://www.opengis.net/ont/geosparql#> . \n@prefix xsd: <http://www.w3.org/2001/XMLSchema#>. \n', function (err) {
        if (err) return console.log(err);
        console.log('something with files went wrong !');
    });


    count = 0;
    var element = {}
    element.va_body = JSON.parse(call.request.message.va_body)
    element.ta_body = JSON.parse(call.request.message.ta_body)
    element.meta_body = JSON.parse(call.request.message.meta_body)
    
    String.prototype.replaceAll = function(str1, str2, ignore) 
    {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
    } 
    const vaJSON = JSON.stringify(element.va_body)
    var newStrVA = vaJSON.replaceAll("\"", "%%%").replaceAll("\n", "")

    const taJSON = JSON.stringify(element.ta_body)
    var newStrTA = taJSON.replaceAll("\"", "%%%").replaceAll("\n", "")

    const metaJSON = JSON.stringify(element.meta_body)
    var newStrMETA = metaJSON.replaceAll("\"", "%%%").replaceAll("\n", "")

    //console.log(element.va_body)
    //console.log(element.meta_body)
    //console.log(element.ta_body)
    //console.log(element.meta_body.id.replace(/ /g, "_"))

    allJson = '{%%%va%%%:' + newStrVA + ', %%%ta%%%:' + newStrTA + ', %%%meta%%%:' + newStrMETA + '}'
    let textuuid = uuidv4();
    //map the json file
    fs.appendFileSync('integrtest.ttl', ':' + element.meta_body.id.replace(/ /g, "_") + ' :hasJSON "' + allJson + '".\n')
    //

    fs.appendFileSync('integrtest.ttl', ':' + element.meta_body.id.replace(/ /g, "_") + ' rdf:type owl:NamedIndividual , \n :Image ; \n :hasArousal :arousal' + element.meta_body.id.replace(/ /g, "_") + ' ; \n ')

    
    fs.appendFileSync('integrtest.ttl', ':hasText :' + textuuid + ' ; \n')
    fs.appendFileSync('integrtest.ttl', ':hasValence :valence' + element.meta_body.id.replace(/ /g, "_") + ' ; \n')
    
    semsegstring = ':isSemSegContainer ';
    element.va_body.segmentation.segm_labels.forEach((element3, index2) => {
        semsegstring += ':semsegtop' + (index2 + 1) + 'class' + element.meta_body.id.replace(/ /g, "_") + ' , \n'
    })
    semsegstring = semsegstring.replace(/,([^,]*)$/, ';')
    fs.appendFileSync('integrtest.ttl', semsegstring + '\n')

    vergestring = ':isVergeContainer '
    element.va_body.classification.verge_labels.forEach((element4, index3) => {
        vergestring += ':vergetop' + (index3 + 1) + 'class' + element.meta_body.id.replace(/ /g, "_") + ' , \n'
    })
    vergestring = vergestring.replace(/,([^,]*)$/, ';')
    if (vergestring.length > 18) {
        fs.appendFileSync('integrtest.ttl', vergestring + '\n')
    }

    fs.appendFileSync('integrtest.ttl', ':hasDirection "' + element.meta_body.direction + '" ; \n \
:hasFocalLength "'+ element.meta_body.meta.FocalLength + '" ; \n \
:hasFocalLengthIn35 "'+ element.meta_body.meta.FocalLengthIn35 + '" ; \n \
:hasImageHeight "'+ element.meta_body.meta.ImageHeight + '" ; \n \
:hasImageWidth "'+ element.meta_body.meta.ImageWidth + '" ; \n \
:hasLat "'+ element.meta_body.lat + '" ; \n \
:hasLng "'+ element.meta_body.lng + '" ; \n \
:hasPitch "'+ element.meta_body.pitch + '" ; \n \
:hasVisualAnalysisTimestamp "'+ element.va_body.timestamp + '" ; \n \
:hasXResolution "'+ element.meta_body.meta.XResulution + '" ; \n \
:hasYResolution "'+ element.meta_body.meta.YResulution + '" ; \n \
:hasZoom "'+ element.meta_body.zoom + '" ; \n\
:isLandmark "'+ element.meta_body.landmark + '"^^xsd:boolean ; \n \ \
:isNode "'+ element.meta_body.node + '"^^xsd:boolean ; \n \ \
:isEdge "'+ element.meta_body.edge + '"^^xsd:boolean ; \n \ \
:isDistrict "'+ element.meta_body.district + '"^^xsd:boolean ; \n \ \
:isPath "'+ element.meta_body.path + '"^^xsd:boolean ; \n \ \
:hasUserID "'+ element.meta_body.user_id + '" ; \n \ \
:hasRouteName "'+ element.meta_body.routeName + '" ; \n \ \
:hasStartLat "'+ element.meta_body.startLat + '" ; \n \ \
:hasStartLng "'+ element.meta_body.startLng + '" ; \n \ \
:hasEndLat "'+ element.meta_body.endLat + '" ; \n \ \
:hasEndLng "'+ element.meta_body.endLng + '" ; \n \ \
:hasTotalImageability "'+ element.meta_body.total_imageability + '" ; \n \ \
:isName "'+ element.meta_body.id + '" . \n \
\
') 


    fs.appendFileSync('integrtest.ttl', ':arousal' + element.meta_body.id.replace(/ /g, "_") + ' rdf:type owl:NamedIndividual , \n \
:Arousal ; \n \
:hasProbability '+ element.va_body.sentiment.arousal_probability + ' ; \n \
:hasValue "'+ element.va_body.sentiment.arousal + '" . \n \
')

    element.va_body.segmentation.segm_labels.forEach((element3, index2) => {
        fs.appendFileSync('integrtest.ttl', ':semsegtop' + (index2 + 1) + 'class' + element.meta_body.id.replace(/ /g, "_") + ' rdf:type owl:NamedIndividual , \n \
:SemSegContainer ; \n \
:isSemSegLabel :'+ element3.replace(/ /g, "_") + ' ; \n\
:hasColorfulness "'+ element.va_body.segmentation.segm_colorfulness[index2] + '" ; \n \
:hasPercentage "'+ element.va_body.segmentation.segm_percentages[index2] + '" . \n \
')
    })

    fs.appendFileSync('integrtest.ttl', ':valence' + element.meta_body.id.replace(/ /g, "_") + ' rdf:type owl:NamedIndividual , \n \
:Valence ; \n \
:hasProbability "'+ element.va_body.sentiment.valence_probability + '" ; \n \
:hasValue "'+ element.va_body.sentiment.valence + '" . \n \
')

    element.va_body.classification.verge_labels.forEach((element78, index88) => {
        fs.appendFileSync('integrtest.ttl', ':vergetop' + (index88 + 1) + 'class' + element.meta_body.id.replace(/ /g, "_") + '  rdf:type owl:NamedIndividual , \n \
:VergeContainer ; \n \
:isVergeLabel "'+ element.va_body.classification.verge_labels[index88] + '" ; \n \
:hasProbability "'+ element.va_body.classification.verge_probabilities[index88] + '" . \n \
')
    })

 //
 //
 //
 //Alex code begins here
 fs.appendFileSync('integrtest.ttl', ':' + textuuid + ' rdf:type owl:NamedIndividual , :Text.\n')//Alex Code
 fs.appendFileSync('integrtest.ttl', ':' + textuuid + ' :isText "' + element.ta_body.text + '";\n')//Alex insert text sentence
 fs.appendFileSync('integrtest.ttl', ':isLang "' + element.ta_body.language + '".\n')//language indicator

 //Code for inserting ner nodes and their information, and information about a DBpedia link if this exists
 //For inserting concept_extraction information --> basically this is mapped with the ner, if we need more analysis we have to define a class Concept
 //but I do not find meaning
 nerstring = ':' + element.meta_body.id.replace(/ /g, "_") + ' :hasNer '
 var helper = ""
 element.ta_body.result.ner.nodes.forEach((element2, index) => {
       helper = ""
       helper = nerstring + ' :ner' + (index + 1) + '' + textuuid + ' .\n'
       fs.appendFileSync('integrtest.ttl', ':ner' + (index + 1) + '' + textuuid + ' rdf:type owl:NamedIndividual , :Ner.\n')
       fs.appendFileSync('integrtest.ttl', helper)
       fs.appendFileSync('integrtest.ttl', ':ner' + (index + 1) + '' + textuuid + ' :hasBegin ' + element2.metadata.begin + ' ;\n')
       fs.appendFileSync('integrtest.ttl', ':hasEnd ' + element2.metadata.end + ' ;\n')
       fs.appendFileSync('integrtest.ttl', ':hasCoveredText "' + element2.metadata.covered_text + '" ;\n')
       fs.appendFileSync('integrtest.ttl', ':hasLabel "' + element2.label + '" ;\n')
       //erase lines if not needed, between the comment brackets
       var conceptImageability = element.ta_body.result.imageability_scoring.metadata.jsonContent[3].output.concept_wise_imageability;
       fs.appendFileSync('integrtest.ttl', ':NerhasImageabilityScore "' + conceptImageability[index] + '" ;\n')
       //
       fs.appendFileSync('integrtest.ttl', ':isCategory "' + element2.metadata.category + '" .\n')

    element.ta_body.result.dbpedia_linking.nodes.forEach((elementDBpedia, index) => {
            if (element2.label.includes(elementDBpedia.label) || elementDBpedia.label.includes(element2.label)){

            fs.appendFileSync('integrtest.ttl', ':uri' + (index + 1) + '' + textuuid + ' rdf:type owl:NamedIndividual , :URI.\n')
            fs.appendFileSync('integrtest.ttl', ':ner' + (index + 1) + '' + textuuid + ' :hasURI :uri' + (index + 1) + '' + textuuid + '.\n')
            fs.appendFileSync('integrtest.ttl', ':uri' + (index + 1) + '' + textuuid + ' :hasAddress "'+ elementDBpedia.metadata.uri + '"^^xsd:anyURI;\n')
            fs.appendFileSync('integrtest.ttl', ':hasConfidence "'+ elementDBpedia.metadata.confidence + '".\n')
        }
    })

 })
    

 //Code for emotion detection starts here

 element.ta_body.result.emotion_detection.nodes.forEach((elementEmotag, index) => {
       fs.appendFileSync('integrtest.ttl', ':sentence' + (index + 1) + '' + textuuid + ' rdf:type owl:NamedIndividual , :Sentence.\n')
       fs.appendFileSync('integrtest.ttl', ':' + textuuid + ' :hasSentence :sentence' + (index + 1) + '' + textuuid + '.\n')
       fs.appendFileSync('integrtest.ttl', ' :sentence' + (index + 1) + '' + textuuid + ' :hasBegin ' + elementEmotag.metadata.begin + ' ;\n')
       fs.appendFileSync('integrtest.ttl', ' :hasEnd ' + elementEmotag.metadata.end + ' ;\n')
       fs.appendFileSync('integrtest.ttl', ' :hasType "' + elementEmotag.type + '" ;\n')
       fs.appendFileSync('integrtest.ttl', ' :hasCoveredText "' + elementEmotag.metadata.covered_text + '" ;\n')
       fs.appendFileSync('integrtest.ttl', ' :hasEmotag "' + elementEmotag.metadata.emotag + '" ;\n')
       fs.appendFileSync('integrtest.ttl', ' :hasEmotagConfidence "' + elementEmotag.metadata.confidence + '" .\n')
 })

 //Text-Verge-Segm-Colourfulness Total Imageability scoring
  element.ta_body.result.imageability_scoring.nodes.forEach((elementGeneralImageability, index) => {
        fs.appendFileSync('integrtest.ttl', ':' + element.meta_body.id.replace(/ /g, "_") + ' :hasTextImageability "' + elementGeneralImageability.metadata.imageability + '".\n')
 })

 var segmentationOverallImageability = element.ta_body.result.imageability_scoring.metadata.jsonContent[0].output.imageability;
 var colourfulnessOverallImageability = element.ta_body.result.imageability_scoring.metadata.jsonContent[1].output.colour_imageability;
 var vergeOverallImageability = element.ta_body.result.imageability_scoring.metadata.jsonContent[2].output.imageability;
 
 fs.appendFileSync('integrtest.ttl', ':' + element.meta_body.id.replace(/ /g, "_") + ' :hasSegmImageability "' + segmentationOverallImageability + '" ;\n')
 fs.appendFileSync('integrtest.ttl', ' :hasColourfulnessImageability "' + colourfulnessOverallImageability + '" ;\n')
  fs.appendFileSync('integrtest.ttl', ' :hasVergeImageability "' + vergeOverallImageability + '" .\n')
 //
 //
 //
 //Alex code ends here


    console.log("ok")

    axios.post('http://160.40.52.59:8200/rest/login/admin', null, {
        headers: {
            'X-GraphDB-Password': 'alextest'
        }
    }).then(function (token) {
        const contentType = RDFMimeType.TURTLE;
        const readTimeout = 300000;
        const writeTimeout = 300000;
        const repositoryClientConfig = new RepositoryClientConfig('http://160.40.52.59:8200/repositories/integrpuc1')
            .setEndpoints(['http://160.40.52.59:8200/repositories/integrpuc1'])
            .setDefaultRDFMimeType(contentType)
            .setHeaders({ 'authorization': token.headers.authorization }, '', readTimeout, writeTimeout);
        const repositoryClient = new RDFRepositoryClient(repositoryClientConfig)

        repositoryClient.addFile('integrtest.ttl', contentType).catch((e) => console.log(e));
    })

        console.log("populated successfully")
        callback(null, { message: "ok", received: 1 })
    }

main()