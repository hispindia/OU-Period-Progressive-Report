import sqlQueryBuilder from './sql-query-builder';
import api from './dhis2API';
import excelBuilder from './excel-builder.js';

function periodWiseProgressiveReport(params,callback){

    const SQLVIEWPREFIX = "XL_REPORT_";
    var sourceIDQuery = __getSourceIDQuery(params);
    var sqlViewService = new api.sqlViewService();

    sqlViewService.dip(SQLVIEWPREFIX,sourceIDQuery, doMainQuery);
    
    function doMainQuery(error,response,body){
        if (error){
            console.log("Source Query Error : "+error)
            callback();
            return
        }
        
        if (body.rows[0] == ""){
            alert("No facility found for the parameters selected")
            callback();
            return;
        }
        
        var ouGroupWiseSourceIDs = JSON.parse(body.rows[0]);
        var mainQ = __getMainQuery(params,ouGroupWiseSourceIDs);

        sqlViewService.dip(SQLVIEWPREFIX,mainQ, function(error,response,body){
            if (error){

            }

            new excelBuilder(params.mapping,
                             body,
                             params.excelTemplate,
                             params.reportName,
                             params.selectedOUName,
                             params.startdateText,
                             params.enddateText,
                             callback)
        });

    }
}

function __getMainQuery(params,ouGroupWiseSourceIDs){
    
    ouGroupWiseSourceIDs = ouGroupWiseSourceIDs.reduce((map,obj)=>{
        //if (!obj.sourceids){
          //  map[obj.ougroup] = '0';            
        //}else{
            map[obj.ougroup] = obj.sourceids;
        //}
        return map;
    },[])

    var qb = new (new sqlQueryBuilder()).
        periodWise.
        main(params.startdate,
             params.enddate,
             params.ptype,
             params.attributeOptionComboId,
             params.ouGroupWiseDecocStringMap,
             params.ouGroupUIDKeys,
             params.ouGroupWiseDeListCommaSeparated,
             ouGroupWiseSourceIDs
            );
    

    switch(params.selectedOUGroupUID){
        
    case "-1" : // no group
        if (params.aggregationType == "use_captured"){
            return qb.makeMainQuery(); 
        }
        else if (params.aggregationType == "agg_descendants"){
            return qb.makeMainQuery();
        }
        break
        
    default : // group case
        if (params.aggregationType == "use_captured"){
            return qb.makeMainQuery(); 
        }
        else if (params.aggregationType == "agg_descendants"){
            return qb.makeMainQuery(); 
        }
    }

    
}

function __getSourceIDQuery(params){
    var qb = new (new sqlQueryBuilder()).
        periodWise.
        sourceid(params.selectedOUUID,
                 params.ouGroupUIDKeys,
                 params.selectedOUGroupUID
                );

    switch(params.selectedOUGroupUID){
        
    case "-1" : // no group
        if (params.aggregationType == "use_captured"){
            return qb.
                makeUseCapturedQuery(); 
        }
        else if (params.aggregationType == "agg_descendants"){
            return qb.
                makeGenAggregatedQuery(); 
        }
        break
        
    default : // group case
        if (params.aggregationType == "use_captured"){
            return qb.
                makeOuGroupUseCapturedQuery()
        }
        else if (params.aggregationType == "agg_descendants"){
        return qb.
                makeOuGroupGenAgrgegatedQuery()
        }
    }


}

module.exports = periodWiseProgressiveReport
