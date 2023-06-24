Ext.define('Admin.view.audit_trail.controller.Audit_TrialViewCtr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.audit_trialViewCtr',

    init: function () {
      Ext.apply(Ext.form.field.VTypes, {
        timerange: function(val, field) {
            var date = new Date();
            var year = date.getFullYear();
            var datetime = new Date(year+'T' + val);

          if (isNaN(datetime.getTime())) {
          return false;
          }else{
            return true
          }
         },
         validateQuery: function(value, field) {
                if(this.validateQueryRe.test(value)){
                    field.setValue(value.slice(0, -6));
                    return false;
                }
                return true;
            },
        timerangeText: "Time should be exactly xx:xx:xx 24hrs format",
        validateQueryRe: /update\s|insert|delete|create\s/i,
        validateQueryText: "Only selection queries allowed"
        })
    },

    //end of graphs
setWorkflowGridsStore:function (obj, options) {
        this.fireEvent('setWorkflowGridsStore', obj, options);
    },
setReportGlobalStore:function (obj, options) {
        this.fireEvent('setReportGlobalStore', obj, options);
    },
 setReportGlobalStoreWithTBar: function (obj, options) {
        this.fireEvent('setReportGlobalStoreWithTBar', obj, options);
    },
 setApplicationAuditReportGlobalStore: function (obj, options) {
        this.fireEvent('setReportGlobalStoreWithTBar', obj, options);
    },
  setConfigGridsStore: function (obj, options) {
        this.fireEvent('setConfigGridsStore', obj, options);
    },
  setConfigCombosStore: function (obj, options) {
        this.fireEvent('setConfigCombosStore', obj, options);
    },
func_loadStore: function(grid) {
	var store=grid.getStore();
	store.load();
},
func_reloadGridStore: function(item) {
  var store = item.up('grid').getStore();
  store.removeAll();
  store.load();
},
func_viewRecords:function(item,event,eopts) {
            
    	var me = this,
    	    btn=item.up('button'),
            childXtype = item.childXtype,
            record = btn.getWidgetRecord(),
            winTitle=item.winTitle,
            winWidth=item.winWidth,
            panel = Ext.widget(childXtype),
            id=panel.down('hiddenfield[name=id]');
            table_name=panel.down('hiddenfield[name=table_name]');
            record_id=panel.down('hiddenfield[name=record_id]');
            id.setValue(record.data.id);
            table_name.setValue(record.data.table_name);
            record_id.setValue(record.data.record_id);

            //set labels 
            panel.down('label[name=record_label]').setHtml("<b>Record Id : <i>"+record.data.record_id+"</i> | </b>");
            panel.down('label[name=table_label]').setHtml("<b>Table Name : <i>"+record.data.table_name+"</i> | </b>");

            if(item.name=='single'){
            panel.down('label[name=action_label]').setHtml("<b>Action : <i>"+record.data.table_action+"</i> | </b>");
            panel.down('label[name=actionby_label]').setHtml("<b>Action By : <i>"+record.data.created_by+"</i></b>");
            }

            //revert action toggle
            if(record.data.table_action!='delete'){
              panel.down('button[name=revert]').setVisible(false);
            }


        funcShowCustomizableWindow(winTitle, winWidth, panel, 'customizablewindow');
    },

func_AllRecordsTrans:function(item,event,eopts) {
            
      var me = this,
          btn=item.up('button'),
            childXtype = item.childXtype,
            record = btn.getWidgetRecord(),
            winTitle=item.winTitle,
            winWidth=item.winWidth,
            panel = Ext.widget(childXtype),
            id=panel.down('hiddenfield[name=id]');
            table_name=panel.down('hiddenfield[name=table_name]');
            record_id=panel.down('hiddenfield[name=record_id]');
            id.setValue(record.data.id);
            table_name.setValue(record.data.table_name);
            record_id.setValue(record.data.record_id);

            //set labels 
            panel.down('label[name=record_label]').setHtml("<b>Record Id : <i>"+record.data.record_id+"</i></b>");
            panel.down('label[name=table_label]').setHtml("<b>Table Name : <i>"+record.data.table_name+"</i></b>");


        funcShowCustomizableWindow(winTitle, winWidth, panel, 'customizablewindow');
    },

funct_loadColumns:function(grid){
			var store=grid.getStore();
			    grid.getView().refresh();
			    store.load({
			    	callback: function(records, operation, success) {
                 
				         if(records.length!=0){
                  var data=records[0].data;
				        	var keys=Object.keys(data);
                    
				        	 for (var i =0 ; i <= keys.length - 2; i++) {

				        	  var column = Ext.create('Ext.grid.column.Column', {
		                                        text: keys[i],
		                                        dataIndex: keys[i],
                										        width: 150,
                										        tbCls: 'wrap'
		                                    });

			                  grid.headerCt.insert(
			                      grid.columns.length-1, 
			                      column);
			                }
                    }
			                  
					    
				     }});
			},

func_revertToPreviousTableData:function(btn) {
	var panel=btn.up('panel'), 
	    id=panel.down('hiddenfield[name=id]').getValue();
      Ext.Ajax.request({
                      url: 'audittrail/revertAuditRecord',
                      method: 'get',
                      params : {
                                  'id':id,
                                  'type':btn.type //mis or portal
                      },

                       success: function (response, textStatus, request) {
                           var res=response.responseText;
                           var Res = JSON.parse(res);
                           Ext.Msg.alert('Results',Res.results);
                      },

                      failure: function(conn, response, options, eOpts) {
                            var res=response.responseText;
                            var Res = JSON.parse(res);
                            Ext.Msg.alert('Results',Res.results);
                      }});
        

             },
  export:function(btn) {
        var grid=btn.up('grid'),
            filterfield = grid.getPlugin('filterfield'),
            filter_array = Ext.pluck( filterfield.getgridFilters(grid), 'config'),
            table_name=grid.down('combo[name=table_name]').getValue(),
            created_by=grid.down('combo[name=created_by]').getValue(),
            table_data=grid.down('textfield[name=table_data]').getValue(),
            form=Ext.create('Ext.form.Panel', { }),
            frm=form.getForm();
            filter_array = Ext.JSON.encode(filter_array);

           Ext.getBody().mask('Exporting...Please wait...');
      
        Ext.Msg.show({
           title:'Time Warning',
           message: 'This Export Operation may take some time depending on filters provided',
           buttons: Ext.Msg.OKCANCEL,
           icon: Ext.Msg.QUESTION,
           fn: function(check) {
           if (check === 'ok') {

                  Ext.getBody().mask('Exporting...Please wait...');
                  frm.submit({
                       url: 'audittrail/exportAudit',
                       method: 'GET',
                       params : {
                                    'filter':filter_array,
                                    'table_name':table_name,
                                    'created_by':created_by,
                                    'table_data':table_data,
                                    'type': btn.type 
                                },
                        success: function (action, response) {
                                  var t = response.result;
                                  Ext.getBody().unmask();
                                  var a = document.createElement("a");
                                  a.href = t.file; 
                                  a.download = t.name;
                                  document.body.appendChild(a);

                                   a.click();
                                 
                                   a.remove();
                
                                },
                        failure: function(action, response) {

                                     Ext.Msg.alert('Error', 'please try again');
                                      Ext.getBody().unmask();
                                }
                     });
                  } else {
                      Ext.Msg.alert('Terminated', 'Export operation canceled');
                  }
            }
        });

    },
     renderApplicationGrid: function(grid) {
      var grid = grid,
      store = grid.getStore();
        store.removeAll();
       var flag = 1;
        store.reload({
                callback: function(records, operation, success) {
                  if(store.data.length > 0){
                   store.each(function(record,idx){

                    var i;

                    if(flag){
                      var keys = Object.keys(record.data),
                          length = keys.length-1;
                        for (i = length; i >= 0 ; i--) {
                            if (keys[i] == 'id') {
                              var column = Ext.create('Ext.grid.column.Column', {
                                      text: keys[i],
                                      dataIndex: keys[i]+'',
                                      width: 150,
                                      hidden: true,
                                      tblCls: 'wrap',
                                      filter: {
                                        xtype: 'textfield'
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
                            }
                          
                        flag = 0;
                        //update search combo
        var form = grid.down('auditfilterFrm'),
            field_combo = form.down('combo[name=search_column]'),
            store3 = field_combo.getStore();

        var n = [];
        keys.forEach((item, i) => {
          if(item != 'Record_id'){
              n.push([item]);
           }
        });

         store3.add(n);
                        return false;
                      }
                    });

                 }else{
                  var column = Ext.create('Ext.grid.column.Column', {
                                      text: 'Zero Log Entries for the defination',
                                      dataIndex:'result',
                                      flex: 1,
                                      value: 'Zero logs for this defination'
                                  });
                            

                                grid.headerCt.insert(column);
                   
                  }
                 }
                   
                }); 
          //grid.reconfigure(grid.getStore(), grid.columnsCfg);
          grid.getView().refresh();
          //grid.getStore().clearFilter();

        

            //store.loadRecord(keys);
   },
   loadApplicationReport: function(pnl) {
       var module_id = pnl.down('hiddenfield[name=module_id]').getValue();
        Ext.Ajax.request({
            url: 'auditreport/generateReportData',
            method: 'GET',
            params: {
                module_id: module_id,
                _token: token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText);

                //generate views 
                var total_tabs  = resp.total_definations
                    result = resp.results;
                if(total_tabs > 0){
                  for (i = 0; i < total_tabs; i++) {
                      var title = result[i].title,
                          is_main = result[i].is_main,
                          def_id = result[i].def_id;

                      var tab = Ext.create('Admin.view.audit_trail.views.grids.ApplicationAuditReportGrid', {
                          title: title,
                          listeners: {
                                 beforerender: {
                                      fn: 'setApplicationAuditReportGlobalStore',
                                      config: {
                                          pageSize: 500,
                                          storeId: title+'Str',
                                          proxy: {
                                              url: 'auditreport/generateReportData?def_id='+def_id
                                             }
                                          },
                                        isLoad: true
                                   },
                                   afterRender: 'renderApplicationGrid'
                          },
                          columns: []

                      });

                      pnl.add(tab);
                      //add the id to form
                      var filterForm = tab.down('auditfilterFrm');
                      filterForm.down('hiddenfield[name=def_id]').setValue(def_id);
                      //set first tab active
                      pnl.setActiveTab(0);
                  }
   
            }else{
              var df = Ext.create('Ext.form.Panel', {
                            bodyPadding: 10,
                            title: 'No Setup',
                            items: [{
                                xtype: 'displayfield',
                                name: 'home_score',
                                value: 'No Configuration set for this module'
                            }]
                        });
              pnl.add(df);
              pnl.setActiveTab(0);
            }
          },
            failure: function (response) {
                Ext.getBody().unmask();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error fetching data: ' + errorThrown, 'Error Response');
            }
        });
   },


searchAudit:function(btn) {
   var frm = btn.up('form'),
        grid = frm.up('grid'),
        gridStore = grid.getStore();
        gridStore.load();
},
	showSimpleConfigModuleGridForm: function (btn) {
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            formWidget = btn.form,
            grid = btn.up('grid'),
            parentPanel = grid.up('panel'),
            form = Ext.widget(formWidget),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        grid.hide();
        parentPanel.add(form);
        /*} else {
            toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
            return false;
        }*/
    },

    showAddConfigParamWinFrm: function (btn) {
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle=btn.winTitle,
            winWidth=btn.winWidth,
            child = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
        /* } else {
             toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
             return false;
         }*/
    }, showEditConfigParamWinFrm: function (item) {
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            childXtype = item.childXtype,
            winTitle=item.winTitle,
            winWidth=item.winWidth,
            form = Ext.widget(childXtype),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        form.loadRecord(record);
        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
        /* } else {
             toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
             return false;
         }*/
    },

    showEditConfigParamGridFrm: function (item) {//for tree panels
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            btn = item.up('button'),
            grid = btn.up('grid'),
            parentPanel = grid.up('panel'),
            record = btn.getWidgetRecord(),
            formWidget = item.form,
            form = Ext.widget(formWidget),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length;
        form.reset();
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        form.loadRecord(record);
        grid.hide();
        parentPanel.add(form);
        /* } else {
             toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
             return false;
         }*/
    },

   

    configBackToDashboard: function (btn) {
        var currentPnl = btn.up('form'),
            containerPnlXtype = btn.containerPnlXtype,
            hiddenCompXtype = btn.hiddenCompXtype,
            containerPnl = btn.up(containerPnlXtype),
            grid = containerPnl.down(hiddenCompXtype);
        containerPnl.remove(currentPnl);
        grid.show();
    },

    doCreateConfigParam: function (btn) {
        var me = this,
            action_url = btn.action_url,
            form = btn.up('form'),
            storeID = btn.storeID,
            store = Ext.getStore(storeID),
            frm = form.getForm();
        if (frm.isValid()) {
            frm.submit({
                url: action_url,
                waitMsg: 'Please wait...',
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        store.removeAll();
                        store.load();
                        me.configBackToDashboard(btn);
                        toastr.success(message, "Success Response");
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

    doCreateConfigParamWin: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form_xtype = btn.up('form'),
            win = form_xtype.up('window'),
            storeID = btn.storeID,
            store = Ext.getStore(storeID);

        // if(table=='tra_departmental_notifications'){
        //     var combo=form_xtype.down('combo[name=group_ids]'),
        //         value=combo.getValue(),
        //         string= value.join(',');
        //         combo.setValue(string);
        // }
        var frm = form_xtype.getForm();
            
        if (frm.isValid()) {
            frm.submit({
                url: url,
                params: {model: table},
                waitMsg: 'Please wait...',
                 
                success: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        store.removeAll();
                        if(form_xtype.down('hiddenfield[name=common_name_id]')){

                            store.load({params:{common_name_id: form_xtype.down('hiddenfield[name=common_name_id]').getValue()}});
                        }
                        else{

                            store.load();
                        }
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
   
    doDeleteConfigWidgetParam: function (item) {
        //if (this.fireEvent('checkFullAccess')) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            id = record.get('id'),
            storeID = item.storeID,
            table_name = item.table_name,
            url = item.action_url;
        this.fireEvent('deleteRecord', id, table_name, storeID, url);
        /*  } else {
              toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
              return false;
          }*/
    },
     exportAuditLogs: function(item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            record_id = record.get('id'),
            store = btn.up('grid').getStore(),
            url;
        url = "auditreport/exportAuditLogs?audit_table="+record.get('audit_table')+"&table_event="+record.get('table_event');
        print_report(url);
        
    },

});