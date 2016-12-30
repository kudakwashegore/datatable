//test data
var testData_1 = [ { "company_name":"Medline Industries, Inc.", "product":"Benzalkonium Chloride", "price":"481.63" }, { "company_name":"PD-Rx Pharmaceuticals, Inc.", "product":"Alprazolam", "price":"167.62", "fda_date_approved":"02/12/2015" }, { "company_name":"West-ward Pharmaceutical Corp.", "product":"Flumazenil", "fda_date_approved":"23/04/2015" }, { "company_name":"HyVee Inc", "product":"Aspirin", "price":"218.32", "fda_date_approved":"26/07/2015" }, { "company_name":"Aurobindo Pharma Limited", "product":"carisoprodol", "price":"375.58", "fda_date_approved":"28/11/2014" }, { "company_name":"Apotex Corp", "product":"Risperidone", "price":"213.49", "fda_date_approved":"06/11/2015" }, { "company_name":"Unit Dose Services", "product":"Lovastatin", "price":"169.14", "fda_date_approved":"14/09/2015" }, { "company_name":"Jubilant HollisterStier LLC", "product":"Dog Hair Canis spp.", "fda_date_approved":"31/12/2014" }, { "company_name":"AAA Pharmaceutical, Inc.", "product":"ACETAMINOPHEN, CHLORPHENIRAMINE MALEATE, DEXTROMETHORPHAN HYDROBROMIDE, and PHENYLEPHRINE HYDROCHLORIDE", "price":"183.33", "fda_date_approved":"13/12/2015" }, { "company_name":"AKG Innovations LLC", "product":"AVOBENZONE, OCTINOXATE, OCTISALATE", "fda_date_approved":"22/01/2015" }, { "company_name":"hikma Farmaceutica", "product":"Oxytocin" }, { "company_name":"prime Packaging, Inc.", "product":"Avobenzone, Homosalate, Octisalate, Octocrylene, Oxybenzone", "price":"208.17" }, { "company_name":"Davion, Inc", "product":"Triclosan", "price":"80.30", "fda_date_approved":"13/12/2014" }, { "company_name":"CARDINAL HEALTH", "product":"CARBOXYMETHYLCELLULOSE SODIUM, GLYCERIN", "price":"330.22", "fda_date_approved":"11/08/2015" }, { "company_name":"Amgen Inc", "product":"darbepoetin alfa", "price":"332.28", "fda_date_approved":"01/07/2015" }, { "company_name":"Autumn Harp, Inc.", "product":"Salicylic Acid", "price":"34.43", "fda_date_approved":"25/03/2015" }, { "company_name":"American Regent, Inc.", "product":"sodium phosphate, monobasic, monohydrate and sodium phosphate, dibasic anhydrous", "price":"11.60" }, { "company_name":"J. A. Cosmetics U.S. INC", "product":"TITANIUM DIOXIDE", "price":"130.90", "fda_date_approved":"01/12/2015" }, { "company_name":"NATURE REPUBLIC CO., LTD.", "product":"Titanium Dioxide, OCTINOXATE, Zinc Oxide", "price":"124.48" }, { "company_name":"L. Perrigo Company", "product":"Dextromethorphan Hydrobromide, Guaifenesin", "price":"73.09", "fda_date_approved":"03/02/2016" } ];


var testData_2 = [{ "first_name": "Billy", "last_name": "Campbell", "phone": "62-(500)527-5325" }, { "first_name": "Jonathan", "last_name": "Black", "country": "Russia", "phone": "7-(729)811-4597" }, { "first_name": "cheryl", "last_name": "Harvey", "country": "Indonesia", "phone": "62-(825)454-3810" }, { "first_name": "Cynthia", "last_name": "Cooper" }, { "first_name": "Thomas", "last_name": "Stevens", "phone": "86-(527)535-8464" }, { "first_name": "Jane", "last_name": "Chavez", "country": "Netherlands" }, { "first_name": "bobby", "last_name": "Price", "country": "China", "phone": "86-(898)723-6749" }, { "first_name": "Steve", "last_name": "Hansen", "phone": "93-(362)494-5552" }, { "first_name": "Alan", "last_name": "Cruz", "country": "Philippines", "phone": "63-(617)248-8832" }, { "first_name": "Dennis", "last_name": "Baker", "country": "Iran", "phone": "98-(436)329-3723" }, { "first_name": "Ernest", "last_name": "Bishop", "phone": "86-(566)429-1138" }, { "first_name": "Russell", "last_name": "Meyer", "phone": "62-(687)827-4302" }, { "first_name": "Ryan", "last_name": "Mendoza", "country": "Poland", "phone": "48-(537)109-0373" }, { "first_name": "Maria", "last_name": "Greene", "phone": "92-(831)367-8049" }, { "first_name": "Elizabeth", "last_name": "Moore", "country": "Philippines", "phone": "63-(694)844-9255" }, { "first_name": "Ronald", "last_name": "kim", "phone": "46-(339)931-9221" }, { "first_name": "Samuel", "last_name": "Jacobs", "country": "Russia", "phone": "7-(936)156-5229" }, { "first_name": "Fred", "last_name": "Ross", "phone": "55-(594)481-7354" }, { "first_name": "Andrew", "last_name": "Burns", "country": "Portugal", "phone": "351-(174)443-8706" }, { "first_name": "Robert", "last_name": "Frazier", "country": "Somalia" }];




(function(global){
    "use strict";
    
    //define our data table min library in IIF to avoid conflicts with any other libraries
    function MyDataTable(containerId, data){
            var _this = this;
            _this.server_data = data;               
            _this.tableContainer = document.getElementById(containerId);
            _this.headings = [];
           
            
            //create headings  
            for(var i in data){
                for(var key in data[i]){
                    if(_this.headings.indexOf(key) === -1){
                        _this.headings.push(key);
                    }
                }            
            }
    }    
   
    MyDataTable.prototype.createTable = function(){
        var _this = this;
        
        if(_this.headings.length > 0 && _this.tableContainer){           
            var table = document.createElement('table');
            var headerRow = document.createElement('tr');
            var th, tr, td, text;
            
            //create header row
            for(var heading in _this.headings){               
                th = document.createElement('th');
                th.appendChild(document.createTextNode(_this.headings[heading]));
                headerRow.appendChild(th);
                _this.bindClickSort(th, table);
            }
            
            table.appendChild(headerRow);
            
            
            //create data rows
            for(var i in _this.server_data){
                tr = document.createElement('tr');
                
                //loop through heading and attach data to correct columns in cells
                for(var key in _this.headings){
                        td = document.createElement('td'); 
                        text = _this.server_data[i][_this.headings[key]] ? _this.server_data[i][_this.headings[key]] : "";
                    
                        td.appendChild(document.createTextNode(text));
                        tr.appendChild(td);
                    } 
                
                table.appendChild(tr);
            }

            
            table.setAttribute('border', '1');
            _this.tableContainer.appendChild(table);
        }
    }
    
    //work on click event
    MyDataTable.prototype.bindClickSort = function(element, tableElement){
                var _this = this;
                element.addEventListener("click", function(){
                    var sort_column = element.textContent;

                    _this.server_data.sort(function(a, b){
                        var firstVal = a[sort_column] ? a[sort_column].toLocaleLowerCase() : "";
                        var seconVal = b[sort_column] ? b[sort_column].toLocaleLowerCase() : "";
                        return ((firstVal > seconVal) ? -1 : ((firstVal < seconVal) ? 1 : 0));
                    });   

                    _this.SortTable(tableElement);

                });
            }
    
    //recreate table with sorted data
    MyDataTable.prototype.SortTable = function(tableElement){
                var _this = this;
                _this.tableContainer.removeChild(tableElement);
                _this.createTable();
            }
    
    //attach our MyDataTable object to global object
    global.MyDataTable = MyDataTable;
    
})(window)



//now making use of the library
var dataTable = new MyDataTable("data_table", testData_2);
dataTable.createTable();