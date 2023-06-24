Ext.define('Admin.view.frontoffice.views.enquiries.grid.PortalApplicationSubmissionsGrid', {
    extend: 'Ext.grid.Panel',
	xtype: 'portalapplicationsubmissionsGrid',
    autoScroll: true,
    autoHeight: true,
    controller: 'enquiriesCtr',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'portalappsubmissionStr',
                proxy: {
                    url: 'usermanagement/getPortalAppSubmissions'
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
          	name: 'reference',
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
        dataIndex: 'process_name',
        name: 'process_name',
        text: 'Process',
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
        dataIndex: 'status_type',
        name: 'status_type',
        text: 'Status Type',
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
        xtype: 'datecolumn',
        dataIndex: 'date_submitted',
        name: 'date_submitted',
        text: 'Submission Date',
        format: 'Y-m-d',
        flex: 1
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
                reference = grid.down('textfield[name=reference]').getValue();
                store.getProxy().extraParams = {
                    reference: reference
                };
        }
    }]

    });
