Ext.define('Admin.view.frontoffice.enquiries.grid.OnlineResubmissionSetupGrid', {
    extend: 'Ext.grid.Panel',
	xtype: 'onlineresubmissionsetupGrid',
    autoScroll: true,
    autoHeight: true,
    controller: 'usermanagementvctr',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    listeners: {
        beforerender: {
            fn: 'setUserGridsStore',
            config: {
                pageSize: 100,
                storeId: 'onlineResubmissionStr',
                proxy: {
                    url: 'usermanagement/getOnlineResubmissionApplications'
                }
            },
            isLoad: false
        }
    },
    tbar:[{
          xtype: 'toolbar',
          ui: 'footer',
          width: '100%',
          layout: 'hbox',
          items: ['->',{
          	xtype: 'textfield',
          	fieldLabel: 'Reference/Tracking No:',
          	labelWidth: 150,
          	name: 'Reference',
            listeners: {
                change: function(me,value,old,opt) {
                    var grid=me.up('grid');
                     if(value!=''){
                      var button=grid.down('button[name=search]').enable();
                      }else{
                        var button=grid.down('button[name=search]').disable();
                      }
                  }
              },
          },{
	        xtype: 'button',
	        iconCls: 'fa fa-search',
	        text: 'Search',
	        handler: 'func_referenceSearch',
	        ui: 'soft-green',
            name: 'search',
            disabled: true
        }],
    }],

    columns: [{
        xtype: 'widgetcolumn',
        text: 'Action',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: [{
                    iconCls: 'fa fa-send',
                    storeID: 'onlineResubmissionStr',
                    action_url: 'usermanagement/onlineResubmissionRequest',
                    text: 'Resubmit Application',
                    action: 'Resubmiting',
                    handler: 'func_makeResubmissionRequest'
                },{
                    iconCls: 'fa fa-eye',
                    action_url: 'usermanagement/showHideonlineResubmissionRequest',
                    text: 'Show Application',
                    action: 'show',
                    action_type: 1,
                    handler: 'func_hideshowOnlineSubmissionRequest'
                },{
                    iconCls: 'fa fa-eye-slash',
                    action_url: 'usermanagement/showHideonlineResubmissionRequest',
                    text: 'Hide Application',
                    action: 'hide',
                    action_type: 2,
                    handler: 'func_hideshowOnlineSubmissionRequest'
                }]
           }

        }, onWidgetAttach: function (col, widget, rec) {
            var application_status_id = rec.get('application_status_id');
            if (application_status_id > 1 ) {
                widget.down('menu menuitem[action=show]').setDisabled(false);
                widget.down('menu menuitem[action=hide]').setDisabled(true);
            } else {
                widget.down('menu menuitem[action=show]').setDisabled(true);
                widget.down('menu menuitem[action=hide]').setDisabled(false);
            }
        }
 },{
        xtype: 'gridcolumn',
        dataIndex: 'module_id',
        name: 'module_id',
        text: 'module_id',
        hidden: true,
        flex:1,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'application_code',
        name: 'application_code',
        text: 'application_code',
        hidden: true,
        flex:1,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'id',
        name: 'id',
        text: 'id',
        flex:1,
        hidden: true,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'workflow_stage_id',
        name: 'workflow_stage_id',
        text: 'workflow_stage_id',
        flex:1,
        hidden: true,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        name: 'reference_no',
        text: 'Reference No',
        flex: 1,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        name: 'tracking_no',
        text: 'Tracking No',
        flex: 1,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'module_name',
        name: 'module_name',
        text: 'Module',
        flex: 1,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'sub_module_name',
        name: 'sub_module_name',
        text: 'Sub-Module',
        flex: 1,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'process_name',
        name: 'process_name',
        text: 'Process',
        flex: 1,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'current_process',
        name: 'current_stage',
        text: 'Current Stage',
        flex: 1,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        name: 'application_status',
        text: 'Application Status',
        flex: 1,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'applicant',
        name: 'Applicant',
        text: 'Applicant',
        flex: 1,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'isRead',
        name: 'isRead',
        text: 'IS-READ',
        width: 80,
        tbCls: 'wrap',
        renderer: function (value, metaData) {
            if(value) {
                metaData.tdStyle = 'color:white;background-color:green';
                return "True";
            }

            metaData.tdStyle = 'color:white;background-color:red';
            return "False";
        }
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'application_status_id',
        name: 'application_status_id',
        text: 'IS Active',
        width: 80,
        tbCls: 'wrap',
        renderer: function (value, metaData) {
            if(value > 1) {
                metaData.tdStyle = 'color:white;background-color:red';
                return "False";
            }

            metaData.tdStyle = 'color:white;background-color:green';
            return "True";
        }
       
    }],

    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} out of {2}',
        emptyMsg: 'No Records',
        beforeLoad:function(){
            var grid = this.up('grid'),
                store = this.getStore(),
                Reference = grid.down('textfield[name=Reference]').getValue();
                store.getProxy().extraParams = {
                    reference: Reference
                };
        }
    }]

    });
