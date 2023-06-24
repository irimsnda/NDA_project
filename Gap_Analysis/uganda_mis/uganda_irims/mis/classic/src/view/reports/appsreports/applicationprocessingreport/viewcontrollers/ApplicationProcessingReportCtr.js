Ext.define('Admin.view.reports.applicationprocessingreport.viewcontroller.ApplicationProcessingReportCtr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.applicationprocessingreportctr',
   

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
  

   
     printApplicationProcessingReport: function(btn) {
         var panel=btn.up('panel'),
        grid=panel.down('grid');
        var filterfield = grid.getPlugin('filterfield');       
        var filter_array =Ext.pluck(filterfield.getgridFilters(grid), 'config');
        var module_id = panel.down('combo[name=module_id]').getValue(),
        section_id = panel.down('combo[name=section_id]').getValue(),
        sub_module_id = panel.down('combo[name=sub_module_id]').getValue(),
        from_date = panel.down('datefield[name=from_date]').getValue(),
        to_date = panel.down('textfield[name=to_date]').getValue();
        from_date = Ext.Date.format(from_date,'Y-m-d');   
        to_date = Ext.Date.format(to_date,'Y-m-d'); 
        
        print_report('newreports/printApplicationProcessingReport?sub_module_id='+sub_module_id+'&to_date='+to_date+'&from_date='+from_date+'&module_id='+module_id+'&section_id='+section_id+'&filter='+encodeURIComponent(JSON.stringify(filter_array)));
       
     },


     printalarmingProcessingReport: function(btn) {
        var panel=Ext.ComponentQuery.query('#applicationprocessingreportpnl')[0];
        var module_id = panel.down('combo[name=module_id]').getValue(),
        sub_module_id = panel.down('combo[name=sub_module_id]').getValue(),
        section_id = panel.down('combo[name=section_id]').getValue(),
        from_date = panel.down('datefield[name=from_date]').getValue(),
        to_date = panel.down('textfield[name=to_date]').getValue();
        from_date = Ext.Date.format(from_date,'Y-m-d');   
        to_date = Ext.Date.format(to_date,'Y-m-d'); 
        
        print_report('newreports/printalarmingProcessingReport?sub_module_id='+sub_module_id+'&to_date='+to_date+'&from_date='+from_date+'&module_id='+module_id+'&section_id='+section_id);
       
     },

     exportalarmingProcessingReport: function (btn) {
       var panel=Ext.ComponentQuery.query('#applicationprocessingreportpnl')[0];
        var module_id = panel.down('combo[name=module_id]').getValue(),
        section_id = panel.down('combo[name=section_id]').getValue(),
        sub_module_id = panel.down('combo[name=sub_module_id]').getValue(),
        from_date = panel.down('datefield[name=from_date]').getValue(),
        to_date = panel.down('textfield[name=to_date]').getValue();
        from_date = Ext.Date.format(from_date,'Y-m-d');   
        to_date = Ext.Date.format(to_date,'Y-m-d'); 
       
       
        Ext.getBody().mask('Exporting...Please wait...');
                
        Ext.Ajax.request({
            url: 'newreports/exportApplicationProcessingReport',
            method: 'GET',
            headers: {
                 'Authorization':'Bearer '+access_token
                     },
            params : {
                 'section_id': section_id,
                 'module_id': module_id,
                 'sub_module_id': sub_module_id,
                 'from_date': from_date,
                 'to_date': to_date
        
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



    exportApplicationProcessingReport: function (btn) {
       var panel=btn.up('panel'),
        grid=panel.down('grid');
        var filterfield = grid.getPlugin('filterfield');       
        var filter_array =Ext.pluck(filterfield.getgridFilters(grid), 'config');
        var module_id = panel.down('combo[name=module_id]').getValue(),
        section_id = panel.down('combo[name=section_id]').getValue(),
        sub_module_id = panel.down('combo[name=sub_module_id]').getValue(),
        from_date = panel.down('datefield[name=from_date]').getValue(),
        to_date = panel.down('textfield[name=to_date]').getValue();
        from_date = Ext.Date.format(from_date,'Y-m-d');   
        to_date = Ext.Date.format(to_date,'Y-m-d'); 
       
       

   
        Ext.getBody().mask('Exporting...Please wait...');
                
        Ext.Ajax.request({
            url: 'newreports/exportApplicationProcessingReport',
            method: 'GET',
            headers: {
                 'Authorization':'Bearer '+access_token
                     },
            params : {
                 'section_id': section_id,
                 'module_id': module_id,
                 'sub_module_id': sub_module_id,
                 'from_date': from_date,
                 'to_date': to_date,
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
   


      funcPreviewprocessingAlertingApplications:function(btn){
        var panel=btn.up('panel'),
        tab=panel.down('panel'),
        activeTab = tab.getActiveTab(),
        index = tab.items.indexOf(activeTab);
        if(index==1 ||  index ===1){
        var processingalertingappgrid = Ext.widget('processingalertingbyuserapplicationsgrid');
         }else{
        var processingalertingappgrid = Ext.widget('processingalertingapplicationsgrid');  
         }
         
        var from_date = panel.down('datefield[name=from_date]').getValue();  
        to_date = panel.down('datefield[name=to_date]').getValue()
        from_date = Ext.Date.format(from_date,'Y-m-d');   
        to_date = Ext.Date.format(to_date,'Y-m-d'); 
        processingalertingappgrid.down('hiddenfield[name=section_id]').setValue(panel.down('combo[name=section_id]').getValue());
        processingalertingappgrid.down('hiddenfield[name=module_id]').setValue(panel.down('combo[name=module_id]').getValue());
        processingalertingappgrid.down('hiddenfield[name=sub_module_id]').setValue(panel.down('combo[name=sub_module_id]').getValue());
        processingalertingappgrid.down('hiddenfield[name=from_date]').setValue(from_date);
        processingalertingappgrid.down('hiddenfield[name=to_date]').setValue(to_date);

        Ext.Ajax.request({
           url: 'newreports/checkProcessingAlertingpplications',
            method:'GET',
            params: {
                _token: token
            },
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText);
                if(resp.exist_alerting_applications){
                    processingalertingappgrid.setHeight(550);
                    funcShowCustomizableWindow("Applications which have taken passed 30 day at one stage and yet to be processed", '86%', processingalertingappgrid, 'customizablewindow');
                }
                else{
                    toastr.error('There is no applications which have taken passed 30 day at a certain stage and are yet to be processed ', 'Error Response');
                }
               
            },
            failure: function (response) {
                 //toastr.error('Failed to check assaignment', 'Error Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
               // toastr.error('Error checking assaingment: ' + errorThrown, 'Error Response');
            }
        });

    },
  
});