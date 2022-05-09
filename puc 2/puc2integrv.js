var fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const axios = require('axios');
const { RDFMimeType } = require('graphdb').http;
const { RepositoryClientConfig, RDFRepositoryClient} = require('graphdb').repository;

const {SparqlJsonResultParser, SparqlXmlResultParser} = require('graphdb').parser;
const {GetQueryPayload, QueryType} = require('graphdb').query;

var PROTO_PATH = __dirname + '//imageability-KB2.proto';
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

const {Client} = require('virtuoso-sparql-client');


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
    fs.writeFileSync('integrtest2.ttl', '@prefix : <http://www.semanticweb.org/user/ontologies/2022/3/untitled-ontology-170#> . \n@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix owl: <http://www.w3.org/2002/07/owl#> . \n@prefix geo: <http://www.opengis.net/ont/geosparql#> . \n@prefix xsd: <http://www.w3.org/2001/XMLSchema#>. \n\n\n\n', 
        function (err) {
        if (err) return console.log(err);
        console.log('something with files went wrong !');
    });


    var element = {}
    element.puc2_body = JSON.parse(call.request.message.puc2_body)
    
    fs.appendFileSync('integrtest2.ttl', ':user' + element.puc2_body.userID + ' rdf:type :UserRun .\n')

    //import item keys
    element.puc2_body.HotSpotExperimentData.forEach((elementItemKey, index) => {

            elementItemKey.ItemData.forEach((key, indexKey) => {
                fs.appendFileSync('integrtest2.ttl', ':' + key.itemKey + '_' + element.puc2_body.userID + '_' + indexKey + ' rdf:type :ItemKey .\n')
                fs.appendFileSync('integrtest2.ttl', ':user' + element.puc2_body.userID + ' :hasItemKey :' + key.itemKey + '_' + element.puc2_body.userID + '_' + indexKey + '.\n')
                fs.appendFileSync('integrtest2.ttl', ':' + key.itemKey + '_' + element.puc2_body.userID + '_' + indexKey + ' :isNull "' + key.IsNull + '"^^xsd:string.\n')
                fs.appendFileSync('integrtest2.ttl', ':' + key.itemKey + '_' + element.puc2_body.userID + '_' + indexKey + ' :collaboration "' + key.collaboration + '"^^xsd:float.\n')
                fs.appendFileSync('integrtest2.ttl', ':' + key.itemKey + '_' + element.puc2_body.userID + '_' + indexKey + ' :focusWork "' + key.focusWork + '"^^xsd:float.\n')
                fs.appendFileSync('integrtest2.ttl', ':' + key.itemKey + '_' + element.puc2_body.userID + '_' + indexKey + ' :overallDesign "' + key.overallDesign + '"^^xsd:float.\n')                
                fs.appendFileSync('integrtest2.ttl', ':' + key.itemKey + '_' + element.puc2_body.userID + '_' + indexKey + ' :privacy "' + key.privacy + '"^^xsd:float.\n')
                fs.appendFileSync('integrtest2.ttl', ':' + key.itemKey + '_' + element.puc2_body.userID + '_' + indexKey + ' :stress "' + key.stress + '"^^xsd:float.\n')
            })


    })

    //import collection
    element.puc2_body.experimentStatusChangeData.forEach((elementCollection, indexCollection) => {
        fs.appendFileSync('integrtest2.ttl', ':collection' + indexCollection + '_' + element.puc2_body.userID + ' rdf:type :Collection .\n')
        fs.appendFileSync('integrtest2.ttl', ':user' + element.puc2_body.userID + ' :hasCollection :collection' + indexCollection + '_' + element.puc2_body.userID + '.\n')
        fs.appendFileSync('integrtest2.ttl', ':collection' + indexCollection + '_' + element.puc2_body.userID + ' :dataCollectionStatus "' + elementCollection.dataCollectionStatus + '"^^xsd:string.\n')
        fs.appendFileSync('integrtest2.ttl', ':collection' + indexCollection + '_' + element.puc2_body.userID + ' :timestamp "' + elementCollection.timestamp + '"^^xsd:float.\n')
    })

    //import experiment type
    element.puc2_body.experimentTypeChangeData.forEach((elementExperiment, indexExperiment) => {
        fs.appendFileSync('integrtest2.ttl', ':experimentType' + indexExperiment + '_' + element.puc2_body.userID + ' rdf:type :ExperimentType .\n')
        fs.appendFileSync('integrtest2.ttl', ':user' + element.puc2_body.userID + ' :hasExperimentType :experimentType' + indexExperiment + '_' + element.puc2_body.userID + '.\n')
        fs.appendFileSync('integrtest2.ttl', ':experimentType' + indexExperiment + '_' + element.puc2_body.userID + ' :title "' + elementExperiment.experimentType + '"^^xsd:string.\n')
        fs.appendFileSync('integrtest2.ttl', ':experimentType' + indexExperiment + '_' + element.puc2_body.userID + ' :timestamp "' + elementExperiment.timestamp + '"^^xsd:float.\n')
    })

    //import navigation data

    //ratings and results of navigation data
    element.puc2_body.configurationRatingKeys.forEach((elementNavigation, indexNavigation) => {
        fs.appendFileSync('integrtest2.ttl', ':' + elementNavigation + '_' + element.puc2_body.userID + ' rdf:type :Navigation .\n')
        fs.appendFileSync('integrtest2.ttl', ':user' + element.puc2_body.userID + ' :hasNavigation :' + elementNavigation + '_' + element.puc2_body.userID + '.\n')
        fs.appendFileSync('integrtest2.ttl', ':' + elementNavigation + '_' + element.puc2_body.userID + ' :title "' + elementNavigation +'"^^xsd:string.\n')

        //rating data
        element.puc2_body.configurationDesignAndNavigationRatings[indexNavigation].forEach((elementRating,indexRating) => {
        fs.appendFileSync('integrtest2.ttl', ':' + elementNavigation + '_' + element.puc2_body.userID + ' :rating "' + elementRating +'"^^xsd:float.\n')  
        })

        //result data
        element.puc2_body.results[indexNavigation].forEach((elementResult,indexResult) => {
        var navigationNode = 'nagivationNode' + '_' + element.puc2_body.userID + '_' + indexNavigation + '_' + indexResult
        fs.appendFileSync('integrtest2.ttl', ':' + navigationNode + ' rdf:type :NavigationNode .\n')
        fs.appendFileSync('integrtest2.ttl', ':' + elementNavigation + '_' + element.puc2_body.userID +  ' :hasNode :' + navigationNode + '.\n')

        fs.appendFileSync('integrtest2.ttl', ':' + navigationNode + ' :fusion "' + elementResult.Fusion +'"^^xsd:float.\n')  
        fs.appendFileSync('integrtest2.ttl', ':' + navigationNode + ' :gsr "' + elementResult.GSR +'"^^xsd:float.\n')  
        fs.appendFileSync('integrtest2.ttl', ':' + navigationNode + ' :timestamp "' + elementResult.timestamp +'"^^xsd:float.\n')
        fs.appendFileSync('integrtest2.ttl', ':' + navigationNode + ' :xcoordinate "' + elementResult.x +'"^^xsd:float.\n')  
        fs.appendFileSync('integrtest2.ttl', ':' + navigationNode + ' :ycoordinate "' + elementResult.y +'"^^xsd:float.\n')  
        fs.appendFileSync('integrtest2.ttl', ':' + navigationNode + ' :zcoordinate "' + elementResult.z +'"^^xsd:float.\n')  
  

        })



    })

    //import least and most favorite colab selection keys
    element.puc2_body.leastFavouriteCollabSelectionKeys.forEach((elementFavouriteCollab, indexFavouriteCollab)=> {
        var selectionNode = 'collabLeastFavoriteNode' + '_' + element.puc2_body.userID + '_' + indexFavouriteCollab
        fs.appendFileSync('integrtest2.ttl', ':' + selectionNode + ' rdf:type :SelectionKey .\n')
        fs.appendFileSync('integrtest2.ttl', ':user' + element.puc2_body.userID + ' :hasSelectionKey :' + selectionNode + '.\n')  
        fs.appendFileSync('integrtest2.ttl', ':' + selectionNode + ' :title "' + elementFavouriteCollab +'"^^xsd:string.\n')
        fs.appendFileSync('integrtest2.ttl', ':' + selectionNode + ' :hastype "Collab"^^xsd:string.\n')
        fs.appendFileSync('integrtest2.ttl', ':' + selectionNode + ' :isfavorite "0"^^xsd:boolean.\n')
        fs.appendFileSync('integrtest2.ttl', ':' + selectionNode + ' :xcoordinate "' + element.puc2_body.leastFavouriteCollabSelections[indexFavouriteCollab].x +'"^^xsd:float.\n')  
        fs.appendFileSync('integrtest2.ttl', ':' + selectionNode + ' :ycoordinate "' + element.puc2_body.leastFavouriteCollabSelections[indexFavouriteCollab].y +'"^^xsd:float.\n')  
        fs.appendFileSync('integrtest2.ttl', ':' + selectionNode + ' :zcoordinate "' + element.puc2_body.leastFavouriteCollabSelections[indexFavouriteCollab].z +'"^^xsd:float.\n')  
  
    })

    element.puc2_body.mostFavouriteCollabSelectionKeys.forEach((elementFavouriteCollab, indexFavouriteCollab)=> {
        var selectionNode = 'collabMostFavoriteNode' + '_' + element.puc2_body.userID + '_' + indexFavouriteCollab
        fs.appendFileSync('integrtest2.ttl', ':' + selectionNode + ' rdf:type :SelectionKey .\n')
        fs.appendFileSync('integrtest2.ttl', ':user' + element.puc2_body.userID + ' :hasSelectionKey :' + selectionNode + '.\n')  
        fs.appendFileSync('integrtest2.ttl', ':' + selectionNode + ' :title "' + elementFavouriteCollab +'"^^xsd:string.\n')
        fs.appendFileSync('integrtest2.ttl', ':' + selectionNode + ' :hastype "Collab"^^xsd:string.\n')
        fs.appendFileSync('integrtest2.ttl', ':' + selectionNode + ' :isfavorite "1"^^xsd:boolean.\n')
        fs.appendFileSync('integrtest2.ttl', ':' + selectionNode + ' :xcoordinate "' + element.puc2_body.mostFavouriteCollabSelections[indexFavouriteCollab].x +'"^^xsd:float.\n')  
        fs.appendFileSync('integrtest2.ttl', ':' + selectionNode + ' :ycoordinate "' + element.puc2_body.mostFavouriteCollabSelections[indexFavouriteCollab].y +'"^^xsd:float.\n')  
        fs.appendFileSync('integrtest2.ttl', ':' + selectionNode + ' :zcoordinate "' + element.puc2_body.mostFavouriteCollabSelections[indexFavouriteCollab].z +'"^^xsd:float.\n')  
  
    })


    //import least and most favorite privacy selection keys
    element.puc2_body.leastFavouritePrivacySelectionKeys.forEach((elementFavouriteCollab, indexFavouriteCollab)=> {
        var selectionNode = 'privacyLeastFavoriteNode' + '_' + element.puc2_body.userID + '_' + indexFavouriteCollab
        fs.appendFileSync('integrtest2.ttl', ':' + selectionNode + ' rdf:type :SelectionKey .\n')
        fs.appendFileSync('integrtest2.ttl', ':user' + element.puc2_body.userID + ' :hasSelectionKey :' + selectionNode + '.\n')  
        fs.appendFileSync('integrtest2.ttl', ':' + selectionNode + ' :title "' + elementFavouriteCollab +'"^^xsd:string.\n')
        fs.appendFileSync('integrtest2.ttl', ':' + selectionNode + ' :hastype "Privacy"^^xsd:string.\n')
        fs.appendFileSync('integrtest2.ttl', ':' + selectionNode + ' :isfavorite "0"^^xsd:boolean.\n')
        fs.appendFileSync('integrtest2.ttl', ':' + selectionNode + ' :xcoordinate "' + element.puc2_body.leastFavouritePrivacySelections[indexFavouriteCollab].x +'"^^xsd:float.\n')  
        fs.appendFileSync('integrtest2.ttl', ':' + selectionNode + ' :ycoordinate "' + element.puc2_body.leastFavouritePrivacySelections[indexFavouriteCollab].y +'"^^xsd:float.\n')  
        fs.appendFileSync('integrtest2.ttl', ':' + selectionNode + ' :zcoordinate "' + element.puc2_body.leastFavouritePrivacySelections[indexFavouriteCollab].z +'"^^xsd:float.\n')  
  
    })

    element.puc2_body.mostFavouritePrivacySelectionKeys.forEach((elementFavouriteCollab, indexFavouriteCollab)=> {
        var selectionNode = 'privacyMostFavoriteNode' + '_' + element.puc2_body.userID + '_' + indexFavouriteCollab
        fs.appendFileSync('integrtest2.ttl', ':' + selectionNode + ' rdf:type :SelectionKey .\n')
        fs.appendFileSync('integrtest2.ttl', ':user' + element.puc2_body.userID + ' :hasSelectionKey :' + selectionNode + '.\n')  
        fs.appendFileSync('integrtest2.ttl', ':' + selectionNode + ' :title "' + elementFavouriteCollab +'"^^xsd:string.\n')
        fs.appendFileSync('integrtest2.ttl', ':' + selectionNode + ' :hastype "Collab"^^xsd:string.\n')
        fs.appendFileSync('integrtest2.ttl', ':' + selectionNode + ' :isfavorite "1"^^xsd:boolean.\n')
        fs.appendFileSync('integrtest2.ttl', ':' + selectionNode + ' :xcoordinate "' + element.puc2_body.mostFavouritePrivacySelections[indexFavouriteCollab].x +'"^^xsd:float.\n')  
        fs.appendFileSync('integrtest2.ttl', ':' + selectionNode + ' :ycoordinate "' + element.puc2_body.mostFavouritePrivacySelections[indexFavouriteCollab].y +'"^^xsd:float.\n')  
        fs.appendFileSync('integrtest2.ttl', ':' + selectionNode + ' :zcoordinate "' + element.puc2_body.mostFavouritePrivacySelections[indexFavouriteCollab].z +'"^^xsd:float.\n')  
  
    })

    //speak with the KB
    console.log("ok")
    axios.post('http://160.40.52.59:8200/rest/login/admin', null, {
        headers: {
            'X-GraphDB-Password': 'alextest'
        }
    }).then(function (token) {
        const contentType = RDFMimeType.TURTLE;
        const readTimeout = 300000;
        const writeTimeout = 300000;
        const repositoryClientConfig = new RepositoryClientConfig('http://160.40.52.59:8200/repositories/integrpuc2')
            .setEndpoints(['http://160.40.52.59:8200/repositories/integrpuc2'])
            .setDefaultRDFMimeType(contentType)
            .setHeaders({ 'authorization': token.headers.authorization }, '', readTimeout, writeTimeout);
        const repositoryClient = new RDFRepositoryClient(repositoryClientConfig)

        repositoryClient.addFile('integrtest2.ttl', contentType).catch((e) => console.log(e));
    })

        console.log("populated successfully")
        callback(null, { message: "ok", received: 1 })
    }

main()