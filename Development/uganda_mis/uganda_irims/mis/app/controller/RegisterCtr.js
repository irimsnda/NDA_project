Ext.define('Admin.view.registers.viewcontroller.RegisterCtr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.registerctr',
   

    init: function () {
    
    },
    
    setWorkflowCombosStore: function (obj, options) {
        this.fireEvent('setWorkflowCombosStore', obj, options);
    },
    setOrgConfigCombosStore: function (obj, options) {
        this.fireEvent('setOrgConfigCombosStore', obj, options);
    },
      setConfigCombosStore: function (obj, options) {
        this.fireEvent('setConfigCombosStore', obj, options);
    },

    setConfigGridsStore: function (obj, options) {
        this.fireEvent('setConfigGridsStore', obj, options);
    },
 
   
    func_setStore: function(me,options){
       var config = options.config,
           isLoad = options.isLoad,
           store = Ext.create('Admin.store.common.CommonGridAbstractStore', config);
           me.setStore(store); 
       if (isLoad === true || isLoad == true) {
          store.removeAll();
          store.load();
        }
    },
   

  pickFirstEntryOnCombo:function(combo) {
      console.log(combo.getStore().getAt(1));
           combo.setValue(combo.getStore().getAt(0));
   },
    loadClassAndCategoryCombo: function(combo,newValue,old,eopt) {
     var form = combo.up('form'),
       classCombo = form.down('combo[name=prodclass_category]'),
       catCombo = form.down('combo[name=classification_category]');
         
         

      if(newValue!=0){
         var filter = {'section_id':newValue};
         var filters = JSON.stringify(filter);
         var store = classCombo.getStore();
         var store2 = catCombo.getStore();
         store.removeAll();
         store2.removeAll();
         store.load({params:{filters:filters}});
         store2.load({params:{filters:filters}});
      }else{
         var store=classCombo.getStore();
         var store2=catCombo.getStore();
         store2.removeAll();
         store.removeAll();
         store2.load();
         store.load();
      }
          
   },
       loadBusinessTypeDetailsCombo: function(combo,newValue,old,eopt) {

      var form=combo.up('form'),
      businessCombo=form.down('combo[name=business_type_details]'),
      section_id= form.down('combo[name=section_id]').getValue();
      
        if(section_id !=0){
          var filter = {'section_id':section_id};
          var filters = JSON.stringify(filter);
          var filters = JSON.stringify(filter);
          var store=businessCombo.getStore();
          store.removeAll();
          store.load({params:{filters:filters}});
         }
         else{
          var store=businessCombo.getStore();
          store.removeAll();
          store.load();
         }
     },

   func_LoadClassificationCombo: function(combo,newValue,old,eopt) {
      var form=combo.up('form'),
      catCombo=form.down('combo[name=classification_category]'),
      section_id= form.down('combo[name=section_id]').getValue();
      if(newValue!=0){
       var filter = {'prodclass_category_id':newValue};
       var filters = JSON.stringify(filter);
       var store=catCombo.getStore();
       store.removeAll();
       store.load({params:{filters:filters}});
      }else{
        if(section_id !=0){
          var filter = {'section_id':section_id};
          var filters = JSON.stringify(filter);
          var filters = JSON.stringify(filter);
          var store=catCombo.getStore();
          store.removeAll();
          store.load({params:{filters:filters}});
         }
         else{
          var store=catCombo.getStore();
          store.removeAll();
          store.load();
         }
        
      }
     
     },
      loadPermitTypeCombo: function(combo,newValue,old,eopt) {
      var form=combo.up('form'),
      permitCombo=form.down('combo[name=permit_type]'),
      sub_module_id= form.down('combo[name=sub_module_id]').getValue();
      
        if(sub_module_id !=0){
          var filter = {'sub_module_id':sub_module_id};
          var filters = JSON.stringify(filter);
          var filters = JSON.stringify(filter);
          var store=permitCombo.getStore();
          store.removeAll();
          store.load({params:{filters:filters}});
         }
         else{
          var store=permitCombo.getStore();
          store.removeAll();
          store.load();
         }
     },
   
   loadProductRegisterFilters: function (btn) {
      var grid = btn.up('form'),
        sub_module_id = grid.down('combo[name=sub_module_id]').getValue(),
        prodclass_category = grid.down('combo[name=prodclass_category]').getValue(),
        section_id = grid.down('combo[name=section_id]').getValue(),
        classification_category = grid.down('combo[name=classification_category]').getValue(),
        approved_from = grid.down('datefield[name=approved_from]').getValue(),
        approved_to = grid.down('datefield[name=approved_to]').getValue(),
        panel = grid.up('panel'),
        gridStr = panel.down('productregistergrid').getStore();

        module_id=panel.down('hiddenfield[name=module_id]').getValue();

        gridStr.removeAll();
        gridStr.load({
            params:{
                sub_module_id:sub_module_id,
                module_id: module_id,
                section_id: section_id,
                classification_category: classification_category,
                approved_from: approved_from,
                approved_to: approved_to,
                prodclass_category: prodclass_category

                },
                  
            });
               
    },

    exportProductRegister: function(btn) {
        var panel=btn.up('panel'),
        filter=panel.down('form'),
        grid = panel.down('productregistergrid'),
        filterfield = grid.getPlugin('filterfield');       
        var filter_array =Ext.pluck(filterfield.getgridFilters(grid), 'config'),
        sub_module_id = filter.down('combo[name=sub_module_id]').getValue(),
        section_id = filter.down('combo[name=section_id]').getValue(),
        approved_from = filter.down('datefield[name=approved_from]').getValue(),
        approved_to = filter.down('textfield[name=approved_to]').getValue();
        approved_from = Ext.Date.format(approved_from,'Y-m-d');   
        approved_to = Ext.Date.format(approved_to,'Y-m-d'); 
       
             //hidden value
        module_id=panel.down('hiddenfield[name=module_id]').getValue();

        Ext.getBody().mask('Exporting...Please wait...');
                
        Ext.Ajax.request({
            url: 'registers/exportProductRegister',
            method: 'GET',
            headers: {
                 'Authorization':'Bearer '+access_token
                     },
            params : {
                 'section_id': section_id,
                 'module_id': module_id,
                 'sub_module_id': sub_module_id,
                 'approved_from': approved_from,
                 'approved_to': approved_to,
                 'filter': JSON.stringify(filter_array)
        
                 },
                          
          success: function (response, textStatus, request) {
                Ext.getBody().unmask();
                var t = JSON.parse(response.responseText);
                console.log(t.status);
                if (t.status == 'sucesss' || t.status === 'success' ) {
                var a = document.createElement("a");
                a.href = t.file; 
                a.download = t.name;
                document.body.appendChild(a);

                a.click();
                         
                a.remove();

                } else {
            toastr.error(t.message, 'Warning Response');
            }
          
            },
            failure: function(conn, response, options, eOpts) {
                Ext.getBody().unmask();
                Ext.Msg.alert('Error', 'please try again');
            }
           });
        },

    printProductGazzete: function(btn) {
        var panel=btn.up('panel'),
        filter=panel.down('form'),
        grid = panel.down('productregistergrid'),
        filterfield = grid.getPlugin('filterfield');       
        var filter_array =Ext.pluck(filterfield.getgridFilters(grid), 'config'),
        sub_module_id = filter.down('combo[name=sub_module_id]').getValue(),
        section_id = filter.down('combo[name=section_id]').getValue(),
        approved_from = filter.down('datefield[name=approved_from]').getValue(),
        approved_to = filter.down('textfield[name=approved_to]').getValue();
        approved_from = Ext.Date.format(approved_from,'Y-m-d');   
        approved_to = Ext.Date.format(approved_to,'Y-m-d'); 
       
        module_id=panel.down('hiddenfield[name=module_id]').getValue();

        Ext.Ajax.request({
           url: 'registers/checkPrintProductGazzete',
            method: 'GET',
            headers: {
                 'Authorization':'Bearer '+access_token
                     },
            params : {
                 'section_id': section_id,
                 'module_id': module_id,
                 'sub_module_id': sub_module_id,
                 'approved_from': approved_from,
                 'approved_to': approved_to,
                 'filter': JSON.stringify(filter_array)
        
                 },
            success: function (response) {
                var resp = JSON.parse(response.responseText);
                 if (resp.status == 'sucesss' || resp.status === 'success' ) {
                  print_report('registers/printProductGazzete?sub_module_id='+sub_module_id+'&section_id='+section_id+'&approved_to='+approved_to+'&approved_from='+approved_from+'&module_id='+module_id+'&filter='+encodeURIComponent(JSON.stringify(filter_array)));
                }
                else{
                     toastr.error(resp.message, 'Warning Response');
                }
               
            },
            failure: function (response) {
                 
            },
            error: function (jqXHR, textStatus, errorThrown) {
              
            }
        });
       
         
     },



  
loadPremisesRegisterFilters: function (btn) {
    
      var grid = btn.up('form'),
        sub_module_id = grid.down('combo[name=sub_module_id]').getValue(),
        section_id = grid.down('combo[name=section_id]').getValue(),
        business_type_details=grid.down('combo[name=business_type_details]').getValue(),
        approved_from = grid.down('datefield[name=approved_from]').getValue(),
        approved_to = grid.down('datefield[name=approved_to]').getValue(),
        panel = grid.up('panel'),
        gridStr = panel.down('premisesregistergrid').getStore();

        module_id=panel.down('hiddenfield[name=module_id]').getValue();

        gridStr.removeAll();
        gridStr.load({
            params:{
                sub_module_id:sub_module_id,
                section_id:section_id,
                module_id: module_id,
                business_type_details: business_type_details,
                approved_from: approved_from,
                approved_to: approved_to,
                

                },
                  
            });
               
    },
    exportPremiseRegister: function(btn) {
        var panel=btn.up('panel'),
        filter=panel.down('form'),
        grid = panel.down('premisesregistergrid'),
        filterfield = grid.getPlugin('filterfield');       
        var filter_array =Ext.pluck(filterfield.getgridFilters(grid), 'config'),
        sub_module_id = filter.down('combo[name=sub_module_id]').getValue(),
        section_id = filter.down('combo[name=section_id]').getValue(),
        business_type_details=filter.down('combo[name=business_type_details]').getValue(),
        approved_from = filter.down('datefield[name=approved_from]').getValue(),
        approved_to = filter.down('textfield[name=approved_to]').getValue();
        approved_from = Ext.Date.format(approved_from,'Y-m-d');   
        approved_to = Ext.Date.format(approved_to,'Y-m-d'); 
        console.log(section_id);
             //hidden value
        module_id=panel.down('hiddenfield[name=module_id]').getValue();

       
        Ext.getBody().mask('Exporting...Please wait...');
                
        Ext.Ajax.request({
            url: 'registers/exportPremiseRegister',
            method: 'GET',
            headers: {
                 'Authorization':'Bearer '+access_token
                     },
            params : {
                 'module_id': module_id,
                 'sub_module_id': sub_module_id,
                 'section_id':section_id,
                 'business_type_details': business_type_details,
                 'approved_from': approved_from,
                 'approved_to': approved_to,
                 'filter': JSON.stringify(filter_array)
        
                 },
                          
            success: function (response, textStatus, request) {
                Ext.getBody().unmask();
                var t = JSON.parse(response.responseText);
                console.log(t.status);
                if (t.status == 'sucesss' || t.status === 'success' ) {
                var a = document.createElement("a");
                a.href = t.file; 
                a.download = t.name;
                document.body.appendChild(a);

                a.click();
                         
                a.remove();

                } else {
            toastr.error(t.message, 'Warning Response');
            }
          
            },
            failure: function(conn, response, options, eOpts) {
                Ext.getBody().unmask();
                Ext.Msg.alert('Error', 'please try again');
            }
           });
     
        },
    printPremisesRegister: function(btn) {
        var panel=btn.up('panel'),
        filter=panel.down('form'),
        grid = panel.down('premisesregistergrid'),
        filterfield = grid.getPlugin('filterfield');       
        var filter_array =Ext.pluck(filterfield.getgridFilters(grid), 'config'),
        sub_module_id = filter.down('combo[name=sub_module_id]').getValue(),
        section_id = filter.down('combo[name=section_id]').getValue(),
        business_type_details=filter.down('combo[name=business_type_details]').getValue(),
        approved_from = filter.down('datefield[name=approved_from]').getValue(),
        approved_to = filter.down('textfield[name=approved_to]').getValue();
        approved_from = Ext.Date.format(approved_from,'Y-m-d');   
        approved_to = Ext.Date.format(approved_to,'Y-m-d'); 
       
             //hidden value
        module_id=panel.down('hiddenfield[name=module_id]').getValue();

        Ext.Ajax.request({
           url: 'registers/checkPrintPremisesRegister',
            method: 'GET',
            headers: {
                 'Authorization':'Bearer '+access_token
                     },
            params : {
                 'module_id': module_id,
                 'sub_module_id': sub_module_id,
                 'section_id':section_id,
                 'business_type_details': business_type_details,
                 'approved_from': approved_from,
                 'approved_to': approved_to,
                 'filter': JSON.stringify(filter_array)
        
                 },
            success: function (response) {
                var resp = JSON.parse(response.responseText);
                 if (resp.status == 'sucesss' || resp.status === 'success' ) {
                  
                   print_report('registers/printPremisesRegister?sub_module_id='+sub_module_id+'&section_id='+section_id+'&business_type_details='+business_type_details+'&filename='+btn.filename+'&heading='+btn.heading+'$title='+btn.title+'&approved_to='+approved_to+'&approved_from='+approved_from+'&module_id='+module_id+'&filename='+btn.filename+'&heading='+btn.heading+'&title='+btn.title+'&filter='+encodeURIComponent(JSON.stringify(filter_array)));
    
               }
                else{
                     toastr.error(resp.message, 'Warning Response');
                }
               
            },
            failure: function (response) {
                 
            },
            error: function (jqXHR, textStatus, errorThrown) {
              
            }
        });
       
         
     },
       
    

loadGmpRegisterFilters: function (btn) {
    
      var grid = btn.up('form'),
        sub_module_id = grid.down('combo[name=sub_module_id]').getValue(),
        gmp_location=grid.down('combo[name=gmp_location]').getValue(),
        approved_from = grid.down('datefield[name=approved_from]').getValue(),
        approved_to = grid.down('datefield[name=approved_to]').getValue(),
        panel = grid.up('panel'),
        gridStr = panel.down('gmpregistergrid').getStore();

        module_id=panel.down('hiddenfield[name=module_id]').getValue();
        
        gridStr.removeAll();
        gridStr.load({
            params:{
                sub_module_id:sub_module_id,
                module_id: module_id,
                gmp_location: gmp_location,
                approved_from: approved_from,
                approved_to: approved_to,
                

                },
                  
            });
               
    },
  exportGmpRegister: function(btn) {
        var panel=btn.up('panel'),
        filter=panel.down('form'),
        grid = panel.down('gmpregistergrid'),
        filterfield = grid.getPlugin('filterfield');       
        var filter_array =Ext.pluck(filterfield.getgridFilters(grid), 'config'),
        sub_module_id = filter.down('combo[name=sub_module_id]').getValue(),
        section_id = filter.down('combo[name=section_id]').getValue(),
        gmp_location=filter.down('combo[name=gmp_location]').getValue(),
        approved_from = filter.down('datefield[name=approved_from]').getValue(),
        approved_to = filter.down('textfield[name=approved_to]').getValue();
        approved_from = Ext.Date.format(approved_from,'Y-m-d');   
        approved_to = Ext.Date.format(approved_to,'Y-m-d'); 
       
        module_id=panel.down('hiddenfield[name=module_id]').getValue();

      
        Ext.getBody().mask('Exporting...Please wait...');
                
        Ext.Ajax.request({
            url: 'registers/exportGmpRegister',
            method: 'GET',
            headers: {
                 'Authorization':'Bearer '+access_token
                     },
            params : {
                 'module_id': module_id,
                 'sub_module_id': sub_module_id,
                 'section_id':section_id,
                 'gmp_location': gmp_location,
                 'approved_from': approved_from,
                 'approved_to': approved_to,
                 'filter': JSON.stringify(filter_array)
        
                 },
                          
           success: function (response, textStatus, request) {
                Ext.getBody().unmask();
                var t = JSON.parse(response.responseText);
                console.log(t.status);
                if (t.status == 'sucesss' || t.status === 'success' ) {
                var a = document.createElement("a");
                a.href = t.file; 
                a.download = t.name;
                document.body.appendChild(a);

                a.click();
                         
                a.remove();

                } else {
            toastr.error(t.message, 'Warning Response');
            }
          
            },
            failure: function(conn, response, options, eOpts) {
                Ext.getBody().unmask();
                Ext.Msg.alert('Error', 'please try again');
            }
           });
      
        },
       printGmpRegister: function(btn) {
        var panel=btn.up('panel'),
        filter=panel.down('form'),
        grid = panel.down('gmpregistergrid'),
        filterfield = grid.getPlugin('filterfield');       
        var filter_array =Ext.pluck(filterfield.getgridFilters(grid), 'config'),
        sub_module_id = filter.down('combo[name=sub_module_id]').getValue(),
        section_id = filter.down('combo[name=section_id]').getValue(),
        gmp_location=filter.down('combo[name=gmp_location]').getValue(),
        approved_from = filter.down('datefield[name=approved_from]').getValue(),
        approved_to = filter.down('textfield[name=approved_to]').getValue();
        approved_from = Ext.Date.format(approved_from,'Y-m-d');   
        approved_to = Ext.Date.format(approved_to,'Y-m-d'); 
       
             //hidden value
        module_id=panel.down('hiddenfield[name=module_id]').getValue();

        Ext.Ajax.request({
           url: 'registers/checkPrintGmpRegister',
            method: 'GET',
            headers: {
                 'Authorization':'Bearer '+access_token
                     },
            params : {
                 'module_id': module_id,
                 'sub_module_id': sub_module_id,
                 'section_id':section_id,
                 'gmp_location': gmp_location,
                 'approved_from': approved_from,
                 'approved_to': approved_to,
                 'filter': JSON.stringify(filter_array)
        
                 },
            success: function (response) {
                var resp = JSON.parse(response.responseText);
                 if (resp.status == 'sucesss' || resp.status === 'success' ) {
                  
                   print_report('registers/printGmpRegister?sub_module_id='+sub_module_id+'&section_id='+section_id+'&gmp_location='+gmp_location+'&approved_to='+approved_to+'&approved_from='+approved_from+'&module_id='+module_id+'&filter='+encodeURIComponent(JSON.stringify(filter_array)));
    
      
               }
                else{
                     toastr.error(resp.message, 'Warning Response');
                }
               
            },
            failure: function (response) {
                 
            },
            error: function (jqXHR, textStatus, errorThrown) {
              
            }
        });
       
         
     },
       
     
  loadClinicalTrialReportFilters: function (btn) {
      var grid = btn.up('form'),
        sub_module_id = grid.down('combo[name=sub_module_id]').getValue(),
        approved_from = grid.down('datefield[name=approved_from]').getValue(),
        approved_to = grid.down('datefield[name=approved_to]').getValue(),
        panel = grid.up('panel'),
        gridStr = panel.down('clinicaltrialregistergrid').getStore();

        module_id=panel.down('hiddenfield[name=module_id]').getValue();

        gridStr.removeAll();
        gridStr.load({
            params:{
                sub_module_id:sub_module_id,
                module_id: module_id,
                approved_from: approved_from,
                approved_to: approved_to,
                

                },
                  
            });
               
    },
    exportClinicalTrialRegister: function (btn) {
       var panel=btn.up('panel'),
        filter=panel.down('form'),
        grid = panel.down('clinicaltrialregistergrid'),
        filterfield = grid.getPlugin('filterfield');       
        var filter_array =Ext.pluck(filterfield.getgridFilters(grid), 'config'),
        sub_module_id = filter.down('combo[name=sub_module_id]').getValue(),
        approved_from = filter.down('datefield[name=approved_from]').getValue(),
        approved_to = filter.down('textfield[name=approved_to]').getValue();
        approved_from = Ext.Date.format(approved_from,'Y-m-d');   
        approved_to = Ext.Date.format(approved_to,'Y-m-d'); 
       
             //hidden value
        module_id=panel.down('hiddenfield[name=module_id]').getValue();

        Ext.getBody().mask('Exporting...Please wait...');
                
        Ext.Ajax.request({
            url: 'registers/exportClinicalTrialRegister',
            method: 'GET',
            headers: {
                 'Authorization':'Bearer '+access_token
                     },
            params : {
                 'module_id': module_id,
                 'sub_module_id': sub_module_id,
                 'approved_from': approved_from,
                 'approved_to': approved_to,
                 'filter': JSON.stringify(filter_array)
        
                 },
                          
            success: function (response, textStatus, request) {
                Ext.getBody().unmask();
                var t = JSON.parse(response.responseText);
                console.log(t.status);
                if (t.status == 'sucesss' || t.status === 'success' ) {
                var a = document.createElement("a");
                a.href = t.file; 
                a.download = t.name;
                document.body.appendChild(a);

                a.click();
                         
                a.remove();

                } else {
            toastr.error(t.message, 'Warning Response');
            }
          
            },
            failure: function(conn, response, options, eOpts) {
                Ext.getBody().unmask();
                Ext.Msg.alert('Error', 'please try again');
            }
           });
      
        },
    printClinicalTrialRegister: function(btn) {
        var panel=btn.up('panel'),
        filter=panel.down('form'),
        grid = panel.down('clinicaltrialregistergrid'),
        filterfield = grid.getPlugin('filterfield');       
        var filter_array =Ext.pluck(filterfield.getgridFilters(grid), 'config'),
        sub_module_id = filter.down('combo[name=sub_module_id]').getValue(),
        approved_from = filter.down('datefield[name=approved_from]').getValue(),
        approved_to = filter.down('textfield[name=approved_to]').getValue();
        approved_from = Ext.Date.format(approved_from,'Y-m-d');   
        approved_to = Ext.Date.format(approved_to,'Y-m-d'); 
       
             //hidden value
        module_id=panel.down('hiddenfield[name=module_id]').getValue();

        Ext.Ajax.request({
           url: 'registers/checkPrintClinicalTrialRegister',
            method: 'GET',
            headers: {
                 'Authorization':'Bearer '+access_token
                     },
            params : {
                 'module_id': module_id,
                 'sub_module_id': sub_module_id,
                 'approved_from': approved_from,
                 'approved_to': approved_to,
                 'filter': JSON.stringify(filter_array)
        
                 },
            success: function (response) {
                var resp = JSON.parse(response.responseText);
                 if (resp.status == 'sucesss' || resp.status === 'success' ) {
                   
                     print_report('registers/printClinicalTrialRegister?sub_module_id='+sub_module_id+'&approved_to='+approved_to+'&approved_from='+approved_from+'&module_id='+module_id+'&filter='+encodeURIComponent(JSON.stringify(filter_array)));
    
                }
                else{
                     toastr.error(resp.message, 'Warning Response');
                }
               
            },
            failure: function (response) {
                 
            },
            error: function (jqXHR, textStatus, errorThrown) {
              
            }
        });
       
         
     },
       
    

      loadDisposalReportFilters: function (btn) {
      var grid = btn.up('form'),
        sub_module_id = grid.down('combo[name=sub_module_id]').getValue(),
        approved_from = grid.down('datefield[name=approved_from]').getValue(),
        approved_to = grid.down('datefield[name=approved_to]').getValue(),
        panel = grid.up('panel'),
        gridStr = panel.down('disposalregistergrid').getStore();

        module_id=panel.down('hiddenfield[name=module_id]').getValue();

        gridStr.removeAll();
        gridStr.load({
            params:{
                sub_module_id:sub_module_id,
                module_id: module_id,
                approved_from: approved_from,
                approved_to: approved_to,
                

                },
                  
            });
               
    },
     exportDisposalRegister: function (btn) {
        var panel=btn.up('panel'),
        filter=panel.down('form'),
        grid = panel.down('disposalregistergrid'),
        filterfield = grid.getPlugin('filterfield');       
        var filter_array =Ext.pluck(filterfield.getgridFilters(grid), 'config'),
        sub_module_id = filter.down('combo[name=sub_module_id]').getValue(),
        section_id = filter.down('combo[name=section_id]').getValue(),
        approved_from = filter.down('datefield[name=approved_from]').getValue(),
        approved_to = filter.down('textfield[name=approved_to]').getValue();
        approved_from = Ext.Date.format(approved_from,'Y-m-d');   
        approved_to = Ext.Date.format(approved_to,'Y-m-d'); 
       
             //hidden value
        module_id=panel.down('hiddenfield[name=module_id]').getValue();

        Ext.getBody().mask('Exporting...Please wait...');
                
        Ext.Ajax.request({
            url: 'registers/exportDisposalRegister',
            method: 'GET',
            headers: {
                 'Authorization':'Bearer '+access_token
                     },
            params : {
                 'module_id': module_id,
                 'sub_module_id': sub_module_id,
                 'section_id':section_id,
                 'approved_from': approved_from,
                 'approved_to': approved_to,
                 'filter': JSON.stringify(filter_array)
        
                 },
              success: function (response, textStatus, request) {
                Ext.getBody().unmask();
                var t = JSON.parse(response.responseText);
                console.log(t.status);
                if (t.status == 'sucesss' || t.status === 'success' ) {
                var a = document.createElement("a");
                a.href = t.file; 
                a.download = t.name;
                document.body.appendChild(a);

                a.click();
                         
                a.remove();

                } else {
            toastr.error(t.message, 'Warning Response');
            }
          
            },
            failure: function(conn, response, options, eOpts) {
                Ext.getBody().unmask();
                Ext.Msg.alert('Error', 'please try again');
            }
           });
        },
    printDisposalRegister: function(btn) {
        var panel=btn.up('panel'),
        filter=panel.down('form'),
        grid = panel.down('disposalregistergrid'),
        filterfield = grid.getPlugin('filterfield');       
        var filter_array =Ext.pluck(filterfield.getgridFilters(grid), 'config'),
        sub_module_id = filter.down('combo[name=sub_module_id]').getValue(),
        section_id = filter.down('combo[name=section_id]').getValue(),
        approved_from = filter.down('datefield[name=approved_from]').getValue(),
        approved_to = filter.down('textfield[name=approved_to]').getValue();
        approved_from = Ext.Date.format(approved_from,'Y-m-d');   
        approved_to = Ext.Date.format(approved_to,'Y-m-d'); 
       
             //hidden value
        module_id=panel.down('hiddenfield[name=module_id]').getValue();

         Ext.Ajax.request({
           url: 'registers/checkPrintDisposalRegister',
            method: 'GET',
            headers: {
                 'Authorization':'Bearer '+access_token
                     },
            params : {
                 'module_id': module_id,
                 'sub_module_id': sub_module_id,
                 'section_id':section_id,
                 'approved_from': approved_from,
                 'approved_to': approved_to,
                 'filter': JSON.stringify(filter_array)
        
                 },
            success: function (response) {
                var resp = JSON.parse(response.responseText);
                 if (resp.status == 'sucesss' || resp.status === 'success' ) {
                   print_report('registers/printDisposalRegister?sub_module_id='+sub_module_id+'&section_id='+section_id+'&approved_to='+approved_to+'&approved_from='+approved_from+'&module_id='+module_id+'&filter='+encodeURIComponent(JSON.stringify(filter_array)));
    
                }
                else{
                     toastr.error(resp.message, 'Warning Response');
                }
               
            },
            failure: function (response) {
                 
            },
            error: function (jqXHR, textStatus, errorThrown) {
              
            }
        });
       
         
     },
       

    loadProtionAdvertisementRegisterFilters: function (btn) {
      var grid = btn.up('form'),
        sub_module_id = grid.down('combo[name=sub_module_id]').getValue(),
        section_id = grid.down('combo[name=section_id]').getValue(),
        advertisement_type_id = grid.down('combo[name=advertisement_type_id]').getValue(),
        approved_from = grid.down('datefield[name=approved_from]').getValue(),
        approved_to = grid.down('datefield[name=approved_to]').getValue(),
        panel = grid.up('panel'),
        gridStr = panel.down('promotionadvertisementregistergrid').getStore();

        module_id=panel.down('hiddenfield[name=module_id]').getValue();

        gridStr.removeAll();
        gridStr.load({
            params:{
                module_id: module_id,
                section_id:section_id,
                sub_module_id:sub_module_id,
                advertisement_type_id: advertisement_type_id,
                approved_from: approved_from,
                approved_to: approved_to,
                

                },
                  
            });
               
    },
  exportPromotionAdvertisementRegister: function (btn) {
       var panel=btn.up('panel'),
        filter=panel.down('form'),
        grid = panel.down('promotionadvertisementregistergrid'),
        filterfield = grid.getPlugin('filterfield');       
        var filter_array =Ext.pluck(filterfield.getgridFilters(grid), 'config'),
        sub_module_id = filter.down('combo[name=sub_module_id]').getValue(),
        section_id = filter.down('combo[name=section_id]').getValue(),
        advertisement_type_id = filter.down('combo[name=advertisement_type_id]').getValue(),
        approved_from = filter.down('datefield[name=approved_from]').getValue(),
        approved_to = filter.down('textfield[name=approved_to]').getValue();
        approved_from = Ext.Date.format(approved_from,'Y-m-d');   
        approved_to = Ext.Date.format(approved_to,'Y-m-d'); 
       
             //hidden value
        module_id=panel.down('hiddenfield[name=module_id]').getValue();

   
        Ext.getBody().mask('Exporting...Please wait...');
                
        Ext.Ajax.request({
            url: 'registers/exportPromotionAdvertisementRegister',
            method: 'GET',
            headers: {
                 'Authorization':'Bearer '+access_token
                     },
            params : {
                 'module_id': module_id,
                 'sub_module_id': sub_module_id,
                 'section_id':section_id,
                 'advertisement_type_id': advertisement_type_id,
                 'approved_from': approved_from,
                 'approved_to': approved_to,
                 'filter': JSON.stringify(filter_array)
        
                 },
                          
            success: function (response, textStatus, request) {
                Ext.getBody().unmask();
                var t = JSON.parse(response.responseText);
                console.log(t.status);
                if (t.status == 'sucesss' || t.status === 'success' ) {
                var a = document.createElement("a");
                a.href = t.file; 
                a.download = t.name;
                document.body.appendChild(a);

                a.click();
                         
                a.remove();

                } else {
            toastr.error(t.message, 'Warning Response');
            }
          
            },
            failure: function(conn, response, options, eOpts) {
                Ext.getBody().unmask();
                Ext.Msg.alert('Error', 'please try again');
            }
           });
     
        },

  printPromotionAdvertisementRegister: function(btn) {
        var panel=btn.up('panel'),
        filter=panel.down('form'),
        grid = panel.down('promotionadvertisementregistergrid'),
        filterfield = grid.getPlugin('filterfield');       
        var filter_array =Ext.pluck(filterfield.getgridFilters(grid), 'config'),
        sub_module_id = filter.down('combo[name=sub_module_id]').getValue(),
        section_id = filter.down('combo[name=section_id]').getValue(),
        advertisement_type_id = filter.down('combo[name=advertisement_type_id]').getValue(),
        approved_from = filter.down('datefield[name=approved_from]').getValue(),
        approved_to = filter.down('textfield[name=approved_to]').getValue();
        approved_from = Ext.Date.format(approved_from,'Y-m-d');   
        approved_to = Ext.Date.format(approved_to,'Y-m-d'); 
       
             //hidden value
        module_id=panel.down('hiddenfield[name=module_id]').getValue();

        Ext.Ajax.request({
           url: 'registers/checkPrintPromotionAdvertisementRegister',
            method: 'GET',
            headers: {
                 'Authorization':'Bearer '+access_token
                     },
            params : {
                 'module_id': module_id,
                 'sub_module_id': sub_module_id,
                 'section_id':section_id,
                 'advertisement_type_id': advertisement_type_id,
                 'approved_from': approved_from,
                 'approved_to': approved_to,
                 'filter': JSON.stringify(filter_array)
        
                 },
            success: function (response) {
                var resp = JSON.parse(response.responseText);
                 if (resp.status == 'sucesss' || resp.status === 'success' ) {
                   print_report('registers/printPromotionAdvertisementRegister?sub_module_id='+sub_module_id+'&section_id='+section_id+'&filename='+btn.filename+'&advertisement_type_id='+advertisement_type_id+'&approved_to='+approved_to+'&approved_from='+approved_from+'&module_id='+module_id+'&filename='+btn.filename+'&heading='+btn.heading+'&title='+btn.title+'&filter='+encodeURIComponent(JSON.stringify(filter_array)));

                }
                else{
                     toastr.error(resp.message, 'Warning Response');
                }
               
            },
            failure: function (response) {
                 
            },
            error: function (jqXHR, textStatus, errorThrown) {
              
            }
        });
       
         
     },
       
  

    loadImportExportRegisterFilters: function (btn) {
    
      var grid = btn.up('form'),
        sub_module_id = grid.down('combo[name=sub_module_id]').getValue(),
        permit_type=grid.down('combo[name=permit_type]').getValue(),
        released_from = grid.down('datefield[name=released_from]').getValue(),
        released_to = grid.down('datefield[name=released_to]').getValue(),
        panel = grid.up('panel'),
        gridStr = panel.down('importexportregistergrid').getStore();

        module_id=panel.down('hiddenfield[name=module_id]').getValue();

        gridStr.removeAll();
        gridStr.load({
            params:{
                sub_module_id:sub_module_id,
                module_id: module_id,
                permit_type: permit_type,
                released_from: released_from,
                released_to: released_to,
                

                },
                  
            });
               
    },
   exportImportExportRegister: function(btn) {
       var panel=btn.up('panel'),
        filter=panel.down('form'),
        grid = panel.down('importexportregistergrid'),
        filterfield = grid.getPlugin('filterfield');       
        var filter_array =Ext.pluck(filterfield.getgridFilters(grid), 'config'),
        sub_module_id = filter.down('combo[name=sub_module_id]').getValue(),
        section_id = filter.down('combo[name=section_id]').getValue(),
        permit_type = filter.down('combo[name=permit_type]').getValue(),
        released_from = filter.down('datefield[name=released_from]').getValue(),
        released_to = filter.down('textfield[name=released_to]').getValue();
        released_from = Ext.Date.format(released_from,'Y-m-d');   
        released_to = Ext.Date.format(released_to,'Y-m-d'); 
       
             //hidden value
        module_id=panel.down('hiddenfield[name=module_id]').getValue();

 
        Ext.getBody().mask('Exporting...Please wait...');
                
        Ext.Ajax.request({
            url: 'registers/exportImportExportRegister',
            method: 'GET',
            headers: {
                 'Authorization':'Bearer '+access_token
                     },
            params : {
                 'module_id': module_id,
                 'sub_module_id': sub_module_id,
                 'section_id':section_id,
                 'released_from': released_from,
                 'released_to': released_to,
                 'filename': btn.filename,
                 'permit_type': permit_type,
                 'heading': btn.heading,
                 'filter': JSON.stringify(filter_array)
        
                 },
                          
           success: function (response, textStatus, request) {
                Ext.getBody().unmask();
                var t = JSON.parse(response.responseText);
                console.log(t.status);
                if (t.status == 'sucesss' || t.status === 'success' ) {
                var a = document.createElement("a");
                a.href = t.file; 
                a.download = t.name;
                document.body.appendChild(a);

                a.click();
                         
                a.remove();

                } else {
            toastr.error(t.message, 'Warning Response');
            }
          
            },
            failure: function(conn, response, options, eOpts) {
                Ext.getBody().unmask();
                Ext.Msg.alert('Error', 'please try again');
            }
           });
  
        },
    printImportExportRegister: function(btn) {
        var panel=btn.up('panel'),
        filter=panel.down('form'),
        grid = panel.down('importexportregistergrid'),
        filterfield = grid.getPlugin('filterfield');       
        var filter_array =Ext.pluck(filterfield.getgridFilters(grid), 'config'),
        sub_module_id = filter.down('combo[name=sub_module_id]').getValue(),
        section_id = filter.down('combo[name=section_id]').getValue(),
        permit_type=filter.down('combo[name=permit_type]').getValue(),
        released_from = filter.down('datefield[name=released_from]').getValue(),
        released_to = filter.down('textfield[name=released_to]').getValue();
        released_from = Ext.Date.format(released_from,'Y-m-d');   
        released_to = Ext.Date.format(released_to,'Y-m-d'); 
       
             //hidden value
        module_id=panel.down('hiddenfield[name=module_id]').getValue();

        Ext.Ajax.request({
           url: 'registers/checkPrintImportExportRegister',
            method: 'GET',
            headers: {
                 'Authorization':'Bearer '+access_token
                     },
            params : {
                 'module_id': module_id,
                 'sub_module_id': sub_module_id,
                 'section_id':section_id,
                 'released_from': released_from,
                 'released_to': released_to,
                 'permit_type': permit_type,
                 'filter': JSON.stringify(filter_array)
        
                 },
            success: function (response) {
                var resp = JSON.parse(response.responseText);
                 if (resp.status == 'sucesss' || resp.status === 'success' ) {
                  print_report('registers/printImportExportRegister?sub_module_id='+sub_module_id+'&section_id='+section_id+'&permit_type='+permit_type+'&filename='+btn.filename+'&released_to='+released_to+'&released_from='+released_from+'&module_id='+module_id+'&filename='+btn.filename+'&heading='+btn.heading+'&title='+btn.title+'&filter='+encodeURIComponent(JSON.stringify(filter_array)));
                  }
                else{
                     toastr.error(resp.message, 'Warning Response');
                }
               
            },
            failure: function (response) {
                 
            },
            error: function (jqXHR, textStatus, errorThrown) {
              
            }
        });
       
         
     },


    loadOrderSupplyRegisterFilters: function (btn) {
    
      var grid = btn.up('form'),
        released_from = grid.down('datefield[name=released_from]').getValue(),
        released_to = grid.down('datefield[name=released_to]').getValue(),
        panel = grid.up('panel'),
        gridStr = panel.down('localsupplyregistergrid').getStore();

        module_id=panel.down('hiddenfield[name=module_id]').getValue();
        sub_module_id=panel.down('hiddenfield[name=sub_module_id]').getValue();

        gridStr.removeAll();
        gridStr.load({
            params:{
                sub_module_id:sub_module_id,
                module_id: module_id,
                released_from: released_from,
                released_to: released_to,
                

                },
                  
            });
                 
      },
    loadApprovalCertificateRegisterFilters: function (btn) {
      var grid = btn.up('form'),
        released_from = grid.down('datefield[name=released_from]').getValue(),
        released_to = grid.down('datefield[name=released_to]').getValue(),
        panel = grid.up('panel'),
        gridStr = panel.down('approvalcertificateregistergrid').getStore();

        module_id=panel.down('hiddenfield[name=module_id]').getValue();
        sub_module_id=panel.down('hiddenfield[name=sub_module_id]').getValue();

        gridStr.removeAll();
        gridStr.load({
            params:{
                sub_module_id:sub_module_id,
                module_id: module_id,
                released_from: released_from,
                released_to: released_to,
                

                },
                  
            });
               
    },
    loadImportPermitRegistertFilters: function (btn) {
    
      var grid = btn.up('form'),
        sub_module_id = grid.down('combo[name=sub_module_id]').getValue(),
        released_from = grid.down('datefield[name=released_from]').getValue(),
        released_to = grid.down('datefield[name=released_to]').getValue(),
        panel = grid.up('panel'),
        gridStr = panel.down('controlleddrugsimportpermitregistergrid').getStore();

        module_id=panel.down('hiddenfield[name=module_id]').getValue();
        sub_module_id=panel.down('hiddenfield[name=sub_module_id]').getValue();

        gridStr.removeAll();
        gridStr.load({
            params:{
                sub_module_id:sub_module_id,
                module_id: module_id,
                permit_type: permit_type,
                released_from: released_from,
                released_to: released_to,
                

                },
                  
            });
               
    },
      printControlledDrugsImportPermitRegister: function(btn) {
        var panel=btn.up('panel'),
        filter=panel.down('form'),
        grid = panel.down('controlleddrugsimportpermitregistergrid'),
        filterfield = grid.getPlugin('filterfield');       
        var filter_array =Ext.pluck(filterfield.getgridFilters(grid), 'config'),
        permit_type=filter.down('combo[name=permit_type]').getValue();
        released_from = filter.down('datefield[name=released_from]').getValue(),
        released_to = filter.down('textfield[name=released_to]').getValue();
        released_from = Ext.Date.format(released_from,'Y-m-d');   
        released_to = Ext.Date.format(released_to,'Y-m-d'); 
       
             //hidden value
        module_id=panel.down('hiddenfield[name=module_id]').getValue();
        sub_module_id=panel.down('hiddenfield[name=sub_module_id]').getValue();

        Ext.Ajax.request({
           url: 'registers/checkPrintControlledDrugsRegister',
            method: 'GET',
            headers: {
                 'Authorization':'Bearer '+access_token
                     },
            params : {
                 'module_id': module_id,
                 'sub_module_id': sub_module_id,
                 'released_from': released_from,
                 'released_to': released_to,
                 'permit_type': permit_type,
                 'filter': JSON.stringify(filter_array)
        
                 },
            success: function (response) {
                var resp = JSON.parse(response.responseText);
                 if (resp.status == 'sucesss' || resp.status === 'success' ) {
                    print_report('registers/printImportExportRegister?sub_module_id='+sub_module_id+'&permit_type='+permit_type+'&filename='+btn.filename+'&released_to='+released_to+'&released_from='+released_from+'&module_id='+module_id+'&filename='+btn.filename+'&heading='+btn.heading+'&title='+btn.title+'&filter='+encodeURIComponent(JSON.stringify(filter_array)));
 
                }
                else{
                     toastr.error(resp.message, 'Warning Response');
                }
               
            },
            failure: function (response) {
                 
            },
            error: function (jqXHR, textStatus, errorThrown) {
              
            }
        });
       
         
     },
       
  
    exportControlledDrugsImportPermitRegister: function(btn) {
       var panel=btn.up('panel'),
        filter=panel.down('form'),
        grid = panel.down('controlleddrugsimportpermitregistergrid'),
        filterfield = grid.getPlugin('filterfield');       
        var filter_array =Ext.pluck(filterfield.getgridFilters(grid), 'config'),
        permit_type = filter.down('combo[name=permit_type]').getValue(),
        released_from = filter.down('datefield[name=released_from]').getValue(),
        released_to = filter.down('textfield[name=released_to]').getValue();
        released_from = Ext.Date.format(released_from,'Y-m-d');   
        released_to = Ext.Date.format(released_to,'Y-m-d'); 
       
             //hidden value
        module_id=panel.down('hiddenfield[name=module_id]').getValue();
        sub_module_id=panel.down('hiddenfield[name=sub_module_id]').getValue();

    
        Ext.getBody().mask('Exporting...Please wait...');
                
        Ext.Ajax.request({
            url: 'registers/exportImportExportRegister',
            method: 'GET',
            headers: {
                 'Authorization':'Bearer '+access_token
                     },
            params : {
                 'module_id': module_id,
                 'sub_module_id': sub_module_id,
                 'released_from': released_from,
                 'released_to': released_to,
                 'filename': btn.filename,
                 'permit_type': permit_type,
                 'heading': btn.heading,
                 'filter': JSON.stringify(filter_array)
        
                 },
                          
           success: function (response, textStatus, request) {
                Ext.getBody().unmask();
                var t = JSON.parse(response.responseText);
                console.log(t.status);
                if (t.status == 'sucesss' || t.status === 'success' ) {
                var a = document.createElement("a");
                a.href = t.file; 
                a.download = t.name;
                document.body.appendChild(a);

                a.click();
                         
                a.remove();

                } else {
            toastr.error(t.message, 'Warning Response');
            }
          
            },
            failure: function(conn, response, options, eOpts) {
                Ext.getBody().unmask();
                Ext.Msg.alert('Error', 'please try again');
            }
           });
      
        },
    printApprovalCertificateRegister: function(btn) {
        var panel=btn.up('panel'),
        filter=panel.down('form'),
        grid = panel.down('approvalcertificateregistergrid'),
        filterfield = grid.getPlugin('filterfield');       
        var filter_array =Ext.pluck(filterfield.getgridFilters(grid), 'config'),
        released_from = filter.down('datefield[name=released_from]').getValue(),
        released_to = filter.down('textfield[name=released_to]').getValue();
        released_from = Ext.Date.format(released_from,'Y-m-d');   
        released_to = Ext.Date.format(released_to,'Y-m-d'); 
       
             //hidden value
        module_id=panel.down('hiddenfield[name=module_id]').getValue();
        sub_module_id=panel.down('hiddenfield[name=sub_module_id]').getValue();

         Ext.Ajax.request({
           url: 'registers/checkPrintControlledDrugsRegister',
            method: 'GET',
            headers: {
                 'Authorization':'Bearer '+access_token
                     },
            params : {
                 'module_id': module_id,
                 'sub_module_id': sub_module_id,
                 'released_from': released_from,
                 'released_to': released_to,
                 'filter': JSON.stringify(filter_array)
        
                 },
            success: function (response) {
                var resp = JSON.parse(response.responseText);
                 if (resp.status == 'sucesss' || resp.status === 'success' ) {
                    print_report('registers/printControlledDrugsRegister?sub_module_id='+sub_module_id+'&filename='+btn.filename+'&released_to='+released_to+'&released_from='+released_from+'&module_id='+module_id+'&filename='+btn.filename+'&heading='+btn.heading+'&title='+btn.title+'&filter='+encodeURIComponent(JSON.stringify(filter_array)));
    
                }
                else{
                     toastr.error(resp.message, 'Warning Response');
                }
               
            },
            failure: function (response) {
                 
            },
            error: function (jqXHR, textStatus, errorThrown) {
              
            }
        });
       
         
     },
       
        


    exportApprovalCertificateRegister: function(btn) {
       var panel=btn.up('panel'),
        filter=panel.down('form'),
        grid = panel.down('approvalcertificateregistergrid'),
        filterfield = grid.getPlugin('filterfield');       
        var filter_array =Ext.pluck(filterfield.getgridFilters(grid), 'config'),
        released_from = filter.down('datefield[name=released_from]').getValue(),
        released_to = filter.down('textfield[name=released_to]').getValue();
        released_from = Ext.Date.format(released_from,'Y-m-d');   
        released_to = Ext.Date.format(released_to,'Y-m-d'); 
       
             //hidden value
        module_id=panel.down('hiddenfield[name=module_id]').getValue();
        sub_module_id=panel.down('hiddenfield[name=sub_module_id]').getValue();


        Ext.getBody().mask('Exporting...Please wait...');
                
        Ext.Ajax.request({
            url: 'registers/exportControlledDrugsRegister',
            method: 'GET',
            headers: {
                 'Authorization':'Bearer '+access_token
                     },
            params : {
                 'module_id': module_id,
                 'sub_module_id': sub_module_id,
                 'released_from': released_from,
                 'released_to': released_to,
                 'filename': btn.filename,
                 'filter': JSON.stringify(filter_array)
        
                 },
                          
            success: function (response, textStatus, request) {
                Ext.getBody().unmask();
                var t = JSON.parse(response.responseText);
                console.log(t.status);
                if (t.status == 'sucesss' || t.status === 'success' ) {
                var a = document.createElement("a");
                a.href = t.file; 
                a.download = t.name;
                document.body.appendChild(a);

                a.click();
                         
                a.remove();

                } else {
            toastr.error(t.message, 'Warning Response');
            }
          
            },
            failure: function(conn, response, options, eOpts) {
                Ext.getBody().unmask();
                Ext.Msg.alert('Error', 'please try again');
            }
           });
       
        },

    printLocalSupplyRegister: function(btn) {
        var panel=btn.up('panel'),
        filter=panel.down('form'),
        grid = panel.down('localsupplyregistergrid'),
        filterfield = grid.getPlugin('filterfield');       
        var filter_array =Ext.pluck(filterfield.getgridFilters(grid), 'config'),
        released_from = filter.down('datefield[name=released_from]').getValue(),
        released_to = filter.down('textfield[name=released_to]').getValue();
        released_from = Ext.Date.format(released_from,'Y-m-d');   
        released_to = Ext.Date.format(released_to,'Y-m-d'); 
       
             //hidden value
        module_id=panel.down('hiddenfield[name=module_id]').getValue();
        sub_module_id=panel.down('hiddenfield[name=sub_module_id]').getValue();
       
     
        print_report('registers/printControlledDrugsRegister?sub_module_id='+sub_module_id+'&filename='+btn.filename+'&released_to='+released_to+'&released_from='+released_from+'&module_id='+module_id+'&filename='+btn.filename+'&heading='+btn.heading+'&title='+btn.title+'&filter='+encodeURIComponent(JSON.stringify(filter_array)));
    
   
     },
    exportLocalSupplyRegister: function(btn) {
       var panel=btn.up('panel'),
        filter=panel.down('form'),
        grid = panel.down('localsupplyregistergrid'),
        filterfield = grid.getPlugin('filterfield');       
        var filter_array =Ext.pluck(filterfield.getgridFilters(grid), 'config'),
        released_from = filter.down('datefield[name=released_from]').getValue(),
        released_to = filter.down('textfield[name=released_to]').getValue();
        released_from = Ext.Date.format(released_from,'Y-m-d');   
        released_to = Ext.Date.format(released_to,'Y-m-d'); 
       
             //hidden value
        module_id=panel.down('hiddenfield[name=module_id]').getValue();
        sub_module_id=panel.down('hiddenfield[name=sub_module_id]').getValue();

        Ext.getBody().mask('Exporting...Please wait...');
                
        Ext.Ajax.request({
            url: 'registers/exportControlledDrugsRegister',
            method: 'GET',
            headers: {
                 'Authorization':'Bearer '+access_token
                     },
            params : {
                 'module_id': module_id,
                 'sub_module_id': sub_module_id,
                 'released_from': released_from,
                 'released_to': released_to,
                 'filename': btn.filename,
                 'heading': btn.heading,
                 'filter': JSON.stringify(filter_array)
        
                 },
                          
        success: function (response, textStatus, request) {
                Ext.getBody().unmask();
                var t = JSON.parse(response.responseText);
                console.log(t.status);
                if (t.status==1 ||t.status===1) {
                var a = document.createElement("a");
                a.href = t.file; 
                a.download = t.name;
                document.body.appendChild(a);

                a.click();
                         
                a.remove();

                } else {
            toastr.error(t.message, 'Warning Response');
            }
          
            },
            failure: function(conn, response, options, eOpts) {
                Ext.getBody().unmask();
                Ext.Msg.alert('Error', 'please try again');
            }
           });
    
        },
        



 setPageSize: function(combo, newValue){
               var pagesize=combo.getValue();
               Ext.apply(Ext.getStore('productregistergridstr'), {pageSize: pagesize});
             },

});