var express = require('express');
var router = express.Router()
var fs = require('fs')
//sconst uuidV1 = require('uuid/v1')
//const xlsx = require('node-xlsx');
//const catsubcat = xlsx.parse('POI_TABLEalignedtoontology.xlsx');
//const visitimes = xlsx.parse('POI_TABLEalignedtoontologytime.xlsx');
//var interchobject = JSON.parse(fs.readFileSync('EOAE_interchange_84.geojson', 'utf8'));
const { RDFMimeType } = require('graphdb').http;
const { RepositoryClientConfig, RDFRepositoryClient } = require('graphdb').repository;
const { SparqlJsonResultParser } = require('graphdb').parser;
const { UpdateQueryPayload, GetQueryPayload, QueryType } = require('graphdb').query;
const axios = require('axios');
//const geolib = require('geolib');
//const jsesc = require('jsesc');
const bodyParser = require('body-parser');
//const ObjectsToCsv = require ('objects-to-csv')
var path = require('path');
const { ok } = require('assert');

router.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
router.use(bodyParser.json({ limit: '100mb' }))



axios.post('http://160.40.52.59:8200/rest/login/admin', null, {
    headers: {
        'X-GraphDB-Password': 'alextest'
    }
}).then(function (token) {

    router.get('/query1/', (req, res) => {
        var omg = 10
        let head = {};
        let table = [];
        head.table = table;
        let test = [];
        const readTimeout = 300000;
        const writeTimeout = 300000;
        const contentType = RDFMimeType.TURTLE;
        const repositoryClientConfig = new RepositoryClientConfig('http://160.40.52.59:8200/repositories/integrpuc2')
        .setEndpoints(['http://160.40.52.59:8200/repositories/integrpuc2'])
        .setHeaders({ 'authorization': token.headers.authorization }, '', readTimeout, writeTimeout)
        .setDefaultRDFMimeType(contentType);
        const repositoryClient = new RDFRepositoryClient(repositoryClientConfig)
        repositoryClient.registerParser(new SparqlJsonResultParser());
        const payload = new GetQueryPayload()
            .setQuery('PREFIX : <http://www.semanticweb.org/user/ontologies/2022/3/untitled-ontology-170#> \
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \
            select * where { \
                select (SUM(?gsr1)/COUNT(?gsr1) as ?pr1) (SUM(?gsr2)/COUNT(?gsr2) as ?pr2) (SUM(?gsr3)/COUNT(?gsr3) as ?pr3) (SUM(?gsr4)/COUNT(?gsr4) as ?pr4) (SUM(?gsr5)/COUNT(?gsr5) as ?pr5) (SUM(?gsr6)/COUNT(?gsr6) as ?pr6) (SUM(?gsr7)/COUNT(?gsr7) as ?pr7) (SUM(?gsr8)/COUNT(?gsr8) as ?pr8) (SUM(?gsr9)/COUNT(?gsr9) as ?pr9)where{ \
                ?s rdf:type :UserRun. \
                ?s :hasNavigation ?nav. \
                ?nav :title ?t. \
                {filter contains(?t,"NavTest1") { \
                ?nav :hasNode ?node. \
                            ?node :gsr ?gsr1}} \
                UNION{ \
                filter contains(?t,"NavTest2") { \
                ?nav :hasNode ?node. \
                        ?node :gsr ?gsr2} \
                    } \
                UNION{ \
                filter contains(?t,"NavTest3") { \
                ?nav :hasNode ?node. \
                        ?node :gsr ?gsr3} \
                    } \
                UNION{ \
                filter contains(?t,"NavTest4") { \
                ?nav :hasNode ?node. \
                        ?node :gsr ?gsr4} \
                    } \
                UNION{ \
                filter contains(?t,"NavTest5") { \
                ?nav :hasNode ?node. \
                        ?node :gsr ?gsr5} \
                    } \
                UNION{ \
                filter contains(?t,"NavTest6") { \
                ?nav :hasNode ?node. \
                        ?node :gsr ?gsr6} \
                    } \
                UNION{ \
                filter contains(?t,"NavTest7") { \
                ?nav :hasNode ?node. \
                        ?node :gsr ?gsr7} \
                    } \
                UNION{ \
                filter contains(?t,"NavTest8") { \
                ?nav :hasNode ?node. \
                        ?node :gsr ?gsr8} \
                    } \
                UNION{ \
                filter contains(?t,"NavTest9") { \
                ?nav :hasNode ?node. \
                        ?node :gsr ?gsr9} \
                    } \
                } \
            } \
            \
            ')
            .setQueryType(QueryType.SELECT)
            .setResponseType(RDFMimeType.SPARQL_RESULTS_JSON)
            .setInference(true);
            return repositoryClient.query(payload).then((stream) => {
                stream.on('data', (bindings) => {
                    test = Object.values(bindings);
                    let i = 0;
                    //console.log(test)
                    test.forEach(function (key, value) {
                        if (i % 2 == 1) {
                            return true;
                        }

                        let element = { id: test[0].id.replace(/['"]+/g, ''), name: test[1].id.replace(/['"]+/g, '') }
                        i++;
                        head.table.push(element);
                    });
                });
                stream.on('end', () => {
                    res.send(test);
                    delete head;
                    delete table;
                    head.table = table;
                });
            }).catch(err => console.log(err));
    })

router.get('/query2/', (req, res) => {

        let head = {};
        let table = [];
        head.table = table;
        let test = [];
        const readTimeout = 300000;
        const writeTimeout = 300000;
        const contentType = RDFMimeType.TURTLE;
        const repositoryClientConfig = new RepositoryClientConfig('http://160.40.52.59:8200/repositories/integrpuc2')
        .setEndpoints(['http://160.40.52.59:8200/repositories/integrpuc2'])
        .setHeaders({ 'authorization': token.headers.authorization }, '', readTimeout, writeTimeout)
        .setDefaultRDFMimeType(contentType);
        const repositoryClient = new RDFRepositoryClient(repositoryClientConfig)
        repositoryClient.registerParser(new SparqlJsonResultParser());
        const payload = new GetQueryPayload()
            .setQuery('PREFIX : <http://www.semanticweb.org/user/ontologies/2022/3/untitled-ontology-170#> \
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \
            select (SUM(?T1) as ?totalTime1) (SUM(?T2) as ?totalTime2) (SUM(?T3) as ?totalTime3) (SUM(?T4) as ?totalTime4) (SUM(?T5) as ?totalTime5) (SUM(?T6) as ?totalTime6) (SUM(?T7) as ?totalTime7) (SUM(?T8) as ?totalTime8) (SUM(?T9) as ?totalTime9) where { \
                \
            select (MAX(?time1) - MIN(?time1) as ?T1) (MAX(?time2) - MIN(?time2) as ?T2) (MAX(?time3) - MIN(?time3) as ?T3) (MAX(?time4) - MIN(?time4) as ?T4) (MAX(?time5) - MIN(?time5) as ?T5) (MAX(?time6) - MIN(?time6) as ?T6) (MAX(?time7) - MIN(?time7) as ?T7) (MAX(?time8) - MIN(?time8) as ?T8) (MAX(?time9) - MIN(?time9) as ?T9)where{ \
                ?s rdf:type :UserRun. \
                ?s :hasNavigation ?nav. \
                ?nav :title ?t. \
                {filter contains(?t,"NavTest1") { \
                ?nav :hasNode ?node. \
                            ?node :timestamp ?time1}} \
                UNION{ \
                filter contains(?t,"NavTest2") { \
                ?nav :hasNode ?node. \
                        ?node :timestamp ?time2} \
                    } \
                UNION{ \
                filter contains(?t,"NavTest3") { \
                ?nav :hasNode ?node. \
                        ?node :timestamp ?time3} \
                    } \
                UNION{ \
                filter contains(?t,"NavTest4") { \
                ?nav :hasNode ?node. \
                        ?node :timestamp ?time4} \
                    } \
                UNION{ \
                filter contains(?t,"NavTest5") { \
                ?nav :hasNode ?node. \
                        ?node :timestamp ?time5} \
                    } \
                UNION{ \
                filter contains(?t,"NavTest6") { \
                ?nav :hasNode ?node. \
                        ?node :timestamp ?time6} \
                    } \
                UNION{ \
                filter contains(?t,"NavTest7") { \
                ?nav :hasNode ?node. \
                        ?node :timestamp ?time7} \
                    } \
                UNION{ \
                filter contains(?t,"NavTest8") { \
                ?nav :hasNode ?node. \
                        ?node :timestamp ?time8} \
                    } \
                UNION{ \
                filter contains(?t,"NavTest9") { \
                ?nav :hasNode ?node. \
                        ?node :timestamp ?time9} \
                    } \
                }GROUP BY ?s \
             \
             \
            } \
            \
            \
            ')
            .setQueryType(QueryType.SELECT)
            .setResponseType(RDFMimeType.SPARQL_RESULTS_JSON)
            .setInference(true);
            return repositoryClient.query(payload).then((stream) => {
                stream.on('data', (bindings) => {
                    test = Object.values(bindings);
                    let i = 0;
                    //console.log(test)
                    test.forEach(function (key, value) {
                        if (i % 2 == 1) {
                            return true;
                        }
                        
                        let element = { id: test[0].id.replace(/['"]+/g, ''), name: test[1].id.replace(/['"]+/g, '') }
                        i++;
                        head.table.push(element);
                    });
                });
                stream.on('end', () => {
                    res.send(test);
                    delete head;
                    delete table;
                    head.table = table;
                });
            }).catch(err => console.log(err));
    })

    router.get('/query3/', (req, res) => {

        let head = {};
        let table = [];
        head.table = table;
        let test = [];
        const readTimeout = 300000;
        const writeTimeout = 300000;
        const contentType = RDFMimeType.TURTLE;
        const repositoryClientConfig = new RepositoryClientConfig('http://160.40.52.59:8200/repositories/integrpuc2')
        .setEndpoints(['http://160.40.52.59:8200/repositories/integrpuc2'])
        .setHeaders({ 'authorization': token.headers.authorization }, '', readTimeout, writeTimeout)
        .setDefaultRDFMimeType(contentType);
        const repositoryClient = new RDFRepositoryClient(repositoryClientConfig)
        repositoryClient.registerParser(new SparqlJsonResultParser());
        const payload = new GetQueryPayload()
            .setQuery('PREFIX : <http://www.semanticweb.org/user/ontologies/2022/3/untitled-ontology-170#> \
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \
            select * where {  \
                select (SUM(?rat1)/COUNT(?rat1) as ?pr1) (SUM(?rat2)/COUNT(?rat2) as ?pr2) (SUM(?rat3)/COUNT(?rat3) as ?pr3) (SUM(?rat4)/COUNT(?rat4) as ?pr4) (SUM(?rat5)/COUNT(?rat5) as ?pr5) (SUM(?rat6)/COUNT(?rat6) as ?pr6) (SUM(?rat7)/COUNT(?rat7) as ?pr7) (SUM(?rat8)/COUNT(?rat8) as ?pr8) (SUM(?rat9)/COUNT(?rat9) as ?pr9) where{ \
                ?s rdf:type :UserRun. \
                ?s :hasNavigation ?nav. \
                ?nav :title ?t. \
                {filter contains(?t,"NavTest1") { \
                ?nav :rating ?rat1}} \
                UNION{ \
                filter contains(?t,"NavTest2") { \
                ?nav :rating ?rat2} \
                    } \
                UNION{ \
                filter contains(?t,"NavTest3") { \
                ?nav :rating ?rat3} \
                    } \
                UNION{ \
                filter contains(?t,"NavTest4") { \
                ?nav :rating ?rat4} \
                    }    \
                UNION{ \
                filter contains(?t,"NavTest5") { \
                ?nav :rating ?rat5} \
                    }  \
                UNION{ \
                filter contains(?t,"NavTest6") { \
                ?nav :rating ?rat6} \
                    }     \
                UNION{ \
                filter contains(?t,"NavTest7") { \
                ?nav :rating ?rat7} \
                    } \
                UNION{ \
                filter contains(?t,"NavTest8") { \
                ?nav :rating ?rat8} \
                    } \
                UNION{ \
                filter contains(?t,"NavTest9") { \
                ?nav :rating ?rat9} \
                    }    \
                }\
            \
            \
            } \
            \
            \
            ')
            .setQueryType(QueryType.SELECT)
            .setResponseType(RDFMimeType.SPARQL_RESULTS_JSON)
            .setInference(true);
            return repositoryClient.query(payload).then((stream) => {
                stream.on('data', (bindings) => {
                    test = Object.values(bindings);
                    let i = 0;
                    //console.log(test)
                    test.forEach(function (key, value) {
                        if (i % 2 == 1) {
                            return true;
                        }
                        
                        let element = { id: test[0].id.replace(/['"]+/g, ''), name: test[1].id.replace(/['"]+/g, '') }
                        i++;
                        head.table.push(element);
                    });
                });
                stream.on('end', () => {
                    res.send(test);
                    delete head;
                    delete table;
                    head.table = table;
                });
            }).catch(err => console.log(err));
    })

    router.get('/query4driver/', (req, res) => {

        let head = {};
        let table = [];
        head.table = table;
        let test = [];
        const readTimeout = 300000;
        const writeTimeout = 300000;
        const contentType = RDFMimeType.TURTLE;
        const repositoryClientConfig = new RepositoryClientConfig('http://160.40.52.59:8200/repositories/integrpuc2')
        .setEndpoints(['http://160.40.52.59:8200/repositories/integrpuc2'])
        .setHeaders({ 'authorization': token.headers.authorization }, '', readTimeout, writeTimeout)
        .setDefaultRDFMimeType(contentType);
        const repositoryClient = new RDFRepositoryClient(repositoryClientConfig)
        repositoryClient.registerParser(new SparqlJsonResultParser());
        const payload = new GetQueryPayload()
            .setQuery('PREFIX : <http://www.semanticweb.org/user/ontologies/2022/3/untitled-ontology-170#> \
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \
            select * where {  \
                select (SUM(?rat1)/COUNT(?rat1) as ?pr1) (SUM(?rat2)/COUNT(?rat2) as ?pr2) (SUM(?rat3)/COUNT(?rat3) as ?pr3) (SUM(?rat4)/COUNT(?rat4) as ?pr4) (SUM(?rat5)/COUNT(?rat5) as ?pr5) (SUM(?rat6)/COUNT(?rat6) as ?pr6) (SUM(?rat7)/COUNT(?rat7) as ?pr7) (SUM(?rat8)/COUNT(?rat8) as ?pr8) (SUM(?rat9)/COUNT(?rat9) as ?pr9) where{ \
                ?s rdf:type :UserRun. \
                ?s :driver ?type. \
                {filter contains(str(?type),"1") {   \
                 \
                ?s :hasNavigation ?nav.\
                ?nav :title ?t.\
                {filter contains(?t,"NavTest1") {\
                ?nav :rating ?rat1}}\
                UNION{\
                filter contains(?t,"NavTest2") {\
                ?nav :rating ?rat2}\
                    }\
                UNION{\
                filter contains(?t,"NavTest3") {\
                ?nav :rating ?rat3}\
                    }\
                UNION{\
                filter contains(?t,"NavTest4") {\
                ?nav :rating ?rat4}\
                    }   \
                UNION{\
                filter contains(?t,"NavTest5") {\
                ?nav :rating ?rat5}\
                    } \
                UNION{\
                filter contains(?t,"NavTest6") {\
                ?nav :rating ?rat6}\
                    }    \
                UNION{\
                filter contains(?t,"NavTest7") {\
                ?nav :rating ?rat7}\
                    }\
                UNION{\
                filter contains(?t,"NavTest8") {\
                ?nav :rating ?rat8}\
                    }\
                UNION{\
                filter contains(?t,"NavTest9") {\
                ?nav :rating ?rat9}\
                    }    \
                }\
               \
               }}\
            \
            } \
            \
            \
            ')
            .setQueryType(QueryType.SELECT)
            .setResponseType(RDFMimeType.SPARQL_RESULTS_JSON)
            .setInference(true);
            return repositoryClient.query(payload).then((stream) => {
                stream.on('data', (bindings) => {
                    test = Object.values(bindings);
                    let i = 0;
                    //console.log(test)
                    test.forEach(function (key, value) {
                        if (i % 2 == 1) {
                            return true;
                        }
                        
                        let element = { id: test[0].id.replace(/['"]+/g, ''), name: test[1].id.replace(/['"]+/g, '') }
                        i++;
                        head.table.push(element);
                    });
                });
                stream.on('end', () => {
                    res.send(test);
                    delete head;
                    delete table;
                    head.table = table;
                });
            }).catch(err => console.log(err));
    })

    router.get('/query4guardian/', (req, res) => {

        let head = {};
        let table = [];
        head.table = table;
        let test = [];
        const readTimeout = 300000;
        const writeTimeout = 300000;
        const contentType = RDFMimeType.TURTLE;
        const repositoryClientConfig = new RepositoryClientConfig('http://160.40.52.59:8200/repositories/integrpuc2')
        .setEndpoints(['http://160.40.52.59:8200/repositories/integrpuc2'])
        .setHeaders({ 'authorization': token.headers.authorization }, '', readTimeout, writeTimeout)
        .setDefaultRDFMimeType(contentType);
        const repositoryClient = new RDFRepositoryClient(repositoryClientConfig)
        repositoryClient.registerParser(new SparqlJsonResultParser());
        const payload = new GetQueryPayload()
            .setQuery('PREFIX : <http://www.semanticweb.org/user/ontologies/2022/3/untitled-ontology-170#>\
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
            select * where { \
                select (SUM(?rat1)/COUNT(?rat1) as ?pr1) (SUM(?rat2)/COUNT(?rat2) as ?pr2) (SUM(?rat3)/COUNT(?rat3) as ?pr3) (SUM(?rat4)/COUNT(?rat4) as ?pr4) (SUM(?rat5)/COUNT(?rat5) as ?pr5) (SUM(?rat6)/COUNT(?rat6) as ?pr6) (SUM(?rat7)/COUNT(?rat7) as ?pr7) (SUM(?rat8)/COUNT(?rat8) as ?pr8) (SUM(?rat9)/COUNT(?rat9) as ?pr9) where{\
                ?s rdf:type :UserRun.\
                ?s :guardian ?type.\
                {filter contains(str(?type),"1") {   \
                 \
                ?s :hasNavigation ?nav.\
                ?nav :title ?t.\
                {filter contains(?t,"NavTest1") {\
                ?nav :rating ?rat1}}\
                UNION{\
                filter contains(?t,"NavTest2") {\
                ?nav :rating ?rat2}\
                    }\
                UNION{\
                filter contains(?t,"NavTest3") {\
                ?nav :rating ?rat3}\
                    }\
                UNION{\
                filter contains(?t,"NavTest4") {\
                ?nav :rating ?rat4}\
                    }   \
                UNION{\
                filter contains(?t,"NavTest5") {\
                ?nav :rating ?rat5}\
                    } \
                UNION{\
                filter contains(?t,"NavTest6") {\
                ?nav :rating ?rat6}\
                    }    \
                UNION{\
                filter contains(?t,"NavTest7") {\
                ?nav :rating ?rat7}\
                    }\
                UNION{\
                filter contains(?t,"NavTest8") {\
                ?nav :rating ?rat8}\
                    }\
                UNION{\
                filter contains(?t,"NavTest9") {\
                ?nav :rating ?rat9}\
                    }    \
                }\
               \
               }}\
            \
            } \
            \
            \
            ')
            .setQueryType(QueryType.SELECT)
            .setResponseType(RDFMimeType.SPARQL_RESULTS_JSON)
            .setInference(true);
            return repositoryClient.query(payload).then((stream) => {
                stream.on('data', (bindings) => {
                    test = Object.values(bindings);
                    let i = 0;
                    //console.log(test)
                    test.forEach(function (key, value) {
                        if (i % 2 == 1) {
                            return true;
                        }
                        
                        let element = { id: test[0].id.replace(/['"]+/g, ''), name: test[1].id.replace(/['"]+/g, '') }
                        i++;
                        head.table.push(element);
                    });
                });
                stream.on('end', () => {
                    res.send(test);
                    delete head;
                    delete table;
                    head.table = table;
                });
            }).catch(err => console.log(err));
    })

    router.get('/query4integrator/', (req, res) => {

        let head = {};
        let table = [];
        head.table = table;
        let test = [];
        const readTimeout = 300000;
        const writeTimeout = 300000;
        const contentType = RDFMimeType.TURTLE;
        const repositoryClientConfig = new RepositoryClientConfig('http://160.40.52.59:8200/repositories/integrpuc2')
        .setEndpoints(['http://160.40.52.59:8200/repositories/integrpuc2'])
        .setHeaders({ 'authorization': token.headers.authorization }, '', readTimeout, writeTimeout)
        .setDefaultRDFMimeType(contentType);
        const repositoryClient = new RDFRepositoryClient(repositoryClientConfig)
        repositoryClient.registerParser(new SparqlJsonResultParser());
        const payload = new GetQueryPayload()
            .setQuery('PREFIX : <http://www.semanticweb.org/user/ontologies/2022/3/untitled-ontology-170#>\
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
            select * where { \
                select (SUM(?rat1)/COUNT(?rat1) as ?pr1) (SUM(?rat2)/COUNT(?rat2) as ?pr2) (SUM(?rat3)/COUNT(?rat3) as ?pr3) (SUM(?rat4)/COUNT(?rat4) as ?pr4) (SUM(?rat5)/COUNT(?rat5) as ?pr5) (SUM(?rat6)/COUNT(?rat6) as ?pr6) (SUM(?rat7)/COUNT(?rat7) as ?pr7) (SUM(?rat8)/COUNT(?rat8) as ?pr8) (SUM(?rat9)/COUNT(?rat9) as ?pr9) where{\
                ?s rdf:type :UserRun.\
                ?s :integrator ?type.\
                {filter contains(str(?type),"1") {   \
                 \
                ?s :hasNavigation ?nav.\
                ?nav :title ?t.\
                {filter contains(?t,"NavTest1") {\
                ?nav :rating ?rat1}}\
                UNION{\
                filter contains(?t,"NavTest2") {\
                ?nav :rating ?rat2}\
                    }\
                UNION{\
                filter contains(?t,"NavTest3") {\
                ?nav :rating ?rat3}\
                    }\
                UNION{\
                filter contains(?t,"NavTest4") {\
                ?nav :rating ?rat4}\
                    }   \
                UNION{\
                filter contains(?t,"NavTest5") {\
                ?nav :rating ?rat5}\
                    } \
                UNION{\
                filter contains(?t,"NavTest6") {\
                ?nav :rating ?rat6}\
                    }    \
                UNION{\
                filter contains(?t,"NavTest7") {\
                ?nav :rating ?rat7}\
                    }\
                UNION{\
                filter contains(?t,"NavTest8") {\
                ?nav :rating ?rat8}\
                    }\
                UNION{\
                filter contains(?t,"NavTest9") {\
                ?nav :rating ?rat9}\
                    }    \
                }\
               \
               }}\
            \
            } \
            \
            \
            ')
            .setQueryType(QueryType.SELECT)
            .setResponseType(RDFMimeType.SPARQL_RESULTS_JSON)
            .setInference(true);
            return repositoryClient.query(payload).then((stream) => {
                stream.on('data', (bindings) => {
                    test = Object.values(bindings);
                    let i = 0;
                    //console.log(test)
                    test.forEach(function (key, value) {
                        if (i % 2 == 1) {
                            return true;
                        }
                        
                        let element = { id: test[0].id.replace(/['"]+/g, ''), name: test[1].id.replace(/['"]+/g, '') }
                        i++;
                        head.table.push(element);
                    });
                });
                stream.on('end', () => {
                    res.send(test);
                    delete head;
                    delete table;
                    head.table = table;
                });
            }).catch(err => console.log(err));
    })

    router.get('/query4pioneer/', (req, res) => {

        let head = {};
        let table = [];
        head.table = table;
        let test = [];
        const readTimeout = 300000;
        const writeTimeout = 300000;
        const contentType = RDFMimeType.TURTLE;
        const repositoryClientConfig = new RepositoryClientConfig('http://160.40.52.59:8200/repositories/integrpuc2')
        .setEndpoints(['http://160.40.52.59:8200/repositories/integrpuc2'])
        .setHeaders({ 'authorization': token.headers.authorization }, '', readTimeout, writeTimeout)
        .setDefaultRDFMimeType(contentType);
        const repositoryClient = new RDFRepositoryClient(repositoryClientConfig)
        repositoryClient.registerParser(new SparqlJsonResultParser());
        const payload = new GetQueryPayload()
            .setQuery('PREFIX : <http://www.semanticweb.org/user/ontologies/2022/3/untitled-ontology-170#> \
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
            select * where { \
                select (SUM(?rat1)/COUNT(?rat1) as ?pr1) (SUM(?rat2)/COUNT(?rat2) as ?pr2) (SUM(?rat3)/COUNT(?rat3) as ?pr3) (SUM(?rat4)/COUNT(?rat4) as ?pr4) (SUM(?rat5)/COUNT(?rat5) as ?pr5) (SUM(?rat6)/COUNT(?rat6) as ?pr6) (SUM(?rat7)/COUNT(?rat7) as ?pr7) (SUM(?rat8)/COUNT(?rat8) as ?pr8) (SUM(?rat9)/COUNT(?rat9) as ?pr9) where{\
                ?s rdf:type :UserRun.\
                ?s :pioneer ?type.\
                {filter contains(str(?type),"1") {   \
                 \
                ?s :hasNavigation ?nav.\
                ?nav :title ?t.\
                {filter contains(?t,"NavTest1") {\
                ?nav :rating ?rat1}}\
                UNION{\
                filter contains(?t,"NavTest2") {\
                ?nav :rating ?rat2}\
                    }\
                UNION{\
                filter contains(?t,"NavTest3") {\
                ?nav :rating ?rat3}\
                    }\
                UNION{\
                filter contains(?t,"NavTest4") {\
                ?nav :rating ?rat4}\
                    }   \
                UNION{\
                filter contains(?t,"NavTest5") {\
                ?nav :rating ?rat5}\
                    } \
                UNION{\
                filter contains(?t,"NavTest6") {\
                ?nav :rating ?rat6}\
                    }    \
                UNION{\
                filter contains(?t,"NavTest7") {\
                ?nav :rating ?rat7}\
                    }\
                UNION{\
                filter contains(?t,"NavTest8") {\
                ?nav :rating ?rat8}\
                    }\
                UNION{\
                filter contains(?t,"NavTest9") {\
                ?nav :rating ?rat9}\
                    }    \
                }\
               \
               }}\
            \
            } \
            \
            \
            ')
            .setQueryType(QueryType.SELECT)
            .setResponseType(RDFMimeType.SPARQL_RESULTS_JSON)
            .setInference(true);
            return repositoryClient.query(payload).then((stream) => {
                stream.on('data', (bindings) => {
                    test = Object.values(bindings);
                    let i = 0;
                    //console.log(test)
                    test.forEach(function (key, value) {
                        if (i % 2 == 1) {
                            return true;
                        }
                        
                        let element = { id: test[0].id.replace(/['"]+/g, ''), name: test[1].id.replace(/['"]+/g, '') }
                        i++;
                        head.table.push(element);
                    });
                });
                stream.on('end', () => {
                    res.send(test);
                    delete head;
                    delete table;
                    head.table = table;
                });
            }).catch(err => console.log(err));
    })

    router.get('/query5/', (req, res) => {

        let head = {};
        let table = [];
        head.table = table;
        let test = [];
        const readTimeout = 300000;
        const writeTimeout = 300000;
        const contentType = RDFMimeType.TURTLE;
        const repositoryClientConfig = new RepositoryClientConfig('http://160.40.52.59:8200/repositories/integrpuc2')
        .setEndpoints(['http://160.40.52.59:8200/repositories/integrpuc2'])
        .setHeaders({ 'authorization': token.headers.authorization }, '', readTimeout, writeTimeout)
        .setDefaultRDFMimeType(contentType);
        const repositoryClient = new RDFRepositoryClient(repositoryClientConfig)
        repositoryClient.registerParser(new SparqlJsonResultParser());
        const payload = new GetQueryPayload()
            .setQuery('PREFIX : <http://www.semanticweb.org/user/ontologies/2022/3/untitled-ontology-170#>\
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
            select (COUNT(?p) as ?pioneer) (COUNT(?g) as ?guardian) (COUNT(?int) as ?integrator) (COUNT(?d) as ?driver) where { \
                ?s rdf:type :UserRun;\
               {filter contains(str(?p),"1")\
                   ?s :pioneer ?p}\
               UNION\
              {filter contains(str(?g),"1")\
                   ?s :guardian ?g}\
              UNION\
              {filter contains(str(?int),"1")\
                    ?s :integrator ?int}\
              UNION\
              {filter contains(str(?d),"1")\
                    ?s :driver ?d}\
            } \
            \
            \
            ')
            .setQueryType(QueryType.SELECT)
            .setResponseType(RDFMimeType.SPARQL_RESULTS_JSON)
            .setInference(true);
            return repositoryClient.query(payload).then((stream) => {
                stream.on('data', (bindings) => {
                    test = Object.values(bindings);
                    let i = 0;
                    //console.log(test)
                    let dict = ["pioneer", "guardian", "integrator", "driver"]
                        for (let i =0; i<4; i++){
                        //console.log(key)
                        //console.log(value)
                        let element = { category: dict[i], quantity: test[i].id.replace(/['"]+/g, '').split('^')[0] }
                        //console.log(element)
                        head.table.push(element);
                        //console.log(head)
                        }
                });
                stream.on('end', () => {
                    res.send(head);
                    delete head;
                    delete table;
                    head.table = table;
                });
            }).catch(err => console.log(err));
    })

    router.get('/query6/', (req, res) => {

        let head = {};
        let table = [];
        head.table = table;
        let test = [];
        const readTimeout = 300000;
        const writeTimeout = 300000;
        const contentType = RDFMimeType.TURTLE;
        const repositoryClientConfig = new RepositoryClientConfig('http://160.40.52.59:8200/repositories/integrpuc2')
        .setEndpoints(['http://160.40.52.59:8200/repositories/integrpuc2'])
        .setHeaders({ 'authorization': token.headers.authorization }, '', readTimeout, writeTimeout)
        .setDefaultRDFMimeType(contentType);
        const repositoryClient = new RDFRepositoryClient(repositoryClientConfig)
        repositoryClient.registerParser(new SparqlJsonResultParser());
        const payload = new GetQueryPayload()
            .setQuery('PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
            PREFIX : <http://www.semanticweb.org/user/ontologies/2022/3/untitled-ontology-170#>\
            select * where{\
              \
            select (SUM(?focus0)/COUNT(?focus0) as ?f0) (SUM(?focus1)/COUNT(?focus1) as ?f1) (SUM(?focus2)/COUNT(?focus2) as ?f2) (SUM(?focus3)/COUNT(?focus3) as ?f3) (SUM(?focus4)/COUNT(?focus4) as ?f4) (SUM(?col0)/COUNT(?col0) as ?c0) (SUM(?col1)/COUNT(?col1) as ?c1) (SUM(?col2)/COUNT(?col2) as ?c2) (SUM(?col3)/COUNT(?col3) as ?c3) (SUM(?col4)/COUNT(?col4) as ?c4) (SUM(?pri0)/COUNT(?pri0) as ?p0) (SUM(?pri1)/COUNT(?pri1) as ?1) (SUM(?pri2)/COUNT(?pri2) as ?p2) (SUM(?pri3)/COUNT(?pri3) as ?p3) (SUM(?pri4)/COUNT(?pri4) as ?p4) where { \
                ?s rdf:type :UserRun .\
                ?s :hasItemKey ?key\
                {filter contains(str(?key),"Cluster_0"){\
                    ?key :focusWork ?focus0;\
                         :collaboration ?col0;\
                         :privacy ?pri0\
                    }}\
                UNION\
                {filter contains(str(?key),"Cluster_1"){\
                    ?key :focusWork ?focus1;\
                         :collaboration ?col1;\
                         :privacy ?pri1\
                }}\
                UNION\
                {filter contains(str(?key),"Cluster_2"){\
                    ?key :focusWork ?focus2;\
                         :collaboration ?col2;\
                         :privacy ?pri2\
                }}\
                UNION\
                {filter contains(str(?key),"Cluster_3"){\
                    ?key :focusWork ?focus3;\
                         :collaboration ?col3;\
                         :privacy ?pri3\
                }}\
                UNION\
                {filter contains(str(?key),"Cluster_4"){\
                    ?key :focusWork ?focus4;\
                         :collaboration ?col4;\
                         :privacy ?pri4\
                }}\
            } \
            }\
            \
            ')
            .setQueryType(QueryType.SELECT)
            .setResponseType(RDFMimeType.SPARQL_RESULTS_JSON)
            .setInference(true);
            return repositoryClient.query(payload).then((stream) => {
                stream.on('data', (bindings) => {
                    test = Object.values(bindings);
                    let i = 0;
                    //console.log(test)
                    let dict = ["cluster 1 focus work", "cluster 2 focus work", "cluster 3 focus work", "cluster 4 focus work", "cluster 5 focus work", 
                    "cluster 1 collaboration", "cluster 2 collaboration", "cluster 3 collaboration", "cluster 4 collaboration", "cluster 5 collaboration",
                    "cluster 1 privacy", "cluster 2 privacy","cluster 3 privacy","cluster 4 privacy","cluster 5 privacy",]
                        for (let i =0; i<15; i++){
                        //console.log(key)
                        //console.log(value)
                        let element = { category: dict[i], value: test[i].id.replace(/['"]+/g, '').split('^')[0] }
                        //console.log(element)
                        head.table.push(element);
                        //console.log(head)
                        }
                });
                stream.on('end', () => {
                    res.send(head);
                    delete head;
                    delete table;
                    head.table = table;
                });
            }).catch(err => console.log(err));
    })

    router.get('/query7driver/', (req, res) => {

        let head = {};
        let table = [];
        head.table = table;
        let test = [];
        const readTimeout = 300000;
        const writeTimeout = 300000;
        const contentType = RDFMimeType.TURTLE;
        const repositoryClientConfig = new RepositoryClientConfig('http://160.40.52.59:8200/repositories/integrpuc2')
        .setEndpoints(['http://160.40.52.59:8200/repositories/integrpuc2'])
        .setHeaders({ 'authorization': token.headers.authorization }, '', readTimeout, writeTimeout)
        .setDefaultRDFMimeType(contentType);
        const repositoryClient = new RDFRepositoryClient(repositoryClientConfig)
        repositoryClient.registerParser(new SparqlJsonResultParser());
        const payload = new GetQueryPayload()
            .setQuery('PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
            PREFIX : <http://www.semanticweb.org/user/ontologies/2022/3/untitled-ontology-170#>\
            select * where{\
              \
            select (SUM(?focus0)/COUNT(?focus0) as ?f0) (SUM(?focus1)/COUNT(?focus1) as ?f1) (SUM(?focus2)/COUNT(?focus2) as ?f2) (SUM(?focus3)/COUNT(?focus3) as ?f3) (SUM(?focus4)/COUNT(?focus4) as ?f4) (SUM(?col0)/COUNT(?col0) as ?c0) (SUM(?col1)/COUNT(?col1) as ?c1) (SUM(?col2)/COUNT(?col2) as ?c2) (SUM(?col3)/COUNT(?col3) as ?c3) (SUM(?col4)/COUNT(?col4) as ?c4) (SUM(?pri0)/COUNT(?pri0) as ?p0) (SUM(?pri1)/COUNT(?pri1) as ?1) (SUM(?pri2)/COUNT(?pri2) as ?p2) (SUM(?pri3)/COUNT(?pri3) as ?p3) (SUM(?pri4)/COUNT(?pri4) as ?p4) where { \
                ?s rdf:type :UserRun .\
                ?s :hasItemKey ?key.\
                ?s :driver ?driver\
                {filter contains(str(?driver),"1") {    \
                    \
                {filter contains(str(?key),"Cluster_0"){\
                    ?key :focusWork ?focus0;\
                         :collaboration ?col0;\
                         :privacy ?pri0\
                    }}\
                UNION\
                {filter contains(str(?key),"Cluster_1"){\
                    ?key :focusWork ?focus1;\
                         :collaboration ?col1;\
                         :privacy ?pri1\
                }}\
                UNION\
                {filter contains(str(?key),"Cluster_2"){\
                    ?key :focusWork ?focus2;\
                         :collaboration ?col2;\
                         :privacy ?pri2\
                }}\
                UNION\
                {filter contains(str(?key),"Cluster_3"){\
                    ?key :focusWork ?focus3;\
                         :collaboration ?col3;\
                         :privacy ?pri3\
                }}\
                UNION\
                {filter contains(str(?key),"Cluster_4"){\
                    ?key :focusWork ?focus4;\
                         :collaboration ?col4;\
                         :privacy ?pri4\
                }}\
                }}   \
            }}\
            \
            ')
            .setQueryType(QueryType.SELECT)
            .setResponseType(RDFMimeType.SPARQL_RESULTS_JSON)
            .setInference(true);
            return repositoryClient.query(payload).then((stream) => {
                stream.on('data', (bindings) => {
                    test = Object.values(bindings);
                    let i = 0;
                    //console.log(test)
                    let dict = ["cluster 1 focus work", "cluster 2 focus work", "cluster 3 focus work", "cluster 4 focus work", "cluster 5 focus work", 
                    "cluster 1 collaboration", "cluster 2 collaboration", "cluster 3 collaboration", "cluster 4 collaboration", "cluster 5 collaboration",
                    "cluster 1 privacy", "cluster 2 privacy","cluster 3 privacy","cluster 4 privacy","cluster 5 privacy",]
                        for (let i =0; i<15; i++){
                        //console.log(key)
                        //console.log(value)
                        let element = { category: dict[i], value: test[i].id.replace(/['"]+/g, '').split('^')[0] }
                        //console.log(element)
                        head.table.push(element);
                        //console.log(head)
                        }
                });
                stream.on('end', () => {
                    res.send(head);
                    delete head;
                    delete table;
                    head.table = table;
                });
            }).catch(err => console.log(err));
    })

    router.get('/query7guardian/', (req, res) => {

        let head = {};
        let table = [];
        head.table = table;
        let test = [];
        const readTimeout = 300000;
        const writeTimeout = 300000;
        const contentType = RDFMimeType.TURTLE;
        const repositoryClientConfig = new RepositoryClientConfig('http://160.40.52.59:8200/repositories/integrpuc2')
        .setEndpoints(['http://160.40.52.59:8200/repositories/integrpuc2'])
        .setHeaders({ 'authorization': token.headers.authorization }, '', readTimeout, writeTimeout)
        .setDefaultRDFMimeType(contentType);
        const repositoryClient = new RDFRepositoryClient(repositoryClientConfig)
        repositoryClient.registerParser(new SparqlJsonResultParser());
        const payload = new GetQueryPayload()
            .setQuery('PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
            PREFIX : <http://www.semanticweb.org/user/ontologies/2022/3/untitled-ontology-170#>\
            select * where{\
              \
            select (SUM(?focus0)/COUNT(?focus0) as ?f0) (SUM(?focus1)/COUNT(?focus1) as ?f1) (SUM(?focus2)/COUNT(?focus2) as ?f2) (SUM(?focus3)/COUNT(?focus3) as ?f3) (SUM(?focus4)/COUNT(?focus4) as ?f4) (SUM(?col0)/COUNT(?col0) as ?c0) (SUM(?col1)/COUNT(?col1) as ?c1) (SUM(?col2)/COUNT(?col2) as ?c2) (SUM(?col3)/COUNT(?col3) as ?c3) (SUM(?col4)/COUNT(?col4) as ?c4) (SUM(?pri0)/COUNT(?pri0) as ?p0) (SUM(?pri1)/COUNT(?pri1) as ?1) (SUM(?pri2)/COUNT(?pri2) as ?p2) (SUM(?pri3)/COUNT(?pri3) as ?p3) (SUM(?pri4)/COUNT(?pri4) as ?p4) where { \
                ?s rdf:type :UserRun .\
                ?s :hasItemKey ?key.\
                ?s :guardian ?guardian\
                {filter contains(str(?guardian),"1") {      \
                    \
                {filter contains(str(?key),"Cluster_0"){\
                    ?key :focusWork ?focus0;\
                         :collaboration ?col0;\
                         :privacy ?pri0\
                    }}\
                UNION\
                {filter contains(str(?key),"Cluster_1"){\
                    ?key :focusWork ?focus1;\
                         :collaboration ?col1;\
                         :privacy ?pri1\
                }}\
                UNION\
                {filter contains(str(?key),"Cluster_2"){\
                    ?key :focusWork ?focus2;\
                         :collaboration ?col2;\
                         :privacy ?pri2\
                }}\
                UNION\
                {filter contains(str(?key),"Cluster_3"){\
                    ?key :focusWork ?focus3;\
                         :collaboration ?col3;\
                         :privacy ?pri3\
                }}\
                UNION\
                {filter contains(str(?key),"Cluster_4"){\
                    ?key :focusWork ?focus4;\
                         :collaboration ?col4;\
                         :privacy ?pri4\
                }}\
                }}   \
            }}\
            \
            ')
            .setQueryType(QueryType.SELECT)
            .setResponseType(RDFMimeType.SPARQL_RESULTS_JSON)
            .setInference(true);
            return repositoryClient.query(payload).then((stream) => {
                stream.on('data', (bindings) => {
                    test = Object.values(bindings);
                    let i = 0;
                    //console.log(test)
                    let dict = ["cluster 1 focus work", "cluster 2 focus work", "cluster 3 focus work", "cluster 4 focus work", "cluster 5 focus work", 
                    "cluster 1 collaboration", "cluster 2 collaboration", "cluster 3 collaboration", "cluster 4 collaboration", "cluster 5 collaboration",
                    "cluster 1 privacy", "cluster 2 privacy","cluster 3 privacy","cluster 4 privacy","cluster 5 privacy",]
                        for (let i =0; i<15; i++){
                        //console.log(key)
                        //console.log(value)
                        let element = { category: dict[i], value: test[i].id.replace(/['"]+/g, '').split('^')[0] }
                        //console.log(element)
                        head.table.push(element);
                        //console.log(head)
                        }
                });
                stream.on('end', () => {
                    res.send(head);
                    delete head;
                    delete table;
                    head.table = table;
                });
            }).catch(err => console.log(err));
    })


    router.get('/query7integrator/', (req, res) => {

        let head = {};
        let table = [];
        head.table = table;
        let test = [];
        const readTimeout = 300000;
        const writeTimeout = 300000;
        const contentType = RDFMimeType.TURTLE;
        const repositoryClientConfig = new RepositoryClientConfig('http://160.40.52.59:8200/repositories/integrpuc2')
        .setEndpoints(['http://160.40.52.59:8200/repositories/integrpuc2'])
        .setHeaders({ 'authorization': token.headers.authorization }, '', readTimeout, writeTimeout)
        .setDefaultRDFMimeType(contentType);
        const repositoryClient = new RDFRepositoryClient(repositoryClientConfig)
        repositoryClient.registerParser(new SparqlJsonResultParser());
        const payload = new GetQueryPayload()
            .setQuery('PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
            PREFIX : <http://www.semanticweb.org/user/ontologies/2022/3/untitled-ontology-170#>\
            select * where{\
              \
            select (SUM(?focus0)/COUNT(?focus0) as ?f0) (SUM(?focus1)/COUNT(?focus1) as ?f1) (SUM(?focus2)/COUNT(?focus2) as ?f2) (SUM(?focus3)/COUNT(?focus3) as ?f3) (SUM(?focus4)/COUNT(?focus4) as ?f4) (SUM(?col0)/COUNT(?col0) as ?c0) (SUM(?col1)/COUNT(?col1) as ?c1) (SUM(?col2)/COUNT(?col2) as ?c2) (SUM(?col3)/COUNT(?col3) as ?c3) (SUM(?col4)/COUNT(?col4) as ?c4) (SUM(?pri0)/COUNT(?pri0) as ?p0) (SUM(?pri1)/COUNT(?pri1) as ?1) (SUM(?pri2)/COUNT(?pri2) as ?p2) (SUM(?pri3)/COUNT(?pri3) as ?p3) (SUM(?pri4)/COUNT(?pri4) as ?p4) where { \
                ?s rdf:type :UserRun .\
                ?s :hasItemKey ?key.\
                ?s :integrator ?integrator\
                {filter contains(str(?integrator),"1") {   \
                    \
                {filter contains(str(?key),"Cluster_0"){\
                    ?key :focusWork ?focus0;\
                         :collaboration ?col0;\
                         :privacy ?pri0\
                    }}\
                UNION\
                {filter contains(str(?key),"Cluster_1"){\
                    ?key :focusWork ?focus1;\
                         :collaboration ?col1;\
                         :privacy ?pri1\
                }}\
                UNION\
                {filter contains(str(?key),"Cluster_2"){\
                    ?key :focusWork ?focus2;\
                         :collaboration ?col2;\
                         :privacy ?pri2\
                }}\
                UNION\
                {filter contains(str(?key),"Cluster_3"){\
                    ?key :focusWork ?focus3;\
                         :collaboration ?col3;\
                         :privacy ?pri3\
                }}\
                UNION\
                {filter contains(str(?key),"Cluster_4"){\
                    ?key :focusWork ?focus4;\
                         :collaboration ?col4;\
                         :privacy ?pri4\
                }}\
                }}   \
            }}\
            \
            ')
            .setQueryType(QueryType.SELECT)
            .setResponseType(RDFMimeType.SPARQL_RESULTS_JSON)
            .setInference(true);
            return repositoryClient.query(payload).then((stream) => {
                stream.on('data', (bindings) => {
                    test = Object.values(bindings);
                    let i = 0;
                    //console.log(test)
                    let dict = ["cluster 1 focus work", "cluster 2 focus work", "cluster 3 focus work", "cluster 4 focus work", "cluster 5 focus work", 
                    "cluster 1 collaboration", "cluster 2 collaboration", "cluster 3 collaboration", "cluster 4 collaboration", "cluster 5 collaboration",
                    "cluster 1 privacy", "cluster 2 privacy","cluster 3 privacy","cluster 4 privacy","cluster 5 privacy",]
                        for (let i =0; i<15; i++){
                        //console.log(key)
                        //console.log(value)
                        let element = { category: dict[i], value: test[i].id.replace(/['"]+/g, '').split('^')[0] }
                        //console.log(element)
                        head.table.push(element);
                        //console.log(head)
                        }
                });
                stream.on('end', () => {
                    res.send(head);
                    delete head;
                    delete table;
                    head.table = table;
                });
            }).catch(err => console.log(err));
    })

    router.get('/query7pioneer/', (req, res) => {

        let head = {};
        let table = [];
        head.table = table;
        let test = [];
        const readTimeout = 300000;
        const writeTimeout = 300000;
        const contentType = RDFMimeType.TURTLE;
        const repositoryClientConfig = new RepositoryClientConfig('http://160.40.52.59:8200/repositories/integrpuc2')
        .setEndpoints(['http://160.40.52.59:8200/repositories/integrpuc2'])
        .setHeaders({ 'authorization': token.headers.authorization }, '', readTimeout, writeTimeout)
        .setDefaultRDFMimeType(contentType);
        const repositoryClient = new RDFRepositoryClient(repositoryClientConfig)
        repositoryClient.registerParser(new SparqlJsonResultParser());
        const payload = new GetQueryPayload()
            .setQuery('PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
            PREFIX : <http://www.semanticweb.org/user/ontologies/2022/3/untitled-ontology-170#>\
            select * where{\
              \
            select (SUM(?focus0)/COUNT(?focus0) as ?f0) (SUM(?focus1)/COUNT(?focus1) as ?f1) (SUM(?focus2)/COUNT(?focus2) as ?f2) (SUM(?focus3)/COUNT(?focus3) as ?f3) (SUM(?focus4)/COUNT(?focus4) as ?f4) (SUM(?col0)/COUNT(?col0) as ?c0) (SUM(?col1)/COUNT(?col1) as ?c1) (SUM(?col2)/COUNT(?col2) as ?c2) (SUM(?col3)/COUNT(?col3) as ?c3) (SUM(?col4)/COUNT(?col4) as ?c4) (SUM(?pri0)/COUNT(?pri0) as ?p0) (SUM(?pri1)/COUNT(?pri1) as ?1) (SUM(?pri2)/COUNT(?pri2) as ?p2) (SUM(?pri3)/COUNT(?pri3) as ?p3) (SUM(?pri4)/COUNT(?pri4) as ?p4) where { \
                ?s rdf:type :UserRun .\
                ?s :hasItemKey ?key.\
                ?s :pioneer ?pioneer\
                {filter contains(str(?pioneer),"1") { \
                    \
                {filter contains(str(?key),"Cluster_0"){\
                    ?key :focusWork ?focus0;\
                         :collaboration ?col0;\
                         :privacy ?pri0\
                    }}\
                UNION\
                {filter contains(str(?key),"Cluster_1"){\
                    ?key :focusWork ?focus1;\
                         :collaboration ?col1;\
                         :privacy ?pri1\
                }}\
                UNION\
                {filter contains(str(?key),"Cluster_2"){\
                    ?key :focusWork ?focus2;\
                         :collaboration ?col2;\
                         :privacy ?pri2\
                }}\
                UNION\
                {filter contains(str(?key),"Cluster_3"){\
                    ?key :focusWork ?focus3;\
                         :collaboration ?col3;\
                         :privacy ?pri3\
                }}\
                UNION\
                {filter contains(str(?key),"Cluster_4"){\
                    ?key :focusWork ?focus4;\
                         :collaboration ?col4;\
                         :privacy ?pri4\
                }}\
                }}   \
            }}\
            \
            ')
            .setQueryType(QueryType.SELECT)
            .setResponseType(RDFMimeType.SPARQL_RESULTS_JSON)
            .setInference(true);
            return repositoryClient.query(payload).then((stream) => {
                stream.on('data', (bindings) => {
                    test = Object.values(bindings);
                    let i = 0;
                    //console.log(test)
                    let dict = ["cluster 1 focus work", "cluster 2 focus work", "cluster 3 focus work", "cluster 4 focus work", "cluster 5 focus work", 
                    "cluster 1 collaboration", "cluster 2 collaboration", "cluster 3 collaboration", "cluster 4 collaboration", "cluster 5 collaboration",
                    "cluster 1 privacy", "cluster 2 privacy","cluster 3 privacy","cluster 4 privacy","cluster 5 privacy",]
                        for (let i =0; i<15; i++){
                        //console.log(key)
                        //console.log(value)
                        let element = { category: dict[i], value: test[i].id.replace(/['"]+/g, '').split('^')[0] }
                        //console.log(element)
                        head.table.push(element);
                        //console.log(head)
                        }
                });
                stream.on('end', () => {
                    res.send(head);
                    delete head;
                    delete table;
                    head.table = table;
                });
            }).catch(err => console.log(err));
    })

    router.get('/query8/', (req, res) => {

        let head = {};
        let table = [];
        head.table = table;
        let test = [];
        const readTimeout = 300000;
        const writeTimeout = 300000;
        const contentType = RDFMimeType.TURTLE;
        const repositoryClientConfig = new RepositoryClientConfig('http://160.40.52.59:8200/repositories/integrpuc2')
        .setEndpoints(['http://160.40.52.59:8200/repositories/integrpuc2'])
        .setHeaders({ 'authorization': token.headers.authorization }, '', readTimeout, writeTimeout)
        .setDefaultRDFMimeType(contentType);
        const repositoryClient = new RDFRepositoryClient(repositoryClientConfig)
        repositoryClient.registerParser(new SparqlJsonResultParser());
        const payload = new GetQueryPayload()
            .setQuery('PREFIX : <http://www.semanticweb.org/user/ontologies/2022/3/untitled-ontology-170#>\
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
            select * where{\
            select (SUM(?number)/COUNT(?number) as ?gsr) ?s where{\
                ?s rdf:type :UserRun.\
                ?s :hasNavigation ?nav.\
                ?nav :hasNode ?node.\
                ?node :gsr ?number\
            } group by ?s \
            } order by asc(?gsr)   \
            \
            ')
            .setQueryType(QueryType.SELECT)
            .setResponseType(RDFMimeType.SPARQL_RESULTS_JSON)
            .setInference(true);
            return repositoryClient.query(payload).then((stream) => {
                stream.on('data', (bindings) => {
                    test = Object.values(bindings);
                    let i = 0;
                    //console.log(test)
                    test.forEach(function (key, value) {
                        if (i % 2 == 1) {
                            return true;
                        }
                        
                        let element = { value: test[0].id.replace(/['"]+/g, '').split('^')[0], user_id: test[1].id.replace(/['"]+/g, '').split('#').pop() }
                        i++;
                        head.table.push(element);
                    });
                });
                stream.on('end', () => {
                    res.send(head);
                    delete head;
                    delete table;
                    head.table = table;
                });
            }).catch(err => console.log(err));
    })

    router.get('/hi', (req, res) => {
        res.send('hi \\n asd')
    });
});

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next();
});

module.exports = router;