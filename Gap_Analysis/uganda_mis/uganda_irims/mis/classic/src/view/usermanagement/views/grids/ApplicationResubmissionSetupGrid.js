Ext.define('Admin.view.frontoffice.enquiries.grid.ApplicationResubmissionSetupGrid', {
    extend: 'Ext.grid.Panel',
	xtype: 'applicationresubmissionsetupGrid',
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
                storeId: 'applicationResubmissionStr',
                proxy: {
                    url: 'usermanagement/getResubmissionApplications'
                }
            },
            isLoad: false
        },
        itemdblclick: 'assignResponsibleUserToEnquiryApplication'
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
                    iconCls: 'fa fa-times',
                    action_url: 'usermanagement/applicationResubmissionHideRequest',
                    storeID: 'applicationResubmissionStr',
                    text: 'Hide',
                    action: 'hidding',
                    handler: 'func_makeResubmissionRequest'
                 },{
                    iconCls: 'fa fa-eye',
                    storeID: 'applicationResubmissionStr',
                    action_url: 'usermanagement/applicationResubmissionVisibleRequest',
                    text: 'make visible',
                    action: 'Enabling',
                    handler: 'func_makeResubmissionRequest'
                }]
           }

        },onWidgetAttach: function (col, widget, rec) {
            var isDone = rec.get('isDone');
            if (isDone === 1 || isDone == 1) {
                widget.down('menu menuitem[action=Enabling]').setDisabled(false);
                widget.down('menu menuitem[action=hidding]').setDisabled(true);
            } else {
                widget.down('menu menuitem[action=Enabling]').setDisabled(true);
                widget.down('menu menuitem[action=hidding]').setDisabled(false);
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
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        name: 'tracking_no',
        text: 'Tracking No',
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'module_name',
        name: 'module_name',
        text: 'Module',
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'sub_module_name',
        name: 'sub_module_name',
        text: 'Sub-Module',
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'from_user',
        name: 'from_user',
        text: 'Previous User',
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'to_user',
        name: 'to_user',
        text: 'Current User',
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'submitted_by',
        name: 'submitted_by',
        text: 'Submitted By',
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'previous_process',
        name: 'previous_process',
        text: 'Previous Process',
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'current_process',
        name: 'current_process',
        text: 'Current Process',
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
        dataIndex: 'isDone',
        name: 'isDone',
        text: 'IS Active',
        width: 80,
        tbCls: 'wrap',
        renderer: function (value, metaData) {
            if(value) {
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
