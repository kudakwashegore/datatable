//test data
//Data example A
var testData_1 = [ { "company_name":"Medline Industries, Inc.", "product":"Benzalkonium Chloride", "price":"481.63" }, { "company_name":"PD-Rx Pharmaceuticals, Inc.", "product":"Alprazolam", "price":"167.62", "fda_date_approved":"02/12/2015" }, { "company_name":"West-ward Pharmaceutical Corp.", "product":"Flumazenil", "fda_date_approved":"23/04/2015" }, { "company_name":"HyVee Inc", "product":"Aspirin", "price":"218.32", "fda_date_approved":"26/07/2015" }, { "company_name":"Aurobindo Pharma Limited", "product":"carisoprodol", "price":"375.58", "fda_date_approved":"28/11/2014" }, { "company_name":"Apotex Corp", "product":"Risperidone", "price":"213.49", "fda_date_approved":"06/11/2015" }, { "company_name":"Unit Dose Services", "product":"Lovastatin", "price":"169.14", "fda_date_approved":"14/09/2015" }, { "company_name":"Jubilant HollisterStier LLC", "product":"Dog Hair Canis spp.", "fda_date_approved":"31/12/2014" }, { "company_name":"AAA Pharmaceutical, Inc.", "product":"ACETAMINOPHEN, CHLORPHENIRAMINE MALEATE, DEXTROMETHORPHAN HYDROBROMIDE, and PHENYLEPHRINE HYDROCHLORIDE", "price":"183.33", "fda_date_approved":"13/12/2015" }, { "company_name":"AKG Innovations LLC", "product":"AVOBENZONE, OCTINOXATE, OCTISALATE", "fda_date_approved":"22/01/2015" }, { "company_name":"hikma Farmaceutica", "product":"Oxytocin" }, { "company_name":"prime Packaging, Inc.", "product":"Avobenzone, Homosalate, Octisalate, Octocrylene, Oxybenzone", "price":"208.17" }, { "company_name":"Davion, Inc", "product":"Triclosan", "price":"80.30", "fda_date_approved":"13/12/2014" }, { "company_name":"CARDINAL HEALTH", "product":"CARBOXYMETHYLCELLULOSE SODIUM, GLYCERIN", "price":"330.22", "fda_date_approved":"11/08/2015" }, { "company_name":"Amgen Inc", "product":"darbepoetin alfa", "price":"332.28", "fda_date_approved":"01/07/2015" }, { "company_name":"Autumn Harp, Inc.", "product":"Salicylic Acid", "price":"34.43", "fda_date_approved":"25/03/2015" }, { "company_name":"American Regent, Inc.", "product":"sodium phosphate, monobasic, monohydrate and sodium phosphate, dibasic anhydrous", "price":"11.60" }, { "company_name":"J. A. Cosmetics U.S. INC", "product":"TITANIUM DIOXIDE", "price":"130.90", "fda_date_approved":"01/12/2015" }, { "company_name":"NATURE REPUBLIC CO., LTD.", "product":"Titanium Dioxide, OCTINOXATE, Zinc Oxide", "price":"124.48" }, { "company_name":"L. Perrigo Company", "product":"Dextromethorphan Hydrobromide, Guaifenesin", "price":"73.09", "fda_date_approved":"03/02/2016" } ];

/*********end of static test data definition*********/

//creating a reusable min library to do all the job
(function(global){
    "use strict";
    
    //define our data table min library in IIF to avoid conflicts with any other libraries
    function MyDataTable(containerId, data){ 
            //initialising member variables
            var _this = this;
            _this.server_data = data;               
            _this.tableContainer = document.getElementById(containerId);
            _this.headings = [];
           
            
            //build array of headings from data properties
            for(var i in data){
                for(var key in data[i]){
                    if(_this.headings.indexOf(key) === -1){
                        _this.headings.push(key);
                    }
                }            
            }
    }    
   
    //function to build and bind data to table
    MyDataTable.prototype.createTable = function(){
        var _this = this;
        
        //start building the table
        if(_this.headings.length > 0 && _this.tableContainer){           
            var table = document.createElement('table');
            var headerRow = document.createElement('tr');
            var th, tr, td, text;
            
            //create header row
            for(var heading in _this.headings){               
                th = document.createElement('th');
                th.appendChild(document.createTextNode(_this.headings[heading]));
                
                //done append header to row
                headerRow.appendChild(th);
                
                //bind click event to current th for sorting
                _this.bindClickSort(th, table);
            }
            
            //eppennd headerow to table
            table.appendChild(headerRow);
            
            
            //no building the rest of the table, 
            //create data cells in rows
            for(var i in _this.server_data){
                tr = document.createElement('tr');
                
                //loop through heading and attach data to correct columns in cells
                for(var key in _this.headings){
                        td = document.createElement('td'); 
                        text = _this.server_data[i][_this.headings[key]] ? _this.server_data[i][_this.headings[key]] : "";
                        
                        td.appendChild(document.createTextNode(text));
                        tr.appendChild(td);
                    } 
                
                //current row building done, attach row to table
                table.appendChild(tr);
            }

            
            //set border to table 
            table.setAttribute('border', '1');
            
            //done building the table, now attach table to given container
            _this.tableContainer.appendChild(table);
        }
    }
    
    //bind table headers to click event
    MyDataTable.prototype.bindClickSort = function(element, tableElement){
                var _this = this;
        
                //bind click event to element
                element.addEventListener("click", function(){
                    
                    //grab text to use as property name to sort with
                    var sort_column = element.textContent;
                    
                    //sort data according to clicked colums
                    _this.server_data.sort(function(a, b){
                        var firstVal = a[sort_column] ? a[sort_column].toLocaleLowerCase() : "";
                        var seconVal = b[sort_column] ? b[sort_column].toLocaleLowerCase() : "";
                        
                        //check if sorting list of dates
                        if(_this.isDate(firstVal) || _this.isDate(seconVal)){
                            return _this.toInterDateFormat(seconVal) - _this.toInterDateFormat(firstVal);
                        }                            
                        //check if not sorting list of numbers
                        else if(isNaN(firstVal) || isNaN(seconVal))
                            return ((firstVal > seconVal) ? -1 : ((firstVal < seconVal) ? 1 : 0));
                        //its a list of numbers
                        else
                            return seconVal - firstVal;
                    });   
                    
                    //data array now sorted, rebuild sorted table
                    _this.sortTable(tableElement);

                });
            }
    
    //recreate table with sorted data
    MyDataTable.prototype.sortTable = function(tableElement){
                var _this = this;
                
                //remove old table
                _this.tableContainer.removeChild(tableElement);
                
                //create a fresh table
                _this.createTable();
            }
    
    //test if valid date with format DD/MM/YYYY as per test data
    //but we could test for different expected date formarts here
    MyDataTable.prototype.isDate = function(date_string){         
        if(date_string && date_string.match(/^\d{2}\/\d{2}\/\d{4}$/) !== null){
            return true;
        }
        
        return false;
    }
    
    //convert DD/MM/YYYY date to standard date format MM/DD/YYYY
    MyDataTable.prototype.toInterDateFormat = function(dateString){        
        var dateSplit = dateString.split("/");  
        //check if date is in 3 parts
        //we can test for a number of cases here to check if dateString is in the format we expect
        if(dateSplit.length === 3)
            return new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]);
        else{            
            return new Date("0000");
        }
    }
    
    
    //attach MyDataTable object to global object
    global.MyDataTable = MyDataTable;
    
})(window)




/************end of mini library*************/

//now making use of the library, this can go in another js file

//create a MyDataTable object
//if loading from a live server, ajax calls can also be done here and the following code block can be wrapped inside an ajax requests call
//for testing purposes, will pass static testData_1 from "Data example A"
var dataTable = new MyDataTable("data_table", testData_1);
dataTable.createTable();