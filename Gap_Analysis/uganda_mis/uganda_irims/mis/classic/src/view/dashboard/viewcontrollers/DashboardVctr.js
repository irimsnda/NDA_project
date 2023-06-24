Ext.define('Admin.view.dashboard.viewcontrollers.DashboardVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboardvctr',

    /**
     * Called when the view is created
     */
    defaultVisibleRange: null,
    rangeAxis: ['top', 'bottom'],
    requires: [
        'Ext.chart.theme.Blue',
        'Ext.chart.theme.Green',
        'Ext.chart.theme.Muted',
        'Ext.chart.theme.Red',
        'Ext.chart.theme.Sky',
        'Ext.chart.theme.Yellow'
    ],

    themes: [
        'default',
        'blue',
        'green',
        'midnight',
        'muted',
        'red',
        'sky',
        'yellow'
    ],

    currentTheme: 0,
    funcPreviewFasttrackApplications:function(){
        var fasttrackappgrid = Ext.widget('fasttrackapplicationsgrid');
        Ext.Ajax.request({
            url: 'dashboard/checkFastTrackApplications',
            method:'GET',
            params: {
                _token: token
            },
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText);
                if(resp.has_fasttrack_applications){
                    fasttrackappgrid.setHeight(550);
                    funcShowCustomizableWindow("Submitted & Assigned Fast Track Applications", '86%', fasttrackappgrid, 'customizablewindow');
                }
                else{
                    toastr.error('There is no assigned Fast Track application in your account', 'Error Response');
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
    funcIntrayBeforerenderDetails:function(grid){
        var fasttrackappgrid = Ext.widget('fasttrackapplicationsgrid'),
            store = grid.getStore();
            store.removeAll();
            store.load();
        Ext.Ajax.request({
            url: 'dashboard/checkFastTrackApplications',
            method:'GET',
            params: {
                _token: token
            },
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText);
                if(resp.has_fasttrack_applications){
                    fasttrackappgrid.setHeight(550);
                    funcShowCustomizableWindow("Submitted & Assigned Fast Track Applications", '86%', fasttrackappgrid, 'customizablewindow');
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
    funcClicnkDashboardbtn:function(btn){
            var btn_name = btn.name;
           
                //option 
                var panel = btn.up('panel');///xtype of the system defined components
                var panel = btn.up('dashboard');//class object name xtype 
                var panel = btn.up('#dashboard');//use item id 
               var panel = this.lookupReference('dashboard');
            
                var panel = btn.up('dashboard'),
                    pnl = pane.getActiveTab(),
                    grid = panel.down('grid'); 

    },
    setDashGridsStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            toolbar = me.down('pagingtoolbar'),
            store = Ext.create('Admin.store.dashboard.DashboardGridAbstractStore', config);
        me.setStore(store);
        toolbar.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
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
    doCreateDashParamWin: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form = btn.up('form'),
            win = form.up('window'),
            storeID = btn.storeID,
            store = Ext.getStore(storeID),
            frm = form.getForm();
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

    onIntrayItemDblClick: function (view, record, item, index, e, eOpts) {
        this.fireEvent('viewApplicationDetails', record);
    },
  
    onOlineIntrayItemDblClick: function (view, record, item, index, e, eOpts) {
        var module_id = record.get('module_id'),
            application_status_id =record.get('application_status_id');

        switch (module_id) {
            case 1:
                if(application_status_id == 15){
                    this.fireEvent('previewQueryResponseOnlineApplication',view, record);
                }
                else{
                    this.fireEvent('previewProductOnlineApplication',view, record);
                }
               
              break;
            case 2:
                    this.fireEvent('previewPremisesOnlineApplication',view, record);
              break;
            case 3:
                    this.fireEvent('previewGmpOnlineApplication',view, record);
              break;
            case 4:
                    this.fireEvent('previewImpExpOnlineApplication',view, record);
              break;
              case 12:
                this.fireEvent('previewImpExpOnlineApplication',view, record);
          break;
            case 7:
                    this.fireEvent('previewOnlineClincialTrialApplication',view, record);
              break;
            case 14:
                    this.fireEvent('previewOnlinePromotionalApplication',view, record);
              break;
            case 29:
                    this.fireEvent('previewPremisesOnlineApplication',view, record);
              break;
              case 15:
                    this.fireEvent('previewOnlineDisposalApplication',view, record);
                    break;
                    case 20:
                        this.fireEvent('previewDeclarationImpExpOnlineApplication',view, record);
                        break;
          }
       
    },
    //graphs 
    currentTheme: 0,

    getChart: function() {
        return this.getView().down('[isChart]');
    },

    onThemeChange: function() {
        var themes = this.themes,
            idx = ++this.currentTheme;

        if (idx === themes.length) {
            this.currentTheme = idx = 0;
        }
        this.getChart().setTheme(themes[idx]);
    },
     funcFilterManagementProcessDetails:function(btn){
        var store = this.getChart().getStore(),
            pnl = btn.up('panel'),
            graph_strore = Ext.getStore(btn.graph_store),
            grid_store = Ext.getStore(btn.grid_store),
            
            module_id = pnl.down('combo[name=module_id]').getValue(),
            sub_module_id = pnl.down('combo[name=sub_module_id]').getValue(),
            section_id = pnl.down('combo[name=section_id]').getValue(),
            date_from = pnl.down('datefield[name=date_from]').getValue(),
            date_to = pnl.down('datefield[name=date_to]').getValue();

            grid_store.load({
                params:{
                    module_id:module_id,
                    sub_module_id:sub_module_id,
                    section_id:section_id,
                    date_from:date_from,
                    date_to:date_to
                }
            });
            console.log(graph_strore);
            
            graph_strore.load({
            params:{
                module_id:module_id,
                sub_module_id:sub_module_id,
                section_id:section_id,
                date_from:date_from,
                date_to:date_to
            }
        });

    },funcClearManagementProcessDetails:function(btn){
        var store = this.getChart().getStore(),
             grid_store = Ext.getStore('managementprocessdashboardgridstr');
            store.removeAll();
            grid_store.removeAll();
           var pnl = btn.up('panel');
            
           
            pnl.down('combo[name=module_id]').setValue();
            pnl.down('combo[name=section_id]').setValue();
            pnl.down('combo[name=sub_module_id]').setValue();
            pnl.down('datefield[name=date_from]').setValue();
            pnl.down('datefield[name=date_to]').setValue();
    },
    onRefresh: function() {
        var store = this.getChart().getStore();
        store.load();
    },func_setStore: function(me,options){
        var config = options.config,
              isLoad = options.isLoad,
              store = Ext.create('Admin.store.common.CommonGridAbstractStore', config);
           me.setStore(store); 
          if (isLoad === true || isLoad == true) {
              store.removeAll();
              store.load();
          }
      }, setConfigGridsStore: function (obj, options) {

        this.fireEvent('setConfigGridsStore', obj, options);
    },
    loadApplicationAssaignmentTab: function(me) {//loadApplicationAssaignmentTab
        //check right
        Ext.Ajax.request({
            url: 'dashboard/checkAssignmentDefination',
            params: {
                _token: token
            },
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText);
                if(resp.has_defination){
                    var tab = Ext.widget('applicationassignmenttab');
                        //panel = me.up('panel');
                    tab.down('hiddenfield[name=group_id]').setValue(resp.group_id);
                    me.add(tab);
                }
               
            },
            failure: function (response) {
                 toastr.error('Failed to check assaignment', 'Error Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                toastr.error('Error checking assaingment: ' + errorThrown, 'Error Response');
            }
        });
        
    },
    viewAssaignedApplications: function(btn) {
        var record = btn.getWidgetRecord(),
            grid = Ext.widget('assaingmentapplicationsgrid'),
            user_name = record.get('user_name'),
            stage_name = record.get('stage_name');

        //pass values
        grid.down('hiddenfield[name=process_id]').setValue(record.get('process_id'));
        grid.down('hiddenfield[name=stage_id]').setValue(record.get('stage_id'));
        grid.down('hiddenfield[name=user_id]').setValue(record.get('user_id'));

        funcShowCustomizableWindow(user_name+" Assaigned Applications In "+stage_name+" stage", '86%', grid, 'customizablewindow');
   
        
    },
    reAssaignpplications: function(btn) {
         var me = this,
            record = btn.getWidgetRecord(),
            childXtype = btn.childXtype,
            winTitle=btn.winTitle,
            winWidth=btn.winWidth,
            form = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        form.down('hiddenfield[name=id]').setValue(record.get('id'));
        form.down('hiddenfield[name=workflow_stage_id]').setValue(record.get('current_stage'));
        var toolbar =  form.down('toolbar'),
            button = toolbar.down('button');
            button.storeID = 'assaingmentapplicationsgridstr';

        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
    
        
    },
    clearChartUpdates : function() {
        this.chartTaskRunner = Ext.destroy(this.chartTaskRunner);
    },
    
    destroy: function () {
        this.clearChartUpdates();
        this.callParent();
    },
    
    onHideView: function () {
        this.clearChartUpdates();
    },
    exportDashboard: function(btn){
        var type = btn.type,
            is_internaluser = btn.is_internaluser,
            grid = btn.up('grid'),
            section_id = grid.down('combo[name=section_id]').getValue(),
            module_id = grid.down('combo[name=module_id]').getValue(),
            sub_module_id = grid.down('combo[name=sub_module_id]').getValue(),
            workflow_stage_id = grid.down('combo[name=workflow_stage_id]').getValue(),
            filterfield = grid.getPlugin('filterfield');
            
       if(grid.down('combo[name=zone_id]')){
         var zone_id=grid.down('combo[name=zone_id]').getValue(), 
             application_status_id=grid.down('combo[name=application_status_id]').getValue();
       }else{
          var zone_id = null,
              application_status_id = null;
       }
       var filter_array =Ext.pluck( filterfield.getgridFilters(grid), 'config');
       filter_array = Ext.JSON.encode(filter_array);
       var str = 'dashboard/exportDashboard?type='+type+'&is_internaluser='+is_internaluser+'&section_id='+section_id+'&module_id='+module_id+'&sub_module_id='+sub_module_id+'&workflow_stage_id='+workflow_stage_id+'&zone_id='+zone_id+'&application_status_id='+application_status_id+'&filter='+encodeURIComponent(filter_array);
       var action_url = str.replace(/null/gi, '');
       print_report(action_url);
    },
    exportDashboardnoFilters: function(btn){
        var type = btn.type,
            is_internaluser = btn.is_internaluser;
       print_report('dashboard/exportDashboard?type='+type+'&is_internaluser='+is_internaluser);
    }
});