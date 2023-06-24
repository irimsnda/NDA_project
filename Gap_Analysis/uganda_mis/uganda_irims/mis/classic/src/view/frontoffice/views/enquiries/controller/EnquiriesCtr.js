Ext.define('Admin.view.openOffice.enquiries.controller.EnquiriesCtr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.enquiriesCtr',

setConfigGridsStore: function (obj, options) {
        this.fireEvent('setConfigGridsStore', obj, options);
    },
setConfigCombosStore: function (obj, options) {
        this.fireEvent('setConfigCombosStore', obj, options);
    },
setReportGlobalStoreWithTBar:function (obj, options) {
        this.fireEvent('setReportGlobalStoreWithTBar', obj, options);
    },
func_enquirySearch:function(btn) {
	var grid=btn.up('grid'),
	    reference=grid.down('textfield[name=Reference]').getValue(),
        store=grid.getStore();
        store.removeAll();
        store.load({params:{reference:reference}});
},
func_loadSubModules:function(me,newValue,old, eopts) {
    var grid= me.up('grid'),
        sub_modulestr = grid.down('combo[name=sub_module_id]').getStore(),
        filters = JSON.stringify({'module_id':newValue});
        //to ensure its set
        grid.down('combo[name=module_id]').setValue(newValue);
        sub_modulestr.removeAll();

        sub_modulestr.load({params:{filters:filters}});

        this.func_reloadGridStore(me);
},
func_loadByReference:function(me,newValue,old, eopts) {
    var grid= me.up('grid'),
        module_id = grid.down('combo[name=module_id]').getValue();
        if(module_id){
          this.func_reloadGridStore(me);
        }else{
          toastr.warning('Please select a module', 'Missing Module');
        }
        
},
func_createGrid: function(combo) {
  
  
},
func_reloadGridStore:function(me) {
    var grid = me.up('grid'),
        module_id = grid.down('combo[name=module_id]').getValue(),
        store=grid.getStore();

        if(module_id!=0){

       // grid.reconfigure(null, []);

        //recreate from store
        store.removeAll();
        store.reload({
                callback: function(records, operation, success) {
                  var cols = [];
                  grid.reconfigure(cols);
                   store.each(function(record,idx){

                    var i,flag = 1;

                    if(flag){
                    var keys = Object.keys(record.data);

                    for (i = 0; i < keys.length; i++) {
                     
                     if(keys[i]+'' == 'Date_Added'){

                      var column = Ext.create('Ext.grid.column.Column', {
                                  text: keys[i],
                                  dataIndex: keys[i]+'',
                                  width: 150,
                                  tblCls: 'wrap',
                                  filter: {
                                      xtype: 'date'
                                  }
                              });
                    }

                    else if(keys[i]+'' == 'Date_Submitted'){

                      var column = Ext.create('Ext.grid.column.Column', {
                                  text: keys[i],
                                  dataIndex: keys[i]+'',
                                  width: 150,
                                  tblCls: 'wrap',
                                  filter: {
                                    xtype: 'date'
                                  }
                              });

                    }else{

                        var column = Ext.create('Ext.grid.column.Column', {
                                  text: keys[i],
                                  dataIndex: keys[i]+'',
                                  width: 150,
                                  tblCls: 'wrap',
                                  filter: {
                                    xtype: 'textfield'
                                  }
                              });

                    }

                    grid.headerCt.insert(column);
                    flag = 0;
                      }
                    }
                    return false;
                  
                  });
                   
                    
                    
                   
                  
                   }
                   
                  }); 

 
          grid.getView().refresh();

          grid.getStore().clearFilter();

        
    }

},
render_date: function(val) {
    var parts = val.match(/(\d+)/g);
  // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
},
setWorkflowCombosStore: function (obj, options) {
        this.fireEvent('setWorkflowCombosStore', obj, options);
    },

    setOrgConfigCombosStore: function (obj, options) {
        this.fireEvent('setOrgConfigCombosStore', obj, options);
    },
    assignResponsibleUserToEnquiryApplication: function (view, record, item, index, e, eOpts) {
      var submission_id = record.get('submission_id'),
          application = 'Reference No: '+record.get('reference_no')+' -- Tracking-No: '+record.get('tracking_no'),
          form = Ext.widget('enquiriesTaskAssignmentFrm');
          
          form.loadRecord(record);

          form.down('displayfield[name=reference_no]').setValue(application);
          funcShowCustomizableWindow("Assign Application", "40%", form, 'customizablewindow');
        
    },
    func_loadResponsibleUsers(combo){
        var frm = combo.up('form'),
            next_stage = frm.down('hiddenfield[name = current_stage]').getValue(),
            store = combo.getStore();
        store.load({params:{next_stage:next_stage}});
    },
    submitApplicationAssignment: function(btn) {
       var form = btn.up('form'),
           store = Ext.getStore(btn.storeID),
           frm = form.getForm(),
           win = form.up('window');
       if (frm.isValid()) {
            frm.submit({
                url: btn.action_url,
                waitMsg: 'Please wait...',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        store.removeAll();
                        store.load();
                        win.close();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (form, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }
    },
    func_referenceSearch:function(btn){
        var grid = btn.up('grid'),
            store = grid.getStore(),
            reference = grid.down('textfield[name=reference]').getValue();
            store.removeAll();
            store.load({
                params:{
                    reference:reference
                }
            })
    },
});